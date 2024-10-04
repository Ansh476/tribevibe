import React, { useState } from 'react';

const MakeAnnouncements = () => {
    const [announcementText, setAnnouncementText] = useState('');
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setFileName(selectedFile.name); // Store the name of the file for display
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle announcement submission logic here
        console.log('Announcement:', announcementText);
        console.log('Attached File:', file);

        // Reset the form fields
        setAnnouncementText('');
        setFile(null);
        setFileName('');
    };

    return (
        <div className="w-[1058px] h-[671px] relative bg-white/25 rounded-[15px] shadow-lg p-6">
            <div className="text-center text-black text-[32px] font-semibold font-['League Spartan'] leading-[50px] mb-6">
                Make Announcement
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <textarea
                        value={announcementText}
                        onChange={(e) => setAnnouncementText(e.target.value)}
                        placeholder="Write your announcement here..."
                        className="w-full py-2 px-4 bg-[#dae4fb]/80 rounded-lg text-xl font-light text-[#393433] focus:outline-none focus:ring-2 focus:ring-[#0c87f2]"
                        rows="4"
                        required
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="w-full py-2 px-4 bg-[#dae4fb]/80 rounded-lg text-xl font-light text-[#393433] focus:outline-none focus:ring-2 focus:ring-[#0c87f2]"
                        accept=".pdf,image/*"
                    />
                    {fileName && (
                        <div className="mt-2 text-sm text-[#0a171f]">{`Attached: ${fileName}`}</div>
                    )}
                </div>
                <button
                    type="submit"
                    className="bg-[#0c87f2] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#0860b8] transition duration-200"
                >
                    Submit Announcement
                </button>
            </form>
        </div>
    );
};

export default MakeAnnouncements;
