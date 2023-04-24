import React, { useContext, useEffect, useState } from "react";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";

import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const Boking = ({ place }) => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [noG, setNoG] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [price, setPrice] = useState(0);
  const { user } = useContext(UserContext);
  const navi = useNavigate();
  const [noD, setNoD] = useState(0);
  
    
  const doit = ()=>{
    if (checkIn && checkOut) {
        setNoD(differenceInCalendarDays(new Date(checkOut), new Date(checkIn)))
      }
    console.log(noD)
  }
  const bookme = async () => {
   // ev.preventDefault();

    if (noD > 0) {
      const data = {
        checkIn,
        checkOut,
        name,
        phone,
        price: noD * place.price,
        place: place._id,
      };
      console.log(data);
      const res = await axios.post('/booking', data)
      console.log(res);
      const bookingId=res.data._id
      navi('/accounts/bookings/'+bookingId)
    }

  
  };
  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);
  return (
    <>
      <div className="rounded-2xl bg-white shadow p-4">
        <h2 className="mb-2 text-2xl text-center">
          Price: ${place?.price} / per night{" "}
        </h2>
        <div className="border   mt-4 rounded-2xl">
          <div className="flex">
            <div className="  p-4  ">
              <label>Check in:</label>
              <input
                type="date"
                onChange={(ev) => setCheckIn(ev.target.value)}
                value={checkIn}
              />
            </div>
            <div className="  border-l p-4 ">
              <label>Check out:</label>
              <input
                type="date"
                onChange={(ev) => setCheckOut(ev.target.value)}
                value={checkOut}
              />
            </div>
          </div>
          <div className="border-t py-3 px-4">
            <label>Number of guests:</label>
            <input
              value={noG}
              onChange={(ev) => setNoG(ev.target.value)}
              type="number"
            />
          </div>
          {noD > 0 ? (
            <div className="border-t py-3 px-4">
              <label>Your full name:</label>
              <input value={user?.name} disabled type="text" />
              <label>Your full number:</label>
              <input
                value={phone}
                onChange={(ev) => setPhone(ev.target.value)}
                type="text"
              />
            </div>
          ):(<div></div>)}
        </div>
       
        <button className="primary mt-4" onClick={()=>doit()}>calc</button>
        <button onClick={()=>bookme()} className="primary mt-4">
        Book this place
        {noD > 0 && (
          <span> ${noD * place.price}</span>
        )}
      </button>
      </div>
    </>
  );
};

export default Boking;
