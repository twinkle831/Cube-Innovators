import requests

# Flask server URL
FLASK_SERVER_URL = "http://127.0.0.1:5000/career-advice"

# Dummy user query and profile
user_query = "I have 2 years of experience in Python and want to become a Data Scientist. What should I do?"
user_profile = {
    "name": "John Doe",
    "skills": ["Python", "Machine Learning", "SQL", "Data Visualization"],
    "interests": ["AI", "Big Data", "Finance"],
    "experience": "2 years in Data Analysis",
    "education": [
        {"degree": "B.Sc in Computer Science", "institution": "MIT", "year": 2022}
    ],
    "current_role": "Junior Data Analyst",
    "career_goal": "Become a Data Scientist"
}

# Send a POST request to the Flask server
response = requests.post(
    FLASK_SERVER_URL,
    json={
        "query": user_query,
        "profile": user_profile,
        "top_k": 3  # Number of jobs to return
    }
)

# Check the response
if response.status_code == 200:
    print("Response from Flask server:")
    print(response.json())
else:
    print(f"Error: Received status code {response.status_code}")
    print(response.text)