import React, { useState } from 'react';

const Feedback = () => {
    const initialFeedbacks = [
        { id: 1, user: 'Alice Smith', comment: 'Great platform, really helpful!', date: '2024-09-25' },
        { id: 2, user: 'John Doe', comment: 'I love the features offered, but the UI could be better.', date: '2024-09-26' },
        { id: 3, user: 'Marvin McKinney', comment: 'I appreciate the community support!', date: '2024-09-27' },
        // Add more sample feedback as needed
    ];

    const [feedbacks, setFeedbacks] = useState(initialFeedbacks);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredFeedbacks = feedbacks.filter(feedback =>
        feedback.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        feedback.comment.toLowerCase().includes(searchTerm.toLowerCase())
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
                        <div key={feedback.id} className="flex flex-col mb-4 border-b border-gray-200 pb-2">
                            <span className="font-medium text-[#393433]">{feedback.user}</span>
                            <span className="text-md text-[#5c5c5c]">{feedback.comment}</span>
                            <span className="text-sm text-gray-500">{feedback.date}</span>
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
