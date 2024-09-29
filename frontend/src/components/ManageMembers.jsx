import React, { useState } from 'react';

const ManageMembers = () => {
    const initialMembers = [
        { id: 1, name: 'Marvin McKinney', role: 'Creator' },
        { id: 2, name: 'Dianne Russell', role: 'Member' },
        { id: 3, name: 'John Doe', role: 'Member' },
        { id: 4, name: 'Alice Smith', role: 'Member' },
        { id: 5, name: 'Bob Johnson', role: 'Member' },
        { id: 6, name: 'Charlie Brown', role: 'Member' },
        { id: 7, name: 'David Wilson', role: 'Member' },
        { id: 8, name: 'Shraeyaa Dhaigude', role: 'Member' },
        { id: 9, name: 'Ansh Sarfare', role: 'Member' },
    ];

    const [members, setMembers] = useState(initialMembers);
    const [searchTerm, setSearchTerm] = useState('');

    const handleRemove = (id) => {
        setMembers(members.filter(member => member.id !== id));
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredMembers = members.filter(member =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-[1058px] h-[671px] relative bg-white/25 rounded-[15px] shadow-lg p-6">
            <div className="text-center text-black text-[32px] font-semibold font-['League Spartan'] leading-[50px] mb-6">
                Manage Members
            </div>
            <div className="relative mb-4">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Enter Name..."
                    className="w-full py-2 px-4 bg-[#dae4fb]/80 rounded-full text-xl font-light text-[#c0bed3] focus:outline-none focus:ring-2 focus:ring-[#0c87f2]"
                />
            </div>
            <div className="bg-white rounded-lg shadow-lg max-h-[500px] overflow-y-auto p-4">
                <h2 className="text-lg font-semibold text-[#0a171f] mb-4 font-['League Spartan']">Members List:</h2>
                {filteredMembers.length > 0 ? (
                    filteredMembers.map(member => (
                        <div key={member.id} className="flex justify-between items-center py-2 border-b border-gray-200">
                            <div className="flex items-center">
                                <img className="w-10 h-10 rounded-full mr-4" src="https://via.placeholder.com/40x40" alt={member.name} />
                                <span className="text-md text-[#393433] font-medium">{member.name}</span>
                            </div>
                            <div className="flex gap-2">
                                <button className="px-4 py-2 bg-[#0c87f2] text-white text-sm font-semibold rounded-lg shadow-md hover:bg-[#0860b8]">View</button>
                                <button
                                    onClick={() => handleRemove(member.id)}
                                    className="px-4 py-2 bg-[#f44336] text-white text-sm font-semibold rounded-lg shadow-md hover:bg-[#c11f1f]"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-500">No members found.</div>
                )}
            </div>
        </div>
    );
};

export default ManageMembers;

