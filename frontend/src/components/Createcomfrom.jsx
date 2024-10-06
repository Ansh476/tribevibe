import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Createcomform = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const navigate = useNavigate(); // for navigation

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange', 
  });

  const onSubmit = async (data) => {
    try {
      console.log("Submit process started!!");
      const formData = new FormData();
      formData.append('image', data.image[0]); 
      // Add community fields to the formData
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('location', data.location);
      formData.append('ageGroup', data.ageGroup);
      formData.append('date', data.date);
      formData.append('time', data.time);
      formData.append('gender', data.gender);
      formData.append('members', data.members);
      formData.append('payment', data.payment);

      const response = await axios.post('http://localhost:5000/api/users/upload', formData); 

      console.log('Image uploaded successfully:', response.data.secure_url);
      setPopupVisible(true);
      setTimeout(() => {
        setPopupVisible(false);
        navigate('/dashboard'); 
      }, 2000);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div className="h-auto bg-gradient-to-r from-primary to-secondary flex items-center justify-center py-10 mt-10">
      {popupVisible && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p>Community created successfully!</p>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-10 rounded-lg shadow-lg w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Create Your Community!</h2>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Title"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            {...register('title', { required: 'Title is required' })}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div className="mb-6">
          <textarea
            placeholder="Description"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            {...register('description', { required: 'Description is required' })}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Location"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            {...register('location', { required: 'Location is required' })}
          />
          {errors.location && (
            <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
          )}
        </div>

        <div className="mb-6">
          <div className="mt-2">
            <label className="mr-4">
              <input type="radio" value=">18" {...register('ageGroup', { required: 'Select Age Group' })} /> Above 18
            </label>
            <label>
              <input type="radio" value="Open for All" {...register('ageGroup', { required: 'Select Age Group' })} /> Open for All
            </label>
          </div>
          {errors.ageGroup && (
            <p className="text-red-500 text-sm mt-1">{errors.ageGroup.message}</p>
          )}
        </div>

        <div className="mb-6">
          <input
            type="date"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            {...register('date', { required: 'Date is required' })}
          />
          {errors.date && (
            <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
          )}
        </div>

        <div className="mb-6">
          <input
            type="time"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            {...register('time', { required: 'Time is required' })}
          />
          {errors.time && (
            <p className="text-red-500 text-sm mt-1">{errors.time.message}</p>
          )}
        </div>

        <div className="mb-6">
          <div className="mt-2">
            <label className="mr-4">
              <input type="radio" value="Male" {...register('gender', { required: 'Select Gender' })} /> Male
            </label>
            <label className="mr-4">
              <input type="radio" value="Female" {...register('gender', { required: 'Select Gender' })} /> Female
            </label>
            <label className="mr-4">
              <input type="radio" value="Other" {...register('gender', { required: 'Select Gender' })} /> Other
            </label>
            <label>
              <input type="radio" value="All" {...register('gender', { required: 'Select Gender' })} /> All
            </label>
          </div>
          {errors.gender && (
            <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
          )}
        </div>

        <div className="mb-6">
          <input
            type="number"
            placeholder="Number of Members"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            {...register('members', { required: 'Number of members is required' })}
          />
          {errors.members && (
            <p className="text-red-500 text-sm mt-1">{errors.members.message}</p>
          )}
        </div>

        <div className="mb-6">
          <div className="mt-2">
            <label className="mr-4">
              <input type="radio" value="Paid" {...register('payment', { required: 'Select Paid or Unpaid' })} /> Paid
            </label>
            <label>
              <input type="radio" value="Unpaid" {...register('payment', { required: 'Select Paid or Unpaid' })} /> Unpaid
            </label>
          </div>
          {errors.payment && (
            <p className="text-red-500 text-sm mt-1">{errors.payment.message}</p>
          )}
        </div>

        <div className="mb-6">
          <input
            type="file"
            accept="image/*"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            {...register('image', { required: 'Image is required' })}
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
          )}
        </div>

        <div>
          <button
            type="submit"
            className={`w-full bg-blue-500 text-white py-3 rounded-lg cursor-pointer hover:bg-blue-600 text-center block ${!isValid ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!isValid}
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default Createcomform;
