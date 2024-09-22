import React from 'react';
// import ExplorePageHead from '../assets/ExplorePageHead.png'
import EventList from '../components/EventList';
import { IoSearch } from "react-icons/io5"

const Dashboard = () => {
    return (
        <div className=" bg-[#FDE3FA] min-h-screen p-[30px] mt-12">
            <div className=' bg-white rounded-full top-48 h-[88px] w-[1106px] mx-auto overflow-hidden py-3 px-3 flex'>
                <div className=' bg-[#FDE3FA] w-[258px] rounded-full h-[66px] px-[29px] py-[17px] flex flex-col justify-center gap-2'>
                    <div className='relative grow shrink basis-0 self-stretch '>
                        <div className='h-[20px] left-0  top-0 text-[#0c87f2] text-[18px] font-bold font-["League Spartan"] w-[76px] '>
                            Where
                        </div>
                        <div className='h-[11px] left-0 top-[20px] absolute text-[#BE07A2] w-[200px] text-base font-medium font-["League Spartan"] mt-0.5'>
                            Search by location
                        </div>
                    </div>
                </div>
                <div className='flex flex-col justify-center ml-5 mt-2'>
                    <div className='text-[#0c87f2] font-bold font-["League Spartan"] text-lg'>
                        Topic
                    </div>
                    <div className='text-[#BE07A2] font-medium font-["League Spartan"] text-sm'>
                        search by tags
                    </div>
                </div>
                <div className='ml-auto'>
                    <IoSearch size={24} className='bg-[#d9d9d9] text-[#BE07A2] text-2xl h-[60px] w-[62px] rounded-full p-3 ' />
                </div>
            </div>
            <div className="text-[#BE07A2] font-poppins text-[55px] font-bold leading-[50px] mt-10 mb-10">
                Explore
            </div>
            <EventList />
        </div>
    );
};

export default Dashboard;