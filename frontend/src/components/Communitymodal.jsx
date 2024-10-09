import React, { useState, useEffect } from "react";
import axios from "axios";

const Communitymodal = ({ communityId, isOpen, onClose }) => {
  const [community, setCommunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Fetching community details for ID:", communityId);
    const fetchCommunityDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/community/${communityId}`);
        console.log("API Response:", response.data);
        setCommunity(response.data.community); // Adjust based on the response structure
        setLoading(false);
      } catch (err) {
        console.error("Error fetching community details:", err);
        setError("Failed to fetch community details.");
        setLoading(false);
      }
    };

    if (communityId && isOpen) {
      fetchCommunityDetails();
    }
  }, [communityId, isOpen]);

  if (!isOpen) return null;

  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-blue-900 bg-opacity-70 flex justify-center items-center z-50"
      onClick={handleClose}
    >
      <div
        className="bg-white w-full max-w-lg p-6 rounded-lg shadow-2xl relative mx-4 sm:mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-2xl text-pink-600 hover:text-pink-800 transition duration-150"
        >
          ×
        </button>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-blue-200 h-12 w-12"></div>
          </div>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : community ? (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-pink-700">{community.title}</h2>
            <img
              src={community.imageurl}
              alt={community.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <div className="text-left space-y-2">
              <p className="text-pink-600"><strong>Description:</strong> <span className="text-blue-700">{community.description}</span></p>
              <p className="text-pink-600"><strong>Location:</strong> <span className="text-blue-700">{community.location}</span></p>
              <p className="text-pink-600"><strong>Age Group:</strong> <span className="text-blue-700">{community.agegrp}</span></p>
              <p className="text-pink-600"><strong>Date:</strong> <span className="text-blue-700">{new Date(community.date).toLocaleDateString()}</span></p>
              <p className="text-pink-600"><strong>Time:</strong> <span className="text-blue-700">{community.time}</span></p>
              <p className="text-pink-600"><strong>Gender:</strong> <span className="text-blue-700">{community.gender}</span></p>
              <p className="text-pink-600"><strong>Member Count:</strong> <span className="text-blue-700">{community.membercount}</span></p>
              <p className="text-pink-600"><strong>Money Status:</strong> <span className="text-blue-700">{community.moneystatus}</span></p>
              {community.creator && (
                <p className="text-pink-600"><strong>Creator:</strong> <span className="text-blue-700">{community.creator.username} ({community.creator.email})</span></p>
              )}
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-center">No community details found.</p>
        )}
      </div>
    </div>
  );
};

export default Communitymodal;