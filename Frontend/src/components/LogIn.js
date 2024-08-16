import React, { useState } from 'react';
import block from '../assets/blockchain.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:5000/api/login',
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      console.log('User saved:', response.data);
    } catch (err) {
      console.error('Error saving user:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-sm">
        <div className="mb-4">
          <img src={block} alt="BlockBuy" className="h-12 mx-auto" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-6">Sign-In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email or mobile phone number
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sign-In
          </button>
        </form>
        <p className="mt-4 text-xs text-gray-600 text-center">
          By continuing, you agree to BlockBuy's Conditions of Use and Privacy
          Notice.
        </p>
        <div className="flex justify-between items-center mt-6">
          <a href="#" className="text-xs text-blue-600 hover:underline">
            Need help?
          </a>
        </div>
      </div>
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">New to BlockBuy?</p>
        <button
          onClick={() => {
            navigate('/signup');
          }}
          className="mt-2 inline-block bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create your BlockBuy account
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
