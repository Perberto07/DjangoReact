import React, { useState } from 'react';
import axios from 'axios';
import MainLayout from '../layouts/MainLayout';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/token/', {
        username,
        password,
      });

      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;

      navigate('/dashboard'); // Redirect to a protected route
    } catch (error) {
      alert('Login failed: ' + error.response?.data?.detail || 'Server error');
    }
  };

  return (
    <MainLayout>
      <div className='bg-white h-2/5 p-6 rounded-lg border border-blue-200 shadow shadow-blue-500 hover:border-blue-500 max-w-md  mx-auto mt-20 '>

      <h1 className='text-black text-center text-[2rem] font-medium mb-5'>Login</h1>

      <form onSubmit={handleLogin}
            className='text-center flex flex-col gap-4'>
        <div>
          <label>Username:</label><br />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className='w-full p-2 border rounded-md'
          />
        </div>
        <div>
          <label>Password:</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
             className='w-full p-2 border rounded-md'
          />
        </div>
        <button type="submit" className='mr-15 ml-15 bg-blue-500  text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600'>
          Login
        </button>
      </form>
      </div>
    </MainLayout>
  );
};

export default Login;
