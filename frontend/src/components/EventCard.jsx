import React, { useState } from 'react';
import Communitymodal from './Communitymodal'; // Import the modal component

const EventCard = ({ event }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle opening the modal
  const handleDetailsClick = () => {
    setIsModalOpen(true);
  };

  // Handle closing the modal
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex-row p-[24px] justify-center items-start gap-[36px] rounded-[30px] bg-gradient-to-b from-[#E6BFE0] to-[#61355A] shadow-md">
      {/* Event Image */}
      <img 
        src={event.imageurl} 
        alt={event.title} 
        className="w-[283.811px] h-[258.419px] object-cover rounded-lg flex-shrink-0" 
      />

      {/* Event Title */}
      <h3 className="text-[#FFFEFE] font-poppins text-[24px] font-bold leading-[50px] mt-4">
        {event.title}
      </h3>

      {/* Details Button */}
      <button 
        onClick={handleDetailsClick} 
        className="inline-flex px-[40px] py-2 justify-center items-center rounded-[30px] bg-gradient-to-b from-[#E6BFE0] to-[#61355A] shadow-md text-[#FFFEFE] font-poppins text-[16px] font-bold leading-[30px] transition-transform duration-200 hover:scale-105"
      >
        Details
      </button>

      {/* Join Button */}
      <button 
        className="inline-flex px-[40px] py-2 justify-center items-center rounded-[30px] bg-gradient-to-b from-[#E6BFE0] to-[#61355A] shadow-md text-[#FFFEFE] font-poppins text-[16px] font-bold leading-[30px] ml-8 transition-transform duration-200 hover:scale-105"
      >
        Join
      </button>

      {/* Display the modal if open */}
      {isModalOpen && (
        <Communitymodal 
          communityId={event._id} // Pass the community ID to the modal
          isOpen={isModalOpen}
          onClose={handleModalClose} // Close modal function
        />
      )}
    </div>
  );
};

export default EventCard;