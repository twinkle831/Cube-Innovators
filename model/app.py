from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
from sentence_transformers import SentenceTransformer
import faiss
import os
import requests
import re
from dotenv import load_dotenv

# Load the .env file
load_dotenv()
# Initialize Flask app
app = Flask(__name__)

# Load the Sentence Transformer model
model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

# Load the FAISS index and job data
def load_faiss_index_and_data(index_path, data_path):
    """
    Loads the FAISS index and job data from disk.
    """
    if not os.path.exists(index_path) or not os.path.exists(data_path):
        raise FileNotFoundError("FAISS index or job data file not found.")

    # Load FAISS index
    index = faiss.read_index(index_path)

    # Load job data
    df = pd.read_csv(data_path)
    return index, df

# Paths to the FAISS index and job data
FAISS_INDEX_PATH = "job_index.faiss"  # Replace with your FAISS index file path
JOB_DATA_PATH = "job_indexed.csv"  # Replace with your job data file path

# Load the FAISS index and job data
try:
    index, df = load_faiss_index_and_data(FAISS_INDEX_PATH, JOB_DATA_PATH)
    print("FAISS index and job data loaded successfully.")
except Exception as e:
    print(f"Error loading FAISS index or job data: {e}")
    exit(1)

# Hugging Face API key
HUGGINGFACE_API_KEY = os.getenv("HUGGINGFACE_API_KEY")  # Replace with your key

# Function to clean and format text
def clean_text(text):
    """
    Cleans and formats the text by removing extra spaces, newlines, and special characters.
    """
    # Remove extra spaces and newlines
    text = re.sub(r"\s+", " ", text).strip()
    # Remove special characters (keep alphanumeric and basic punctuation)
    text = re.sub(r"[^a-zA-Z0-9\s.,!?]", "", text)
    return text

# Function to search for similar jobs
def search_jobs(user_query, top_k=5):
    """
    Searches for jobs similar to the user query using the FAISS index.
    """
    # Encode the user query
    query_embedding = model.encode(user_query, convert_to_numpy=True)

    # Search the FAISS index
    distances, indices = index.search(np.array([query_embedding]), top_k)

    # Retrieve the top matching jobs
    results = []
    for idx in indices[0]:
        if 0 <= idx < len(df):  # Ensure index is within bounds
            job = df.iloc[idx]
            results.append({
                "Job Title": job["Job Title"],
                "Company": job["Company"],
                "Description": clean_text(job["Job Description"]),
                "Skills": job["skills"],
            })
    return results

# Function to generate career advice using Hugging Face API
def generate_career_advice(user_query, job_results, user_profile):
    """
    Generates detailed career advice using the Hugging Face API.
    """
    # Format job results
    job_info = "\n".join([
        f"- *{job['Job Title']}* at {job['Company']}"
        for job in job_results
    ])

    # Format user profile
    education_info = "\n".join([
        f"- {edu['degree']} from {edu['institution']} (Year: {edu['year']})"
        for edu in user_profile.get('education', [])
    ])

    # Create the prompt
    prompt = f"""
    A user is seeking career guidance. Here are their details:

    *Name:* {user_profile.get('name', 'N/A')}
    *Current Role:* {user_profile.get('current_role', 'N/A')}
    *Career Goal:* {user_profile.get('career_goal', 'N/A')}
    *Experience:* {user_profile.get('experience', 'N/A')}
    *Skills:* {', '.join(user_profile.get('skills', []))}
    *Interests:* {', '.join(user_profile.get('interests', []))}
    *Education:*
    {education_info if education_info else 'N/A'}

    *User Query:* "{user_query}"

    Based on the best job matches below, provide career guidance including:
    1. Latest jobs suited for their current skills.
    2. How the user can transition from their current role to their career goal.
    3. The best-suited career path based on their skills & interests.
    4. The additional skills they should learn to improve.
    5. Recommended courses, certifications, or next steps.

    # *Matching Jobs:*
    {job_info if job_info else 'No matching jobs found.'}

    Now, generate a structured career suggestion tailored to this user.
    """

    # Call the Hugging Face API
    response = requests.post(
        "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
        headers={"Authorization": f"Bearer {HUGGINGFACE_API_KEY}"},
        json={"inputs": prompt}
    )

    if response.status_code == 200:
        try:
            response_json = response.json()
            generated_text = response_json[0].get("generated_text", "No response generated.") if isinstance(response_json, list) else "Unexpected response format."
            return clean_text(generated_text)
        except Exception as e:
            return f"Error parsing response: {str(e)}"
    else:
        return f"Error: Received status code {response.status_code}"

