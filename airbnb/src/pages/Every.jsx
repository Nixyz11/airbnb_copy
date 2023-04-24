import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "../components/Image";
import { Link } from "react-router-dom";

const Every = () => {
  const [all, setAll] = useState([]);

  useEffect(() => {
    axios.get("/all").then((res) => {
      setAll([...res.data]);
    });
  }, []);
  return (
    <div className="grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8">
      {all.length > 0 &&
        all.map((pl) => (
          <Link to={'/every/'+pl._id}>
            <div className="bg-gray-500 mb-2 rounded-2xl flex">
                {pl.photos?.[0] && (<Image className="rounded-2xl object-cover aspect-square" src={pl.photos?.[0]} alt=""/>)}
                 
            </div>
           
            <h2 className="font-bold ">{pl.address}</h2>
            <h3 className="text-sm truncate leading-4 text-gray-500">{pl.title}</h3>
            <h3 className="mt-2">${pl.price} per night</h3>
            <div>

            </div>
          </Link>
        ))}
    </div>
  );
};

export default Every;
