

// // #code 2:in form format
// import React, { useState } from 'react';

// function ProfileForm({ onSubmit }) {
//   const [profileData, setProfileData] = useState({
//     role: '',
//     skills: [],
//     interests: [],
//     workExperience: [],
//     education: []
//   });

//   const [newSkill, setNewSkill] = useState('');
//   const [newInterest, setNewInterest] = useState('');
//   const [newExperience, setNewExperience] = useState({
//     title: '',
//     company: '',
//     duration: '',
//     description: ''
//   });
//   const [newEducation, setNewEducation] = useState({
//     degree: '',
//     institution: '',
//     year: ''
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setProfileData({ ...profileData, [name]: value });
//   };

//   const handleArrayChange = (e, type) => {
//     const { value } = e.target;
//     if (e.target.checked) {
//       setProfileData({ ...profileData, [type]: [...profileData[type], value] });
//     } else {
//       setProfileData({
//         ...profileData,
//         [type]: profileData[type].filter(item => item !== value)
//       });
//     }
//   };

//   const handleExperienceChange = (e) => {
//     const { name, value } = e.target;
//     setNewExperience({ ...newExperience, [name]: value });
//   };

//   const handleEducationChange = (e) => {
//     const { name, value } = e.target;
//     setNewEducation({ ...newEducation, [name]: value });
//   };

//   const addSkill = () => {
//     if (newSkill) {
//       setProfileData({ ...profileData, skills: [...profileData.skills, newSkill] });
//       setNewSkill('');
//     }
//   };

//   const addInterest = () => {
//     if (newInterest) {
//       setProfileData({ ...profileData, interests: [...profileData.interests, newInterest] });
//       setNewInterest('');
//     }
//   };

//   const addExperience = () => {
//     if (newExperience.title && newExperience.company && newExperience.duration && newExperience.description) {
//       setProfileData({ ...profileData, workExperience: [...profileData.workExperience, newExperience] });
//       setNewExperience({
//         title: '',
//         company: '',
//         duration: '',
//         description: ''
//       });
//     }
//   };

//   const addEducation = () => {
//     if (newEducation.degree && newEducation.institution && newEducation.year) {
//       setProfileData({ ...profileData, education: [...profileData.education, newEducation] });
//       setNewEducation({
//         degree: '',
//         institution: '',
//         year: ''
//       });
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(profileData);
//   };

//   return (
//     <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1600880292203-757bb6ca572c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")' }}>
//       <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-500 to-gray-800 opacity-70"></div>
//       <div className="relative max-w-xl mx-auto p-8 mt-20 bg-white bg-opacity-90 rounded-xl shadow-lg z-10">
//         <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-12">
//           <strong className="text-blue-500">My Profile Form</strong>
//         </h1>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label htmlFor="name" className="block mb-2 text-md font-medium text-gray-900">Name:</label>
//             <input type="text" id="name" name="name" value={profileData.name} onChange={handleInputChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Your Name" />
//           </div>

//           <div>
//             <h3 className="text-2xl font-semibold mb-4 text-gray-900">Skills:</h3>
//             <div className="flex flex-wrap gap-2">
//               {profileData.skills.map((skill, index) => (
//                 <span key={index} className="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">{skill}</span>
//               ))}
//               <input type="text" value={newSkill} onChange={(e) => setNewSkill(e.target.value)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Add new skill" />
//               <button type="button" onClick={addSkill} className="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Add</button>
//             </div>
//           </div>

//           <div>
//             <h3 className="text-2xl font-semibold mb-4 text-gray-900">Interests:</h3>
//             <div className="flex flex-wrap gap-2">
//               {profileData.interests.map((interest, index) => (
//                 <span key={index} className="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">{interest}</span>
//               ))}
//               <input type="text" value={newInterest} onChange={(e) => setNewInterest(e.target.value)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Add new interest" />
//               <button type="button" onClick={addInterest} className="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Add</button>
//             </div>
//           </div>

//           <div>
//             <h3 className="text-2xl font-semibold mb-4 text-gray-900">Work Experience:</h3>
//             {profileData.workExperience.map((experience, index) => (
//               <div key={index} className="mb-5">
//                 <p className="text-gray-700"><strong>Title:</strong> {experience.title}</p>
//                 <p className="text-gray-700"><strong>Company:</strong> {experience.company}</p>
//                 <p className="text-gray-700"><strong>Duration:</strong> {experience.duration}</p>
//                 <p className="text-gray-700"><strong>Description:</strong> {experience.description}</p>
//               </div>
//             ))}
//             <div>
//               <label htmlFor="experienceTitle" className="block mb-2 text-md font-medium text-gray-900">Title:</label>
//               <input type="text" id="experienceTitle" name="title" value={newExperience.title} onChange={handleExperienceChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
//               <label htmlFor="experienceCompany" className="block mb-2 text-md font-medium text-gray-900">Company:</label>
//               <input type="text" id="experienceCompany" name="company" value={newExperience.company} onChange={handleExperienceChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
//               <label htmlFor="experienceDuration" className="block mb-2 text-md font-medium text-gray-900">Duration:</label>
//               <input type="text" id="experienceDuration" name="duration" value={newExperience.duration} onChange={handleExperienceChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
//               <label htmlFor="experienceDescription" className="block mb-2 text-md font-medium text-gray-900">Description:</label>
//               <textarea id="experienceDescription" name="description" value={newExperience.description} onChange={handleExperienceChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" rows="3"></textarea>
//               <button type="button" onClick={addExperience} className="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 mt-4">Add Experience</button>
//             </div>
//           </div>

//           <div>
//             <h3 className="text-2xl font-semibold mb-4 text-gray-900">Education:</h3>
//             {profileData.education.map((education, index) => (
//               <div key={index} className="mb-5">
//                 <p className="text-gray-700"><strong>Degree:</strong> {education.degree}</p>
//                 <p className="text-gray-700"><strong>Institution:</strong> {education.institution}</p>
//                 <p className="text-gray-700"><strong>Year:</strong> {education.year}</p>
//               </div>
//             ))}
//             <div>
//               <label htmlFor="educationDegree" className="block mb-2 text-md font-medium text-gray-900">Degree:</label>
//               <input type="text" id="educationDegree" name="degree" value={newEducation.degree} onChange={handleEducationChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
//               <label htmlFor="educationInstitution" className="block mb-2 text-md font-medium text-gray-900">Institution:</label>
//               <input type="text" id="educationInstitution" name="institution" value={newEducation.institution} onChange={handleEducationChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
//               <label htmlFor="educationYear" className="block mb-2 text-md font-medium text-gray-900">Year:</label>
//               <input type="number" id="educationYear" name="year" value={newEducation.year} onChange={handleEducationChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
//               <button type="button" onClick={addEducation} className="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 mt-4">Add Education</button>
//             </div>
//           </div>

//           <button type="submit" className="py-3 px-5 text-md font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default ProfileForm;
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
      const res = await fetch('http://localhost:4000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(combinedData),
      });
      const data = await res.json();
      if (data.success === false) {
        alert(data.message);
      } else {
        localStorage.setItem('token', data.token);
        navigate('/avatar');
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