def summarize_text(text, max_words=40):
    """
    Summarizes the generated career advice into a concise version for speech (max_words words).
    Handles the case where the model repeats the prompt in its response.
    """
    # Create the prompt for summarization
    prompt = f"""
    Summarize the following career advice into a concise message with APPROXIMATELY {max_words} words:
    {text}
    Ensure the summary:
    1. Is brief but informative (around {max_words} words)
    2. Includes key career recommendations and skills to develop
    3. Uses clear, simple sentence structure suitable for speech
    4. Does not include any part of the user's query
    5. Maintains essential context and actionable advice
    """
    # Call the Hugging Face API
    try:
        response = requests.post(
            "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
            headers={"Authorization": f"Bearer {HUGGINGFACE_API_KEY}"},
            json={"inputs": prompt},
            timeout=15
        )
        if response.status_code == 200:
            try:
                response_json = response.json()
                # Handle different response formats
                if isinstance(response_json, list) and len(response_json) > 0:
                    generated_text = response_json[0].get("generated_text", "")
                elif isinstance(response_json, dict):
                    generated_text = response_json.get("generated_text", "")
                else:
                    generated_text = str(response_json)
                
                # Extract only the model's response using multiple methods
                
                # Method 1: Remove the instruction prompt
                if "5. Maintains essential context and actionable advice" in generated_text:
                    parts = generated_text.split("5. Maintains essential context and actionable advice", 1)
                    if len(parts) > 1:
                        generated_text = parts[1].strip()
                
                # Method 2: Check for common response patterns
                markers = ["Summary:", "Here's a summary:", "Concise summary:", "Career advice summary:"]
                for marker in markers:
                    if marker in generated_text:
                        parts = generated_text.split(marker, 1)
                        if len(parts) > 1:
                            generated_text = parts[1].strip()
                            break
                
                # Method 3: Remove the original text if it appears in the response
                if len(text) > 20 and text[:20] in generated_text:
                    text_end_index = generated_text.find(text) + len(text)
                    if text_end_index < len(generated_text):
                        # Take content after the original text
                        generated_text = generated_text[text_end_index:].strip()
                
                # Clean and format the text
                summary = clean_text(generated_text)
                
                # Make sure we have complete sentences
                if summary and not summary[-1] in ['.', '!', '?']:
                    # Find the last complete sentence
                    last_period = max(summary.rfind('.'), summary.rfind('!'), summary.rfind('?'))
                    if last_period > 0:
                        summary = summary[:last_period+1]
                    else:
                        summary += "."
                
                # If we couldn't extract a meaningful response, use local fallback
                if not summary or len(summary.split()) < 5:
                    return local_summarize(text, max_words)
                    
                # Ensure we're within word limit
                words = summary.split()
                if len(words) > max_words * 1.2:  # Allow slight overrun
                    # Find the last complete sentence within the word limit
                    partial_summary = " ".join(words[:max_words])
                    last_period = max(partial_summary.rfind('.'), partial_summary.rfind('!'), partial_summary.rfind('?'))
                    if last_period > 0:
                        summary = partial_summary[:last_period+1]
                    else:
                        summary = " ".join(words[:max_words]) + "."
                    
                return summary
                
            except Exception as e:
                print(f"Error parsing API response: {str(e)}")
                return local_summarize(text, max_words)
        else:
            print(f"API Error: {response.status_code}. Using local fallback.")
            return local_summarize(text, max_words)
    except Exception as e:
        print(f"Exception in API call: {str(e)}. Using local fallback.")
        return local_summarize(text, max_words)
