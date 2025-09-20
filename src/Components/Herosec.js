import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import mainimage from "../Assets/main.png";
import bgimage from "../Assets/Group 1000006739.png";

const Herosec = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      navigate("/Categories");
    }, 200);
  };

  return (
    <div className="bg-[#FFF7E2] pt-11   overflow-x-hidden min-h-screen sm:min-h-0 md:min-h-0 lg:min-h-0">
      <div className="grid md:grid-cols-2 grid-cols-1 place-items-center">

        
        {/* ✅ Left Section with Background */}
        <div className="relative w-full h-full flex flex-col justify-center text-center ">
          <img
            src={bgimage}
            alt="Background"
            className="absolute top-0 h-full left-0 z-[0] object-contain opacity-70"
          />


          <div className="sm:pt-0 pt-6">
            <h1 className="text-5xl sm:text-5xl md:text-6xl font-extrabold text-gray-800">
              <div className="text-start sm:px-11 px-5 text-gray-900 sm:text-6xl text-4xl z-10 relative">
                <span>
                  <span className="text-red-600">Eats</span>, Treats,
                </span>
                <br />
                <span>
                  Pickles & <span className="text-red-600">Sweets</span>
                </span>
              </div>
            </h1>
          </div>

          <h3 className="mt-1 text-md sm:text-lg md:text-xl text-gray-800 font-gothic text-start sm:px-11 px-5">
            All Your Cravings in One Place.
          </h3>

          <p className="text-start sm:px-11 px-5 py-3 text-gray-500 text-sm sm:text-sm md:text-sm sm:font-gothic font-medium">
            Snacks that crunch, sweets that melt, pickles that spark. Godavari flavors straight from the heart.
          </p>

          <div className="flex justify-start mt-4 sm:px-11 px-5 z-10 relative">
            <button
              onClick={handleClick}
              disabled={loading}
              className="px-6 py-2 bg-red-600 text-white text-sm sm:text-md font-gothic rounded-full shadow-md hover:bg-red-600 hover:scale-105 transition flex items-center gap-2"
            >
              {loading ? "Loading.." : "Shop Now"}
            </button>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="z-10  relative sm:pt-0 pt-11">
          <img src={mainimage} alt="Main" className="" />
        </div>
      </div>
    </div>
  );
};

export default Herosec;
