//code 1:-
import React from 'react';
import ReactDOM from 'react-dom/client'; // Correct import
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

//code :google auth
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { GoogleOAuthProvider } from '@react-oauth/google';
// import App from './App';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <GoogleOAuthProvider clientId="YOUR_CLIENT_ID">
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>
//   </GoogleOAuthProvider>
// );

// import React from 'react';
// import ReactDOM from 'react-dom';
// import ProfileForm from './components/profiles/ProfileForm';

// const onSubmit = (data) => {
//   console.log(data);
// };

// ReactDOM.render(
//   <React.StrictMode>
//     <ProfileForm onSubmit={onSubmit} />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
