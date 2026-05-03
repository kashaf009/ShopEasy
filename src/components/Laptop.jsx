import React, { useEffect, useState } from "react";
import "@fontsource/manrope";
import axios from "axios";

const Laptop = () => {
  const [laptopData, setLaptopData] = useState([]);

  useEffect(() => {
    const fetchLaptop = async () => {
      const res = await axios("./data/Laptop.json");
      setLaptopData(res.data);
    };
    fetchLaptop();
  }, []);

  return (
    <div className="mt-25 mb-20 pl-8 ">
      <h2 className='text-2xl font-["manrope"] tracking-wide  uppercase font-bold   text-slate-900'>
        Laptop
      </h2>
      <p className="font-['manrope']  font-medium text-slate-500 text-lg ">
        Discover the latest in laptop technology.
      </p>

      <div className="flex gap-10  flex-wrap mt-10">
        {laptopData &&
          laptopData.map((items) => {
            const { id, catagory, name, price, launched, description, image } =
              items;

            return (
              <div
                className="bg-gray-90 w-80 border-b-2 border-transparent  transition-all duration-300
             hover:border-b-2 hover:border-black rounded-xl shadow-md"
              >
                <img
                  className="w-80 rounded-t-xl h-50 object-cover"
                  src={image}
                  alt={name}
                />

                <div className="px-3 py-3">
                  <h1 className="text-md mb-1 text-slate-900 font-['manrope'] font-bold">
                    {name}
                  </h1>
                  <p className="text-md">{price}</p>
                  <p className="text-sm text-slate-500 line-clamp-2">
                    {description}
                  </p>
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

export default Laptop;
