import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from './authentication/Authcontext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        email: data.input,
        password: data.password
      });

      const { token, userId } = response.data; 
      login(userId, token); 
      navigate('/dashboard'); 
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed. Please check your credentials.';
      alert(errorMessage);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-10 rounded-lg shadow-lg w-full max-w-lg">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Phone number, username or email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            {...register('input', {
              required: 'This field is required',
              validate: (value) => {
                const emailPattern = /^\S+@\S+\.\S+$/;
                const phonePattern = /^[1-9][0-9]{9}$/;
                if (value.includes('@')) {
                  return emailPattern.test(value) || 'Enter a valid email';
                } else if (!isNaN(value)) {
                  return phonePattern.test(value) || 'Phone number must be 10 digits';
                } else {
                  return value.length >= 8 && value.length <= 20 || 'Username must be 8-20 characters';
                }
              }
            })}
          />
          {errors.input && <p className="text-red-500 text-sm mt-1">{errors.input.message}</p>}
        </div>

        <div className="mb-6">
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <div>
          <input type="submit" value="Login" className="w-full bg-blue-500 text-white py-3 rounded-lg cursor-pointer hover:bg-blue-600" />
        </div>
      </form>
    </div>
  );
};

export default Login;
