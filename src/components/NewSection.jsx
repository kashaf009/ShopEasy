import axios from "axios";
import React, { useEffect, useState } from "react";

const NewSection = () => {
  const [newArrival, setNewArrival] = useState("");

  useEffect(() => {
    const fetchNewArrival = async () => {
      const res = await axios.get("./data/newArrival.json");
      console.log(res);

      setNewArrival(res.data);
    };
    fetchNewArrival();
  }, []);

  return (
    <div className="pt-25 ml-7 mb-20 ">
      <h1 className="font-['manrope'] font-bold text-2xl text-slate-900 uppercase ">
        New Arrival
      </h1>
      <p className="font-['manrope'] font-medium text-slate-500 text-lg ">
        Discover the latest in technology and design.
      </p>

      <div className="flex gap-5 mt-10 flex-wrap">
      {newArrival &&
        newArrival.map((items) => {
          const { id, name, price, description, image, specs } =
            items;

          return (
            <div className="bg-gray-90 w-80 border-b-2 border-transparent  transition-all duration-300
             hover:border-b-2 hover:border-black rounded-xl shadow-md">
              
                <img
                  className="w-80 rounded-t-xl h-50 object-cover"
                  src={image}
                  alt={name}
                />
           <div className="p-3 ">
              <h2 className="text-md mb-1 text-slate-900 font-['manrope'] font-bold">{name}</h2>
              <p className="text-md ">₹{price}</p>
              <p className="mb-2">{specs.display || specs.battery||specs.video || specs.resolution || specs.connectivity}</p>
              <p className="text-sm text-slate-500 line-clamp-2">{description}</p>
              <div className="flex justify-between gap-10">
              <button>
                <p className="bg-slate-900 text-md  text-white w-full mt-5 py-1 px-5 rounded-md hover:bg-slate-800 transition-all duration-300">
                 Add to Cart
                </p>
              </button>

              <button>
                <p className="bg-gray-600 text-md  text-white w-full mt-5 py-1 px-5 rounded-md hover:bg-gray-700 transition-all duration-300">
                 Buy now
                </p>
              </button>
              </div>
              </div>
            </div>
          );
        })}
        </div>
    </div>

  );
};

export default NewSection;
