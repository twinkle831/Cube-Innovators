

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProfileForm from './components/profiles/ProfileForm';
import ProfileView from './components/profiles/ViewProfile';
import Login from './components/auth/Login'; 
import AvatarDemo from './components/consultation/AvatarDemo'; 
import './App.css';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleFormSubmit = (data) => {
    setSubmittedData(data);
  };

  return (
    <Router>
      <Routes>
        {/* Avatar Demo Route */}
        <Route path="/avatar" element={<AvatarDemo />} />

        {/* Profile Form Route */}
        <Route 
          path="/profile" 
          element={
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
              {!isLoggedIn ? (
                <Login onLogin={handleLogin} />
              ) : !submittedData ? (
                <ProfileForm onSubmit={handleFormSubmit} />
              ) : (
                <ProfileView profileData={submittedData} />
              )}
            </div>
          } 
        />

        {/* Default Redirect */}
        <Route path="*" element={<Navigate to="/profile" />} />
      </Routes>
    </Router>
  );
}

export default App;
