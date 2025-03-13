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
import json
import traceback
from datetime import datetime, timedelta
from flask_cors import CORS

# Load the .env file
load_dotenv()

# Configure logging with more detail
logging.basicConfig(
    level=logging.DEBUG,  # Changed to DEBUG for more verbose logging
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)
logger = logging.getLogger(__name__)
logger.info("Starting Career Advice API application")

# Initialize Flask app
app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"], supports_credentials=True)
CORS(app, resources={r"/career-advice": {"origins": "http://localhost:5173"}}, supports_credentials=True)

# Register after_request handler to add CORS headers
@app.after_request
def after_request(response):
    logger.debug(f"Adding CORS headers to response with status {response.status_code}")
    response.headers["Access-Control-Allow-Origin"] = "http://localhost:5173"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    return response

# Load the Sentence Transformer model
logger.info("Loading SentenceTransformer model...")
try:
    model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")
    logger.info("SentenceTransformer model loaded successfully")
except Exception as e:
    logger.critical(f"Failed to load SentenceTransformer model: {e}")
    logger.debug(traceback.format_exc())
    exit(1)

# Paths to the FAISS index and job data
FAISS_INDEX_PATH = "job_index.faiss"
JOB_DATA_PATH = "job_indexed.csv"
logger.info(f"FAISS_INDEX_PATH: {FAISS_INDEX_PATH}")
logger.info(f"JOB_DATA_PATH: {JOB_DATA_PATH}")

# Hugging Face API key
HUGGINGFACE_API_KEY = os.getenv("HUGGINGFACE_API_KEY")
if not HUGGINGFACE_API_KEY:
    logger.critical("HUGGINGFACE_API_KEY not found in environment variables.")
    exit(1)
else:
    logger.info("HUGGINGFACE_API_KEY found in environment variables")

# Rate limiting for Hugging Face API
RATE_LIMIT = 5  # Max API calls per minute
last_api_call_time = None

# Load the FAISS index and job data
def load_faiss_index_and_data(index_path, data_path):
    """
    Loads the FAISS index and job data from disk.
    """
    logger.info(f"Attempting to load FAISS index from {index_path} and job data from {data_path}")
    
    # Check if files exist
    if not os.path.exists(index_path):
        logger.critical(f"FAISS index file not found at {index_path}")
        raise FileNotFoundError(f"FAISS index file not found at {index_path}")
    else:
        logger.debug(f"FAISS index file exists at {index_path}")
        
    if not os.path.exists(data_path):
        logger.critical(f"Job data file not found at {data_path}")
        raise FileNotFoundError(f"Job data file not found at {data_path}")
    else:
        logger.debug(f"Job data file exists at {data_path}")

    try:
        # Load FAISS index
        logger.debug("Reading FAISS index...")
        index = faiss.read_index(index_path)
        logger.info(f"FAISS index loaded successfully with dimension: {index.d}")

        # Load job data
        logger.debug("Reading job data CSV...")
        df = pd.read_csv(data_path)
        logger.info(f"Job data loaded successfully with {len(df)} records")
        
        # Log the first few column names for verification
        logger.debug(f"Job data columns: {', '.join(df.columns[:5])}...")
        
        return index, df
    except Exception as e:
        logger.critical(f"Error loading FAISS index or job data: {e}")
        logger.debug(traceback.format_exc())
        raise

# Load the FAISS index and job data
try:
    logger.info("Loading FAISS index and job data...")
    index, df = load_faiss_index_and_data(FAISS_INDEX_PATH, JOB_DATA_PATH)
except Exception as e:
    logger.critical(f"Failed to load FAISS index or job data: {e}")
    logger.debug(traceback.format_exc())
    exit(1)

