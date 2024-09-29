import React from 'react';

const Insights = () => {
  return (
    <div className="w-[1058px] h-[671px] relative bg-white/25 rounded-[15px] shadow">
    <div className="left-[28px] top-[9px] absolute text-center text-black text-[32px] font-semibold font-['League Spartan'] leading-[50px]">Insights</div>
    <div className="w-[298px] h-[215px] left-[28px] top-[70px] absolute bg-white rounded-[15px] shadow">
        <div className="left-[20px] top-[19px] absolute text-center text-[#0c87f2] text-[32px] font-semibold font-['League Spartan'] leading-[50px]">Total Users</div>
        <div className="left-[20px] top-[89px] absolute text-center text-[#150e5d] text-[64px] font-semibold font-['League Spartan'] leading-[50px]">255</div>
        <div className="w-[15px] h-3.5 left-[20px] top-[173px] absolute bg-[#16a407] rounded-full" />
        <div className="w-[108px] h-[46px] left-0 top-[157px] absolute text-center text-[#0c87f2] text-xs font-semibold font-['League Spartan'] leading-[50px]">150</div>
    </div>
    <div className="w-[298px] h-[215px] left-[376px] top-[70px] absolute bg-white rounded-[15px] shadow">
        <div className="left-[18px] top-[19px] absolute text-center text-[#0c87f2] text-[32px] font-semibold font-['League Spartan'] leading-[50px]">Total Chats</div>
        <div className="left-[18px] top-[83px] absolute text-center text-[#150e5d] text-[64px] font-semibold font-['League Spartan'] leading-[50px]">15k</div>
        <div className="w-[15px] h-3.5 left-[20px] top-[173px] absolute bg-[#16a407] rounded-full" />
        <div className="w-[108px] h-[46px] left-0 top-[157px] absolute text-center text-[#0c87f2] text-xs font-semibold font-['League Spartan'] leading-[50px]">150</div>
    </div>
</div>
  );
};

export default Insights;
