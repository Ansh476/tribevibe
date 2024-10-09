import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import comimg from "../assets/createcomimg.png";
import { AuthContext } from './authentication/Authcontext';

const Creatingcom = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext); 
  const [showPopup, setShowPopup] = useState(false);

  const handleExploreClick = () => {
    if (!isLoggedIn) {
      setShowPopup(true);
    } else {
      navigate("/communityform"); 
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    navigate("/login", { state: { from: "/creatingcom" } }); 
  };

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
          <button
            onClick={handleExploreClick}
            className="px-6 py-3 rounded-lg bg-customblue text-white text-lg font-semibold inline-block mt-5">
            Create
          </button>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-xl text-[#BD06A2] font-semibold">You are not logged in!</p>
            <p className="mt-2 text-gray-700">Please log in to access this feature.</p>
            <button
              onClick={handleClosePopup}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Go to Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Creatingcom;
