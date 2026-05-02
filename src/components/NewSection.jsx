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
    <div className="pt-25 ml-7 ">
      <h1 className="font-['manrope'] font-bold text-2xl text-slate-900 uppercase ">
        New Arrival
      </h1>
      <p className="font-['manrope'] font-medium text-slate-500 text-lg ">
        Discover the latest in technology and design.
      </p>

      <div className="flex gap-5 mt-10 flex-wrap">
      {newArrival &&
        newArrival.map((items) => {
          const { id, name, price, launched, description, image, specs } =
            items;

          return (
            <div className="bg-gray-100 rounded-xl shadow-md">
              
                <img
                  className="w-80 rounded-t-xl h-70 object-cover"
                  src={image}
                  alt={name}
                />
           
              <h2>{name}</h2>
              <p>₹{price}</p>
            </div>
          );
        })}
        </div>
    </div>

  );
};

export default NewSection;
