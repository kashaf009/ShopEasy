import React from "react";

const NewArrivalCard = ({ name, price, image, description }) => {
  return (
    <div className="shadow-md  ">
      {/* {newArrivals.slice(1).map((items) => {})} */}
      <img className="w-full h-40 object-cover" src={image} alt="" />
      <div className="flex justify-between ">
        <p className="px-5 pt-5 font-['manrope'] line-clamp-1 tracking-tighter font-semibold mb-1 text-xl">
          {name}
        </p>
        <p className="px-5 pt-5 tracking-tighter font-medium text-xl pr-5">
          ₹{price}
        </p>
      </div>
      <p className="text-slate-500 px-5 mb-5 text-xs">{description}</p>

      <div className="px-5">
        <button className="bg-white w-full border-2 mr-5 text-xl border-slate-900  text-slate-900 px-4 py-1  hover:bg-slate-800 hover:text-white transition-all duration-300">
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default NewArrivalCard;
