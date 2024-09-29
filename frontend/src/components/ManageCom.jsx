import React, { useState } from 'react';
import Insights from './Insights';
import ManageMembers from './ManageMembers';

const Managecom = () => {
  const [activeComponent, setActiveComponent] = useState('Insights');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Insights':
        return <Insights />;
      case 'ManageMembers':
        return <ManageMembers />;
      case 'MakeAnnouncement':
        return <MakeAnnouncement />;
      case 'EditDetails':
        return <EditDetails />;
      case 'ModerationTools':
        return <ModerationTools />;
      case 'Feedback':
        return <Feedback />;
      default:
        return <Insights />;
    }
  };

  return (
    <div className="w-full relative shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] bg-[#DAE5FCC7] min-h-screen flex flex-col md:flex-row"> {/* Updated background color */}
      {/* Sidebar */}
      <div className="w-[299px] h-[748px] relative bg-white shadow">
        <div className="h-[439px] pl-8 pr-[11px] pt-12 pb-[126px] left-[12px] top-[100px] absolute flex-col justify-start items-end gap-[20px] inline-flex">
          {['Insights', 'ManageMembers', 'MakeAnnouncement', 'EditDetails', 'ModerationTools', 'Feedback'].map((item) => (
            <div
              key={item}
              className="self-stretch h-[45px] flex items-center cursor-pointer"
              onClick={() => setActiveComponent(item)}
            >
              <div className="text-[#0c87f2] text-2xl font-normal font-['League Spartan'] leading-[40px] whitespace-nowrap">
                {item.replace(/([A-Z])/g, ' $1')} {/* Convert camelCase to spaced words */}
              </div>
            </div>
          ))}
        </div>
        <div className="w-[664px] h-[57px] left-[-230px] top-[80px] absolute text-center text-[#150e5d] text-[32px] font-semibold font-['League Spartan'] leading-[50px]">
          Manage
        </div>
      </div>

      {/* Main Content */}
      <div className="absolute top-[65px] left-[313px] shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-[10px] bg-gray w-full md:w-[1114px] h-auto md:h-[719px] overflow-hidden p-4">
        
        <div className="absolute top-[7px] left-[30px]">
          {renderComponent()}
        </div>
      </div>

      <div className="absolute top-[0px] left-[calc(50%_-_720px)] shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] bg-aliceblue w-full md:w-[1440px] h-[50px] overflow-hidden text-right text-xl text-darkmagenta">
        {/* Header content here */}
      </div>
    </div>
  );
};

export default Managecom;
