import React from "react";
import { useNavigate } from "react-router-dom";

const NewArrivalCard = ({ id, category, name, price, image, description, specs }) => {
  const navigate = useNavigate();
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
      <p className="text-slate-500 px-5 mb-5 text-xs">
        {description}
      </p>
      {specs && (
        <div className="flex flex-wrap gap-1.5 px-5 mb-3">
          {Object.entries(specs).map(([key, value]) => (
            <span key={key} className="text-[10px] font-bold bg-slate-50 border border-slate-100 text-slate-600 px-2.5 py-1 rounded-lg flex items-center gap-1">
              {`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`}
            </span>
          ))}
        </div>
      )}
      <div className="px-5 ">
        <button
          onClick={() => navigate(`/product/${category || 'new'}/${id}`)}
          className="bg-white w-full border-2 border-slate-900 text-slate-900 font-medium px-4 py-2 hover:bg-slate-800 hover:text-white transition-all cursor-pointer"
        >
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default NewArrivalCard;


