import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from "./authentication/Authcontext"; 
// import Community from '../../../backend/models/community';

const EditDetails = ({ community }) => {
  
  const { userId: contextUserId } = useContext(AuthContext);
  const [userId, setUserId] = useState(contextUserId || localStorage.getItem('userId'));
  const [popupVisible, setPopupVisible] = useState(false);
  const navigate = useNavigate();
  
  const { register, handleSubmit, setValue, formState: { errors, isValid } } = useForm({ mode: 'onChange' });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`; // Format as yyyy-MM-dd
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/community/${community._id}`);
        const data = response.data;

        setValue('title', community.title);
        setValue('description', community.description);
        setValue('location', community.location);
        setValue('ageGroup', community.agegrp);
        setValue('date', formatDate(community.date));
        setValue('time', community.time);
        setValue('gender', community.gender);
        setValue('members', community.membercount);
        setValue('payment', community.moneystatus);
        setValue('approval', community.approval);
        setValue('tags', community.tags.length > 0 ? community.tags.join(', ') : ''); 

      } catch (error) {
        console.error('Error fetching data:', error);
        // alert('There was an error fetching the data.');
      }
    };

    fetchData();
  }, [community._id, setValue]);

  const onSubmit = async (data) => {
    try {
      const completeFormData = {
        title: data.title,
        description: data.description,
        location: data.location,
        agegrp: data.ageGroup,
        date: community.date,
        time: data.time,
        gender: data.gender,
        membercount: data.members,
        moneystatus: data.payment,
        approval: data.approval,
        tags: data.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''), 
        members: community.members,
        creator: community.creator._id,
        imageurl: community.imageurl,
      };

     await axios.put(`http://localhost:5000/api/community/${community._id}`, completeFormData);

      setPopupVisible(true);
      setTimeout(() => {
        setPopupVisible(false);
        navigate('/created');
      }, 2000);

    } catch (error) {
      console.error('Error during submission:', error);
      alert('There was an error updating the details.');
    }
  };

  return (
    <div className="h-auto bg-gradient-to-r from-primary to-secondary flex items-center justify-center py-10 mt-10">
      {popupVisible && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p>Community details updated successfully!</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-10 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Community Details</h2>

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
            {...register('tags', { required: 'Tags are required' })}
          />
          {errors.tags && <p className="text-red-500 text-sm mt-1">{errors.tags.message}</p>}
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

        <div className="mb-6">
          <div className="mt-2">
            <label className="mr-4">
              <input type="radio" value="Open Community" {...register('approval', { required: 'Community Type' })} /> Open Community
            </label>
            <label className="mr-4">
              <input type="radio" value="Approved Only" {...register('approval', { required: 'Community Type' })} /> Approved Only
            </label>
          </div>
          {errors.approval && <p className="text-red-500 text-sm mt-1">{errors.approval.message}</p>}
        </div>

        {/* Image Upload */}
        <div className="mb-6">
          <input
            type="file"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            {...register('image')} // Assuming you want to allow image upload during edit
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700"
          disabled={!isValid}
        >
          Update Community
        </button>
      </form>
    </div>
  );
};

export default EditDetails;
