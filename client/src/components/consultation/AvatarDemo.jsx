import React, { useState, useRef, useEffect } from "react";
import StreamingAvatar, { AvatarQuality, StreamingEvents } from "@heygen/streaming-avatar";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
// Import regenerator-runtime at the top of your file

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
    return <div>Your browser does not support speech recognition. Please try Chrome.</div>;
  }

  return (
    <main className="container" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1>🎥 Interactive AI Avatar</h1>

      {/* Video Display */}
      <article style={{ width: "fit-content" }}>
        <video ref={videoRef} autoPlay playsInline />
      </article>

      {/* Controls */}
      <section>
        <section role="group">
          <button onClick={initializeAvatarSession} disabled={isSessionActive}>Start Session</button>
          <button onClick={terminateAvatarSession} disabled={!isSessionActive}>End Session</button>
        </section>
        
        {/* Text Input */}
        <section role="group">
          <input 
            type="text" 
            ref={userInputRef} 
            placeholder="Type or speak something for the avatar to say..." 
            aria-label="User input" 
            onKeyPress={handleKeyPress}
            value={transcript || ''}
            onChange={(e) => {
              // Allow manual typing even when transcript is being used
              if (userInputRef.current) {
                userInputRef.current.value = e.target.value;
              }
            }}
          />
          <button onClick={handleSpeak}>Speak</button>
        </section>
        
        {/* Voice Input Controls */}
        <section role="group" style={{ marginTop: "10px" }}>
          <button 
            onClick={toggleListening}
            style={{ 
              backgroundColor: isListening ? "#ff4c4c" : "#4caf50",
              color: "white"
            }}
          >
            {isListening ? "Stop Listening" : "Start Voice Input"}
          </button>
          
          {isListening && (
            <button onClick={handleVoiceInputComplete}>
              Send Voice Input
            </button>
          )}
        </section>
        
        {/* Listening Indicator */}
        {isListening && (
          <div style={{ marginTop: "10px", color: "#ff4c4c" }}>
            🎤 Listening... Speak now
          </div>
        )}
      </section>
    </main>
  );
};

export default AvatarDemo;