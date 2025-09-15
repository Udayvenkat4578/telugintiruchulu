import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import mainimage from '../Assets/main.png'
const Herosec = () => {
     const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/Categories");
    }, 200); // 1.2s delay before navigating
  };
  return (
       
    <div className='bg-[#FFF7E2] py-6'>
        <div className='grid md:grid-cols-2 grid-cols-1 place-items-center'>
<div className="text-center py-10">
    <div className=''>
  <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-800">
  <div className='text-start sm:px-11 px-5 text-gray-800 sm:text-6xl text-4xl'> <span> <span className='text-red-600'>Eats</span>, Treats,</span><br/><span> Pickles &<span className='text-red-600'> Sweets</span></span></div>
  </h1></div>
  <h3 className="mt-1 text-lg sm:text-xl md:text-2xl text-gray-800 font-medium text-start sm:px-11 px-5">
    All Your Cravings in One Place.
  </h3>
  <p className='text-start sm:px-11 px-5 py-2 text-gray-600 text-md sm:text-lg md:text-md'>
    Snacks that crunch, sweets that melt, pickles that spark. Godavari flavors straight from the heart.
  </p>
  <div className="flex justify-start mt-6 sm:px-11 px-5 ">
    
      <button
        onClick={handleClick}
        disabled={loading}
        className="px-6 py-2 bg-red-600 text-white text-lg font-semibold rounded-full shadow-md hover:bg-orange-600 hover:scale-105 transition flex items-center gap-2"
      >
        {loading ? (
          <>
            Loading..
          </>
        ) : (
          "Shop Now"
        )}
      </button>
    </div></div>
           <div>
<img src={mainimage}/>
           </div>
        </div>
    </div>
  )
}

export default Herosec