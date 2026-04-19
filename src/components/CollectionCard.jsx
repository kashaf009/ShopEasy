import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

const CollectionCard = ({ icon, title, description }) => {
  return (
    <div className="group p-8 cursor-pointer bg-white rounded-xl mb-25 border-b-2 border-transparent hover:border-slate-900 transition-all duration-300">
      <div className="bg-gray-200 group-hover:bg-slate-900 transition-all duration-300 w-12 h-12 flex items-center justify-center  mb-6 rounded-md">
        <span className="h-7 w-7 group-hover:text-white transition-all duration-300">
          {icon}
        </span>
      </div>

      <p className="text-slate-700 font-semibold text-2xl font-['manrope'] mb-3">
        {title}
      </p>

      <p className="text-slate-500 font-['manrope'] mb-10 text-md ">
        {description}
      </p>

      <p className="text-slate-900 uppercase flex items-center font-semibold tracking-[0.1em] text-sm font-['manrope']">
        Explore
        <span className="ml-2 group-hover:translate-x-2 transition-all duration-300">
          <FaLongArrowAltRight />
        </span>
      </p>
    </div>
  );
};

export default CollectionCard;
