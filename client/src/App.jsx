import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProfileForm from './components/profiles/ProfileForm';
import ProfileView from './components/profiles/ViewProfile';
import Login from './components/auth/Login'; 
import AvatarDemo from './components/consultation/AvatarDemo'; 
import './App.css';
import Header from './components/extras/Header';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import SignUp from './pages/SignUp';
import PrivateRoute from './components/extras/PrivateRoute.jsx';
import ResumeBuilder from './components/pages/ResumePage.jsx';


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
    <BrowserRouter>

    <Header />
    <Routes>
    <Route path='/home' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/sign-in' element={<SignIn />} />
      <Route path='/sign-up' element={<SignUp />} />
      {/* <Route element={<PrivateRoute/>}> */}
    <Route path='/resume' element={<ResumeBuilder />} />
    <Route path='/avatar' element={<AvatarDemo />} />
        <Route path='/dashboard' element={<Dashboard />} />
      {/* </Route> */}
    </Routes>
  </BrowserRouter>
  );
}

export default App;