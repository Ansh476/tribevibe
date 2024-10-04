import React, { useState } from 'react';

const EnFeedback = () => {
    const [feedback, setFeedback] = useState('');
    const [rating, setRating] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Feedback submitted:', { feedback, rating });
    };

    return (
        <div className="w-full h-full bg-[#f4f3fe] rounded-[10px] p-4 overflow-auto">
            <h2 className="text-[#150e5d] text-xl md:text-2xl font-semibold font-['League Spartan'] mb-4">Feedback</h2>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <label className="text-[#150e5d] text-md md:text-lg font-medium">
                    Your Feedback:
                    <textarea
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        className="w-full mt-2 p-2 border border-[#150e5d] rounded-md"
                        rows="5"
                        required
                    />
                </label>
                <label className="text-[#150e5d] text-md md:text-lg font-medium">
                    Star Rating:
                    <div className="flex space-x-2 mt-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                className={`w-8 h-8 md:w-10 md:h-10 rounded-full border-2 ${star <= rating ? 'bg-[#bd06a2]' : 'bg-white'} border-[#150e5d] text-[#150e5d] font-bold`}
                            >
                                {star}
                            </button>
                        ))}
                    </div>
                </label>
                <button type="submit" className="mt-4 py-2 px-4 bg-[#bd06a2] text-white text-md md:text-lg font-semibold rounded-md hover:bg-[#a0058e]">
                    Submit Feedback
                </button>
            </form>
        </div>
    );
};

export default EnFeedback;
