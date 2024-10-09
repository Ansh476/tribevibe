import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const JoinRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { communityId } = useParams();

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/community/${communityId}/requests`);
                setRequests(response.data);
            } catch (error) {
                setError("Failed to fetch requests.");
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, [communityId]);

    const handleReject = async (_id) => {
        try {
            await axios.delete(`http://localhost:5000/api/community/${communityId}/reject-request`, {
                data: { _id } // Send the _id in the request body
            });
            // Update local state to remove the rejected request
            setRequests((prevRequests) => prevRequests.filter(request => request._id !== _id));
        } catch (error) {
            setError("Failed to reject request.");
        }
    };
    
    const handleAccept = async (_id) => {
        try {
            await axios.post(`http://localhost:5000/api/community/${communityId}/accept-request`, {
                _id // Send the _id in the request body
            });
            // Update local state to remove the accepted request
            setRequests((prevRequests) => prevRequests.filter(request => request._id !== _id));
        } catch (error) {
            setError("Failed to accept request.");
        }
    };
    

    return (
        <div className="w-[1058px] h-[671px] relative bg-white/25 rounded-[15px] shadow-lg p-6">
            <div className="text-center text-black text-[32px] font-semibold font-['League Spartan'] leading-[50px] mb-6">
                Manage Requests
            </div>
            <div className="bg-white rounded-lg shadow-lg max-h-[500px] overflow-y-auto p-4">
                <h2 className="text-lg font-semibold text-[#0a171f] mb-4 font-['League Spartan']">Requests List:</h2>
                {loading ? (
                    <div className="text-center text-gray-500">Loading requests...</div>
                ) : error ? (
                    <div className="text-center text-red-500">{error}</div>
                ) : requests.length > 0 ? (
                    requests.map(member => (
                        <div key={member._id} className="flex justify-between items-center py-2 border-b border-gray-200">
                            <div className="flex items-center">
                                <img
                                    className="w-10 h-10 rounded-full mr-4"
                                    src={member.profilePicture || "https://via.placeholder.com/40x40"} // Dynamic URL for profile picture
                                    alt={member.username}
                                />
                                <span className="text-md text-[#393433] font-medium">{member.username}</span>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleAccept(member._id)} 
                                    className="px-4 py-2 bg-[#008000] text-white text-sm font-semibold rounded-lg shadow-md hover:bg-[#c11f1f]"
                                >
                                    Accept
                                </button>
                                <button
                                    onClick={() => handleReject(member._id)} 
                                    className="px-4 py-2 bg-[#f44336] text-white text-sm font-semibold rounded-lg shadow-md hover:bg-[#c11f1f]"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-500">No requests found.</div>
                )}
            </div>
        </div>
    );
};

export default JoinRequests;
