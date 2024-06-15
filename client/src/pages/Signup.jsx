import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Heading } from '../components/Heading';
import { SubHeading } from '../components/SubHeading';
import { InputBox } from '../components/InputBox';
import { Button } from '../components/Button';

export const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await axios.post('/api/v1/auth/signup', {
        username,
        email,
        password,
      });
      localStorage.setItem('token', response.data.token);
      navigate('/signin');
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <Heading label="Sign Up" />
        <SubHeading label="Create your account" />
        <InputBox label="Username" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)} />
        <InputBox label="Email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
        <InputBox label="Password" placeholder="Enter password" type="password" onChange={(e) => setPassword(e.target.value)} />
        <Button label="Sign Up" onClick={handleSignup} />
      </div>
    </div>
  );
};
