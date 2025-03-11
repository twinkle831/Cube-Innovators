// import React, { useState } from 'react';

// function ProfileForm() {
//   const [profileData, setProfileData] = useState({
//     name: '',
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
//     console.log(profileData);
//   };

//   return (
//     <div className="max-w-sm mx-auto p-4 mt-10 bg-white rounded-lg shadow-md">
//       <h2 className="text-lg font-bold mb-4">Profile Form</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-5">
//           <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name:</label>
//           <input type="text" id="name" name="name" value={profileData.name} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
//         </div>

//         <h3 className="text-lg font-bold mb-2">Skills:</h3>
//         <div className="flex flex-wrap gap-2 mb-5">
//           {profileData.skills.map((skill, index) => (
//             <span key={index} className="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">{skill}</span>
//           ))}
//           <input type="text" value={newSkill} onChange={(e) => setNewSkill(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Add new skill" />
//           <button type="button" onClick={addSkill} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add</button>
//         </div>

//         <h3 className="text-lg font-bold mb-2">Interests:</h3>
//         <div className="flex flex-wrap gap-2 mb-5">
//           {profileData.interests.map((interest, index) => (
//             <span key={index} className="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">{interest}</span>
//           ))}
//           <input type="text" value={newInterest} onChange={(e) => setNewInterest(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Add new interest" />
//           <button type="button" onClick={addInterest} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add</button>
//         </div>

//         <h3 className="text-lg font-bold mb-2">Work Experience:</h3>
//         {profileData.workExperience.map((experience, index) => (
//           <div key={index} className="mb-5">
//             <p><strong>Title:</strong> {experience.title}</p>
//             <p><strong>Company:</strong> {experience.company}</p>
//             <p><strong>Duration:</strong> {experience.duration}</p>
//             <p><strong>Description:</strong> {experience.description}</p>
//           </div>
//         ))}
//         <div className="mb-5">
//           <label htmlFor="experienceTitle" className="block mb-2 text-sm font-medium text-gray-900">Title:</label>
//           <input type="text" id="experienceTitle" name="title" value={newExperience.title} onChange={handleExperienceChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
//           <label htmlFor="experienceCompany" className="block mb-2 text-sm font-medium text-gray-900">Company:</label>
//           <input type="text" id="experienceCompany" name="company" value={newExperience.company} onChange={handleExperienceChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
//           <label htmlFor="experienceDuration" className="block mb-2 text-sm font-medium text-gray-900">Duration:</label>
//           <input type="text" id="experienceDuration" name="duration" value={newExperience.duration} onChange={handleExperienceChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
//           <label htmlFor="experienceDescription" className="block mb-2 text-sm font-medium text-gray-900">Description:</label>
//           <textarea id="experienceDescription" name="description" value={newExperience.description} onChange={handleExperienceChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" rows="3"></textarea>
//           <button type="button" onClick={addExperience} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-2">Add Experience</button>
//         </div>

//         <h3 className="text-lg font-bold mb-2 mt-4">Education:</h3>
//         {profileData.education.map((education, index) => (
//           <div key={index} className="mb-5">
//             <p><strong>Degree:</strong> {education.degree}</p>
//             <p><strong>Institution:</strong> {education.institution}</p>
//             <p><strong>Year:</strong> {education.year}</p>
//           </div>
//         ))}
//         <div className="mb-5">
//           <label htmlFor="educationDegree" className="block mb-2 text-sm font-medium text-gray-900">Degree:</label>
//           <input type="text" id="educationDegree" name="degree" value={newEducation.degree} onChange={handleEducationChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
//           <label htmlFor="educationInstitution" className="block mb-2 text-sm font-medium text-gray-900">Institution:</label>
//           <input type="text" id="educationInstitution" name="institution" value={newEducation.institution} onChange={handleEducationChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
//           <label htmlFor="educationYear" className="block mb-2 text-sm font-medium text-gray-900">Year:</label>
//           <input type="number" id="educationYear" name="year" value={newEducation.year} onChange={handleEducationChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
//           <button type="button" onClick={addEducation} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-2">Add Education</button>
//         </div>

