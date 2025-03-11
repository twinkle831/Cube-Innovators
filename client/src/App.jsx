
// import React, { useState } from 'react';
// import ProfileForm from './components/profiles/ProfileForm'; // Adjust path if needed
// import ViewProfile from './components/profiles/ViewProfile'; // Adjust path if needed
// import './App.css';

// function App() {
//   const [submittedData, setSubmittedData] = useState(null);

//   const handleFormSubmit = (data) => {
//     setSubmittedData(data);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-yellow-400 via-black to-yellow-400 flex items-center justify-center">
//       {!submittedData ? (
//         <ProfileForm onSubmit={handleFormSubmit} />
//       ) : (
//         <ViewProfile profileData={submittedData} />
//       )}
//     </div>
//   );
// }
// export default App;



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

import React, { useState } from 'react';
import ProfileForm from './components/profiles/ProfileForm';
import ProfileView from './components/profiles/ViewProfile';
import Login from './components/auth/Login'; 
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : !submittedData ? (
        <ProfileForm onSubmit={handleFormSubmit} />
      ) : (
        <ProfileView profileData={submittedData} />
      )}
    </div>
  );
}

export default App;
