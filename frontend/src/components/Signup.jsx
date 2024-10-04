import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { useForm, Controller } from 'react-hook-form';
import { fetchCities } from '../geoApi'; // Ensure geoApi.js is created and this path is correct
import { Link } from 'react-router-dom';

const interestOptions = [
  { value: 'Sports', label: 'Sports' },
  { value: 'Music', label: 'Music' },
  { value: 'Technology', label: 'Technology' },
  { value: 'Travel', label: 'Travel' },
  // Add more interests as needed
];

const Signup = () => {
  const { register, handleSubmit, control, formState: { errors } } = useForm();
  const [cities, setCities] = useState([]);
  const [termsAccepted, setTermsAccepted] = useState(false);

  useEffect(() => {
    const getCities = async () => {
      const citiesList = await fetchCities();
      setCities(citiesList);
    };

    getCities();
  }, []);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('fullName', data.fullName);
    if (data.profilePicture[0]) {
      formData.append('profilePicture', data.profilePicture[0]);
    }
    formData.append('location', data.location ? data.location.value : '');
    formData.append('interests', JSON.stringify(data.interests.map(i => i.value)));

    try {
      await axios.post('http://localhost:5000/api/signup', formData); // Adjust the URL as needed
      alert('Signup successful! Please check your email for verification.');
    } catch (error) {
      alert('Signup failed. Please try again.');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg mt-20">
      <h1 className="text-3xl font-bold mb-6 text-center">Welcome to Tribevibe, Signup</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="form-group">
          <label className="block text-gray-700 font-bold mb-2">Username</label>
          <input
            type="text"
            {...register('username', { required: 'Username is required' })}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
        </div>
        <div className="form-group">
          <label className="block text-gray-700 font-bold mb-2">Email Address</label>
          <input
            type="email"
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Entered value does not match email format'
              }
            })}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>
        <div className="form-group">
          <label className="block text-gray-700 font-bold mb-2">Password</label>
          <input
            type="password"
            {...register('password', { required: 'Password is required' })}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>
        <div className="form-group">
          <label className="block text-gray-700 font-bold mb-2">Full Name</label>
          <input
            type="text"
            {...register('fullName', { required: 'Full name is required' })}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
        </div>
        <div className="form-group">
          <label className="block text-gray-700 font-bold mb-2">Profile Picture</label>
          <input
            type="file"
            {...register('profilePicture')}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="form-group">
          <label className="block text-gray-700 font-bold mb-2">Location</label>
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={cities}
                className="w-full"
                classNamePrefix="select"
              />
            )}
          />
        </div>
        <div className="form-group">
          <label className="block text-gray-700 font-bold mb-2">Interests</label>
          <Controller
            name="interests"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={interestOptions}
                isMulti
                className="w-full"
                classNamePrefix="select"
              />
            )}
          />
        </div>
        <div className="form-group flex items-center">
          <input
            type="checkbox"
            {...register('termsAccepted', { required: 'You must accept the terms' })}
            className="mr-2"
          />
          <label className="text-gray-700">I accept the terms of service</label>
          {errors.termsAccepted && <p className="text-red-500 text-sm mt-1">{errors.termsAccepted.message}</p>}
        </div>
        <Link type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300" to='/managecom'>
          Signup
        </Link>
      </form>
    </div>
  );
};

export default Signup;