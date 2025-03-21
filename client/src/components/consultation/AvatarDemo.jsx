import React, { useState, useRef, useEffect } from "react";
import StreamingAvatar, { AvatarQuality, StreamingEvents, TaskType } from "@heygen/streaming-avatar";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './AvatarDemo.css'; // Import CSS file

const CareerAdvisorAvatar = () => {
  const videoRef = useRef(null);
  const userInputRef = useRef(null);
  const [avatar, setAvatar] = useState(null);
  const [sessionData, setSessionData] = useState(null);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [careerAdvice, setCareerAdvice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  // Speech recognition setup
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  // Update input field with transcript
  useEffect(() => {
    if (userInputRef.current && transcript) {
      userInputRef.current.value = transcript;
    }
  }, [transcript]);
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        
        // Debug token existence and format
        console.log("Authentication debugging:");
        console.log("- Token exists:", !!token);
        console.log("- Token value:", token ? `${token.substring(0, 15)}...` : "none");
        console.log("- Token length:", token ? token.length : 0);
        
        if (!token) {
          throw new Error('No token found in local storage');
        }
        
        // Log the request details before making it
        console.log("Making API request to:", "http://localhost:4000/api/user/profile");
        console.log("With headers:", {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        });
        
        const response = await fetch("http://localhost:4000/api/user/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
        
        // Log response status and headers
        console.log("Response status:", response.status);
        console.log("Response status text:", response.statusText);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch user details: ${response.status}`);
        }
    
        const data = await response.json();
        
        // Log successful data retrieval
        console.log("Response data received:", !!data);
        console.log("Data structure:", Object.keys(data));
    
        // Extract only the required fields
        const requiredFields = {
          skills: data.skills,
          interests: data.interests,
          experience: data.workExperience,
          education: data.education,
        };
        console.log("✅ User details fetched:", requiredFields);
        setUserDetails(requiredFields); // Store user details in state
      } catch (error) {
        console.error("❌ Error fetching user details:", error);
        console.error("Error name:", error.name);
        console.error("Error message:", error.message);
        
        // You may want to add fallback user details here
        // setUserDetails({ skills: [], interests: [], experience: [], education: [] });
      }
    };

    fetchUserDetails(); // Call the function to fetch user details
  }, []); // Empty dependency array ensures this runs only once on mount

  // Update listening state
  useEffect(() => {
    setIsListening(listening);
  }, [listening]);

  // 🔹 Fetch HeyGen Token
  const fetchAccessToken = async () => {
    try {
      const apiKey = import.meta.env.VITE_HEYGEN_API_KEY; // Get API key from .env
      if (!apiKey) {
        throw new Error("HeyGen API key is missing! Check your .env file.");
      }

      const response = await fetch("https://api.heygen.com/v1/streaming.create_token", {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify({}), // Empty body as per API
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(`Failed to get token: ${result.message || "Unknown error"}`);
      }

      console.log("✅ Token received:", result.data.token);
      return result.data.token;
    } catch (error) {
      console.error("❌ Error fetching token:", error);
      return null;
    }
  };

  // 🔹 Initialize Streaming Avatar
  const initializeAvatarSession = async () => {
    try {
      const token = await fetchAccessToken();
      if (!token) return;

      const newAvatar = new StreamingAvatar({ token });
      setAvatar(newAvatar);

      const newSessionData = await newAvatar.createStartAvatar({
        quality: AvatarQuality.High,
        avatarName: "default",
      });

      setSessionData(newSessionData);
      setIsSessionActive(true);
      console.log("✅ Session started:", newSessionData);

      // 🔹 Set up event listeners
      newAvatar.on(StreamingEvents.STREAM_READY, handleStreamReady);
      newAvatar.on(StreamingEvents.STREAM_DISCONNECTED, handleStreamDisconnected);
    } catch (error) {
      console.error("❌ Error initializing avatar session:", error);
    }
  };

  // 🔹 Handle Stream Ready
  const handleStreamReady = (event) => {
    if (event.detail && videoRef.current) {
      videoRef.current.srcObject = event.detail;
      videoRef.current.onloadedmetadata = () => videoRef.current.play().catch(console.error);
    } else {
      console.error("❌ Stream is not available");
    }
  };

  // 🔹 Handle Stream Disconnection
  const handleStreamDisconnected = () => {
    console.log("⚠️ Stream disconnected");
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsSessionActive(false);
  };

  // 🔹 End Avatar Session
  const terminateAvatarSession = async () => {
    if (!avatar || !sessionData) return;

    try {
      await avatar.stopAvatar();
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setAvatar(null);
      setSessionData(null);
      setIsSessionActive(false);
    } catch (error) {
      console.error("❌ Error terminating avatar session:", error);
    }
  };

  // 🔹 Fetch Career Advice from Flask Backend
  const fetchCareerAdvice = async () => {
    setIsLoading(true);
    try {
      // Replace with your actual Flask backend endpoint
      const response = await fetch("http://localhost:5000/career-advice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          query: userInputRef.current?.value || "Tell me about careers in technology",
          userDetails: userDetails
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch career advice: ${response.status}`);
      }

      const data = await response.json();
      setCareerAdvice(data.detailed_advice);
      
      // Make the avatar repeat the career advice using REPEAT task type
      if (avatar && data.detailed_advice) {
        await avatar.speak({ 
          text: data.detailed_advice, 
          taskType: TaskType.REPEAT 
        });
      }
    } catch (error) {
      console.error("❌ Error fetching career advice:", error);
      
      // Use sample career advice if the backend call fails
      const sampleAdvice = getSampleCareerAdvice();
      setCareerAdvice(sampleAdvice);
      
      if (avatar) {
        await avatar.speak({ 
          text: sampleAdvice, 
          taskType: TaskType.REPEAT 
        });
      }
    } finally {
      setIsLoading(false);
      userInputRef.current.value = ""; // Clear input
      resetTranscript(); // Reset speech recognition transcript
    }
  };

  // 🔹 Sample career advice function
  const getSampleCareerAdvice = () => {
    const adviceOptions = [
      "Based on your interest in technology, I recommend exploring roles in data science. With the growth of AI and machine learning, professionals who can analyze and interpret data are in high demand. Consider taking online courses in Python, statistics, and machine learning to build a foundation in this field.",
      
      "Your background in communications could be valuable in a UX/UI design career. Companies are increasingly focused on creating intuitive user experiences, and your ability to understand audience needs would be an asset. I suggest learning design thinking principles and familiarizing yourself with tools like Figma or Adobe XD.",
      
      "Have you considered a career in project management? Your organizational skills and attention to detail would be valuable in this role. The Project Management Professional (PMP) certification could help you stand out to employers across many industries."
    ];
    
    return adviceOptions[Math.floor(Math.random() * adviceOptions.length)];
  };

  // 🔹 Handle Basic Avatar Speaking (for direct user input)
  const handleSpeak = async () => {
    if (avatar && userInputRef.current?.value) {
      try {
        await avatar.speak({ 
          text: userInputRef.current.value, 
          taskType: TaskType.REPEAT 
        });
        userInputRef.current.value = ""; // Clear input
        resetTranscript(); // Reset speech recognition transcript
      } catch (error) {
        console.error("❌ Error with avatar speaking:", error);
      }
    }
  };

  // 🔹 Toggle Speech Recognition
  const toggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true });
    }
  };

  // 🔹 Handle Voice Input Completion
  const handleVoiceInputComplete = () => {
    SpeechRecognition.stopListening();
    if (transcript) {
      fetchCareerAdvice(); // Use the voice input to get career advice
    }
  };

  // 🔹 Cleanup on Unmount
  useEffect(() => {
    return () => {
      if (avatar && sessionData) {
        avatar.stopAvatar().catch(console.error);
      }
      SpeechRecognition.abortListening();
    };
  }, [avatar, sessionData]);

  // 🔹 Handle Enter Key Press
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      fetchCareerAdvice(); // Get career advice instead of direct speaking
    }
  };

  // Display warning if browser doesn't support speech recognition
  if (!browserSupportsSpeechRecognition) {
    return <div className="browser-warning">Your browser does not support speech recognition. Please try Chrome.</div>;
  }

  return (
    <main className="avatar-container">
      <h1 className="app-title">👨‍💼 AI Career Advisor</h1>

      <div className="video-container">
        <video ref={videoRef} autoPlay playsInline className="avatar-video" />
        {!isSessionActive && (
          <div className="video-placeholder">
            <span>Start session to activate your career advisor</span>
          </div>
        )}
      </div>

      <div className="controls-container">
        <div className="button-group">
          <button 
            className={`control-button ${isSessionActive ? 'disabled' : 'primary'}`}
            onClick={initializeAvatarSession} 
            disabled={isSessionActive}
          >
            Start Advisor Session
          </button>
          <button 
            className={`control-button ${!isSessionActive ? 'disabled' : 'secondary'}`}
            onClick={terminateAvatarSession} 
            disabled={!isSessionActive}
          >
            End Session
          </button>
        </div>
        
        <div className="input-group">
          <input 
            type="text" 
            ref={userInputRef} 
            placeholder="Enter career advice to be spoken by the avatar..." 
            aria-label="Text for avatar to speak" 
            onKeyPress={handleKeyPress}
            className="text-input"
            disabled={isLoading}
          />
          <button 
            className="speak-button"
            onClick={fetchCareerAdvice}
            disabled={!isSessionActive || isLoading}
          >
            {isLoading ? "Loading..." : "Make Avatar Speak"}
          </button>
        </div>
        
        <div className="voice-controls">
          <button 
            className={`voice-button ${isListening ? 'listening' : ''}`}
            onClick={toggleListening}
            disabled={!isSessionActive || isLoading}
          >
            {isListening ? "Stop Listening" : "Start Voice Input"}
          </button>
          
          {isListening && (
            <button 
              className="send-voice-button"
              onClick={handleVoiceInputComplete}
              disabled={isLoading}
            >
              Use Voice Input
            </button>
          )}
        </div>
        
        {isListening && (
          <div className="listening-indicator">
            🎤 Listening... Speak now
          </div>
        )}
        
        {isLoading && (
          <div className="loading-indicator">
            🔄 Processing...
          </div>
        )}
        
        {careerAdvice && (
          <div className="advice-display">
            <h3>Text Being Spoken:</h3>
            <p>{careerAdvice}</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default CareerAdvisorAvatar;