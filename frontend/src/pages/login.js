import React, { useState } from 'react';
import axios from 'axios';
import MainLayout from '../layouts/MainLayout';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // <-- Loading state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/token/', {
        email,
        password,
      });

      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
      navigate('/home');
    } catch (error) {
      alert('Login failed: ' + (error.response?.data?.detail || 'Server error'));
    } finally {
      setLoading(false); // Stop loading regardless of success or error
    }
  };

  return (
    <MainLayout>
      <div className='bg-white h-2/5 p-6 rounded-lg border border-blue-200 shadow shadow-blue-500 hover:border-blue-500 max-w-md mx-auto mt-20'>
        <h1 className='text-black text-center text-[2rem] font-medium mb-5'>Login</h1>

        <form onSubmit={handleLogin} className='text-center flex flex-col gap-4'>
          <div>
            <label>Email:</label><br />
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='w-full p-2 border rounded-md'
              disabled={loading}
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
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            className={`mr-15 ml-15 text-white px-4 py-2 rounded-md mt-4 ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
            }`}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </MainLayout>
  );
};

export default Login;
