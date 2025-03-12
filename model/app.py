from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
from sentence_transformers import SentenceTransformer
import faiss
import os
import requests
import re
from dotenv import load_dotenv
import logging
from datetime import datetime, timedelta

# Load the .env file
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load the Sentence Transformer model
model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

# Paths to the FAISS index and job data
FAISS_INDEX_PATH = "job_index.faiss"  # Replace with your FAISS index file path
JOB_DATA_PATH = "job_indexed.csv"  # Replace with your job data file path

# Hugging Face API key
HUGGINGFACE_API_KEY = os.getenv("HUGGINGFACE_API_KEY")
if not HUGGINGFACE_API_KEY:
    logger.error("HUGGINGFACE_API_KEY not found in environment variables.")
    exit(1)

# Rate limiting for Hugging Face API
RATE_LIMIT = 5  # Max API calls per minute
last_api_call_time = None

# Load the FAISS index and job data
def load_faiss_index_and_data(index_path, data_path):
    """
    Loads the FAISS index and job data from disk.
    """
    if not os.path.exists(index_path) or not os.path.exists(data_path):
        raise FileNotFoundError("FAISS index or job data file not found.")

    try:
        # Load FAISS index
        index = faiss.read_index(index_path)

        # Load job data
        df = pd.read_csv(data_path)
        logger.info("FAISS index and job data loaded successfully.")
        return index, df
    except Exception as e:
        logger.error(f"Error loading FAISS index or job data: {e}")
        raise

# Load the FAISS index and job data
try:
    index, df = load_faiss_index_and_data(FAISS_INDEX_PATH, JOB_DATA_PATH)
except Exception as e:
    logger.error(f"Failed to load FAISS index or job data: {e}")
    exit(1)

# Function to clean and format text
def clean_text(text):
    """
    Cleans and formats the text by removing extra spaces, newlines, and special characters.
    """
    if not text:
        return ""
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
    try:
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
    except Exception as e:
        logger.error(f"Error searching jobs: {e}")
        raise

# Function to call Hugging Face API with rate limiting
def call_huggingface_api(prompt):
    """
    Calls the Hugging Face API with rate limiting.
    """
    global last_api_call_time

    # Rate limiting
    if last_api_call_time and datetime.now() - last_api_call_time < timedelta(seconds=60 / RATE_LIMIT):
        raise Exception("Rate limit exceeded. Please wait before making another request.")

    try:
        response = requests.post(
            "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
            headers={"Authorization": f"Bearer {HUGGINGFACE_API_KEY}"},
            json={"inputs": prompt},
            timeout=15
        )
        last_api_call_time = datetime.now()

        if response.status_code == 200:
            return response.json()
        else:
            raise Exception(f"API Error: {response.status_code} - {response.text}")
    except Exception as e:
        logger.error(f"Error calling Hugging Face API: {e}")
        raise

# Function to generate career advice using Hugging Face API
def generate_career_advice(user_query, job_results, user_profile):
    """
    Generates detailed career advice using the Hugging Face API.
    """
    try:
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
        response = call_huggingface_api(prompt)

        # Extract generated text
        if isinstance(response, list) and len(response) > 0:
            generated_text = response[0].get("generated_text", "No response generated.")
        else:
            generated_text = "Unexpected response format."

        return clean_text(generated_text)
    except Exception as e:
        logger.error(f"Error generating career advice: {e}")
        raise

# Flask route to handle job search and career advice generation
@app.route("/career-advice", methods=["POST"])
def career_advice():
    """
    API endpoint to search for jobs and generate career advice.
    """
    try:
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
        job_results = search_jobs(user_query, top_k)

        # Generate career advice
        detailed_advice = generate_career_advice(user_query, job_results, user_profile)

        # Return the results
        return jsonify({
            "job_results": job_results,
            "detailed_advice": detailed_advice
        })
    except Exception as e:
        logger.error(f"Error in /career-advice endpoint: {e}")
        return jsonify({"error": str(e)}), 500

# Run the Flask app
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)