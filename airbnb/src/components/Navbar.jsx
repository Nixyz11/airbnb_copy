import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const {user} = useContext(UserContext);
  useEffect(() => {
    console.log(user)

    
 
  }, []);
  return (
    <div className="flex justify-between items-center md:h-20 h-24">
      <Link to={`/`} className="flex lg:flex-row flex-col items-start lg:items-center  gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 md:ml-0 ml-1 -rotate-90"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
          />
        </svg>
        <span className="-pr-1 -mr-1 md:text-xl text-xs font-semibold">AIRBNB</span>
      </Link>
      <div className="gap-2 shadow-md shadow-gray-300 flex rounded-full border border-gray-300 px-3 py-2 text-center items-center text-base h-11">
        <p>Anywhere</p>
        
        <p className="border-l border-gray-300 pl-2">Any week</p>
        

        <p className="border-l border-gray-300 pl-2">Add guests</p>
        <Link className="bg-primary font-bold p-2 text-white rounded-full" to={user ? '/every':'/'}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </Link>
      </div>
      <Link to={user ? '/accounts':'/login'} className="gap-1 flex items-center rounded-full border border-gray-300 p-3 h-12  relative ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8 "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
        <div className={`${user ? 'bg-green-800 border-green-800' : 'bg-gray-500 border-gray-500'}  text-white rounded-full p-2 overflow-hidden border `}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
        </div>
        {!!user && (
          <div className="md:relative md:bottom-0 bottom-1 left-6 md:left-0 md:flex font-mono  hidden">
            {user.name}
          </div>
        )}
      </Link>
    </div>
  );
};

export default Navbar;
