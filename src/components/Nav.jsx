import React from "react";

const Nav = () => {
  return (
    <div className=" pl-12 pt-4 pr-12 items-center flex gap-10 justify-between pb-4 shadow-lg">
      <img src="/img/shopEasy.png" alt="logo" className="w-40" />
      <label className="border-gray-500 border  rounded-2xl w-[38%] p-1">
        <input
          className="rounded-2xl w-[95%] pl-5 outline-none"
          type="text"
          placeholder="Search"
        />
      </label>
      <ul className="mr-8 flex gap-10 list-none cursor-pointer  ">
        <li className="hover:text-cyan-700">Home</li>
        <li className="hover:text-cyan-700">Laptop</li>
        <li className="hover:text-cyan-700">Mobile</li>
        <li className="hover:text-cyan-700">Tablet</li>
        <li className="hover:text-cyan-700">Headphone</li>
        <li className="hover:text-cyan-700">Cart</li>
      </ul>
    </div>
  );
};

export default Nav;
