import React, { useState, useRef, useEffect } from "react";
import StreamingAvatar, { AvatarQuality, StreamingEvents } from "@heygen/streaming-avatar";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './AvatarDemo.css'; // Import CSS file

const AvatarDemo = () => {
  const videoRef = useRef(null);
  const userInputRef = useRef(null);
  const [avatar, setAvatar] = useState(null);
  const [sessionData, setSessionData] = useState(null);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  
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

  // 🔹 Handle Avatar Speaking
  const handleSpeak = async () => {
    if (avatar && userInputRef.current?.value) {
      try {
        await avatar.speak({ text: userInputRef.current.value });
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
      handleSpeak();
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
      handleSpeak();
    }
  };

  // Display warning if browser doesn't support speech recognition
  if (!browserSupportsSpeechRecognition) {
    return <div className="browser-warning">Your browser does not support speech recognition. Please try Chrome.</div>;
  }

  return (
    <main className="avatar-container">
      <h1 className="app-title">🎥 Interactive AI Avatar</h1>

      <div className="video-container">
        <video ref={videoRef} autoPlay playsInline className="avatar-video" />
        {!isSessionActive && (
          <div className="video-placeholder">
            <span>Start session to activate avatar</span>
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
            Start Session
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
            placeholder="Type or speak something for the avatar to say..." 
            aria-label="User input" 
            onKeyPress={handleKeyPress}
            className="text-input"
            value={transcript || ''}
            onChange={(e) => {
              // Allow manual typing even when transcript is being used
              if (userInputRef.current) {
                userInputRef.current.value = e.target.value;
              }
            }}
          />
          <button 
            className="speak-button"
            onClick={handleSpeak}
            disabled={!isSessionActive}
          >
            Speak
          </button>
        </div>
        
        <div className="voice-controls">
          <button 
            className={`voice-button ${isListening ? 'listening' : ''}`}
            onClick={toggleListening}
            disabled={!isSessionActive}
          >
            {isListening ? "Stop Listening" : "Start Voice Input"}
          </button>
          
          {isListening && (
            <button 
              className="send-voice-button"
              onClick={handleVoiceInputComplete}
            >
              Send Voice Input
            </button>
          )}
        </div>
        
        {isListening && (
          <div className="listening-indicator">
            🎤 Listening... Speak now
          </div>
        )}
      </div>
    </main>
  );
};

export default AvatarDemo;