import React, { useState, useEffect, useRef } from "react";
import "@fontsource/manrope";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import axios from "axios";

const Nav = () => {
  const navigate = useNavigate();
  const { totalItemsCount, setIsCartOpen } = useCart();

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef(null);

  // Load all product data on mount
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const [mobileRes, laptopRes, newArrivalRes] = await Promise.all([
          axios.get("./data/mobile.json"),
          axios.get("./data/Laptop.json"),
          axios.get("./data/newArrival.json"),
        ]);

        const mobiles = mobileRes.data.map((item) => ({ ...item, source: "mobile" }));
        const laptops = laptopRes.data.map((item) => ({ ...item, source: "laptop" }));
        const newArrivals = newArrivalRes.data.map((item) => ({ ...item, source: "new" }));

        // Combine and deduplicate by name
        const combined = [...mobiles, ...laptops, ...newArrivals];
        const unique = combined.filter(
          (item, index, self) => index === self.findIndex((t) => t.name === item.name)
        );
        setAllProducts(unique);
      } catch (err) {
        console.error("Error loading products for search:", err);
      }
    };
    fetchAllProducts();
  }, []);

  // Real-time search filtering
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      setIsSearchOpen(false);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = allProducts.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.category?.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query) ||
        item.specs?.processor?.toLowerCase().includes(query)
    );
    setSearchResults(results.slice(0, 8)); // Limit to 8 results
    setIsSearchOpen(true);
  }, [searchQuery, allProducts]);

  // Close search on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleResultClick = (product) => {
    setSearchQuery("");
    setIsSearchOpen(false);
    setIsSearchFocused(false);
    navigate(`/product/${product.source}/${product.id}`);
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Escape") {
      setIsSearchOpen(false);
      setIsSearchFocused(false);
      setSearchQuery("");
    }
  };

  // Category label helper
  const getCategoryLabel = (source) => {
    switch (source) {
      case "mobile": return "Mobile";
      case "laptop": return "Laptop";
      case "new": return "New Arrival";
      default: return source;
    }
  };

  const getCategoryColor = (source) => {
    switch (source) {
      case "mobile": return "bg-blue-50 text-blue-700 border-blue-100";
      case "laptop": return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "new": return "bg-amber-50 text-amber-700 border-amber-100";
      default: return "bg-slate-50 text-slate-700 border-slate-100";
    }
  };

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
        {/* Search with real-time results */}
        <div ref={searchRef} className="relative">
          <label
            className={`flex items-center gap-2 border rounded-2xl px-3 py-1.5 transition-all duration-300 ${
              isSearchFocused
                ? "border-slate-400 bg-white shadow-md w-72"
                : "border-gray-500 bg-gray-100 w-40 sm:w-48"
            }`}
          >
            <svg
              className={`w-4 h-4 flex-shrink-0 transition-colors ${
                isSearchFocused ? "text-slate-900" : "text-slate-400"
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
            <input
              className="w-full bg-transparent outline-none text-sm font-['manrope'] text-slate-800 placeholder:text-slate-400"
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => {
                setIsSearchFocused(true);
                if (searchQuery.trim()) setIsSearchOpen(true);
              }}
              onKeyDown={handleSearchKeyDown}
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setIsSearchOpen(false);
                }}
                className="flex-shrink-0 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </label>

          {/* Search Results Dropdown */}
          {isSearchOpen && (
            <div className="absolute top-full right-0 mt-2 w-96 bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
              {/* Header */}
              <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {searchResults.length > 0
                    ? `${searchResults.length} result${searchResults.length !== 1 ? "s" : ""} found`
                    : "No results"}
                </p>
              </div>

              {searchResults.length > 0 ? (
                <div className="max-h-[420px] overflow-y-auto">
                  {searchResults.map((product) => (
                    <button
                      key={`${product.source}-${product.id}`}
                      onClick={() => handleResultClick(product)}
                      className="w-full flex items-center gap-4 px-4 py-3 hover:bg-slate-50 transition-colors text-left border-b border-slate-50 last:border-b-0 cursor-pointer group"
                    >
                      {/* Thumbnail */}
                      <div className="w-14 h-14 flex-shrink-0 rounded-xl overflow-hidden bg-slate-100 border border-slate-100">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <h4 className="text-sm font-bold text-slate-900 truncate group-hover:text-indigo-600 transition-colors">
                            {product.name}
                          </h4>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-black text-slate-800">
                            ₹{product.price.toLocaleString()}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${getCategoryColor(
                              product.source
                            )}`}
                          >
                            {getCategoryLabel(product.source)}
                          </span>
                        </div>
                      </div>

                      {/* Arrow */}
                      <svg
                        className="w-4 h-4 text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                      </svg>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="px-4 py-8 flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                  </div>
                  <p className="text-sm font-bold text-slate-700 mb-1">No products found</p>
                  <p className="text-xs text-slate-400">Try a different keyword or check the spelling</p>
                </div>
              )}
            </div>
          )}
        </div>

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
