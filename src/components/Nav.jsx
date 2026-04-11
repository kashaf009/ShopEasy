import React from "react";

const Nav = () => {
  return (
    <div className=" pl-12 pt-4 pr-12 items-center flex gap-10 justify-between">
      <p className="text-3xl ml-8">shopEasy</p>
      <label className="border-black border rounded-2xl w-[38%]  p-1">
        <input
          className="rounded-2xl w-[95%] pl-5 outline-none"
          type="text"
          placeholder="Search"
        />
      </label>
      <ul className="mr-8 flex gap-10 list-none cursor-pointer ">
        <li className="hover:text-blue-500">Home</li>
        <li className="hover:text-blue-500">Laptop</li>
        <li className="hover:text-blue-500">Mobile</li>
        <li className="hover:text-blue-500">Tablet</li>
        <li className="hover:text-blue-500">Headphone</li>
        <li className="hover:text-blue-500">Cart</li>
      </ul>
    </div>
  );
};

export default Nav;