def local_summarize(text, max_words=40):
    """
    More comprehensive local fallback summarization when the API is unavailable.
    Attempts to extract the most important sentences.
    """
    # Split into sentences
    sentences = re.split(r'[.!?]+', text)
    sentences = [s.strip() for s in sentences if s.strip()]
    
    if not sentences:
        return "Unable to generate career advice summary."
    
    # Keywords to prioritize sentences
    keywords = ["recommend", "skill", "career", "path", "course", "certif", 
                "improve", "learn", "develop", "focus", "opportunities", 
                "position", "role", "experience", "knowledge"]
    
    # Score sentences based on keywords and position
    scored_sentences = []
    for i, sentence in enumerate(sentences):
        score = 0
        # Position score (first sentences get higher scores)
        position_score = max(0, 1.0 - (i / len(sentences)))
        score += position_score * 3
        
        # Keyword score
        for keyword in keywords:
            if keyword.lower() in sentence.lower():
                score += 1
        
        # Length score (prefer medium-length sentences for speech)
        words = len(sentence.split())
        if 5 <= words <= 20:
            score += 1
        elif words > 20:
            score -= 1
            
        scored_sentences.append((score, sentence))
    
    # Sort by score and select top sentences
    scored_sentences.sort(reverse=True)
    
    # Build summary
    summary = ""
    word_count = 0
    
    for _, sentence in scored_sentences:
        sentence_words = sentence.split()
        if word_count + len(sentence_words) <= max_words + 5:  # Allow slight flexibility
            if summary:
                summary += ". " + sentence
            else:
                summary = sentence
            word_count += len(sentence_words)
        else:
            # If we can add at least half the sentence, do so
            if word_count + (len(sentence_words) // 2) <= max_words + 5:
                remaining = max_words + 5 - word_count
                if summary:
                    summary += ". " + " ".join(sentence_words[:remaining])
                else:
                    summary = " ".join(sentence_words[:remaining])
            break
            
    return summary

# Format the advice for display (both detailed and concise)
def format_advice_for_display(detailed_advice, concise_advice):
    """
    Formats the advice for display, ensuring the user prompt is not included.
    """
    # Remove any potential user query references from both
    # This regex pattern looks for phrases like "Based on your query" or "Regarding your interest in"
    detailed_advice = re.sub(r"(Based on|Regarding|According to|In response to)(.+?)(query|question|interest|request)(.+?)[,.:]", "", detailed_advice)
    concise_advice = re.sub(r"(Based on|Regarding|According to|In response to)(.+?)(query|question|interest|request)(.+?)[,.:]", "", concise_advice)
    
    # Format for display
    formatted_response = {
        "detailed_advice": detailed_advice.strip(),
        "concise_advice": concise_advice.strip()
    }
    
    return formatted_response

# Flask route to handle job search and career advice generation
@app.route("/career-advice", methods=["POST"])
def career_advice():
    """
    API endpoint to search for jobs and generate career advice.
    """
    # Get JSON data from the request
    data = request.get_json()
    if not data:
        return jsonify({"error": "No JSON data provided."}), 400

    # Extract user query and profile
    user_query = data.get("query")
    user_profile = data.get("profile")

    if not user_query or not user_profile:
        return jsonify({"error": "Both 'query' and 'profile' are required in the JSON data."}), 400

    # Get the number of results to return (default is 5)
    top_k = int(data.get("top_k", 5))

    # Search for similar jobs
    try:
        job_results = search_jobs(user_query, top_k)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    # Generate career advice
    try:
        detailed_advice = generate_career_advice(user_query, job_results, user_profile)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    # Summarize the career advice - updated to produce a more informative summary
    try:
        concise_advice = summarize_text(detailed_advice, max_words=40)  # Increased from 20 to 40
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    # Format the advice for display
    formatted_advice = format_advice_for_display(detailed_advice, concise_advice)

    # Return the results
    return jsonify({
        "job_results": job_results,
        "detailed_advice": formatted_advice["detailed_advice"],
        "concise_advice": formatted_advice["concise_advice"]
    })

# Run the Flask app
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)