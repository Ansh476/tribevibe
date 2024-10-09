import React from 'react';
import { Link } from 'react-router-dom'; 

const JoinedCard = ({ event }) => {
  return (
    <div className="flex-row p-[24px] justify-center items-start gap-[36px] rounded-[30px] bg-[#FFF7FE] shadow-lg">
      <img 
        src={event.imageurl} 
        alt={event.title} 
        className="w-[283.811px] h-[258.419px] object-cover rounded-lg flex-shrink-0" 
      />
      <h3 className="text-[#0D87F2] font-poppins text-[24px] font-bold leading-[50px] mt-4">
        {event.title}
      </h3>
      <Link to={`/view/community/${event._id}`}>
        <button 
          className="inline-flex px-[40px] py-2 justify-center items-center rounded-[30px] bg-[#0D87F2] shadow-md text-[#FFFEFE] font-poppins text-[16px] font-bold leading-[30px] transition-transform duration-200 hover:scale-105"
        >
          View
        </button>
      </Link>
      <button 
        className="inline-flex px-[40px] py-2 justify-center items-center rounded-[30px] bg-[#0D87F2] shadow-md text-[#FFFEFE] font-poppins text-[16px] font-bold leading-[30px] ml-8 transition-transform duration-200 hover:scale-105"
        onClick={handleExit}
      >
        Exit
      </button>
    </div>
  );
};  

export default JoinedCard;