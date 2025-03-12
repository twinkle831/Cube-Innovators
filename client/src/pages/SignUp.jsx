import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Alert,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Container,
  Box,
  Grid,
  Paper,
} from '@mui/material';
import OAuth from '../components/extras/OAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill out all fields.');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
    
      
        navigate('/profile-form', { state: { signupData: formData } });
      
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Paper elevation={3} sx={{ p: 4, width: '100%' }}>
          <Grid container spacing={3}>
            {/* left */}
            <Grid item xs={12} md={6}>
              <Typography variant="h4" component="h1" gutterBottom>
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Box
                    component="span"
                    sx={{
                      px: 1,
                      py: 0.5,
                      background: 'linear-gradient(45deg, #4F46E5, #9333EA, #DB2777)',
                      borderRadius: 1,
                      color: 'white',
                    }}
                  >
                    Career
                  </Box>
                  Advisor
                </Link>
              </Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>
                Let's explore the new possibilities to choose the Best Career for You!
              </Typography>
            </Grid>

            {/* right */}
            <Grid item xs={12} md={6}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Your username"
                      placeholder="Username"
                      id="username"
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Your email"
                      placeholder="name@company.com"
                      id="email"
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Your password"
                      placeholder="Password"
                      type="password"
                      id="password"
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      disabled={loading}
                      sx={{
                        background: 'linear-gradient(45deg, #9333EA, #DB2777)',
                      }}
                    >
                      {loading ? (
                        <CircularProgress size={24} sx={{ color: 'white' }} />
                      ) : (
                        'Sign Up'
                      )}
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <OAuth />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2">
                      Have an account?{' '}
                      <Link to="/sign-in" style={{ color: '#1976D2' }}>
                        Sign In
                      </Link>
                    </Typography>
                  </Grid>
                  {errorMessage && (
                    <Grid item xs={12}>
                      <Alert severity="error">{errorMessage}</Alert>
                    </Grid>
                  )}
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
}