import React from 'react';

const Announcementcard = ({ announcement }) => {
    return (
        <div key={announcement._id} className="bg-white rounded-lg shadow p-4">
            {announcement.imgfile && (
                <img 
                    src={announcement.imgfile} 
                    alt="Announcement" 
                    className="w-full h-48 object-cover rounded-t-lg mb-2" 
                />
            )}
            <h3 className="text-[#150e5d] font-semibold text-lg">{announcement.message}</h3>
            <p className="text-gray-600 text-sm mt-2">{`${new Date(announcement.createdAt).toLocaleDateString()} at ${new Date(announcement.createdAt).toLocaleTimeString()}`}</p>
        </div>
    );
};

export default Announcementcard;
