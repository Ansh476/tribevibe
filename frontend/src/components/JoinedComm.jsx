import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './authentication/Authcontext'; 
import JoinedCard from './JoinedCard';

const JoinedComm = () => {
    const { userId: contextUserId } = useContext(AuthContext); 
    const [userId, setUserId] = useState(contextUserId || localStorage.getItem('userId'));
    const [joinedCommunities, setJoinedCommunities] = useState([]);

    useEffect(() => {
        const fetchJoinedCommunities = async () => {
            try { 
                const response = await axios.get(`http://localhost:5000/api/community/joined/${userId}`); 
                setJoinedCommunities(response.data); 
            } catch (error) {
                console.error('Error fetching joined communities:', error);
            }
        };

        if (userId) {
            fetchJoinedCommunities();
        }
    }, [userId]);

    return (
        <div className="bg-[#DAE5FCC7] min-h-screen p-[30px] mt-12">
            <div className="text-[#150F5D] font-poppins text-[55px] font-bold leading-[50px] mt-10 mb-10">
                You Joined Communities!
            </div>
            <div className="flex justify-center mt-8 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {joinedCommunities.length > 0 ? (
                        joinedCommunities.map((community, index) => (
                            <JoinedCard key={index} event={community} />
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No communities joined yet!</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default JoinedComm;