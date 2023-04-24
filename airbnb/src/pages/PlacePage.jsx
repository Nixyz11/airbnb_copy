import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Image from "../components/Image";
import Boking from "../components/Boking";

const PlacePage = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [pop, setPop] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/place/${id}`).then((res) => {
      setPlace(res.data);
    });
  }, []);
  if (!place) return "xd";
  if (pop) {
    return (
      <div className="bg-black min-h-max min-w-full inset-0 text-white absolute">
        <div className="p-8 gap-4 grid">
          <div>
            <h2 className="text-3xl mr-36">Photos of {place.title}</h2>
            <button
              onClick={() => setPop(false)}
              className="flex shadow-black  py-2 px-4 gap-1 rounded-2xl bg-gray-600 right-12 top-8 fixed text-white"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>{" "}
              Close
            </button>
          </div>

          <div className=" grid gap-4">
            {place?.photos?.length > 0 &&
              place.photos.map((p) => (
                <div>
                  <Image src={p} alt="" />
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="mt-4 px-8 -mx-8 bg-gray-100 pt-8">
      <div>{id}</div>
      <h1 className="text-3xl">{place.title}</h1>
      <a
        href={`https://maps.google.com/?q=` + place.address}
        className="flex gap-1 font-semibold underline my-2"
        target="_blank"
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
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>

        {place.address}
      </a>
      <div className="relative">
        <div className="grid rounded-2xl overflow-hidden gap-2 grid-cols-[2fr_1fr]">
          <div  onClick={() => setPop(true)}>
            <Image
              className="aspect-square object-cover"
              src={place.photos?.[0]}
            />
          </div>
          <div  onClick={() => setPop(true)} className="grid ">
            <Image
              className="aspect-square object-cover"
              src={place.photos?.[1]}
            />

            <div   onClick={() => setPop(true)} className="overflow-hidden">
              <Image
                className="aspect-square object-cover relative top-2"
                src={place.photos?.[2]}
              />
            </div>
          </div>
        </div>
        <button
          onClick={() => setPop(true)}
          className=" rounded-2xl absolute right-2 gap-1 bottom-2 text-center items-center justify-center shadow-md shadow-gray-500 px-4 py-2 bg-slate-900/80  text-white flex md:text-xl text-xs lg:text-xl"
        >
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
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          <span className="">More</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8 mt-8">
        <div>
      <div className="my-4">
        <h2 className="text-2xl font-semibold">Description</h2>
        {place.description}
      </div>
        <div className=" flex mb-2">
          Check in: {place.checkIn}
          <br />
          Check out: {place.checkOut}
          <br />
          Max guests: {place.maxGuests}
        </div>
        </div>
        <div>
           {place && (
             <Boking place={place}/>
           )}
        </div>
      </div>
     <div className="mt-8 border-t bg-white  py-8 -mx-4 px-4">
     <div>
        <h2 className="text-2xl font-semibold">Extra Info</h2>
      </div>
      <div className="text-sm mt-2 text-gray-700 leading-5 mb-4">{place.extraInfo}

      </div>
     </div>
    </div>
  );
};

export default PlacePage;
