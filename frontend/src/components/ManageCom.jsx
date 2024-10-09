import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; 
import Insights from './Insights';
import ManageMembers from './ManageMembers';
import MakeAnnouncements from './MakeAnnouncements';
import EditDetails from './EditDetails';
import ModerationTools from './ModerationTools';
import Feedback from './Feedback'; 

const ManageCom = () => {
  const { communityId } = useParams(); 
  const [community, setCommunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeComponent, setActiveComponent] = useState('Insights');

  // Fetch community data from backend
  useEffect(() => {
    if (!communityId) {
      setError("Community ID is not provided.");
      setLoading(false);
      return;
    }

    const fetchCommunityDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/api/community/${communityId}`);
        setCommunity(response.data.community); // Adjust based on the response structure
        setLoading(false);
      } catch (err) {
        console.error("Error fetching community details:", err);
        setError("Failed to fetch community details.");
        setLoading(false);
      }
    };

    fetchCommunityDetails();
  }, [communityId]);

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Insights':
        return <Insights community={community} />; 
      case 'ManageMembers':
        return <ManageMembers community={community} />;
      case 'MakeAnnouncement':
        return <MakeAnnouncements community={community} />;
      case 'EditDetails':
        return <EditDetails community={community} />;
      case 'ModerationTools':
        return <ModerationTools community={community} />;
      case 'Feedback':
        return <Feedback community={community} />;
      default:
        return <Insights community={community} />;
    }
  };

  // Loading and error handling
  if (loading) return <div>Loading community details...</div>;
  if (error) return <div>{error}</div>; // Display error message

  return (
    <div className="w-full relative shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] bg-[#DAE5FCC7] min-h-screen flex flex-col md:flex-row">
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

export default ManageCom;
