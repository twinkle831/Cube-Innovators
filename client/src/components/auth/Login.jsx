import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }
    // Here you would typically call an API to handle the login
    console.log('Login attempt:', { email, password });
    setError(null); // Clear error message
    onLogin(); // Call the onLogin callback
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
        <h2 className="text-3xl font-bold text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block mb-2 text-md font-medium text-gray-900">Email:</label>
            <input type="email" id="email" name="email" value={email} onChange={handleInputChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="your@email.com" />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-md font-medium text-gray-900">Password:</label>
            <input type="password" id="password" name="password" value={password} onChange={handleInputChange} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Your password" />
          </div>
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
          <button type="submit" className="py-3 px-5 text-md font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
