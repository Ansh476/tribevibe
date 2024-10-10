import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ManageMembers = () => {
    const [members, setMembers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { communityId } = useParams();

    // Fetch members when the component mounts
    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/community/${communityId}/members`);
                setMembers(response.data);
                setLoading(false);
            } catch (error) {
                setError("Failed to fetch members.");
                setLoading(false);
            }
        };

        fetchMembers();
    }, [communityId]);

    const handleRemove = async (username) => {
        try {
            await axios.put(`http://localhost:5000/api/community/${communityId}/removemember`, {
                username
            });
            
            // Fetch members again after removing to ensure UI is in sync
            const response = await axios.get(`http://localhost:5000/api/community/${communityId}/members`);
            setMembers(response.data); // Set state with the updated members
        } catch (error) {
            console.error("Error during removal:", error.response ? error.response.data : error.message);
            setError("Failed to remove member.");
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredMembers = members.filter(member =>
        member.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-[1058px] h-[671px] relative bg-white/25 rounded-[15px] shadow-lg p-6">
            <div className="text-center text-black text-[32px] font-semibold font-['League Spartan'] leading-[50px] mb-6">
                Manage Members
            </div>
            <div className="relative mb-4">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Enter Username..."
                    className="w-full py-2 px-4 bg-[#dae4fb]/80 rounded-full text-xl font-light text-[#c0bed3] focus:outline-none focus:ring-2 focus:ring-[#0c87f2]"
                />
            </div>
            <div className="bg-white rounded-lg shadow-lg max-h-[500px] overflow-y-auto p-4">
                <h2 className="text-lg font-semibold text-[#0a171f] mb-4 font-['League Spartan']">Members List:</h2>
                {loading ? (
                    <div className="text-center text-gray-500">Loading members...</div>
                ) : error ? (
                    <div className="text-center text-red-500">{error}</div>
                ) : filteredMembers.length > 0 ? (
                    filteredMembers.map(member => (
                        <div key={member._id} className="flex justify-between items-center py-2 border-b border-gray-200">
                            <div className="flex items-center">
                                <img
                                    className="w-10 h-10 rounded-full mr-4"
                                    src={"https://via.placeholder.com/40x40"} // Placeholder for profile picture
                                    alt={member.username}
                                />
                                <span className="text-md text-[#393433] font-medium">{member.username}</span>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleRemove(member.username)} // Remove by username
                                    className="px-4 py-2 bg-[#f44336] text-white text-sm font-semibold rounded-lg shadow-md hover:bg-[#c11f1f]"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-500">No members found.</div>
                )}
            </div>
        </div>
    );
};

export default ManageMembers;