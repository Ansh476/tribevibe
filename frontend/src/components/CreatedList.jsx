import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './authentication/Authcontext'; 
import CreatedCard from './CreatedCard';

const CreatedList = () => {
    const { userId: contextUserId } = useContext(AuthContext); 
    const [userId, setUserId] = useState(contextUserId || localStorage.getItem('userId'));
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/community/created/${userId}`);
                setEvents(response.data); 
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        if (userId) {
            fetchEvents();
        }
    }, [userId]);

    return (
        <div className="flex justify-center mt-8 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {events.length > 0 ? (
                    events.map((event, index) => (
                        <CreatedCard key={index} event={event} />
                    ))
                ) : (
                    <p className="text-center text-gray-500">No communities created yet!</p>
                )}
            </div>
        </div>
    );
};

export default CreatedList;
