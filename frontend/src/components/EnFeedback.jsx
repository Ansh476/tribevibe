import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EnFeedback = () => {
    const { communityId } = useParams(); // Get communityId from the URL
    const navigate = useNavigate();
    const [feedback, setFeedback] = useState('');
    const [rating, setRating] = useState(0);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Ensure both rating and feedback are provided
        if (!rating || !feedback) {
            setError('Please provide both feedback and a rating.');
            return;
        }

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json', // Only Content-Type needed now
                },
            };

            // Post the feedback to the backend
            const response = await axios.post(
                `http://localhost:5000/api/community/${communityId}/feedback`,
                { feedbackmsg: feedback, rating },
                config
            );

            console.log('Feedback submitted:', response.data);
            setSuccess('Feedback posted successfully!');
            setError(null);
            setFeedback(''); // Clear feedback input
            setRating(0);    // Reset rating selection
            navigate(`/view/community/${communityId}`); // Redirect to the community view page after submission
        } catch (error) {
            console.error('Error posting feedback:', error);
            setError('Failed to post feedback. Please try again.');
        }
    };

    return (
        <div className="w-full h-full bg-[#f4f3fe] rounded-[10px] p-4 overflow-auto">
            <h2 className="text-[#150e5d] text-xl md:text-2xl font-semibold font-['League Spartan'] mb-4">Feedback</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            {success && <div className="text-green-500 mb-4">{success}</div>}
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