# Function to clean and format text
def clean_text(text):
    """
    Cleans and formats the text by removing extra spaces, newlines, and special characters.
    """
    if not text:
        logger.debug("Empty text provided to clean_text function")
        return ""
    
    logger.debug(f"Cleaning text (first 50 chars): {text[:50]}...")
    # Remove extra spaces and newlines
    text = re.sub(r"\s+", " ", text).strip()
    # Remove special characters (keep alphanumeric and basic punctuation)
    text = re.sub(r"[^a-zA-Z0-9\s.,!?]", "", text)
    logger.debug(f"Cleaned text (first 50 chars): {text[:50]}...")
    return text

# Function to search for similar jobs
def search_jobs(user_query, top_k=5):
    """
    Searches for jobs similar to the user query using the FAISS index.
    """
    logger.info(f"Searching for jobs with query: '{user_query}', top_k={top_k}")
    try:
        # Encode the user query
        logger.debug("Encoding user query...")
        query_embedding = model.encode(user_query, convert_to_numpy=True)
        logger.debug(f"Query encoded, embedding shape: {query_embedding.shape}")

        # Search the FAISS index
        logger.debug("Searching FAISS index...")
        distances, indices = index.search(np.array([query_embedding]), top_k)
        logger.debug(f"Search complete. Found indices: {indices[0]}, distances: {distances[0]}")

        # Retrieve the top matching jobs
        results = []
        for i, idx in enumerate(indices[0]):
            if 0 <= idx < len(df):  # Ensure index is within bounds
                job = df.iloc[idx]
                logger.debug(f"Retrieved job at index {idx}: {job['Job Title']} at {job['Company']}")
                
                # Extract and verify fields before adding to results
                job_title = job.get("Job Title", "Unknown Title")
                company = job.get("Company", "Unknown Company")
                description = clean_text(job.get("Job Description", ""))
                skills = job.get("skills", "")
                
                job_result = {
                    "Job Title": job_title,
                    "Company": company,
                    "Description": description,
                    "Skills": skills,
                    "Match Score": float(distances[0][i]),  # Adding distance as match score for debugging
                }
                results.append(job_result)
            else:
                logger.warning(f"Index {idx} out of bounds for dataframe with length {len(df)}")
        
        logger.info(f"Found {len(results)} matching jobs")
        return results
    except Exception as e:
        logger.error(f"Error searching jobs: {e}")
        logger.debug(traceback.format_exc())
        raise

# Function to call Hugging Face API with rate limiting
def call_huggingface_api(prompt):
    """
    Calls the Hugging Face API with rate limiting.
    """
    global last_api_call_time
    logger.info("Preparing to call Hugging Face API")
    
    # Rate limiting
    if last_api_call_time:
        time_since_last_call = datetime.now() - last_api_call_time
        logger.debug(f"Time since last API call: {time_since_last_call.total_seconds()} seconds")
        
        if time_since_last_call < timedelta(seconds=60 / RATE_LIMIT):
            logger.warning("Rate limit exceeded. Please wait before making another request.")
            raise Exception("Rate limit exceeded. Please wait before making another request.")

    try:
        # Log truncated prompt for debugging
        prompt_preview = prompt[:100] + "..." if len(prompt) > 100 else prompt
        logger.debug(f"Sending prompt to Hugging Face API: {prompt_preview}")
        
        # Prepare request
        url = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2"
        headers = {"Authorization": f"Bearer {HUGGINGFACE_API_KEY}"}
        payload = {"inputs": prompt}
        
        logger.debug(f"API URL: {url}")
        logger.debug(f"Request payload size: {len(json.dumps(payload))} bytes")
        
        # Make the request
        logger.debug("Sending request to Hugging Face API...")
        response = requests.post(
            url,
            headers=headers,
            json=payload,
            timeout=15
        )
        last_api_call_time = datetime.now()
        
        # Process response
        logger.debug(f"Received response with status code: {response.status_code}")
        if response.status_code == 200:
            response_data = response.json()
            logger.debug(f"API response type: {type(response_data)}")
            logger.debug(f"API response preview: {str(response_data)[:200]}...")
            return response_data
        else:
            logger.error(f"API Error: {response.status_code} - {response.text}")
            raise Exception(f"API Error: {response.status_code} - {response.text}")
    except requests.exceptions.Timeout:
        logger.error("Timeout error when calling Hugging Face API")
        raise Exception("Timeout error when calling Hugging Face API")
    except requests.exceptions.RequestException as e:
        logger.error(f"Request error when calling Hugging Face API: {e}")
        logger.debug(traceback.format_exc())
        raise Exception(f"Request error when calling Hugging Face API: {e}")
    except Exception as e:
        logger.error(f"Error calling Hugging Face API: {e}")
        logger.debug(traceback.format_exc())
        raise

