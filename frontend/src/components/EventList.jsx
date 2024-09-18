import React from 'react';
import strayDogs from '../assets/strayDogs.png'
import basketball from '../assets/basketball.png';
import kasubai from '../assets/kasubai.png';
import anime from '../assets/anime.png';
import EventCard from './EventCard';

const events = [
    { title: 'Stray Dog Feeding Drive', image: strayDogs, details: 'Event details here' },
    { title: 'Basketball Tournament', image: basketball, details: 'Event details here' },
    { title: 'Kalsubai Peak Night Trek', image: kasubai, details: 'Event details here' },
    { title: 'Anime Webtoon Manga', image: anime, details: 'Event details here' },
];

const EventList = () => {
    return (
        <div className="flex justify-center mt-8 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {events.map((event, index) => (
                    <EventCard key={index} event={event} />
                ))}
            </div>
        </div>

    );
};

export default EventList;
