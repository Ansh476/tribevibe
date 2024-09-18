import React from 'react';
import ExplorePageHead from '../assets/ExplorePageHead.png'
import EventList from '../components/EventList';

const ExploreEvents = () => {
    return (
        <div className="bg-[#FDE3FA] min-h-screen p-[30px] mt-12">
            <img
                src={ExplorePageHead}
                alt="Explore communities"
                className="flex h-[145px] w-full"
            />
            <div className="text-[#BE07A2] font-poppins text-[55px] font-bold leading-[50px] mt-10 mb-10">
                Login to see more
            </div>
            <EventList />
        </div>
    );
};

export default ExploreEvents;
