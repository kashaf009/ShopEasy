import React from "react";
import "@fontsource/manrope";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Nav = () => {
  const navigate = useNavigate();
  const { totalItemsCount, setIsCartOpen } = useCart();

  return (
    <div className="fixed z-40 top-0 w-full pl-8 pt-5 pr-12 backdrop-blur-xl items-center flex gap-10 mx-auto justify-between pb-5 shadow-sm">
      {/* <img src="/img/shopEasy.png" alt="logo" className="w-40" /> */}
      <p
        onClick={() => navigate("/")}
        className="font-['manrope'] font-bold text-slate-900 tracking-tighter text-2xl cursor-pointer"
      >
        SHOPEASY
      </p>

      <ul className="ml-8 flex gap-7 list-none cursor-pointer">
        <li
          onClick={() => navigate("/")}
          className="hover:text-slate-900 transition-all duration-300 tracking-tight font-medium text-sm font-['manrope'] text-slate-500 cursor-pointer"
        >
          Home
        </li>
        <Link
          to="/new"
          className="hover:text-slate-900 transition-all duration-300 tracking-tight font-medium text-sm text-slate-500 font-['manrope']"
        >
          new
        </Link>
        <li
          onClick={() => navigate("/mobile")}
          className="hover:text-slate-900 transition-all duration-300 tracking-tight font-medium text-sm font-['manrope'] text-slate-500 cursor-pointer"
        >
          Mobile
        </li>
        <li
          onClick={() => navigate("/tablet")}
          className="hover:text-slate-900 transition-all duration-300 tracking-tight font-medium text-sm font-['manrope'] text-slate-500 cursor-pointer"
        >
          Tablet
        </li>
        <Link
          to="/laptop"
          className="hover:text-slate-900 transition-all duration-300 tracking-tight font-medium text-sm font-['manrope'] text-slate-500"
        >
          Laptop
        </Link>
        <li
          onClick={() => navigate("/headphone")}
          className="hover:text-slate-900 transition-all duration-300 tracking-tight font-medium text-sm font-['manrope'] text-slate-500 cursor-pointer"
        >
          Headphone
        </li>
      </ul>

      <div className="flex items-center gap-4">
        <label className="border-gray-500 border bg-gray-100 rounded-2xl w-40 sm:w-48 p-1">
          <input
            className="rounded-2xl w-[80%] bg-gray-100 pl-5 outline-none text-sm"
            type="text"
            placeholder="Search"
          />
        </label>
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative p-2 rounded-xl text-slate-700 hover:bg-slate-100 hover:text-slate-950 transition-all cursor-pointer flex items-center justify-center"
          aria-label="Open cart"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 1,0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0,1-1.12-1.243l1.264-12A1.125 1.125 0 0,1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1,1-.75 0 .375.375 0 0,1 .75 0Zm7.5 0a.375.375 0 1,1-.75 0 .375.375 0 0,1 .75 0Z"
            />
          </svg>
          {totalItemsCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-slate-900 text-white text-[10px] font-black h-5 w-5 rounded-full flex items-center justify-center border-2 border-white shadow-xs animate-fade-in">
              {totalItemsCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default Nav;
