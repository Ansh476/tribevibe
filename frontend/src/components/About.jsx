import React from 'react';

const About = () => {
    return (
        <div className="w-full h-auto bg-[#f3f4f6] py-16"> {/* Increased top and bottom padding */}
            <div className="max-w-6xl mx-auto px-6">
                <h1 className="text-center text-4xl font-bold text-[#0c87f2] mb-8"> {/* Increased margin-bottom */}
                    About Tribe Vibe
                </h1>
                <p className="text-center text-lg text-gray-700 mb-10"> {/* Increased margin-bottom */}
                    Tribe Vibe is more than just a platform; it’s a community built on shared interests, connections, and support. 
                    We believe in the power of collaboration and the strength that comes from uniting like-minded individuals.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"> {/* Increased margin-bottom */}
                    <div className="bg-[#e7f3fe] p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"> {/* Subtle blue for the card */}
                        <h2 className="text-2xl font-semibold text-[#0a171f] mb-4">Our Mission</h2>
                        <p className="text-gray-600">
                            At Tribe Vibe, our mission is to create a welcoming space where everyone can share their thoughts, 
                            experiences, and ideas. We aim to empower our users by providing a platform that encourages 
                            engagement, creativity, and collaboration.
                        </p>
                    </div>
                    <div className="bg-[#ffe7f0] p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"> {/* Subtle beige for the card */}
                        <h2 className="text-2xl font-semibold text-[#0a171f] mb-4">Our Vision</h2>
                        <p className="text-gray-600">
                            We envision a vibrant community where every voice matters, and every idea has the potential to inspire 
                            others. Tribe Vibe strives to be a hub of positivity and innovation, connecting individuals 
                            across various fields and interests.
                        </p>
                    </div>
                </div>
                <div className="bg-[#f0f4ff] p-6 rounded-lg shadow-lg"> {/* Subtle light blue for the last section */}
                    <h2 className="text-2xl font-semibold text-[#0a171f] mb-4">Join Us!</h2>
                    <p className="text-gray-600 mb-4">
                        We invite you to be a part of our growing community. Whether you’re looking to make new friends, 
                        share your expertise, or learn from others, Tribe Vibe is here for you. 
                    </p>
                    <p className="text-gray-600">
                        Together, let’s build a tribe where everyone can thrive. Connect, collaborate, and celebrate 
                        the journey with us!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