//         <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4">Submit</button>
//       </form>
//     </div>
//   );
// }

// export default ProfileForm;



// #code 2:more width
// import React, { useState } from 'react';

// function ProfileForm() {
//   const [profileData, setProfileData] = useState({
//     name: '',
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
//     console.log(profileData);
//   };

//   return (
//     <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url("https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Feducation-background&psig=AOvVaw0-yt-cJ7nJY4PQKmrpNAK8&ust=1741773564248000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKCSy6XigYwDFQAAAAAdAAAAABAE")' }}>
//       <div className="absolute inset-0 bg-black opacity-50"></div>
//       <div className="relative max-w-2xl mx-auto p-8 mt-10 bg-white rounded-lg shadow-md z-10">
//         <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
//           Craft Your Digital Identity
//         </h1>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-5">
//             <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name:</label>
//             <input type="text" id="name" name="name" value={profileData.name} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
//           </div>

//           <h3 className="text-xl font-bold mb-2 text-gray-900">Skills:</h3>
//           <div className="flex flex-wrap gap-2 mb-5">
//             {profileData.skills.map((skill, index) => (
//               <span key={index} className="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">{skill}</span>
//             ))}
//             <input type="text" value={newSkill} onChange={(e) => setNewSkill(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Add new skill" />
//             <button type="button" onClick={addSkill} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add</button>
//           </div>

//           <h3 className="text-xl font-bold mb-2 text-gray-900">Interests:</h3>
//           <div className="flex flex-wrap gap-2 mb-5">
//             {profileData.interests.map((interest, index) => (
//               <span key={index} className="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">{interest}</span>
//             ))}
//             <input type="text" value={newInterest} onChange={(e) => setNewInterest(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Add new interest" />
//             <button type="button" onClick={addInterest} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add</button>
//           </div>

//           <h3 className="text-xl font-bold mb-2 text-gray-900">Work Experience:</h3>
//           {profileData.workExperience.map((experience, index) => (
//             <div key={index} className="mb-5">
//               <p className="text-gray-700"><strong>Title:</strong> {experience.title}</p>
//               <p className="text-gray-700"><strong>Company:</strong> {experience.company}</p>
//               <p className="text-gray-700"><strong>Duration:</strong> {experience.duration}</p>
//               <p className="text-gray-700"><strong>Description:</strong> {experience.description}</p>
//             </div>
//           ))}
//           <div className="mb-5">
//             <label htmlFor="experienceTitle" className="block mb-2 text-sm font-medium text-gray-900">Title:</label>
//             <input type="text" id="experienceTitle" name="title" value={newExperience.title} onChange={handleExperienceChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
//             <label htmlFor="experienceCompany" className="block mb-2 text-sm font-medium text-gray-900">Company:</label>
//             <input type="text" id="experienceCompany" name="company" value={newExperience.company} onChange={handleExperienceChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
//             <label htmlFor="experienceDuration" className="block mb-2 text-sm font-medium text-gray-900">Duration:</label>
//             <input type="text" id="experienceDuration" name="duration" value={newExperience.duration} onChange={handleExperienceChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
//             <label htmlFor="experienceDescription" className="block mb-2 text-sm font-medium text-gray-900">Description:</label>
//             <textarea id="experienceDescription" name="description" value={newExperience.description} onChange={handleExperienceChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" rows="3"></textarea>
//             <button type="button" onClick={addExperience} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-2">Add Experience</button>
//           </div>

