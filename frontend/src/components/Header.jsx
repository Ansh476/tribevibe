import React, { useState } from "react";
import Logo from "../assets/tribevibelogo.png";
import { Link, useLocation } from "react-router-dom";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";
import { Link as ScrollLink } from "react-scroll";
import ResponsiveNavbar from "./ResponsiveNavbar";

const Header = () => {
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <nav className="fixed top-0 right-0 w-full z-50 bg-white backdrop-blur-sm shadow-md bg-gradient-to-r from-primary to-secondary">
        <div className="container py-3 sm:py-0">
          <div className="flex justify-between items-center">
            <div className="flex items-center font-bold text-2xl ml-0">
              <Link to="/" onClick={() => window.scrollTo(0, 0)}>
                <img src={Logo} alt="Tribe Vibe Logo" className="h-12" />
              </Link>
              <span className="text-custompink">Tribe</span>
              <span className="text-customblue">vibe</span>
            </div>
            <div className="hidden md:flex justify-center gap-8">
              {location.pathname === "/" ? (
                <>
                  <ScrollLink
                    to="home"
                    activeClass="active"
                    spy={true}
                    smooth={true}
                    duration={500}
                    className="cursor-pointer flex items-center justify-center"
                  >
                    Home
                  </ScrollLink>
                  <ScrollLink
                    to="JoinCom"
                    activeClass="active"
                    spy={true}
                    smooth={true}
                    duration={500}
                    className="cursor-pointer flex items-center justify-center"
                  >
                    Join Community
                  </ScrollLink>
                  <ScrollLink
                    to="CreateCom"
                    activeClass="active"
                    spy={true}
                    smooth={true}
                    offset={49}
                    duration={500}
                    className="cursor-pointer flex items-center justify-center"
                  >
                    Create Community
                  </ScrollLink>
                </>
              ) : (
                <>
                  <Link to="/" className="cursor-pointer flex items-center justify-center">
                    Home
                  </Link>
                  <Link to="/#JoinCom" className="cursor-pointer flex items-center justify-center">
                    Join Community
                  </Link>
                  <Link to="/#CreateCom" className="cursor-pointer flex items-center justify-center">
                    Create Community
                  </Link>
                </>
              )}
            </div>

            <div className="hidden md:flex justify-end" onClick={() => window.scrollTo(0, 0)}>
              <Link to="/login" className="cursor-pointer pr-5">
                Login
              </Link>
              {/* <Link to="/signup" className="cursor-pointer pr-5">
                Sign Up
              </Link> */}
            </div>
            <div className="md:hidden block">
              {showMenu ? (
                <HiMenuAlt1 onClick={toggleMenu} className="cursor-pointer transition-all" size={30} />
              ) : (
                <HiMenuAlt3 onClick={toggleMenu} className="cursor-pointer transition-all" size={30} />
              )}
            </div>
          </div>
        </div>
      </nav>

      <ResponsiveNavbar showMenu={showMenu} setShowMenu={setShowMenu} />
    </>
  );
};

export default Header;
