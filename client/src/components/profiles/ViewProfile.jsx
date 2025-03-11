// import React from 'react';

// function ProfileView({ profileData }) {
//   return (
//     <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
//       <h1 className="text-3xl font-bold text-center text-yellow-500 mb-6">Profile Details</h1>

//       <div className="mb-4">
//         <h2 className="text-xl font-semibold text-gray-800">Name:</h2>
//         <p className="text-gray-600">{profileData.name || 'Not Provided'}</p>
//       </div>

//       <div className="mb-4">
//         <h2 className="text-xl font-semibold text-gray-800">Skills:</h2>
//         {profileData.skills.length > 0 ? (
//           <ul className="list-disc list-inside text-gray-600">
//             {profileData.skills.map((skill, index) => (
//               <li key={index}>{skill}</li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-gray-600">No skills added</p>
//         )}
//       </div>

//       <div className="mb-4">
//         <h2 className="text-xl font-semibold text-gray-800">Interests:</h2>
//         {profileData.interests.length > 0 ? (
//           <ul className="list-disc list-inside text-gray-600">
//             {profileData.interests.map((interest, index) => (
//               <li key={index}>{interest}</li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-gray-600">No interests added</p>
//         )}
//       </div>

//       <div className="mb-4">
//         <h2 className="text-xl font-semibold text-gray-800">Work Experience:</h2>
//         {profileData.workExperience.length > 0 ? (
//           profileData.workExperience.map((experience, index) => (
//             <div key={index} className="border p-4 rounded-md mb-2 bg-gray-50">
//               <p><strong>Title:</strong> {experience.title}</p>
//               <p><strong>Company:</strong> {experience.company}</p>
//               <p><strong>Duration:</strong> {experience.duration}</p>
//               <p><strong>Description:</strong> {experience.description}</p>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-600">No work experience added</p>
//         )}
//       </div>

//       <div className="mb-4">
//         <h2 className="text-xl font-semibold text-gray-800">Education:</h2>
//         {profileData.education.length > 0 ? (
//           profileData.education.map((edu, index) => (
//             <div key={index} className="border p-4 rounded-md mb-2 bg-gray-50">
//               <p><strong>Degree:</strong> {edu.degree}</p>
//               <p><strong>Institution:</strong> {edu.institution}</p>
//               <p><strong>Year:</strong> {edu.year}</p>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-600">No education details added</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ProfileView;

//code2
// import React, { useState } from 'react';

// function ProfileView({ profileData }) {
//   const [backgroundImage, setBackgroundImage] = useState('');
//   const [useLightBackground, setUseLightBackground] = useState(true);

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setBackgroundImage(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div
//       className={`max-w-lg mx-auto mt-10 p-6 rounded-lg shadow-md ${
//         useLightBackground
//           ? 'bg-gray-100'
//           : backgroundImage
//           ? 'bg-cover bg-center'
//           : 'bg-white'
//       }`}
//       style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : null }}
//     >
//       <h1 className="text-3xl font-bold text-center text-blue-500 mb-6">Profile Details</h1>

//       <div className="mb-4">
//         <label htmlFor="backgroundImageUpload" className="block text-sm font-medium text-gray-700">
//           Upload Background Image:
//         </label>
//         <input
//           type="file"
//           id="backgroundImageUpload"
//           onChange={handleImageUpload}
//           accept="image/*"
//           className="mt-1 p-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//         />
//       </div>

//       {/* <div className="mb-4">
//         <label className="inline-flex items-center">
//           <input
//             type="checkbox"
//             className="form-checkbox h-5 w-5 text-indigo-600"
//             checked={useLightBackground}
//             onChange={() => setUseLightBackground(!useLightBackground)}
//           />
//           <span className="ml-2 text-gray-700">Use Light Background</span>
//         </label>
//       </div> */}

//       <div className="mb-4">
//         <h2 className="text-xl font-semibold text-gray-800">Name:</h2>
//         <p className="text-gray-600">{profileData.name || 'Not Provided'}</p>
//       </div>

//       <div className="mb-4">
//         <h2 className="text-xl font-semibold text-gray-800">Skills:</h2>
//         {profileData.skills.length > 0 ? (
//           <ul className="list-disc list-inside text-gray-600">
//             {profileData.skills.map((skill, index) => (
//               <li key={index}>{skill}</li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-gray-600">No skills added</p>
//         )}
//       </div>

//       <div className="mb-4">
//         <h2 className="text-xl font-semibold text-gray-800">Interests:</h2>
//         {profileData.interests.length > 0 ? (
//           <ul className="list-disc list-inside text-gray-600">
//             {profileData.interests.map((interest, index) => (
//               <li key={index}>{interest}</li>
//             ))}
//           </ul>
//         ) : (
//           <p className="text-gray-600">No interests added</p>
//         )}
//       </div>

//       <div className="mb-4">
//         <h2 className="text-xl font-semibold text-gray-800">Work Experience:</h2>
//         {profileData.workExperience.length > 0 ? (
//           profileData.workExperience.map((experience, index) => (
//             <div key={index} className="border p-4 rounded-md mb-2 bg-gray-50">
//               <p><strong>Title:</strong> {experience.title}</p>
//               <p><strong>Company:</strong> {experience.company}</p>
//               <p><strong>Duration:</strong> {experience.duration}</p>
//               <p><strong>Description:</strong> {experience.description}</p>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-600">No work experience added</p>
//         )}
//       </div>

//       <div className="mb-4">
//         <h2 className="text-xl font-semibold text-gray-800">Education:</h2>
//         {profileData.education.length > 0 ? (
//           profileData.education.map((edu, index) => (
//             <div key={index} className="border p-4 rounded-md mb-2 bg-gray-50">
//               <p><strong>Degree:</strong> {edu.degree}</p>
//               <p><strong>Institution:</strong> {edu.institution}</p>
//               <p><strong>Year:</strong> {edu.year}</p>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-600">No education details added</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default ProfileView;




import React from 'react';

function ProfileView({ profileData }) {
  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center text-blue-500 mb-6">Profile Details</h1>

      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Name:</h2>
        <p className="text-gray-600">{profileData.name || 'Not Provided'}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Skills:</h2>
        {profileData.skills.length > 0 ? (
          <ul className="list-disc list-inside text-gray-600">
            {profileData.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No skills added</p>
        )}
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Interests:</h2>
        {profileData.interests.length > 0 ? (
          <ul className="list-disc list-inside text-gray-600">
            {profileData.interests.map((interest, index) => (
              <li key={index}>{interest}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No interests added</p>
        )}
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Work Experience:</h2>
        {profileData.workExperience.length > 0 ? (
          profileData.workExperience.map((experience, index) => (
            <div key={index} className="border p-4 rounded-md mb-2 bg-gray-50">
              <p><strong>Title:</strong> {experience.title}</p>
              <p><strong>Company:</strong> {experience.company}</p>
              <p><strong>Duration:</strong> {experience.duration}</p>
              <p><strong>Description:</strong> {experience.description}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No work experience added</p>
        )}
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Education:</h2>
        {profileData.education.length > 0 ? (
          profileData.education.map((edu, index) => (
            <div key={index} className="border p-4 rounded-md mb-2 bg-gray-50">
              <p><strong>Degree:</strong> {edu.degree}</p>
              <p><strong>Institution:</strong> {edu.institution}</p>
              <p><strong>Year:</strong> {edu.year}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No education details added</p>
        )}
      </div>
    </div>
  );
}

export default ProfileView;
