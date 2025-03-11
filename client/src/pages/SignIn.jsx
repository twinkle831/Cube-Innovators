import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import {
  Alert,
  Button,
  TextField,
  Typography,
  Container,
  Box,
  CircularProgress,
} from '@mui/material';
import OAuth from '../components/extras/OAuth';

export default function SignIn() {
  const { theme } = useSelector((state) => state.theme);
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill all the fields'));
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <Container maxWidth='md' sx={{ mt: 8 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 5,
          alignItems: 'center',
        }}
      >
        {/* Left Section */}
        <Box sx={{ flex: 1 }}>
          <Link to='/' style={{ textDecoration: 'none' }}>
          <Typography
      variant='h3'
      sx={{
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        color: 'text.primary',
      }}
    >
      <Box
        component='span'
        sx={{
          px: 2,
          py: 1,
          background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
          borderRadius: 2,
          color: 'white',
          mr: 1,
        }}
      >
        Career
      </Box>
      <Box
        component='span'
        sx={{
          color: theme === 'dark' ? 'white' : 'black', // Dynamic color for "Advisor"
        }}
      >
        Advisor
      </Box>
    </Typography>

          </Link>
          <Typography variant='body1' sx={{ mt: 3 }}>
                Welcome Back!!
          </Typography>
        </Box>

        {/* Right Section */}
        <Box sx={{ flex: 1, width: '100%' }}>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
        label='Email'
        type='email'
        placeholder='name@company.com'
        id='email'
        onChange={handleChange}
        fullWidth
        sx={{
          '& .MuiInputLabel-root': {
            color: theme === 'dark' ? 'white' : 'black', // Label color
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: theme === 'dark' ? 'white' : 'black', // Border color
            },
            '& input': {
              color: theme === 'dark' ? 'white' : 'black', // Text color
            },
            '&:hover fieldset': {
              borderColor: theme === 'dark' ? 'white' : 'black', // Hover border color
            },
          },
        }}
      />
      <TextField
        label='Password'
        type='password'
        placeholder='**********'
        id='password'
        onChange={handleChange}
        fullWidth
        sx={{
          '& .MuiInputLabel-root': {
            color: theme === 'dark' ? 'white' : 'black', // Label color
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: theme === 'dark' ? 'white' : 'black', // Border color
            },
            '& input': {
              color: theme === 'dark' ? 'white' : 'black', // Text color
            },
            '&:hover fieldset': {
              borderColor: theme === 'dark' ? 'white' : 'black', // Hover border color
            },
          },
        }}
      />
              <Button
                type='submit'
                variant='contained'
                disabled={loading}
                sx={{
                  background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
                  color: 'white',
                  py: 1.5,
                  '&:hover': {
                    background: 'linear-gradient(135deg, #2575fc, #6a11cb)',
                  },
                }}
              >
                {loading ? (
                  <CircularProgress size={24} sx={{ color: 'white' }} />
                ) : (
                  'Sign In'
                )}
              </Button>
              <OAuth />
            </Box>
          </form>
          <Box sx={{ mt: 3, display: 'flex', gap: 1 }}>
            <Typography variant='body2'>Don't have an account?</Typography>
            <Link to='/sign-up' style={{ color: '#1976d2', textDecoration: 'none' }}>
              Sign Up
            </Link>
          </Box>
          {errorMessage && (
            <Alert severity='error' sx={{ mt: 3 }}>
              {errorMessage}
            </Alert>
          )}
        </Box>
      </Box>
    </Container>
  );
}