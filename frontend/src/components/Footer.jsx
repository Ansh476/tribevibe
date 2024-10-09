import React from "react";
import Logo from "../assets/tribevibelogo.png";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLocationArrow,
  FaMobileAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const FooterLinks = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Join Community",
    link: "/joincom",
  },
  {
    title: "Create Community",
    link: "/createcom",
  },
  {
    title: "About",
    link: "/about",
  },
];

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-white py-10 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 py-5 bg-white/10 backdrop-blur-md rounded-t-xl gap-8">
          <div className="md:col-span-1 px-4">
            <h1 className="flex items-center gap-3 text-2xl sm:text-3xl font-bold text-white mb-4">
              <img src={Logo} alt="Tribe Vibe Logo" className="max-h-[60px]" />
              Tribe Vibe
            </h1>
            <p className="text-sm text-gray-400">
            Embrace the vibe of togetherness—find your tribe, attend events, and celebrate life with those who share your passions
            </p>
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-gray-400">
                <FaLocationArrow />
                <p>Mumbai, Maharashtra</p>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <FaMobileAlt />
                <p>+91 123456789</p>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-white">
                <FaInstagram className="text-2xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaFacebook className="text-2xl" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaLinkedin className="text-2xl" />
              </a>
            </div>
          </div>
          <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4 px-4">
            <div>
              <h2 className="text-lg font-bold text-white mb-3">Important Links</h2>
              <ul className="space-y-3">
                {FooterLinks.map((link, index) => (
                  <li key={index} className="text-gray-400 hover:text-white transition duration-300">
                    <Link to={link.link} onClick={() => window.scrollTo(0, 0)}>
                      <span>&#11162;</span> {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="text-center py-5 border-t border-gray-700 mt-8 text-gray-400">
          © 2024 Tribe Vibe. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;