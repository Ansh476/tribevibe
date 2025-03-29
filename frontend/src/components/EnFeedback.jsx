import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AuthContext } from './authentication/Authcontext'; 

const EnFeedback = () => {
  const { communityId } = useParams(); 
  const { userId } = useContext(AuthContext); 
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const [feedbacks, setFeedbacks] = useState([]); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/community/${communityId}/feedback`
        );
        console.log("Feedbacks fetched:", response.data); 
        setFeedbacks(response.data); 
      } catch (error) {
        console.error('Error fetching feedbacks:', error.response || error.message); 
      }
    };
  
    fetchFeedbacks(); 
  }, [communityId]); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating || !feedback) {
      setError('Please provide both feedback and a rating.');
      return;
    }

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const spamCheckResponse = await axios.post(
        'http://127.0.0.1:5000/predict',
        { text: feedback },
        config
      );
    
      if (spamCheckResponse.data.spam) {
        alert('Your feedback was detected as spam. Please modify your message.');
        return; 
      }
   
      await axios.post(
        `http://localhost:5000/api/community/${communityId}/feedback`,
        { feedbackmsg: feedback, rating, userId }, 
        config
      );

      alert('Feedback posted successfully!');
      setError(null); 
      setFeedback(''); 
      setRating(0); 

      const updatedFeedbacks = await axios.get(
        `http://localhost:5000/api/community/${communityId}/feedback`
      );
      setFeedbacks(updatedFeedbacks.data); // Update feedback list
    } catch (error) {
      console.error('Error posting feedback:', error);
      setError('Failed to post feedback. Please try again.');
    }
  };

  return (
    <div className="w-full h-full bg-[#f4f3fe] rounded-[10px] p-4 overflow-auto">
      <h2 className="text-[#150e5d] text-xl md:text-2xl font-semibold font-['League Spartan'] mb-4">
        Feedback
      </h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Display existing feedbacks */}
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Previous Feedbacks:</h3>
        {feedbacks.length === 0 ? (
          <p>No feedbacks yet.</p>
        ) : (
          <ul className="space-y-4">
            {feedbacks.map((fb) => (
              <li
                key={fb._id}
                className="bg-white p-4 rounded-md shadow-md"
              >
                <p className="font-semibold text-[#150e5d]">
                  {fb.user.username}
                </p>
                <p className="text-gray-700">{fb.feedbackmsg}</p>
                <p className="text-yellow-500">Rating: {fb.rating} ⭐</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Feedback form */}
      <h3 className="text-lg font-medium">Post Your Feedback:</h3>
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
                className={`w-8 h-8 md:w-10 md:h-10 rounded-full border-2 ${
                  star <= rating ? 'bg-[#bd06a2]' : 'bg-white'
                } border-[#150e5d] text-[#150e5d] font-bold`}
              >
                {star}
              </button>
            ))}
          </div>
        </label>
        <button
          type="submit"
          className="mt-4 py-2 px-4 bg-[#bd06a2] text-white text-md md:text-lg font-semibold rounded-md hover:bg-[#a0058e]"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default EnFeedback;
