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
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Chip,
} from '@mui/material';
import OAuth from '../components/extras/OAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    skills: [],
    interests: [],
    workExperience: [],
    education: [],
  });
  const [newSkill, setNewSkill] = useState('');
  const [newInterest, setNewInterest] = useState('');
  const [newExperience, setNewExperience] = useState({
    title: '',
    company: '',
    duration: '',
    description: '',
  });
  const [newEducation, setNewEducation] = useState({
    degree: '',
    institution: '',
    year: '',
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleArrayChange = (type, value) => {
    setFormData({ ...formData, [type]: [...formData[type], value] });
  };

  const addSkill = () => {
    if (newSkill && !formData.skills.includes(newSkill)) {
      setFormData({ ...formData, skills: [...formData.skills, newSkill] });
      setNewSkill('');
    }
  };

  const addInterest = () => {
    if (newInterest && !formData.interests.includes(newInterest)) {
      setFormData({ ...formData, interests: [...formData.interests, newInterest] });
      setNewInterest('');
    }
  };

  const addExperience = () => {
    if (
      newExperience.title &&
      newExperience.company &&
      newExperience.duration &&
      newExperience.description
    ) {
      setFormData({
        ...formData,
        workExperience: [...formData.workExperience, newExperience],
      });
      setNewExperience({
        title: '',
        company: '',
        duration: '',
        description: '',
      });
    }
  };

  const addEducation = () => {
    if (newEducation.degree && newEducation.institution && newEducation.year) {
      setFormData({
        ...formData,
        education: [...formData.education, newEducation],
      });
      setNewEducation({
        degree: '',
        institution: '',
        year: '',
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || !formData.role) {
      return setErrorMessage('Please fill out all required fields.');
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
                  {/* Name */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Your name"
                      placeholder="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </Grid>

                  {/* Email */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Your email"
                      placeholder="name@company.com"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </Grid>

                  {/* Password */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Your password"
                      placeholder="Password"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </Grid>

                  {/* Role */}
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Role</InputLabel>
                      <Select
                        label="Role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                      >
                        <MenuItem value="student">Student</MenuItem>
                        <MenuItem value="professional">Professional</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Skills */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Add skill"
                      placeholder="Skill"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                    />
                    <Box sx={{ mt: 1 }}>
                      {formData.skills.map((skill, index) => (
                        <Chip
                          key={index}
                          label={skill}
                          onDelete={() =>
                            setFormData({
                              ...formData,
                              skills: formData.skills.filter((s) => s !== skill),
                            })
                          }
                          sx={{ mr: 1, mb: 1 }}
                        />
                      ))}
                    </Box>
                  </Grid>

                  {/* Interests */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Add interest"
                      placeholder="Interest"
                      value={newInterest}
                      onChange={(e) => setNewInterest(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addInterest()}
                    />
                    <Box sx={{ mt: 1 }}>
                      {formData.interests.map((interest, index) => (
                        <Chip
                          key={index}
                          label={interest}
                          onDelete={() =>
                            setFormData({
                              ...formData,
                              interests: formData.interests.filter((i) => i !== interest),
                            })
                          }
                          sx={{ mr: 1, mb: 1 }}
                        />
                      ))}
                    </Box>
                  </Grid>

                  {/* Work Experience */}
                  <Grid item xs={12}>
                    <Typography variant="h6">Work Experience</Typography>
                    <TextField
                      fullWidth
                      label="Title"
                      placeholder="Job Title"
                      name="title"
                      value={newExperience.title}
                      onChange={(e) =>
                        setNewExperience({ ...newExperience, title: e.target.value })
                      }
                      sx={{ mt: 1 }}
                    />
                    <TextField
                      fullWidth
                      label="Company"
                      placeholder="Company Name"
                      name="company"
                      value={newExperience.company}
                      onChange={(e) =>
                        setNewExperience({ ...newExperience, company: e.target.value })
                      }
                      sx={{ mt: 1 }}
                    />
                    <TextField
                      fullWidth
                      label="Duration"
                      placeholder="Duration (e.g., 2 years)"
                      name="duration"
                      value={newExperience.duration}
                      onChange={(e) =>
                        setNewExperience({ ...newExperience, duration: e.target.value })
                      }
                      sx={{ mt: 1 }}
                    />
                    <TextField
                      fullWidth
                      label="Description"
                      placeholder="Job Description"
                      name="description"
                      value={newExperience.description}
                      onChange={(e) =>
                        setNewExperience({ ...newExperience, description: e.target.value })
                      }
                      sx={{ mt: 1 }}
                    />
                    <Button
                      variant="outlined"
                      onClick={addExperience}
                      sx={{ mt: 1 }}
                    >
                      Add Experience
                    </Button>
                  </Grid>

                  {/* Education */}
                  <Grid item xs={12}>
                    <Typography variant="h6">Education</Typography>
                    <TextField
                      fullWidth
                      label="Degree"
                      placeholder="Degree (e.g., B.Tech)"
                      name="degree"
                      value={newEducation.degree}
                      onChange={(e) =>
                        setNewEducation({ ...newEducation, degree: e.target.value })
                      }
                      sx={{ mt: 1 }}
                    />
                    <TextField
                      fullWidth
                      label="Institution"
                      placeholder="Institution Name"
                      name="institution"
                      value={newEducation.institution}
                      onChange={(e) =>
                        setNewEducation({ ...newEducation, institution: e.target.value })
                      }
                      sx={{ mt: 1 }}
                    />
                    <TextField
                      fullWidth
                      label="Year"
                      placeholder="Year (e.g., 2022)"
                      name="year"
                      value={newEducation.year}
                      onChange={(e) =>
                        setNewEducation({ ...newEducation, year: e.target.value })
                      }
                      sx={{ mt: 1 }}
                    />
                    <Button
                      variant="outlined"
                      onClick={addEducation}
                      sx={{ mt: 1 }}
                    >
                      Add Education
                    </Button>
                  </Grid>

                  {/* Submit Button */}
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

                  {/* OAuth */}
                  <Grid item xs={12}>
                    <OAuth />
                  </Grid>

                  {/* Sign In Link */}
                  <Grid item xs={12}>
                    <Typography variant="body2">
                      Have an account?{' '}
                      <Link to="/sign-in" style={{ color: '#1976D2' }}>
                        Sign In
                      </Link>
                    </Typography>
                  </Grid>

                  {/* Error Message */}
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