import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const MakeAnnouncements = () => {
  const { communityId } = useParams();
  const [popupVisible, setPopupVisible] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onChange' });

  const onSubmit = async (data) => {
    try {
      let imageUrl = '';
  
      // Check if an image file exists
      if (data.image && data.image.length > 0) {
        const formData = new FormData();
        formData.append('image', data.image[0]);
  
        const imageResponse = await axios.post('http://localhost:5000/api/community/upload', formData);
        imageUrl = imageResponse.data.url; // Get the URL from the response
        console.log('Image URL: ', imageUrl);
      }
  
      const announcementData = {
        message: data.message,
        imgfile: String(imageUrl), 
      };
  
      await axios.post(`http://localhost:5000/api/community/${communityId}/announcement`, announcementData);
  
      setPopupVisible(true);
      setTimeout(() => {
        setPopupVisible(false);
      }, 2000);
    } catch (error) {
      console.error('Error during submission:', error);
      alert('There was an error uploading the announcement.');
    }
  };

  return (
    <div className="w-[1058px] h-auto bg-white/25 rounded-[15px] shadow-lg p-6 relative">
      <div className="text-center text-black text-[32px] font-semibold font-['League Spartan'] leading-[50px] mb-6">
        Make Announcement
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <textarea
            placeholder="Write your announcement here..."
            className="w-full py-2 px-4 bg-[#dae4fb]/80 rounded-lg text-xl font-light text-[#393433] focus:outline-none focus:ring-2 focus:ring-[#0c87f2]"
            rows="4"
            {...register('message', { required: 'Announcement is required' })}
          />
          {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
        </div>

        <div className="mb-4">
          <input
            type="file"
            accept="image/*"
            className="w-full py-2 px-4 bg-[#dae4fb]/80 rounded-lg text-xl font-light text-[#393433] focus:outline-none focus:ring-2 focus:ring-[#0c87f2]"
            {...register('image')}
          />
          {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
        </div>

        <button
          type="submit"
          className="bg-[#0c87f2] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#0860b8] transition duration-200"
        >
          Submit Announcement
        </button>
      </form>

      {popupVisible && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p>Announcement created successfully!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MakeAnnouncements;
