import React,{useState} from 'react'
import Logo from "../assets/tribevibelogo.png";
import { NavLink, Link } from "react-router-dom";
import ResponsiveNavbar from "./ResponsiveNavbar";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";

export const NavbarLinks = [
  {
    name: "Login",
    link: "/login",
  },
  {
    name: "Signup",
    link: "/signup",
  },
  {
    name: "Join Community",
    link: "/joincom",
  },
  {
    name: "Create Community",
    link: "/createcom",
  },
  {
    name: "About",
    link: "/about",
  },
];

const Navbar = ({ handleOrderPopup }) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    
    <>
      <nav className="fixed top-0 right-0 w-full z-50 bg-white backdrop-blur-sm  shadow-md z-[9999] bg-gradient-to-r from-primary to-secondary">
        <div className="container py-3 sm:py-0">
          <div className="flex justify-between items-center">
            <div className="flex items-center font-bold text-2xl ml-0 ">
              <Link to={"/"} onClick={() => window.scrollTo(0, 0)}>
                <img src={Logo} alt="" className="h-12" />
              </Link>
              <span>
                <p className='text-custompink'>Tribe</p>
              </span>
              <span>
                <p className='text-customblue'>vibe</p>
              </span>
              {/* <span>TCJ Tourism</span> */}
            </div>
            <div className="hidden md:block">
              <ul className="flex items-center gap-6 ">
                <li className='py-4'>
                    <NavLink to="/" className={({ isActive }) => isActive ? 'active' : undefined} onClick={() => window.scrollTo(0, 0)}>
                    Home
                    </NavLink>   
                </li>
                <li className='py-4'>
                    <NavLink to="/joincom" className={({ isActive }) => isActive ? 'active' : undefined} onClick={() => window.scrollTo(0, 0)}>
                    JoinCommunity
                    </NavLink>
                </li>
                <li className='py-4'>
                    <NavLink to="/createcom" className={({ isActive }) => isActive ? 'active' : undefined} onClick={() => window.scrollTo(0, 0)}>
                    CreateCommunity
                    </NavLink>
                </li>
                <li className='py-4'>
                    <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : undefined} onClick={() => window.scrollTo(0, 0)}>
                    About
                    </NavLink>
                </li>   
              </ul>
            </div>
            <div className="flex items-center gap-8">
              <NavLink
                to="/target-route"
                className={({ isActive }) => 
                  isActive ? "text-custompink " : "text-custompink hover:scale-105 duration-200"
                }
                onClick={() => {
                  handleOrderPopup(); // Call your existing function
                }}
              >
                Login
              </NavLink>
              <NavLink
                to="/target-route"
                className={({ isActive }) => 
                  isActive ? " text-customblue " : "text-customblue hover:scale-105 duration-200"
                }
                onClick={() => {
                  handleOrderPopup(); // Call your existing function
                }}
              >
                Signup
              </NavLink>
              {/* Mobile Hamburger icon */}
              <div className="md:hidden block">
                {showMenu ? (
                  <HiMenuAlt1
                    onClick={toggleMenu}
                    className=" cursor-pointer transition-all"
                    size={30}
                  />
                ) : (
                  <HiMenuAlt3
                    onClick={toggleMenu}
                    className="cursor-pointer transition-all"
                    size={30}
                  />
                )}
              </div>              
            </div>
          </div>
        </div>
        <ResponsiveNavbar setShowMenu={setShowMenu} showMenu={showMenu} />
      </nav>
    </>
  );
};

export default Navbar