import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SpamMessages = () => {
    const [spamMessages, setSpamMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { communityId } = useParams();

    useEffect(() => {
        const fetchSpamMessages = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/community/${communityId}/getspam`);
                setSpamMessages(response.data);
                console.log(response.data);
            } catch (error) {
                setError("Failed to fetch spam messages.");
            } finally {
                setLoading(false);
            }
        };

        fetchSpamMessages();
    }, [communityId]);

    const handleNotSpam = async (_id) => {
        try {
            await axios.post(`http://localhost:5000/api/community/${communityId}/mark-not-spam`, {
                _id
            });
  
            setSpamMessages(prev => prev.filter(msg => msg._id !== _id));
        } catch (error) {
            setError("Failed to mark message as not spam.");
        }
    };

    return (
        <div className="w-[1058px] h-[671px] relative bg-white/25 rounded-[15px] shadow-lg p-6">
            <div className="text-center text-black text-[32px] font-semibold font-['League Spartan'] leading-[50px] mb-6">
                Manage Spam Messages
            </div>
            <div className="bg-white rounded-lg shadow-lg max-h-[500px] overflow-y-auto p-4">
                <h2 className="text-lg font-semibold text-[#0a171f] mb-4 font-['League Spartan']">Spam List:</h2>
                {loading ? (
                    <div className="text-center text-gray-500">Loading spam messages...</div>
                ) : error ? (
                    <div className="text-center text-red-500">{error}</div>
                ) : spamMessages.length > 0 ? (
                    spamMessages.map(message => (
                        <div key={message._id} className="flex justify-between items-center py-2 border-b border-gray-200">
                          <div>
                            <div className="text-md text-[#393433] font-medium">
                              {message.username || "Unknown User"}
                            </div>
                            <div className="text-sm text-gray-600">
                              {message.spammsg}
                            </div>
                          </div>
                          <div>
                            <button
                              onClick={() => handleNotSpam(message._id)} 
                              className="px-4 py-2 bg-[#008000] text-white text-sm font-semibold rounded-lg shadow-md hover:bg-green-700"
                            >
                              Mark as Not Spam
                            </button>
                          </div>
                        </div>
                      ))
                      
                ) : (
                    <div className="text-center text-gray-500">No spam messages found.</div>
                )}
            </div>
        </div>
    );
};

export default SpamMessages;
