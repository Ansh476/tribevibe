import React, { useState } from 'react';
import EnFeedback from './EnFeedback'; // Adjust the import path as needed
import Announcements from './Announcements';
import ChatRoom from './ChatRoom';

function CommunityPage() {
    const [activeComponent, setActiveComponent] = useState('Feedback');

    const renderComponent = () => {
        switch (activeComponent) {
            case 'ChatRoom':
                return <ChatRoom/>;
            case 'Announcements':
                return <Announcements/>
            case 'Feedback':
                return <EnFeedback />;
            default:
                return null;
        }
    };

    return (
        <div className="w-full min-h-screen bg-[#fde3fa] p-4 flex flex-col items-center">
            <div className="w-full max-w-[1440px]">
                <div className="w-full h-[168px] bg-white rounded-[20px] shadow flex justify-center items-center mb-8">
                    <div className="text-[#150e5d] text-[32px] md:text-[64px] font-semibold font-['League Spartan'] text-center">
                        Community Name
                    </div>
                </div>
                <div className="w-full bg-white rounded-[15px] shadow p-4">
                    <div className="flex justify-around mb-4">
                        <button
                            onClick={() => setActiveComponent('ChatRoom')}
                            className={`w-full max-w-[200px] py-2 px-4 rounded-[10px] ${activeComponent === 'ChatRoom' ? 'bg-[#f4f3fe]' : ''} text-[#bd06a2] text-[16px] md:text-[32px] font-semibold font-['League Spartan'] text-center`}
                        >
                            ChatRoom
                        </button>
                        <button
                            onClick={() => setActiveComponent('Announcements')}
                            className={`w-full max-w-[200px] py-2 px-4 rounded-[10px] ${activeComponent === 'Announcements' ? 'bg-[#f4f3fe]' : ''} text-[#bd06a2] text-[16px] md:text-[32px] font-semibold font-['League Spartan'] text-center`}
                        >
                            Announcements
                        </button>
                        <button
                            onClick={() => setActiveComponent('Feedback')}
                            className={`w-full max-w-[200px] py-2 px-4 rounded-[10px] ${activeComponent === 'Feedback' ? 'bg-[#f4f3fe]' : ''} text-[#bd06a2] text-[16px] md:text-[32px] font-semibold font-['League Spartan'] text-center`}
                        >
                            Feedback
                        </button>
                    </div>
                    <div className="w-full bg-[#f4f3fe] rounded-[10px] p-4 h-[400px] md:h-[399px] overflow-auto">
                        {renderComponent()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CommunityPage;
