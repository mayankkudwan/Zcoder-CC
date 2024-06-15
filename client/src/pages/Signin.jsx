import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Heading } from '../components/Heading';
import { SubHeading } from '../components/SubHeading';
import { InputBox } from '../components/InputBox';
import { Button } from '../components/Button';

export const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignin = async () => {
    try {
      const response = await axios.post('/api/v1/auth/signin', {
        email,
        password,
      });
      localStorage.setItem('token', response.data.token);
      navigate('/homepage');
    } catch (error) {
      console.error('Signin failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <Heading label="Sign In" />
        <SubHeading label="Access your account" />
        <InputBox label="Email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
        <InputBox label="Password" placeholder="Enter password" type="password" onChange={(e) => setPassword(e.target.value)} />
        <Button label="Sign In" onClick={handleSignin} />
      </div>
    </div>
  );
};
