import React, { useState, useEffect } from 'react';

const ModerationTools = () => {
    const [chats, setChats] = useState([]);
    const [reportedContent, setReportedContent] = useState([]);
    const [isChatRoomDisabled, setIsChatRoomDisabled] = useState(false);
    const [keywordFilters, setKeywordFilters] = useState([]);
    const [newKeyword, setNewKeyword] = useState('');

    useEffect(() => {
        // Fetch initial data for chats and reported content
        fetchChats();
        fetchReportedContent();
    }, []);

    const fetchChats = () => {
        // Mock fetching chats from an API
        setChats([
            { id: 1, user: 'User1', message: 'Hello world' },
            { id: 2, user: 'User2', message: 'Reported message' },
            // More chats...
        ]);
    };

    const fetchReportedContent = () => {
        // Mock fetching reported content from an API
        setReportedContent([
            { id: 1, user: 'User2', message: 'Reported message', reason: 'Inappropriate' },
            // More reported content...
        ]);
    };

    const handleDeleteChat = (chatId) => {
        setChats(chats.filter(chat => chat.id !== chatId));
    };

    const handleDisableChatRoom = () => {
        setIsChatRoomDisabled(!isChatRoomDisabled);
    };

    const handleAddKeyword = () => {
        if (newKeyword) {
            setKeywordFilters([...keywordFilters, newKeyword]);
            setNewKeyword('');
        }
    };

    const handleRemoveKeyword = (keyword) => {
        setKeywordFilters(keywordFilters.filter(k => k !== keyword));
    };

    return (
        <div className="w-full h-auto bg-[#f3f4f6] py-16">
            <div className="max-w-6xl mx-auto px-6">
                <h1 className="text-center text-4xl font-bold text-[#0c87f2] mb-8">Moderation Tools</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-[#e7f2fe] p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold text-[#0a171f] mb-4">Delete Chats</h2>
                        <ul>
                            {chats.map(chat => (
                                <li key={chat.id} className="flex justify-between items-center mb-2">
                                    <span>{chat.user}: {chat.message}</span>
                                    <button
                                        onClick={() => handleDeleteChat(chat.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded">
                                        Delete
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-[#f7e9c7] p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold text-[#0a171f] mb-4">Reported Content</h2>
                        <ul>
                            {reportedContent.map(content => (
                                <li key={content.id} className="mb-2">
                                    <span>{content.user}: {content.message} (Reason: {content.reason})</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-[#f0f4ff] p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold text-[#0a171f] mb-4">Disable Chat Room</h2>
                        <button
                            onClick={handleDisableChatRoom}
                            className={`px-4 py-2 rounded ${isChatRoomDisabled ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                            {isChatRoomDisabled ? 'Enable Chat Room' : 'Disable Chat Room'}
                        </button>
                    </div>
                    <div className="bg-[#e0ffec] p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold text-[#0a171f] mb-4">Keyword Filters</h2>
                        <div className="mb-4">
                            <input
                                type="text"
                                value={newKeyword}
                                onChange={(e) => setNewKeyword(e.target.value)}
                                placeholder="Add new keyword"
                                className="px-3 py-2 border rounded mr-2"
                            />
                            <button
                                onClick={handleAddKeyword}
                                className="bg-blue-500 text-white px-3 py-2 rounded">
                                Add
                            </button>
                        </div>
                        <ul>
                            {keywordFilters.map(keyword => (
                                <li key={keyword} className="flex justify-between items-center mb-2">
                                    <span>{keyword}</span>
                                    <button
                                        onClick={() => handleRemoveKeyword(keyword)}
                                        className="bg-red-500 text-white px-3 py-1 rounded">
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModerationTools;
