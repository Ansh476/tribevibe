import React from 'react';
import ExplorePageHead from '../assets/ExplorePageHead.png'
import CreatedList from './CreatedList';

const CreatedComm = () => {
    return (
        <div className="bg-[#DAE5FCC7] min-h-screen p-[30px] mt-12">
            
            <div className="text-[#150F5D] font-poppins text-[55px] font-bold leading-[50px] mt-10 mb-10">
            You Created Communities !
            </div>
            <CreatedList />
        </div>
    );
};

export default CreatedComm;
