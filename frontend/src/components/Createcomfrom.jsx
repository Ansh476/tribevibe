import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

const Createcomform = () => {
  const [popupVisible, setPopupVisible] = useState(false);
  const navigate = useNavigate(); // for navigation

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange', // Validates on change to enable link only after all fields are filled
  });

  const onSubmit = (data) => {
    // Simulate form submission and show the popup
    setPopupVisible(true);
    setTimeout(() => {
      setPopupVisible(false);
      navigate('/dashboard'); // Redirect to the dashboard after 2 seconds
    }, 2000);
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

        {/* Age Group - moved above Date */}
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

        {/* Gender - new field added */}
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

        {/* Paid/Unpaid with gaps */}
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

        {/* Link instead of Button */}
        <div>
          {isValid ? (
            <Link
              to="/dashboard"
              className="w-full bg-blue-500 text-white py-3 rounded-lg cursor-pointer hover:bg-blue-600 text-center block"
              onClick={handleSubmit(onSubmit)}
            >
              Submit
            </Link>
          ) : (
            <span className="w-full bg-gray-500 text-white py-3 rounded-lg text-center block cursor-not-allowed">
              Submit
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

export default Createcomform;
