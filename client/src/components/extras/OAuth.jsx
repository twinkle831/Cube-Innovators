import { Button } from '@mui/material';
import { Google } from '@mui/icons-material'; // MUI's Google icon
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import {app} from './firebase.js'
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
          name: resultsFromGoogle.user.displayName,
          email: resultsFromGoogle.user.email,
          googlePhotoUrl: resultsFromGoogle.user.photoURL,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button
      variant='outlined'
      fullWidth
      startIcon={<Google />} // MUI's Google icon
      onClick={handleGoogleClick}
      sx={{
        mt: 2,
        color: '#DB4437', // Google's brand color
        borderColor: '#DB4437',
        '&:hover': {
          backgroundColor: 'rgba(219, 68, 55, 0.04)', // Light hover effect
          borderColor: '#DB4437',
        },
      }}
    >
      Continue with Google
    </Button>
  );
}