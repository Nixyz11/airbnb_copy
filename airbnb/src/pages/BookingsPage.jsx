import React, { useEffect, useState } from "react";
import Nav2 from "../components/Nav2";
import axios from "axios";
import Image from "../components/Image";
import BookingDates from "../components/BookingDates";
import PlaceImg from "../components/PlaceImage";
import { Link } from "react-router-dom";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("/bookings").then((res) => {
      setBookings(res.data);
    });
    console.log(bookings);
  }, []);
  return (
    <div className="">
      {bookings?.length > 0 &&
        bookings.map((book) => (
            <Link to={`/accounts/bookings/${book._id}`} className="my-2 flex gap-1 bg-gray-200 rounded-2xl overflow-hidden">
            <div className="w-48">
              <PlaceImg className='sm:w-full h-full' place={book.place} />
            </div>
            <div className="py-3 pr-3 grow">
              <h2 className="text-center md:text-start mx-1 md:mx-0 text-xl">{book.place.title}</h2>
              <div className="text-xs md:text-xl">
                <BookingDates booking={book} className="mb-2 mt-4 text-gray-500" />
                <div className="justify-end md:justify-start flex gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="md:w-8 md:h-8 w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                  </svg>
                  <span className="md:text-2xl">
                    Total price: ${book.price}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default BookingsPage;
