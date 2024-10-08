import React from 'react';
import axios from 'axios';

const EventCard = ({ event }) => {
  const handleJoin = async () => {
    try {
        
        const token = localStorage.getItem('token'); 

        const response = await axios.post(`http://localhost:5000/api/community/${event._id}/join`, {}, {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        });

        alert(response.data.message);
    } catch (error) {
        alert(error.response?.data?.message || 'Failed to join community'); 
    }
};

  return (
    <div className="flex-row p-[24px] justify-center items-start gap-[36px] rounded-[30px] bg-gradient-to-b from-[#E6BFE0] to-[#61355A] shadow-md">
      <img 
        src={event.imageurl} 
        alt={event.title} 
        className="w-[283.811px] h-[258.419px] object-cover rounded-lg flex-shrink-0" 
      />
      <h3 className="text-[#FFFEFE] font-poppins text-[24px] font-bold leading-[50px] mt-4">
        {event.title}
      </h3>
      <button 
        className="inline-flex px-[40px] py-2 justify-center items-center rounded-[30px] bg-gradient-to-b from-[#E6BFE0] to-[#61355A] shadow-md text-[#FFFEFE] font-poppins text-[16px] font-bold leading-[30px]"
      >
        Details
      </button>
      <button 
        className="inline-flex px-[40px] py-2 justify-center items-center rounded-[30px] bg-gradient-to-b from-[#E6BFE0] to-[#61355A] shadow-md text-[#FFFEFE] font-poppins text-[16px] font-bold leading-[30px] ml-8"
        onClick={handleJoin}
      >
        Join
      </button>
    </div>
  );
};

export default EventCard;
