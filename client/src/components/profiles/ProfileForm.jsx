import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Grid, TextField, Button, Typography, Box, Paper } from '@mui/material';

function ProfileForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const { signupData } = location.state || {};

  const [profileData, setProfileData] = useState({
    name: '',
    skills: [],
    interests: [],
    workExperience: [],
    education: []
  });

  const [newSkill, setNewSkill] = useState('');
  const [newInterest, setNewInterest] = useState('');
  const [newExperience, setNewExperience] = useState({
    title: '',
    company: '',
    duration: '',
    description: ''
  });
  const [newEducation, setNewEducation] = useState({
    degree: '',
    institution: '',
    year: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const addSkill = () => {
    if (newSkill) {
      setProfileData({ ...profileData, skills: [...profileData.skills, newSkill] });
      setNewSkill('');
    }
  };

  const addInterest = () => {
    if (newInterest) {
      setProfileData({ ...profileData, interests: [...profileData.interests, newInterest] });
      setNewInterest('');
    }
  };

  const handleExperienceChange = (e) => {
    const { name, value } = e.target;
    setNewExperience({ ...newExperience, [name]: value });
  };

  const handleEducationChange = (e) => {
    const { name, value } = e.target;
    setNewEducation({ ...newEducation, [name]: value });
  };

  const addExperience = () => {
    if (newExperience.title && newExperience.company && newExperience.duration && newExperience.description) {
      setProfileData({ ...profileData, workExperience: [...profileData.workExperience, newExperience] });
      setNewExperience({
        title: '',
        company: '',
        duration: '',
        description: ''
      });
    }
  };

  const addEducation = () => {
    if (newEducation.degree && newEducation.institution && newEducation.year) {
      setProfileData({ ...profileData, education: [...profileData.education, newEducation] });
      setNewEducation({
        degree: '',
        institution: '',
        year: ''
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const combinedData = {
      ...signupData,
      ...profileData
    };

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(combinedData),
      });
      const data = await res.json();
      if (data.success === false) {
        alert(data.message);
      } else {
        navigate('/sign-in');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Box sx={{ padding: 3, background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)', minHeight: '100vh' }}>
      <Paper elevation={3} sx={{ padding: 3, maxWidth: '800px', margin: 'auto', background: 'white', borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color: '#3f51b5', fontWeight: 'bold' }}>
          My Profile Form
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={profileData.name}
                onChange={handleInputChange}
                sx={{ background: '#f0f4ff', borderRadius: 1 }}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ color: '#ff4081', fontWeight: 'bold' }}>
                Skills
              </Typography>
              <Grid container spacing={1}>
                {profileData.skills.map((skill, index) => (
                  <Grid item key={index}>
                    <Box sx={{ backgroundColor: '#ff4081', color: 'white', padding: '4px 8px', borderRadius: 1, fontSize: '0.875rem' }}>
                      {skill}
                    </Box>
                  </Grid>
                ))}
                <Grid item xs={12} sm={8}>
                  <TextField
                    fullWidth
                    label="Add new skill"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    size="small"
                    sx={{ background: '#f0f4ff', borderRadius: 1 }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Button variant="contained" onClick={addSkill} sx={{ background: '#ff4081', '&:hover': { background: '#e91e63' } }}>
                    Add Skill
                  </Button>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ color: '#4caf50', fontWeight: 'bold' }}>
                Interests
              </Typography>
              <Grid container spacing={1}>
                {profileData.interests.map((interest, index) => (
                  <Grid item key={index}>
                    <Box sx={{ backgroundColor: '#4caf50', color: 'white', padding: '4px 8px', borderRadius: 1, fontSize: '0.875rem' }}>
                      {interest}
                    </Box>
                  </Grid>
                ))}
                <Grid item xs={12} sm={8}>
                  <TextField
                    fullWidth
                    label="Add new interest"
                    value={newInterest}
                    onChange={(e) => setNewInterest(e.target.value)}
                    size="small"
                    sx={{ background: '#f0f4ff', borderRadius: 1 }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Button variant="contained" onClick={addInterest} sx={{ background: '#4caf50', '&:hover': { background: '#388e3c' } }}>
                    Add Interest
                  </Button>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ color: '#ff9800', fontWeight: 'bold' }}>
                Work Experience
              </Typography>
              {profileData.workExperience.map((experience, index) => (
                <Box key={index} sx={{ marginBottom: 2, padding: 2, backgroundColor: '#fff3e0', borderRadius: 1 }}>
                  <Typography><strong>Title:</strong> {experience.title}</Typography>
                  <Typography><strong>Company:</strong> {experience.company}</Typography>
                  <Typography><strong>Duration:</strong> {experience.duration}</Typography>
                  <Typography><strong>Description:</strong> {experience.description}</Typography>
                </Box>
              ))}
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Title"
                    name="title"
                    value={newExperience.title}
                    onChange={handleExperienceChange}
                    size="small"
                    sx={{ background: '#f0f4ff', borderRadius: 1 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Company"
                    name="company"
                    value={newExperience.company}
                    onChange={handleExperienceChange}
                    size="small"
                    sx={{ background: '#f0f4ff', borderRadius: 1 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Duration"
                    name="duration"
                    value={newExperience.duration}
                    onChange={handleExperienceChange}
                    size="small"
                    sx={{ background: '#f0f4ff', borderRadius: 1 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={newExperience.description}
                    onChange={handleExperienceChange}
                    multiline
                    rows={3}
                    size="small"
                    sx={{ background: '#f0f4ff', borderRadius: 1 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" onClick={addExperience} sx={{ background: '#ff9800', '&:hover': { background: '#f57c00' } }}>
                    Add Experience
                  </Button>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ color: '#9c27b0', fontWeight: 'bold' }}>
                Education
              </Typography>
              {profileData.education.map((education, index) => (
                <Box key={index} sx={{ marginBottom: 2, padding: 2, backgroundColor: '#f3e5f5', borderRadius: 1 }}>
                  <Typography><strong>Degree:</strong> {education.degree}</Typography>
                  <Typography><strong>Institution:</strong> {education.institution}</Typography>
                  <Typography><strong>Year:</strong> {education.year}</Typography>
                </Box>
              ))}
              <Grid container spacing={1}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Degree"
                    name="degree"
                    value={newEducation.degree}
                    onChange={handleEducationChange}
                    size="small"
                    sx={{ background: '#f0f4ff', borderRadius: 1 }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Institution"
                    name="institution"
                    value={newEducation.institution}
                    onChange={handleEducationChange}
                    size="small"
                    sx={{ background: '#f0f4ff', borderRadius: 1 }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Year"
                    name="year"
                    value={newEducation.year}
                    onChange={handleEducationChange}
                    size="small"
                    sx={{ background: '#f0f4ff', borderRadius: 1 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" onClick={addEducation} sx={{ background: '#9c27b0', '&:hover': { background: '#7b1fa2' } }}>
                    Add Education
                  </Button>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth sx={{ background: 'linear-gradient(135deg, #3f51b5, #9c27b0)', color: 'white', fontWeight: 'bold', '&:hover': { background: 'linear-gradient(135deg, #303f9f, #7b1fa2)' } }}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}

export default ProfileForm;