# Function to generate career advice using Hugging Face API
def generate_career_advice(user_query, job_results, user_profile):
    """
    Generates detailed career advice using the Hugging Face API.
    """
    logger.info("Generating career advice")
    logger.debug(f"User query: {user_query}")
    logger.debug(f"User profile: {json.dumps(user_profile)}")
    logger.debug(f"Number of job results: {len(job_results)}")
    
    try:
        # Format job results
        logger.debug("Formatting job results...")
        job_info = "\n".join([
            f"- *{job['Job Title']}* at {job['Company']}"
            for job in job_results
        ])
        logger.debug(f"Formatted job info length: {len(job_info)}")

        # Format user profile
        logger.debug("Formatting education info...")
        education = user_profile.get('education', [])
        if not isinstance(education, list):
            logger.warning(f"Education is not a list: {education}")
            education = []
            
        education_info = "\n".join([
            f"- {edu.get('degree', 'Unknown')} from {edu.get('institution', 'Unknown')} (Year: {edu.get('year', 'Unknown')})"
            for edu in education
        ])
        logger.debug(f"Formatted education info length: {len(education_info)}")

        # Get skills and interests safely
        skills = user_profile.get('skills', [])
        if not isinstance(skills, list):
            logger.warning(f"Skills is not a list: {skills}")
            skills = [str(skills)]
            
        interests = user_profile.get('interests', [])
        if not isinstance(interests, list):
            logger.warning(f"Interests is not a list: {interests}")
            interests = [str(interests)]

        # Create the prompt
        logger.debug("Creating prompt for Hugging Face API...")
        prompt = f"""
        A user is seeking career guidance. Here are their details:

        *Name:* {user_profile.get('name', 'N/A')}
        *Current Role:* {user_profile.get('current_role', 'N/A')}
        *Career Goal:* {user_profile.get('career_goal', 'N/A')}
        *Experience:* {user_profile.get('experience', 'N/A')}
        *Skills:* {', '.join(skills)}
        *Interests:* {', '.join(interests)}
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
        logger.debug(f"Created prompt with length: {len(prompt)}")

        # Call the Hugging Face API
        logger.info("Calling Hugging Face API...")
        response = call_huggingface_api(prompt)
        logger.info("Received response from Hugging Face API")

        # Extract generated text
        logger.debug("Extracting generated text from response...")
        if isinstance(response, list) and len(response) > 0:
            logger.debug("Response is a list, extracting first item")
            generated_text = response[0].get("generated_text", "No response generated.")
            logger.debug(f"Generated text length: {len(generated_text)}")
        else:
            logger.warning(f"Unexpected response format: {type(response)}")
            generated_text = "Unexpected response format."

        # Clean the generated text
        cleaned_text = clean_text(generated_text)
        logger.info(f"Career advice generated with length: {len(cleaned_text)}")
        return cleaned_text
    except Exception as e:
        logger.error(f"Error generating career advice: {e}")
        logger.debug(traceback.format_exc())
        raise

# Flask route to handle job search and career advice generation
@app.route("/career-advice", methods=["OPTIONS"])
def career_advice_options():
    logger.info("Received OPTIONS request to /career-advice")
    return jsonify({"message": "CORS preflight successful"}), 200

@app.route("/career-advice", methods=["POST"])
def career_advice():
    """
    API endpoint to search for jobs and generate career advice.
    """
    logger.info("Received POST request to /career-advice")
    
    # Log request details
    logger.debug(f"Request headers: {dict(request.headers)}")
    logger.debug(f"Request content type: {request.content_type}")
    logger.debug(f"Request content length: {request.content_length}")
    
    try:
        # Get raw request data for debugging
        raw_data = request.get_data()
        logger.debug(f"Raw request data (first 200 bytes): {raw_data[:200]}")
        
        # Get JSON data from the request
        data = request.get_json(silent=True)
        if data is None:
            logger.error("Failed to parse JSON data")
            logger.debug(f"Raw request body: {raw_data}")
            return jsonify({"error": "Invalid JSON format in request body"}), 400
            
        logger.info("Successfully parsed JSON data from request")
        # Log the data structure (but limit potentially large fields)
        safe_data = {}
        if isinstance(data, dict):
            for k, v in data.items():
                if k == "query" and isinstance(v, str):
                    safe_data[k] = v[:100] + "..." if len(v) > 100 else v
                elif k == "profile" and isinstance(v, dict):
                    safe_data[k] = {sk: sv for sk, sv in v.items() if sk not in ["description"]}
                else:
                    safe_data[k] = v
            logger.debug(f"Parsed data: {json.dumps(safe_data)}")
        else:
            logger.warning(f"Parsed data is not a dictionary: {type(data)}")
            
        # Check if data is empty
        if not data:
            logger.error("No JSON data provided in request")
            return jsonify({"error": "No JSON data provided."}), 400

        # Extract user query and profile
        user_query = data.get("query")
        logger.debug(f"Extracted user query: {user_query}")
        
        user_profile = data.get("userDetails")
        if user_profile:
            logger.debug(f"User profile keys: {list(user_profile.keys())}")
        else:
            logger.debug("User profile is None or empty")

        # Validate required fields
        if not user_query:
            logger.error("Missing 'query' field in request data")
            return jsonify({"error": "'query' is required in the JSON data."}), 400
            
        if not user_profile:
            logger.error("Missing 'profile' field in request data")
            return jsonify({"error": "'profile' is required in the JSON data."}), 400

        # Get the number of results to return (default is 5)
        top_k = data.get("top_k", 5)
        try:
            top_k = int(top_k)
            logger.debug(f"Using top_k value: {top_k}")
        except (ValueError, TypeError):
            logger.warning(f"Invalid top_k value '{top_k}', using default of 5")
            top_k = 5

        # Search for similar jobs
        logger.info(f"Searching for jobs with query: '{user_query}'")
        job_results = search_jobs(user_query, top_k)
        logger.info(f"Found {len(job_results)} matching jobs")

        # Generate career advice
        logger.info("Generating career advice")
        detailed_advice = generate_career_advice(user_query, job_results, user_profile)
        logger.info("Career advice generation complete")

        # Prepare the response
        response_data = {
            "job_results": job_results,
            "detailed_advice": detailed_advice
        }
        logger.debug(f"Response data size: {len(json.dumps(response_data))} bytes")
        
        # Return the results
        logger.info("Returning successful response")
        return jsonify(response_data)
        
    except json.JSONDecodeError as e:
        logger.error(f"JSON decode error: {e}")
        logger.debug(traceback.format_exc())
        return jsonify({"error": f"Invalid JSON format: {str(e)}"}), 400
        
    except Exception as e:
        logger.error(f"Error in /career-advice endpoint: {e}")
        logger.debug(traceback.format_exc())
        return jsonify({"error": str(e)}), 500

# Run the Flask app
if __name__ == "__main__":
    logger.info("Starting Flask application on 0.0.0.0:5000")
    app.run(host="0.0.0.0", port=5000, debug=True)