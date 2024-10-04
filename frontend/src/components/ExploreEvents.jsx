import React from 'react';
import ExplorePageHead from '../assets/ExplorePageHead.png';
import EventList from '../components/EventList';
import strayDogs from '../assets/strayDogs.png';
import basketball from '../assets/basketball.png';
import kasubai from '../assets/kasubai.png';
import anime from '../assets/anime.png';

const events = [
    { title: 'Stray Dog Feeding Drive', image: strayDogs, details: 'Join us for a day of feeding stray dogs and making a difference!' },
    { title: 'Basketball Tournament', image: basketball, details: 'Compete in our annual basketball tournament!' },
    { title: 'Kalsubai Peak Night Trek', image: kasubai, details: 'Experience the thrill of night trekking on Kalsubai Peak.' },
    { title: 'Anime Webtoon Manga', image: anime, details: 'A meetup for all anime and manga enthusiasts!' },
];

const ExploreEvents = () => {
    return (
        <div className="bg-[#FDE3FA] min-h-screen p-[30px] mt-12">
            <img
                src={ExplorePageHead}
                alt="Explore communities"
                className="flex h-[145px] w-full"
            />
            <div className="text-[#BE07A2] font-poppins text-[55px] font-bold leading-[50px] mt-10 mb-10">
                Login to see more
            </div>
            <EventList events={events} />
        </div>
    );
};

export default ExploreEvents;
