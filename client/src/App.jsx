

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProfileForm from './components/profiles/ProfileForm';
import ProfileView from './components/profiles/ViewProfile';
import Login from './components/auth/Login'; 
import AvatarDemo from './components/consultation/AvatarDemo'; 
import ResumeBuilder from './components/pages/ResumePage';
import './App.css';
import Header from './components/extras/Header';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import SignUp from './pages/SignUp';
import PrivateRoute from './components/extras/PrivateRoute.jsx';

function App() {
  // // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [submittedData, setSubmittedData] = useState(null);

  // const handleLogin = () => {
  //   setIsLoggedIn(true);
  // };

  // const handleFormSubmit = (data) => {
  //   setSubmittedData(data);
  // };

  return (
    <Router>
      <Routes>
        {/* Avatar Demo Route */}
        <Route path="/avatar" element={<AvatarDemo />} />
        <Route path="/resume" element={<ResumeBuilder />} />

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
