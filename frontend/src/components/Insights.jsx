import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Insights = ({ community }) => {
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const fetchUserCount = async () => {
      if (!community || !community._id) {
        console.error('Community or community ID is undefined');
        return;
      }

      try {
        const token = localStorage.getItem('token'); 
        const communityId = community._id;
        const response = await axios.get(`http://localhost:5000/api/community/${communityId}/usercount`);
        setUserCount(response.data.userCount);
      } catch (error) {
        console.error('Error fetching user count:', error.response?.data?.message || error.message);
      }
    };

    fetchUserCount();
  }, [community]);

  if (!community) {
    return <div>Loading community insights...</div>;
  }

  return (
    <div className="w-[1058px] h-[671px] relative bg-white/25 rounded-[15px] shadow">
      <div className="left-[28px] top-[9px] absolute text-center text-black text-[32px] font-semibold font-['League Spartan'] leading-[50px]">Insights</div>
      <div className="w-[298px] h-[215px] left-[28px] top-[70px] absolute bg-white rounded-[15px] shadow">
        <div className="left-[20px] top-[19px] absolute text-center text-[#0c87f2] text-[32px] font-semibold font-['League Spartan'] leading-[50px]">Total Users</div>
        <div className="left-[20px] top-[89px] absolute text-center text-[#150e5d] text-[64px] font-semibold font-['League Spartan'] leading-[50px]">{userCount}</div>
      </div>
    </div>
  );
};

export default Insights;