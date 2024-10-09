import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AnnouncementCard from './Announcementcard'; // Adjust the path as needed
import { useParams } from 'react-router-dom';

const Announcements = () => {
    const [announcements, setAnnouncements] = useState([]);
    const { communityId } = useParams();

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/community/${communityId}/announcement`);
                console.log(response.data); // Log the response to see the structure

                // Assuming response.data is an array of announcement objects
                if (Array.isArray(response.data)) {
                    setAnnouncements(response.data); // Set the announcements state to the fetched data
                } else {
                    console.error("Received data is not an array:", response.data);
                    setAnnouncements([]); // Set to an empty array if not valid
                }
            } catch (error) {
                console.error("Error fetching announcements:", error);
                setAnnouncements([]); // Optionally set to an empty array on error
            }
        };

        fetchAnnouncements();
    }, []);

    return (
        <div className="w-full h-full bg-[#f4f3fe] rounded-[10px] p-4 overflow-auto">
            <h2 className="text-[#150e5d] text-xl md:text-2xl font-semibold font-['League Spartan'] mb-4">Announcements</h2>
            <div className="flex flex-col space-y-4">
                {announcements.length > 0 ? (
                    announcements.map((announcement) => (
                        <AnnouncementCard key={announcement._id} announcement={announcement} />
                    ))
                ) : (
                    <p className="text-gray-600">No announcements available.</p>
                )}
            </div>
        </div>
    );
};

export default Announcements;
