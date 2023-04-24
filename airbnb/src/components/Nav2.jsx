import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Navz from './Navz';
import Places from '../pages/Places';
import { UserContext } from '../context/UserContext';
import axios from 'axios';

const Nav2 = ({who}) => {
    const [where, setWhere] = useState('profile');
    const [newz, setNewz] = useState(false);
    const [subpage, setSubpage] = useState(who);
    const {user,setUser} = useContext(UserContext);
    
    const navigate = useNavigate();
    if(!user){
      navigate('/login')
    }
    console.log(where)
    // bg-primary rounded-full || (subpage === undefined && type==='profile')
    function linkClasses (type=null){
      let classes = 'inline-flex gap-1 py-2 px-3 md:px-6 rounded-full';
      if (type === subpage) {
        classes += ' bg-primary text-white';
      } else {
        classes += ' bg-gray-200';
      }
      return classes;
  }
  async function logou(){
    await axios.post('/logout')
        setUser(null)
    navigate('/login')
}
  return (
    <div>
      <Navz linkClasses={linkClasses} setNewz={setNewz} setWhere={setWhere}/>
      
      {!newz && (

         <div className={`text-center ${newz ? 'hidden' : ''}`}>
        <button
          className={`inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full `}
          onClick={()=>setNewz(prev=>!prev)}
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
        </button>
      </div>
      )}
      {!newz && (
         <div className="text-center max-w-lg mx-auto">
         Logged in as {user?.name} ({user?.email})<br />
         <button onClick={logou} className="primary max-w-sm mt-2">Logout</button>
       </div>
      )}
      {newz && (
        <Places setNewz={setNewz}/>
      )}
    </div>
  );
}

export default Nav2