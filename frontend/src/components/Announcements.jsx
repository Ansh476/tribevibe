import React, { useEffect, useState } from 'react';

const Announcements = () => {
    const [announcements, setAnnouncements] = useState([]);

    // Sample static data for announcements
    const sampleAnnouncements = [
        {
            id: 1,
            text: "Welcome to the community! We're excited to have you here.",
            date: "2024-09-30",
            time: "10:00 AM",
            file: "link-to-file-1.pdf", // Replace with actual file links
        },
        {
            id: 2,
            text: "Don't miss our upcoming event on community guidelines.",
            date: "2024-10-05",
            time: "2:00 PM",
            file: "link-to-file-2.pdf",
        },
        {
            id: 3,
            text: "New resources have been added to the community library.",
            date: "2024-09-28",
            time: "11:30 AM",
            file: "",
        },
    ];

    useEffect(() => {
        // Simulate fetching data from backend
        setAnnouncements(sampleAnnouncements);
    }, []);

    return (
        <div className="w-full h-full bg-[#f4f3fe] rounded-[10px] p-4 overflow-auto">
            <h2 className="text-[#150e5d] text-xl md:text-2xl font-semibold font-['League Spartan'] mb-4">Announcements</h2>
            <div className="flex flex-col space-y-4">
                {announcements.length > 0 ? (
                    announcements.map((announcement) => (
                        <div key={announcement.id} className="bg-white rounded-lg shadow p-4">
                            <h3 className="text-[#150e5d] font-semibold text-lg">{announcement.text}</h3>
                            <p className="text-gray-600 text-sm mt-2">{`${announcement.date} at ${announcement.time}`}</p>
                            {announcement.file && (
                                <a href={announcement.file} className="text-[#bd06a2] text-sm mt-2 inline-block" target="_blank" rel="noopener noreferrer">
                                    View Attached File
                                </a>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-gray-600">No announcements available.</p>
                )}
            </div>
        </div>
    );
};

export default Announcements;

