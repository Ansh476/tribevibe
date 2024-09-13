import React, { useState, useEffect } from "react";
import Logo from "../assets/tribevibelogo.png";
import { Link } from "react-router-dom";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";

export const NavbarLinks = [
  { name: "Home", 
    link: "#home-section" 
  },
  { name: "Join Community",
     link: "#joincom-section" 
  },
  { name: "Create Community",
    link: "#createcom-section"
  },
];

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("#home-section"); // Track the active section

  const handleScroll = (sectionId) => {
    setActiveLink(sectionId); // Set the active link when clicked

    if (sectionId === "#home-section") {
      // Scroll to the top for "Home"
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      const section = document.querySelector(sectionId);
      if (section) {
        window.scrollTo({
          top: section.offsetTop,
          behavior: "smooth",
        });
      }
    }
  };

  // Detect the current section based on scroll position
  useEffect(() => {
    const handleScrollEvent = () => {
      const scrollPosition = window.scrollY;
      const homeSectionOffset = 0; // Scroll position for home
      const joinComSectionOffset = document.getElementById("joincom-section").offsetTop;
      const createComSectionOffset = document.getElementById("createcom-section").offsetTop;

      if (scrollPosition >= createComSectionOffset - 50) {
        setActiveLink("#createcom-section");
      } else if (scrollPosition >= joinComSectionOffset - 50) {
        setActiveLink("#joincom-section");
      } else if (scrollPosition <= homeSectionOffset + 50) {
        setActiveLink("#home-section");
      }
    };

    window.addEventListener("scroll", handleScrollEvent);

    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
    };
  }, []);

  return (
    <>
      <nav className="fixed top-0 right-0 w-full z-50 bg-white backdrop-blur-sm shadow-md z-[9999] bg-gradient-to-r from-primary to-secondary">
        <div className="container py-3 sm:py-0">
          <div className="flex justify-between items-center">
            <div className="flex items-center font-bold text-2xl ml-0">
              <Link to="/" onClick={() => window.scrollTo(0, 0)}>
                <img src={Logo} alt="" className="h-12" />
              </Link>
              <span>
                <p className="text-custompink">Tribe</p>
              </span>
              <span>
                <p className="text-customblue">vibe</p>
              </span>
            </div>
            <div className="hidden md:block">
              <ul className="flex items-center gap-6">
                {NavbarLinks.map(({ name, link }) => (
                  <li key={name} className="py-4">
                    <a
                      href={link}
                      className={`${
                        activeLink === link
                          ? "text-custompink font-bold"
                          : "text-black hover:text-custompink"
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleScroll(link);
                      }}
                    >
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center gap-8">
              {/* Add the login and signup links here if needed */}
              <div className="md:hidden block">
                {activeLink ? (
                  <HiMenuAlt1
                    onClick={() => setActiveLink(null)}
                    className="cursor-pointer transition-all"
                    size={30}
                  />
                ) : (
                  <HiMenuAlt3
                    onClick={() => setActiveLink("menu")}
                    className="cursor-pointer transition-all"
                    size={30}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
