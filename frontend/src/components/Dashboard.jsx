import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { IoSearch } from "react-icons/io5";
import EventList from './EventList'; 

const Dashboard = () => {
    const [events, setEvents] = useState([]); 
    const [filteredEvents, setFilteredEvents] = useState([]); 
    const [searchText, setSearchText] = useState("");
    const [locationText, setLocationText] = useState("");
    const [isClicked, setIsClicked] = useState(false);
    const [TagText, setTagText] = useState("");

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/community');
            const communities = response.data.communities; 
            setEvents(communities); 
            setFilteredEvents(communities); 
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSearch = () => {
        console.log("Events before search:", events);
        console.log("Search Text:", searchText);
        console.log("Location Text:", locationText);
        
        const filteredList = events.filter((event) => {
            console.log("Full Event Object:", event);

            const title = event.title ? event.title.toLowerCase() : '';
            const location = event.location ? event.location.toLowerCase() : '';

            const matchesTopic = searchText === "" || title.includes(searchText.toLowerCase());
            const matchesLocation = locationText === "" || location.includes(locationText.toLowerCase());
            const matchesTags = TagText === "" || 
                (event.tags && event.tags.some(tag => tag.toLowerCase().includes(TagText.toLowerCase())));

            return matchesTopic && matchesLocation && matchesTags;
        });

        setFilteredEvents(filteredList);
        setIsClicked(true);
        setTimeout(() => setIsClicked(false), 200);
    };

    useEffect(() => {
        if (searchText === "" && locationText === "" && TagText === "") {
            setFilteredEvents(events); 
        }
    }, [searchText, locationText, TagText, events]); 

    return (
        <div className="bg-[#FDE3FA] min-h-screen p-[30px] mt-12">
            <div className='bg-white rounded-full h-[88px] w-[1106px] mx-auto overflow-hidden py-3 px-3 flex'>
                <div className='bg-[#FDE3FA] w-[258px] rounded-full h-[66px] px-[29px] py-[17px] flex flex-col justify-center gap-2'>
                    <div className='relative grow shrink basis-0 self-stretch'>
                        <input
                            type="text"
                            value={locationText}
                            onChange={(e) => setLocationText(e.target.value)}
                            placeholder="Where"
                            className='h-[20px] text-[#0c87f2] text-[18px] font-bold font-["League Spartan"] w-full bg-transparent border-none focus:outline-none'
                        />
                        <div className='h-[11px] absolute left-0 top-[20px] text-[#BE07A2] w-[200px] text-base font-medium font-["League Spartan"] mt-0.5'>
                            Search by location
                        </div>
                    </div>
                </div>
                <div className='flex flex-col justify-center ml-5 mt-2'>
                    <input
                        type="text"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder="Title"
                        className='text-[#0c87f2] font-bold font-["League Spartan"] text-lg bg-transparent border-none focus:outline-none'
                    />
                    <div className='text-[#BE07A2] font-medium font-["League Spartan"] text-sm'>
                        Search by title
                    </div>
                </div>
                <div className='flex flex-col justify-center ml-5 mt-2'>
                    <input
                        type="text"
                        value={TagText}
                        onChange={(e) => setTagText(e.target.value)}
                        placeholder="Tags"
                        className='text-[#0c87f2] font-bold font-["League Spartan"] text-lg bg-transparent border-none focus:outline-none'
                    />
                    <div className='text-[#BE07A2] font-medium font-["League Spartan"] text-sm'>
                        Search by tag
                    </div>
                </div>
                <div className='ml-auto cursor-pointer' onClick={handleSearch}>
                    <IoSearch 
                        size={24} 
                        className={`bg-[#d9d9d9] text-[#BE07A2] text-2xl h-[60px] w-[62px] rounded-full p-3 transition-transform duration-200 ${isClicked ? 'transform scale-95' : ''}`}
                    />
                </div>
            </div>
            <div className="text-[#BE07A2] font-poppins text-[55px] font-bold leading-[50px] mt-10 mb-10">
                Explore
            </div>
            <EventList events={filteredEvents} /> 
        </div>
    );
};

export default Dashboard;