//           <h3 className="text-xl font-bold mb-2 mt-4 text-gray-900">Education:</h3>
//           {profileData.education.map((education, index) => (
//             <div key={index} className="mb-5">
//               <p className="text-gray-700"><strong>Degree:</strong> {education.degree}</p>
//               <p className="text-gray-700"><strong>Institution:</strong> {education.institution}</p>
//               <p className="text-gray-700"><strong>Year:</strong> {education.year}</p>
//             </div>
//           ))}
//           <div className="mb-5">
//             <label htmlFor="educationDegree" className="block mb-2 text-sm font-medium text-gray-900">Degree:</label>
//             <input type="text" id="educationDegree" name="degree" value={newEducation.degree} onChange={handleEducationChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
//             <label htmlFor="educationInstitution" className="block mb-2 text-sm font-medium text-gray-900">Institution:</label>
//             <input type="text" id="educationInstitution" name="institution" value={newEducation.institution} onChange={handleEducationChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
//             <label htmlFor="educationYear" className="block mb-2 text-sm font-medium text-gray-900">Year:</label>
//             <input type="number" id="educationYear" name="year" value={newEducation.year} onChange={handleEducationChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
//             <button type="button" onClick={addEducation} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-2">Add Education</button>
//           </div>

//           <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4">Submit</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default ProfileForm;




// import React, { useState } from 'react';

// function ProfileForm() {
//   const [profileData, setProfileData] = useState({
//     name: '',
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
//     console.log(profileData);
//   };

//   return (
//     <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1600880292203-757bb6ca572c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")' }}>
//       <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-yellow-500 to-gray-800 opacity-70"></div>
//       <div className="relative max-w-xl mx-auto p-8 mt-20 bg-white bg-opacity-90 rounded-xl shadow-lg z-10">
//         <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-12">
//           <strong className="text-yellow-500">My Profile Form</strong>
//         </h1>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label htmlFor="name" className="block mb-2 text-md font-medium text-gray-900">Name:</label>
//             <input type="text" id="name" name="name" value={profileData.name} onChange={handleInputChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5" placeholder="Your Name" />
//           </div>

//           <div>
//             <h3 className="text-2xl font-semibold mb-4 text-gray-900">Skills:</h3>
//             <div className="flex flex-wrap gap-2">
//               {profileData.skills.map((skill, index) => (
//                 <span key={index} className="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">{skill}</span>
//               ))}
//               <input type="text" value={newSkill} onChange={(e) => setNewSkill(e.target.value)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5" placeholder="Add new skill" />
//               <button type="button" onClick={addSkill} className="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Add</button>
//             </div>
//           </div>

//           <div>
//             <h3 className="text-2xl font-semibold mb-4 text-gray-900">Interests:</h3>
//             <div className="flex flex-wrap gap-2">
//               {profileData.interests.map((interest, index) => (
//                 <span key={index} className="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">{interest}</span>
//               ))}
//               <input type="text" value={newInterest} onChange={(e) => setNewInterest(e.target.value)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5" placeholder="Add new interest" />
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
//               <input type="text" id="experienceTitle" name="title" value={newExperience.title} onChange={handleExperienceChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5" />
//               <label htmlFor="experienceCompany" className="block mb-2 text-md font-medium text-gray-900">Company:</label>
//               <input type="text" id="experienceCompany" name="company" value={newExperience.company} onChange={handleExperienceChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5" />
//               <label htmlFor="experienceDuration" className="block mb-2 text-md font-medium text-gray-900">Duration:</label>
//               <input type="text" id="experienceDuration" name="duration" value={newExperience.duration} onChange={handleExperienceChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5" />
//               <label htmlFor="experienceDescription" className="block mb-2 text-md font-medium text-gray-900">Description:</label>
//               <textarea id="experienceDescription" name="description" value={newExperience.description} onChange={handleExperienceChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5" rows="3"></textarea>
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
//               <input type="text" id="educationDegree" name="degree" value={newEducation.degree} onChange={handleEducationChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5" />
//               <label htmlFor="educationInstitution" className="block mb-2 text-md font-medium text-gray-900">Institution:</label>
//               <input type="text" id="educationInstitution" name="institution" value={newEducation.institution} onChange={handleEducationChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5" />
//               <label htmlFor="educationYear" className="block mb-2 text-md font-medium text-gray-900">Year:</label>
//               <input type="number" id="educationYear" name="year" value={newEducation.year} onChange={handleEducationChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5" />
//               <button type="button" onClick={addEducation} className="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 mt-4">Add Education</button>
//             </div>
//           </div>

