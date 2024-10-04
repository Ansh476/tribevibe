import React from 'react';
import EventCard from './EventCard';

const EventList = ({ events }) => {
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
