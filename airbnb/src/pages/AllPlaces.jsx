import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import PlaceImg from '../components/PlaceImage';

const AllPlaces = () => {
    const [place, setPlace] = useState([]);
    
    useEffect(() => {
        axios.get('/places').then(({data})=>{
            setPlace(data);
        })
    
       
    }, []);
  return (
    <div className='mt-4 '>
        {place.length>0 && place.map(pl=>(
            <Link to={`/accounts/places/${pl._id}`} className='m-1 flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl  items-center md:items-start'>
                 <div className='flex w-48 h-60 bg-gray-300'>
                   <PlaceImg className="" place={pl}/>
                 </div>
               <div className='w-1/2'>
               <h2 className='text-xl'> {pl.title}</h2>
               <p className='text-sm mt-2 '>{pl.description}</p>
               </div>
            </Link>
        ))}
    </div>
  )
}

export default AllPlaces