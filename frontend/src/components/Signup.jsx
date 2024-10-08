import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { useForm, Controller } from 'react-hook-form';
// import { CITIESDATA } from '../utils/constants';  
import { useNavigate } from 'react-router-dom';
import Avatar from 'react-avatar';

const interestOptions = [
  { value: 'Sports', label: 'Sports' },
  { value: 'Music', label: 'Music' },
  { value: 'Technology', label: 'Technology' },
  { value: 'Travel', label: 'Travel' },
];

const Signup = () => {
  const { register, handleSubmit, control, formState: { errors } } = useForm();
  const [cities, setCities] = useState([]);  
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // const getCities = () => {
    //   const formattedCities = CITIESDATA.map(state => 
    //     state.cities.map(city => ({
    //       label: `${city.name}, ${state.name}`,
    //       value: city.name
    //     }))
    //   ).flat();
    //   setCities(formattedCities);
    // };

    // getCities();
  }, []);

  const onSubmit = async (data) => {

    const formData = {
      username: data.username,
      email: data.email,
      password: data.password,
      fullname: data.fullName,
      Phone: data.phone,  
      location: data.location ? data.location.value : '',
    };

    try {
      const response = await axios.post('http://localhost:5000/api/users/signup', formData);
      alert('Signup successful! OTP sent to your email.');
      setEmail(data.email);
      setToken(response.data.token);
      setOtpSent(true);
    } catch (error) {
      alert('Signup failed. Please try again.');
    }
  };

  const handleOtpVerification = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/verify-otp', { email, otp });
      alert('OTP verified! Logging you in...');
      localStorage.setItem('token', token);
      navigate('/');
    } catch (error) {
      alert('OTP verification failed. Please try again.');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg mt-20">
      <h1 className="text-3xl font-bold mb-6 text-center">Welcome to Tribevibe, Signup</h1>

      {!otpSent ? (
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
            <label className="block text-gray-700 font-bold mb-2">Phone Number</label>
            <input
              type="text"
              {...register('phone', { required: 'Phone number is required' })}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
          </div>

          <div className="form-group">
            <label className="block text-gray-700 font-bold mb-2">Location</label>
            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={[
                    { value: 'mumbai', label: 'Mumbai' },
                    { value: 'delhi', label: 'Delhi' }
                  ]}  // Corrected format
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
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300">
            Signup
          </button>
        </form>
      ) : (
        <div>
          <h2 className="text-xl font-bold mb-4">Enter OTP</h2>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter OTP"
          />
          <button onClick={handleOtpVerification} className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300 mt-4">
            Verify OTP
          </button>
        </div>
      )}
    </div>
  );
};

export default Signup;
