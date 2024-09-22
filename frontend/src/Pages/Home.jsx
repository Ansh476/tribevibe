import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scroller } from 'react-scroll'; // For programmatic scroll
import homimg from "../assets/homeimg.png";
import { FaArrowCircleDown } from "react-icons/fa";
import Joiningcom from '../components/Joiningcom';
import Creatingcom from '../components/Creatingcom';

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const section = location.hash.substring(1); // Get the part after the `#`
      scroller.scrollTo(section, {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart'
      });
    }
  }, [location]);

  return (
    <div>
        <div className="relative h-screen bg-gradient-to-r from-primary to-secondary flex items-center" id='home'>
            <div className="relative flex flex-col md:flex-row items-center justify-between w-full max-w-7xl mx-auto px-4">
                {/* Image Container */}
                <div className="relative w-full md:w-1/2 flex items-center justify-center md:justify-end mb-8 md:mb-0">
                    <img
                        className="w-[250px] drop-shadow-lg md:w-[350px] h-auto rounded-[30px] shadow md:relative md:top-4"
                        src={homimg}
                        alt="Placeholder"
                    />
                </div>
                {/* Text Container */}
                <div className="w-full md:w-1/2 text-center md:text-left md:pl-12">
                    <div className="text-[#BD06A2] text-3xl md:text-5xl font-bold mb-2">
                        Connect with <br />
                    </div>
                    <div className="text-[#150E5D] text-3xl md:text-5xl font-bold mb-4">
                        People who share <br /> your Interests
                    </div>
                    <div className="text-[#BD06A2] text-base md:text-lg">
                        Find the tribe you can vibe with.
                    </div>
                </div>
            </div>
            <FaArrowCircleDown className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hover:scale-125 duration-200" size={40}/>
        </div>
        <div id="JoinCom">
            <Joiningcom />
        </div>

        <div id="CreateCom">
            <Creatingcom />
        </div>
    </div>
  );
};

export default Home;
