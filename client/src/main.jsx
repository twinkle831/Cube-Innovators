//code 1:-
import React from 'react';
import ReactDOM from 'react-dom/client'; 
import './index.css';
import App from './App';
import { store , persistor } from './redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import ThemeProvider from './components/extras/ThemeProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <PersistGate persistor={persistor}>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </PersistGate>
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
