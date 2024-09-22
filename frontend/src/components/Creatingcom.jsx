import React from 'react'
import comimg from "../assets/createcomimg.png";
import { Link } from 'react-router-dom';

const Creatingcom = () => {
  return (
    <div className="relative h-screen bg-[#DAE5FC] flex items-center">
      <div className="relative flex flex-col md:flex-row items-center justify-between w-full max-w-7xl mx-auto px-4">
        {/* Image Container */}
        <div className="relative w-full md:w-1/2 flex items-center justify-center md:justify-start mb-8 md:mb-0">
          <img
            className="w-[270px] h-auto md:w-[550px] md:h-[700px] rounded-[30px] md:relative md:left-[-10px] md:top-4"
            src={comimg}
            alt="Placeholder"
          />
        </div>
        {/* Text Container */}
        <div className="w-full md:w-1/2 text-center md:text-left md:pl-12">
          <div className="text-[#BD06A2] text-3xl md:text-5xl font-bold mb-2">
            Create Communities<br />
          </div>
          <div className="text-[#150E5D] text-3xl md:text-5xl font-bold mb-4">
            Gather like-minded <br /> individuals
          </div>
          <div className="text-[#BD06A2] text-base md:text-lg">
            Launch your own spaces for events,<br />
            adventure, collaboration, and more.
          </div>
          <Link
            to="/dashboard"
            className="px-6 py-3 rounded-lg bg-customblue text-white text-lg font-semibold inline-block mt-5">
            Explore
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Creatingcom
