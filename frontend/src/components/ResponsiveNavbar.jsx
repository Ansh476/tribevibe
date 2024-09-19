import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { Link as ScrollLink, scroller } from "react-scroll";

const ResponsiveNavbar = ({ showMenu, setShowMenu }) => {
  const location = useLocation();

  const handleScrollToSection = (section) => {
    if (location.pathname !== "/") {
      window.location.href = "/";
      setTimeout(() => {
        scroller.scrollTo(section, {
          smooth: true,
          duration: 500,
          offset: -50,
        });
      }, 100); 
    } else {
      scroller.scrollTo(section, {
        smooth: true,
        duration: 500,
        offset: -50,
      });
    }
    setShowMenu(false); 
  };

  return (
    <div
      className={`${
        showMenu ? "left-0" : "-left-[100%]"
      } fixed bottom-0 top-0 z-20 flex h-screen w-[75%] flex-col justify-between bg-white dark:bg-gray-900 dark:text-white px-8 pb-6 pt-16 text-black transition-all duration-200 md:hidden rounded-r-xl shadow-md`}
    >
      <div className="card">
        <div className="flex items-center justify-start gap-3">
          <FaUserCircle size={50} />
          <div>
            <h1 className="text-customblue">Hello User</h1>
            <h1 className="text-sm text-custompink">Premium user</h1>
          </div>
        </div>

        <nav className="mt-12">
          <ul className="space-y-4 text-xl">
            <li className="bg-gradient-to-r from-primary to-secondary">
              <span
                onClick={() => handleScrollToSection("home")}
                className="mb-5 inline-block text-customblue font-medium cursor-pointer"
              >
                Home
              </span>
            </li>
            <li className="bg-gradient-to-r from-primary to-secondary">
              <span
                onClick={() => handleScrollToSection("JoinCom")}
                className="mb-5 inline-block text-customblue font-medium cursor-pointer"
              >
                Join Community
              </span>
            </li>
            <li className="bg-gradient-to-r from-primary to-secondary">
              <span
                onClick={() => handleScrollToSection("CreateCom")}
                className="mb-5 inline-block text-customblue font-medium cursor-pointer"
              >
                Create Community
              </span>
            </li>
            <li>
              <Link
                to="/login"
                onClick={() => {
                  setShowMenu(false);
                  window.scrollTo(0, 0); 
                }}
                className="mb-5 inline-block text-customblue font-medium"
              >
                Login
              </Link>
            </li>
            {/* <li>
              <Link
                to="/login"
                onClick={() => {
                  setShowMenu(false);
                  window.scrollTo(0, 0); 
                }}
                className="mb-5 inline-block text-customblue font-medium"
              >
                Signup
              </Link>
            </li> */}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default ResponsiveNavbar;
