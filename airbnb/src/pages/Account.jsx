import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Places from './Places';
import Nav2 from '../components/Nav2';

const Account = () => {
    const {user,setUser} = useContext(UserContext);
    /* const {pathname} = useLocation();
    let subpage = pathname.split('/')?.[2];
    if(subpage===undefined){
        subpage='profile'
    }
    console.log(subpage) */
    const navigate = useNavigate();

    // bg-primary rounded-full || (subpage === undefined && type==='profile')
   /*  function linkClasses (type=null){
        let classes = 'inline-flex gap-1 py-2 px-3 md:px-6 rounded-full';
        if (type === subpage) {
          classes += ' bg-primary text-white';
        } else {
          classes += ' bg-gray-200';
        }
        return classes;
    } */
   
   
  return (
    <div>
      {/* <nav className="w-full flex mt-8 gap-1 lg:gap-1 justify-center text-center mb-8">
        <Link className={linkClasses("profile")} to={"/accounts"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          My profile
        </Link>
        <Link className={linkClasses("bookings")} to={"/every"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
            />
          </svg>
          My bookings
        </Link>
        <Link className={linkClasses("places")} to={"/all"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          My accomodations
        </Link>
      </nav> */}
     <Nav2 who={"profile"}/>
    
     

    </div>
  );
}

export default Account


/*  <div className="text-center">
        <Link
          className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
          to={"/accounts/places/new"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          Add new place
        </Link>
      </div> */