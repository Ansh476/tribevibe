import React, { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "./authentication/Authcontext"; 

const CreateComForm = () => {
  const { userId: contextUserId } = useContext(AuthContext); 
  const [userId, setUserId] = useState(contextUserId || localStorage.getItem('userId'));
  const [popupVisible, setPopupVisible] = useState(false);
  const [tags, setTags] = useState(''); 
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: 'onChange' });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('image', data.image[0]);

      const response = await axios.post('http://localhost:5000/api/community/upload', formData);
      const imageUrl = response.data.url;

      const completeFormData = {
        title: data.title,
        description: data.description,
        location: data.location,
        agegrp: data.ageGroup,
        date: data.date,
        time: data.time,
        gender: data.gender,
        membercount: data.members,
        moneystatus: data.payment,
        imageurl: String(imageUrl),
        creator: userId,
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''), // Split tags into an array and filter out empty tags
      };

      console.log(completeFormData);
      await axios.post('http://localhost:5000/api/community/create', completeFormData);

      setPopupVisible(true);
      setTimeout(() => {
        setPopupVisible(false);
        navigate('/dashboard');
      }, 2000);

    } catch (error) {
      console.error('Error during submission:', error);
      alert('There was an error uploading the form.');
    }
  };

  // Handle case when userId changes in AuthContext
  useEffect(() => {
    if (contextUserId) {
      setUserId(contextUserId);
      localStorage.setItem('userId', contextUserId); // Sync with local storage
    }
  }, [contextUserId]);

  return (
    <div className="h-auto bg-gradient-to-r from-primary to-secondary flex items-center justify-center py-10 mt-10">
      {popupVisible && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p>Community created successfully!</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-10 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Your Community!</h2>

        {/* Title */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Title"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            {...register('title', { required: 'Title is required' })}
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>

        {/* Description */}
        <div className="mb-6">
          <textarea
            placeholder="Description"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            {...register('description', { required: 'Description is required' })}
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
        </div>

        {/* Location */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Location"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            {...register('location', { required: 'Location is required' })}
          />
          {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
        </div>

        {/* Tags */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Enter tags separated by commas"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            value={tags}
            onChange={(e) => setTags(e.target.value)} // Update the tags state on change
          />
          {tags === '' && <p className="text-red-500 text-sm mt-1">Tags are required</p>} {/* Error handling for tags */}
        </div>

        {/* Age Group */}
        <div className="mb-6">
          <div className="mt-2">
            <label className="mr-4">
              <input type="radio" value="Above 18" {...register('ageGroup', { required: 'Select Age Group' })} /> Above 18
            </label>
            <label>
              <input type="radio" value="Open for All" {...register('ageGroup', { required: 'Select Age Group' })} /> Open for All
            </label>
          </div>
          {errors.ageGroup && <p className="text-red-500 text-sm mt-1">{errors.ageGroup.message}</p>}
        </div>

        {/* Date */}
        <div className="mb-6">
          <input
            type="date"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            {...register('date', { required: 'Date is required' })}
          />
          {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
        </div>

        {/* Time */}
        <div className="mb-6">
          <input
            type="time"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            {...register('time', { required: 'Time is required' })}
          />
          {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time.message}</p>}
        </div>

        {/* Gender */}
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
          {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>}
        </div>

        {/* Members Count */}
        <div className="mb-6">
          <input
            type="number"
            placeholder="Number of Members"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            {...register('members', { required: 'Number of members is required' })}
          />
          {errors.members && <p className="text-red-500 text-sm mt-1">{errors.members.message}</p>}
        </div>

        {/* Payment Status */}
        <div className="mb-6">
          <div className="mt-2">
            <label className="mr-4">
              <input type="radio" value="Paid" {...register('payment', { required: 'Select Payment Status' })} /> Paid
            </label>
            <label>
              <input type="radio" value="Unpaid" {...register('payment', { required: 'Select Payment Status' })} /> Unpaid
            </label>
          </div>
          {errors.payment && <p className="text-red-500 text-sm mt-1">{errors.payment.message}</p>}
        </div>

        {/* Image Upload */}
        <div className="mb-6">
          <input
            type="file"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            {...register('image', { required: 'Image is required' })}
          />
          {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700"
          disabled={!isValid}
        >
          Create Community
        </button>
      </form>
    </div>
  );
};

export default CreateComForm;
