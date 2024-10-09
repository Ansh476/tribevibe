// CommunityPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Use useParams to access communityId from the URL
import axios from 'axios'; // Import axios for making API calls
import EnFeedback from './EnFeedback'; // Adjust the import path as needed
import Announcements from './Announcements';
import ChatRoom from './ChatRoom';

function CommunityPage() {
    const { communityId } = useParams(); // Get communityId from URL parameters
    console.log("Community ID from URL:", communityId); 
    const [community, setCommunity] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeComponent, setActiveComponent] = useState('Feedback');

    // Fetch community data from backend
    useEffect(() => {
        if (!communityId) {
            setError("Community ID is not provided.");
            setLoading(false);
            return;
        }
        
        console.log("Fetching community details for ID:", communityId);
        const fetchCommunityDetails = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:5000/api/community/${communityId}`);
                console.log("API Response:", response.data); // Log the response
                setCommunity(response.data.community); // Adjust based on the response structure
                setLoading(false);
            } catch (err) {
                console.error("Error fetching community details:", err);
                setError("Failed to fetch community details.");
                setLoading(false);
            }
        };

        fetchCommunityDetails();
    }, [communityId]);

    // Render the active component
    const renderComponent = () => {
        switch (activeComponent) {
            case 'ChatRoom':
                return <ChatRoom />;
            case 'Announcements':
                return <Announcements />;
            case 'Feedback':
                return <EnFeedback />;
            default:
                return null;
        }
    };

    // Loading and error handling
    if (loading) return <div>Loading community details...</div>;
    if (error) return <div>{error}</div>; // Display error message

    return (
        <div className="w-full min-h-screen bg-[#fde3fa] p-4 flex flex-col items-center">
            <div className="w-full max-w-[1440px]">
                <div className="w-full h-[168px] bg-white rounded-[20px] shadow flex justify-center items-center mb-8">
                    <div className="text-[#150e5d] text-[32px] md:text-[64px] font-semibold font-['League Spartan'] text-center">
                        {community.title} 
                    </div>
                </div>
                <div className="w-full bg-white rounded-[15px] shadow p-4">
                    <div className="flex justify-around mb-4">
                        <button
                            onClick={() => setActiveComponent('ChatRoom')}
                            className={`w-full max-w-[200px] py-2 px-4 rounded-[10px] ${activeComponent === 'ChatRoom' ? 'bg-[#f4f3fe]' : ''} text-[#bd06a2] text-[16px] md:text-[32px] font-semibold font-['League Spartan'] text-center`}
                        >
                            ChatRoom
                        </button>
                        <button
                            onClick={() => setActiveComponent('Announcements')}
                            className={`w-full max-w-[200px] py-2 px-4 rounded-[10px] ${activeComponent === 'Announcements' ? 'bg-[#f4f3fe]' : ''} text-[#bd06a2] text-[16px] md:text-[32px] font-semibold font-['League Spartan'] text-center`}
                        >
                            Announcements
                        </button>
                        <button
                            onClick={() => setActiveComponent('Feedback')}
                            className={`w-full max-w-[200px] py-2 px-4 rounded-[10px] ${activeComponent === 'Feedback' ? 'bg-[#f4f3fe]' : ''} text-[#bd06a2] text-[16px] md:text-[32px] font-semibold font-['League Spartan'] text-center`}
                        >
                            Feedback
                        </button>
                    </div>
                    <div className="w-full bg-[#f4f3fe] rounded-[10px] p-4 h-[400px] md:h-[399px] overflow-auto">
                        {renderComponent()} {/* Render active component */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CommunityPage;