//           <button type="submit" className="py-3 px-5 text-md font-medium text-center text-white rounded-lg bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800">Submit</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default ProfileForm;


// import React, { useState } from 'react';

// function ProfileForm({ onSubmit }) {
//   const [profileData, setProfileData] = useState({
//     name: '',
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
//       <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-yellow-500 to-gray-800 opacity-70"></div>
//       <div className="relative max-w-xl mx-auto p-8 mt-20 bg-white bg-opacity-90 rounded-xl shadow-lg z-10">
//         <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-12">
//           <strong className="text-yellow-500">My Profile Form</strong>
//         </h1>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label htmlFor="name" className="block mb-2 text-md font-medium text-gray-900">Name:</label>
//             <input type="text" id="name" name="name" value={profileData.name} onChange={handleInputChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5" placeholder="Your Name" />
//           </div>

//           <div>
//             <h3 className="text-2xl font-semibold mb-4 text-gray-900">Skills:</h3>
//             <div className="flex flex-wrap gap-2">
//               {profileData.skills.map((skill, index) => (
//                 <span key={index} className="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">{skill}</span>
//               ))}
//               <input type="text" value={newSkill} onChange={(e) => setNewSkill(e.target.value)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5" placeholder="Add new skill" />
//               <button type="button" onClick={addSkill} className="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Add</button>
//             </div>
//           </div>

//           <div>
//             <h3 className="text-2xl font-semibold mb-4 text-gray-900">Interests:</h3>
//             <div className="flex flex-wrap gap-2">
//               {profileData.interests.map((interest, index) => (
//                 <span key={index} className="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">{interest}</span>
//               ))}
//               <input type="text" value={newInterest} onChange={(e) => setNewInterest(e.target.value)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5" placeholder="Add new interest" />
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
//               <input type="text" id="experienceTitle" name="title" value={newExperience.title} onChange={handleExperienceChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5" />
//               <label htmlFor="experienceCompany" className="block mb-2 text-md font-medium text-gray-900">Company:</label>
//               <input type="text" id="experienceCompany" name="company" value={newExperience.company} onChange={handleExperienceChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5" />
//               <label htmlFor="experienceDuration" className="block mb-2 text-md font-medium text-gray-900">Duration:</label>
//               <input type="text" id="experienceDuration" name="duration" value={newExperience.duration} onChange={handleExperienceChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5" />
//               <label htmlFor="experienceDescription" className="block mb-2 text-md font-medium text-gray-900">Description:</label>
//               <textarea id="experienceDescription" name="description" value={newExperience.description} onChange={handleExperienceChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5" rows="3"></textarea>
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
//               <input type="text" id="educationDegree" name="degree" value={newEducation.degree} onChange={handleEducationChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5" />
//               <label htmlFor="educationInstitution" className="block mb-2 text-md font-medium text-gray-900">Institution:</label>
//               <input type="text" id="educationInstitution" name="institution" value={newEducation.institution} onChange={handleEducationChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5" />
//               <label htmlFor="educationYear" className="block mb-2 text-md font-medium text-gray-900">Year:</label>
//               <input type="number" id="educationYear" name="year" value={newEducation.year} onChange={handleEducationChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5" />
//               <button type="button" onClick={addEducation} className="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 mt-4">Add Education</button>
//             </div>
//           </div>

//           <button type="submit" className="py-3 px-5 text-md font-medium text-center text-white rounded-lg bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800">Submit</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default ProfileForm;




// #code 2:in form format
import React, { useState } from 'react';

