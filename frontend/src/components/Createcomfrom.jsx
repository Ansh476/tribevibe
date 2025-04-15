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
  const [loadingTags, setLoadingTags] = useState(false);
  const [tagError, setTagError] = useState('');

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = async (data) => {
    try {
      if (!tags.trim()) {
        setTagError('Tags are required');
        return;
      }

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
        approval: data.approval,
        imageurl: String(imageUrl),
        creator: userId,
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
      };

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

  useEffect(() => {
    if (contextUserId) {
      setUserId(contextUserId);
      localStorage.setItem('userId', contextUserId);
    }
  }, [contextUserId]);

  const suggestTagsFromGemini = async () => {
    const title = watch('title') || '';
    const description = watch('description') || '';

    if (!title && !description) {
      setTagError('Please enter a title or description first');
      return;
    }

    setTagError('');
    setLoadingTags(true);

    try {
      console.log('Sending tag suggestion request with:', { title, description });

      const res = await axios.post('http://localhost:5000/api/gemini/suggest-tags', {
        title,
        description,
      });

      console.log('Tag suggestion response:', res.data);

      if (res.data?.tags?.length) {
        setTags(res.data.tags.join(', '));
      } else {
        setTagError("No tags were generated. Try adding more details to your title and description.");
      }
    } catch (err) {
      console.error("Error suggesting tags:", err.response?.data || err.message);
      setTagError('Failed to generate tags. Please try again or enter tags manually.');
    } finally {
      setLoadingTags(false);
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
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-10 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Your Community!</h2>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Title"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            {...register('title', { required: 'Title is required' })}
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
        </div>

        <div className="mb-6">
          <textarea
            placeholder="Description"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            {...register('description', { required: 'Description is required' })}
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Location"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            {...register('location', { required: 'Location is required' })}
          />
          {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
        </div>

        {/* Tags with Suggest Button */}
        <div className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter tags separated by commas"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              value={tags}
              onChange={(e) => {
                setTags(e.target.value);
                if (e.target.value.trim()) setTagError('');
              }}
            />
            <button
              type="button"
              onClick={suggestTagsFromGemini}
              className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
              disabled={loadingTags || (!watch('title') && !watch('description'))}
            >
              {loadingTags ? "Loading..." : "Suggest"}
            </button>
          </div>
          {(tags === '' || tagError) && (
            <p className="text-red-500 text-sm mt-1">{tagError || "Tags are required"}</p>
          )}
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Age Group"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            {...register('ageGroup')}
          />
        </div>

        <div className="mb-6">
          <input
            type="date"
            placeholder="Date"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            {...register('date')}
          />
        </div>

        <div className="mb-6">
          <input
            type="time"
            placeholder="Time"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            {...register('time')}
          />
        </div>

        <div className="mb-6">
          <select
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            {...register('gender')}
          >
            <option value="">Select Gender</option>
            <option value="Any">Any</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div className="mb-6">
          <input
            type="number"
            placeholder="Members"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            {...register('members')}
          />
        </div>

        <div className="mb-6">
          <select
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            {...register('payment')}
          >
            <option value="">Payment Status</option>
            <option value="Free">Free</option>
            <option value="Paid">Paid</option>
          </select>
        </div>

        <div className="mb-6">
          <select
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            {...register('approval')}
          >
            <option value="">Approval</option>
            <option value="Approved">Approved</option>
            <option value="Unapproved">Unapproved</option>
          </select>
        </div>

        <div className="mb-6">
          <input
            type="file"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            {...register('image')}
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
          disabled={!isValid || !tags.trim()}
        >
          Create Community
        </button>
      </form>
    </div>
  );
};

export default CreateComForm;
