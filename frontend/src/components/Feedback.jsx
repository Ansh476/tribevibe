import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Feedback = () => {
    const { communityId } = useParams(); // Get communityId from URL
    const [feedbacks, setFeedbacks] = useState([]); // State for fetched feedbacks
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch feedbacks from backend when the component mounts
    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/community/${communityId}/feedback`
                );
                setFeedbacks(response.data); // Set fetched feedbacks
            } catch (error) {
                console.error('Error fetching feedbacks:', error.response || error.message);
            }
        };

        fetchFeedbacks();
    }, [communityId]); // Dependency on communityId

    // Handle search input
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    // Filter feedbacks based on search term
    const filteredFeedbacks = feedbacks.filter(feedback =>
        feedback.user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        feedback.feedbackmsg.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-[1058px] h-[671px] relative bg-white/25 rounded-[15px] shadow-lg p-6">
            <div className="text-center text-black text-[32px] font-semibold font-['League Spartan'] leading-[50px] mb-6">
                User Feedback
            </div>
            <div className="relative mb-4">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Search Feedback..."
                    className="w-full py-2 px-4 bg-[#dae4fb]/80 rounded-full text-xl font-light text-[#c0bed3] focus:outline-none focus:ring-2 focus:ring-[#0c87f2]"
                />
            </div>
            <div className="bg-white rounded-lg shadow-lg max-h-[500px] overflow-y-auto p-4">
                <h2 className="text-lg font-semibold text-[#0a171f] mb-4 font-['League Spartan']">Feedback List:</h2>
                {filteredFeedbacks.length > 0 ? (
                    filteredFeedbacks.map(feedback => (
                        <div key={feedback._id} className="flex flex-col mb-4 border-b border-gray-200 pb-2">
                            <span className="font-medium text-[#393433]">{feedback.user.username}</span>
                            <span className="text-md text-[#5c5c5c]">{feedback.feedbackmsg}</span>
                            <span className="text-sm text-gray-500">{feedback.rating} ⭐</span>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-500">No feedback found.</div>
                )}
            </div>
        </div>
    );
};

export default Feedback;