function ProfileForm({ onSubmit }) {
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

  const handleArrayChange = (e, type) => {
    const { value } = e.target;
    if (e.target.checked) {
      setProfileData({ ...profileData, [type]: [...profileData[type], value] });
    } else {
      setProfileData({
        ...profileData,
        [type]: profileData[type].filter(item => item !== value)
      });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(profileData);
  };

  return (
    <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1600880292203-757bb6ca572c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")' }}>
      <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-500 to-gray-800 opacity-70"></div>
      <div className="relative max-w-xl mx-auto p-8 mt-20 bg-white bg-opacity-90 rounded-xl shadow-lg z-10">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-12">
          <strong className="text-blue-500">My Profile Form</strong>
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block mb-2 text-md font-medium text-gray-900">Name:</label>
            <input type="text" id="name" name="name" value={profileData.name} onChange={handleInputChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Your Name" />
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-900">Skills:</h3>
            <div className="flex flex-wrap gap-2">
              {profileData.skills.map((skill, index) => (
                <span key={index} className="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">{skill}</span>
              ))}
              <input type="text" value={newSkill} onChange={(e) => setNewSkill(e.target.value)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Add new skill" />
              <button type="button" onClick={addSkill} className="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Add</button>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-900">Interests:</h3>
            <div className="flex flex-wrap gap-2">
              {profileData.interests.map((interest, index) => (
                <span key={index} className="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">{interest}</span>
              ))}
              <input type="text" value={newInterest} onChange={(e) => setNewInterest(e.target.value)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Add new interest" />
              <button type="button" onClick={addInterest} className="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Add</button>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-900">Work Experience:</h3>
            {profileData.workExperience.map((experience, index) => (
              <div key={index} className="mb-5">
                <p className="text-gray-700"><strong>Title:</strong> {experience.title}</p>
                <p className="text-gray-700"><strong>Company:</strong> {experience.company}</p>
                <p className="text-gray-700"><strong>Duration:</strong> {experience.duration}</p>
                <p className="text-gray-700"><strong>Description:</strong> {experience.description}</p>
              </div>
            ))}
            <div>
              <label htmlFor="experienceTitle" className="block mb-2 text-md font-medium text-gray-900">Title:</label>
              <input type="text" id="experienceTitle" name="title" value={newExperience.title} onChange={handleExperienceChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
              <label htmlFor="experienceCompany" className="block mb-2 text-md font-medium text-gray-900">Company:</label>
              <input type="text" id="experienceCompany" name="company" value={newExperience.company} onChange={handleExperienceChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
              <label htmlFor="experienceDuration" className="block mb-2 text-md font-medium text-gray-900">Duration:</label>
              <input type="text" id="experienceDuration" name="duration" value={newExperience.duration} onChange={handleExperienceChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
              <label htmlFor="experienceDescription" className="block mb-2 text-md font-medium text-gray-900">Description:</label>
              <textarea id="experienceDescription" name="description" value={newExperience.description} onChange={handleExperienceChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" rows="3"></textarea>
              <button type="button" onClick={addExperience} className="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 mt-4">Add Experience</button>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-900">Education:</h3>
            {profileData.education.map((education, index) => (
              <div key={index} className="mb-5">
                <p className="text-gray-700"><strong>Degree:</strong> {education.degree}</p>
                <p className="text-gray-700"><strong>Institution:</strong> {education.institution}</p>
                <p className="text-gray-700"><strong>Year:</strong> {education.year}</p>
              </div>
            ))}
            <div>
              <label htmlFor="educationDegree" className="block mb-2 text-md font-medium text-gray-900">Degree:</label>
              <input type="text" id="educationDegree" name="degree" value={newEducation.degree} onChange={handleEducationChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
              <label htmlFor="educationInstitution" className="block mb-2 text-md font-medium text-gray-900">Institution:</label>
              <input type="text" id="educationInstitution" name="institution" value={newEducation.institution} onChange={handleEducationChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
              <label htmlFor="educationYear" className="block mb-2 text-md font-medium text-gray-900">Year:</label>
              <input type="number" id="educationYear" name="year" value={newEducation.year} onChange={handleEducationChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
              <button type="button" onClick={addEducation} className="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 mt-4">Add Education</button>
            </div>
          </div>

          <button type="submit" className="py-3 px-5 text-md font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default ProfileForm;



//code 3:question carousel
// import React, { useState } from 'react';

// function ProfileForm({ onSubmit }) {
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [profileData, setProfileData] = useState({
//     name: '',
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

//   const questions = [
//     {
//       title: 'Personal Information',
//       content: (
//         <div>
//           <label htmlFor="name" className="block mb-2 text-md font-medium text-gray-900">Name:</label>
//           <input type="text" id="name" name="name" value={profileData.name} onChange={handleInputChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Your Name" />
//         </div>
//       )
//     },
//     {
//       title: 'Skills',
//       content: (
//         <div>
//           <h3 className="text-2xl font-semibold mb-4 text-gray-900">Skills:</h3>
//           <div className="flex flex-wrap gap-2">
//             {profileData.skills.map((skill, index) => (
//               <span key={index} className="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">{skill}</span>
//             ))}
//             <input type="text" value={newSkill} onChange={(e) => setNewSkill(e.target.value)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Add new skill" />
//             <button type="button" onClick={addSkill} className="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Add</button>
//           </div>
//         </div>
//       )
//     },
//     {
//       title: 'Interests',
//       content: (
//         <div>
//           <h3 className="text-2xl font-semibold mb-4 text-gray-900">Interests:</h3>
//           <div className="flex flex-wrap gap-2">
//             {profileData.interests.map((interest, index) => (
//               <span key={index} className="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded">{interest}</span>
//             ))}
//             <input type="text" value={newInterest} onChange={(e) => setNewInterest(e.target.value)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Add new interest" />
//             <button type="button" onClick={addInterest} className="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Add</button>
//           </div>
//         </div>
//       )
//     },
//     {
//       title: 'Work Experience',
//       content: (
//         <div>
//           <h3 className="text-2xl font-semibold mb-4 text-gray-900">Work Experience:</h3>
//           <div>
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
//         </div>
//       )
//     },
//     {
//       title: 'Education',
//       content: (
//         <div>
//           <h3 className="text-2xl font-semibold mb-4 text-gray-900">Education:</h3>
//           <div>
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
//         </div>
//       )
//     }
//   ];

//   const totalQuestions = questions.length;

//   const handleNext = () => {
//     setCurrentQuestion((prevQuestion) => Math.min(prevQuestion + 1, totalQuestions - 1));
//   };

//   const handlePrevious = () => {
//     setCurrentQuestion((prevQuestion) => Math.max(prevQuestion - 1, 0));
//   };

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

//   const isFirstQuestion = currentQuestion === 0;
//   const isLastQuestion = currentQuestion === totalQuestions - 1;

//   return (
//     <div className="max-w-3xl mx-auto p-8 mt-10 bg-white bg-opacity-90 rounded-xl shadow-lg">
//       <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-12">
//         My Profile Form
//       </h1>

//       <div className="mb-8">
//         <h2 className="text-2xl font-semibold mb-4 text-gray-900">{questions[currentQuestion].title}</h2>
//         <div>{questions[currentQuestion].content}</div>
//       </div>

//       <div className="flex justify-between">
//         <button
//           onClick={handlePrevious}
//           disabled={isFirstQuestion}
//           className={`py-3 px-5 text-md font-medium rounded-lg ${
//             isFirstQuestion ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-700 hover:bg-blue-800 text-white'
//           }`}
//         >
//           Previous
//         </button>

//         {isLastQuestion ? (
//           <button
//             onClick={handleSubmit}
//             className="py-3 px-5 text-md font-medium text-center text-white rounded-lg bg-green-700 hover:bg-green-800"
//           >
//             Submit
//           </button>
//         ) : (
//           <button
//             onClick={handleNext}
//             className="py-3 px-5 text-md font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800"
//           >
//             Next
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ProfileForm;


