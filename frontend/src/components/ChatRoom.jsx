import React, { useState } from 'react';

const ChatRoom = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [file, setFile] = useState(null);

    const handleSendMessage = () => {
        if (inputMessage || file) {
            const newMessage = {
                id: messages.length + 1,
                text: inputMessage,
                file: file ? URL.createObjectURL(file) : null,
                timestamp: new Date().toLocaleTimeString(),
            };
            setMessages([...messages, newMessage]);
            setInputMessage('');
            setFile(null);
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    return (
        <div className="w-full h-full bg-[#f4f3fe] rounded-[10px] p-4 flex flex-col">
            <h2 className="text-[#150e5d] text-xl md:text-2xl font-semibold font-['League Spartan'] mb-4">Chat Room</h2>
            <div className="flex-1 overflow-auto mb-4">
                {messages.map((message) => (
                    <div key={message.id} className="bg-white rounded-lg shadow p-2 mb-2">
                        <p className="text-[#150e5d]">{message.text}</p>
                        {message.file && (
                            <a href={message.file} target="_blank" rel="noopener noreferrer" className="text-[#bd06a2] mt-2 inline-block">
                                View Attachment
                            </a>
                        )}
                        <span className="text-gray-500 text-sm block">{message.timestamp}</span>
                    </div>
                ))}
            </div>
            <div className="flex">
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-grow p-2 border rounded-l-md"
                />
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="ml-2"
                />
                <button
                    onClick={handleSendMessage}
                    className="bg-[#bd06a2] text-white px-4 rounded-r-md"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatRoom;
