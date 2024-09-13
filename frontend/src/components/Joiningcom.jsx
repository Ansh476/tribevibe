import React from 'react';
import danc from "../assets/dance.png";
import sport from "../assets/sports.png";
import soc from "../assets/social.png";
import tec from "../assets/tech.png";
import tre from "../assets/trek.png";
import ar from "../assets/art.png";
import game from "../assets/gaming.png";
import Creatingcom from './Creatingcom';

const Joiningcom = () => {
  return (
    <div className="relative bg-join h-screen flex items-center justify-center">
      <div className="relative w-full max-w-screen-lg h-full flex">
        {/* Text Container */}
        <div className="relative w-full md:w-1/2 flex flex-col justify-center items-center md:items-start px-4 mb-8 md:mb-0">
          <div className="relative mb-4">
            <span className="block text-[#bd06a2] text-3xl md:text-5xl font-bold font-['League Spartan'] leading-tight mb-2">
              Join Communities. <br />
            </span>
            <span className="block text-[#150e5d] text-3xl md:text-5xl font-bold font-['League Spartan'] leading-tight">
              Find your tribe <br /> and dive in.
            </span>
          </div>
          <div className="text-[#bd06a2] text-base md:text-lg font-normal font-['Microsoft Sans Serif'] mb-6">
            Pool of local and global communities for <br /> events, adventures, outings and more.
          </div>
          {/* Explore Button */}
          <a
            href="#explore" // Add your explore link or ID here
            className="px-6 py-3 rounded-lg bg-customblue text-white text-lg font-semibold inline-block"
          >
            Explore
          </a>
        </div>

        {/* Images Container */}
        <div className="relative w-full md:w-1/2 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* IMG1 - Center Stack */}
            <div className="absolute flex flex-col items-center space-y-2">
              {/* Image 1 (Dance) */}
              <img
                className="w-[150px] h-[220px] rounded-[30px] 
                 drop-shadow-lg"
                src={danc}
                alt="Dance"
                // style={{ top: '60%', left: '100%', transform: 'translate(-1%, -5%)' }} 
              />
              {/* Image 2 */}
              <img
                className="w-[160px] h-[210px] rounded-[30px] 
                 drop-shadow-lg"
                src={tec}
                alt="Sports"
              />
              {/* Image 3 */}
              <img
                className="w-[160px] h-[210px] rounded-[30px] 
                 drop-shadow-lg"
                src={game}
                alt="Tech"
              />
            </div>

            {/* IMG2 - Left Stack */}
            <div className="absolute flex flex-col items-center space-y-2" style={{ left: '0%' }}>
              {/* Image 4 */}
              <img
                className="w-[160px] h-[210px] rounded-[30px] 
                 drop-shadow-lg"
                src={sport}
                alt="Art"
              />
              {/* Image 5 */}
              <img
                className="w-[160px] h-[210px] rounded-[30px] 
                 drop-shadow-lg"
                src={soc}
                alt="Gaming"
              />
            </div>

            {/* IMG3 - Right Stack */}
            <div className="absolute flex flex-col items-center space-y-2" style={{ right: '0%' }}>
              {/* Image 6 */}
              <img
                className="w-[160px] h-[210px] rounded-[30px] 
                 drop-shadow-lg"
                src={ar}
                alt="Social"
              />
              {/* Image 7 */}
              <img
                className="w-[160px] h-[210px] rounded-[30px] 
                 drop-shadow-lg"
                src={tre}
                alt="Trek"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Joiningcom;
