// import React from 'react';
// import AvatarDemo from './components/consultation/AvatarDemo.jsx';
// import './App.css';



// import React, { useState } from 'react';
// import ProfileForm from './components/profiles/ProfileForm'; // Adjust path if needed
// import ProfileView from './components/profiles/ViewProfile'; // Adjust path if needed
// import './App.css';

// function App() {
//   const [submittedData, setSubmittedData] = useState(null);

//   const handleFormSubmit = (data) => {
//     setSubmittedData(data);
//   };

//   return (
//     <div className="min-h-screen bg-transparent flex items-center justify-center">
//       {!submittedData ? (
//         <ProfileForm onSubmit={handleFormSubmit} />
//       ) : (
//         <ProfileView profileData={submittedData} />
//       )}
//     </div>
//   );
// }

// export default App;


//3rd code
// import React, { useState } from 'react';
// import ProfileForm from './components/profiles/ProfileForm';
// import ProfileView from './components/profiles/ViewProfile';
// import './App.css';

// function App() {
//   const [submittedData, setSubmittedData] = useState(null);

//   const handleFormSubmit = (data) => {
//     setSubmittedData(data);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       {!submittedData ? (
//         <ProfileForm onSubmit={handleFormSubmit} />
//       ) : (
//         <ProfileView profileData={submittedData} />
//       )}
//     </div>
//   );
// }

// export default App;

// import React, { useState } from 'react';
// import ProfileForm from './components/profiles/ProfileForm';
// import ProfileView from './components/profiles/ViewProfile';
// import Login from './components/auth/Login'; 
// import './App.css';

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [submittedData, setSubmittedData] = useState(null);

//   const handleLogin = () => {
//     setIsLoggedIn(true);
//   };

//   const handleFormSubmit = (data) => {
//     setSubmittedData(data);
//   };

//   return (
//     <div className="App">
//       <AvatarDemo />
//     </div>
//   );
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       {!isLoggedIn ? (
//         <Login onLogin={handleLogin} />
//       ) : !submittedData ? (
//         <ProfileForm onSubmit={handleFormSubmit} />
//       ) : (
//         <ProfileView profileData={submittedData} />
//       )}
//     </div>
//   );
// }

// export default App;


import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProfileForm from './components/profiles/ProfileForm';
import ProfileView from './components/profiles/ViewProfile';
import Login from './components/auth/Login'; 
import AvatarDemo from './components/avatar/AvatarDemo'; 
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
