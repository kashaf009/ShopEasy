import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

// Helper functions (copied from Laptop.jsx)
const getRamSize = (ramStr) => {
  if (!ramStr) return "";
  const lower = ramStr.toLowerCase();
  if (lower.includes("8gb") || lower.includes("8 gb")) return "8GB";
  if (lower.includes("16gb") || lower.includes("16 gb")) return "16GB";
  if (lower.includes("32gb") || lower.includes("32 gb")) return "32GB";
  return ramStr;
};

const getStorageSize = (storageStr) => {
  if (!storageStr) return "";
  const lower = storageStr.toLowerCase();
  if (lower.includes("512gb") || lower.includes("512 gb")) return "512GB";
  if (lower.includes("1tb") || lower.includes("1 tb")) return "1TB";
  if (lower.includes("2tb") || lower.includes("2 tb")) return "2TB";
  return storageStr;
};

const getProcessorCategory = (procStr) => {
  if (!procStr) return "Other";
  const lower = procStr.toLowerCase();
  if (lower.includes("apple")) return "Apple Silicon";
  if (lower.includes("i9") || lower.includes("ultra 9"))
    return "Intel Core i9 / Ultra 9";
  if (lower.includes("i7") || lower.includes("ultra 7"))
    return "Intel Core i7 / Ultra 7";
  if (lower.includes("i5") || lower.includes("ultra 5"))
    return "Intel Core i5 / Ultra 5";
  if (lower.includes("i3")) return "Intel Core i3";
  if (lower.includes("ryzen 9")) return "AMD Ryzen 9";
  if (lower.includes("ryzen 7")) return "AMD Ryzen 7";
  if (lower.includes("ryzen 5")) return "AMD Ryzen 5";
  return "Other";
};

const NewSection = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [newArrival, setNewArrival] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedProcessors, setSelectedProcessors] = useState([]);
  const [selectedRam, setSelectedRam] = useState([]);
  const [selectedStorage, setSelectedStorage] = useState([]);
  const [maxPrice, setMaxPrice] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [priceRange, setPriceRange] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const fetchNewArrival = async () => {
      try {
        const res = await axios.get("/data/newArrival.json");
        setNewArrival(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error loading new arrivals:", err);
        setLoading(false);
      }
    };
    fetchNewArrival();
  }, []);

  // Compute dynamic price range & brand list when data loads
  useEffect(() => {
    if (newArrival.length > 0) {
      const prices = newArrival.map((i) => i.price);
      const max = Math.max(...prices);
      const min = Math.min(...prices);
      setMaxPrice(max);
      setMinPrice(min);
      setPriceRange(max);
    }
  }, [newArrival]);

  // Derived UI data
  const brands = [
    ...new Set(newArrival.map((i) => i.name.split(" ")[0])),
  ].sort();
  const processorCategories = [
    "Apple Silicon",
    "Intel Core i9 / Ultra 9",
    "Intel Core i7 / Ultra 7",
    "Intel Core i5 / Ultra 5",
    "Intel Core i3",
    "AMD Ryzen 9",
    "AMD Ryzen 7",
    "AMD Ryzen 5",
  ];
  const ramOptions = ["8GB", "16GB", "32GB"];
  const storageOptions = ["512GB", "1TB", "2TB"];

  // Helper toggles
  const handleBrandToggle = (brand) =>
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand],
    );
  const handleProcessorToggle = (proc) =>
    setSelectedProcessors((prev) =>
      prev.includes(proc) ? prev.filter((p) => p !== proc) : [...prev, proc],
    );
  const handleRamToggle = (ram) =>
    setSelectedRam((prev) =>
      prev.includes(ram) ? prev.filter((r) => r !== ram) : [...prev, ram],
    );
  const handleStorageToggle = (stor) =>
    setSelectedStorage((prev) =>
      prev.includes(stor) ? prev.filter((s) => s !== stor) : [...prev, stor],
    );
  const handleClearAll = () => {
    setSelectedBrands([]);
    setSelectedProcessors([]);
    setSelectedRam([]);
    setSelectedStorage([]);
    setPriceRange(maxPrice);
  };

  // Filtering logic
  const filtered = newArrival.filter((item) => {
    const brand = item.name.split(" ")[0];
    if (selectedBrands.length && !selectedBrands.includes(brand)) return false;
    if (item.price > priceRange) return false;
    const procCat = getProcessorCategory(item.specs?.processor);
    if (selectedProcessors.length && !selectedProcessors.includes(procCat))
      return false;
    const ramSize = getRamSize(item.specs?.ram);
    if (selectedRam.length && !selectedRam.includes(ramSize)) return false;
    const storageSize = getStorageSize(item.specs?.storage);
    if (selectedStorage.length && !selectedStorage.includes(storageSize))
      return false;
    return true;
  });

  const hasActiveFilters =
    selectedBrands.length ||
    selectedProcessors.length ||
    selectedRam.length ||
    selectedStorage.length ||
    priceRange < maxPrice;

  const filterIcon = (
    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
    </svg>
  );

  return (
    <div className="mt-20 sm:mt-24 md:mt-28 mb-12 sm:mb-20 px-4 md:px-8 font-['manrope'] max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6 sm:mb-8 border-b border-slate-100 pb-4 sm:pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-3 sm:gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 uppercase">
            New Arrivals
          </h2>
          <p className="font-medium text-slate-500 text-sm sm:text-base mt-1">
            Discover the latest in technology and design.
          </p>
        </div>
        <div className="text-xs sm:text-sm font-semibold text-slate-600 bg-slate-100 px-3 sm:px-4 py-2 rounded-full shadow-2xs whitespace-nowrap">
          Showing {filtered.length} of {newArrival.length} Items
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-slate-900" />
        </div>
      ) : (
        <>
          {/* Mobile / tablet filter toggle */}
          <button
            type="button"
            onClick={() => setIsFilterOpen((prev) => !prev)}
            aria-expanded={isFilterOpen}
            className="lg:hidden w-full flex items-center justify-between gap-2 bg-white border border-slate-200 rounded-2xl py-3 px-4 font-bold text-sm text-slate-900 shadow-sm cursor-pointer mb-4"
          >
            <span className="flex items-center gap-2">
              {filterIcon}
              {isFilterOpen ? "Hide Filters" : "Show Filters"}
              {hasActiveFilters && (
                <span className="bg-slate-900 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full">
                  Active
                </span>
              )}
            </span>
            <svg
              className={`w-5 h-5 text-slate-500 transition-transform duration-200 ${isFilterOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {/* Left: Filter Panel */}
          <div
            className={`lg:col-span-1 bg-white border border-slate-100 rounded-3xl p-4 sm:p-6 shadow-sm h-fit lg:sticky lg:top-24 max-h-[65vh] sm:max-h-[70vh] lg:max-h-[85vh] overflow-y-auto custom-scrollbar ${
              isFilterOpen ? "block" : "hidden lg:block"
            }`}
          >
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                {filterIcon}
                Filters
              </h3>
              <div className="flex items-center gap-3">
                {hasActiveFilters && (
                  <button
                    onClick={handleClearAll}
                    className="text-xs font-bold text-red-600 hover:text-red-700 hover:underline flex items-center gap-1 transition-all cursor-pointer"
                  >
                    Clear All
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setIsFilterOpen(false)}
                  className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 cursor-pointer"
                  aria-label="Close filters"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            {/* Brand Filter */}
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Brand
                </h4>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {brands.map((brand) => (
                    <label
                      key={brand}
                      className="flex items-center justify-between cursor-pointer group text-sm"
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand)}
                          onChange={() => handleBrandToggle(brand)}
                          className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900 accent-slate-900"
                        />
                        <span className="text-slate-700 group-hover:text-slate-950 font-medium transition-colors">
                          {brand}
                        </span>
                      </div>
                      <span className="text-xs text-slate-400 font-semibold bg-slate-50 px-2 py-0.5 rounded-md">
                        {
                          newArrival.filter(
                            (i) => i.name.split(" ")[0] === brand,
                          ).length
                        }
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              <hr className="border-slate-100" />

              {/* Price Filter */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Price
                  </h4>
                  <span className="text-sm font-bold text-slate-900">
                    Up to ₹{priceRange.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-slate-900 mb-4"
                />
                <div className="flex justify-between text-xs text-slate-400 font-bold mb-4">
                  <span>₹{minPrice.toLocaleString()}</span>
                  <span>₹{maxPrice.toLocaleString()}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[80000, 130000, 180000].map((val) => (
                    <button
                      key={val}
                      onClick={() => setPriceRange(val)}
                      className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg border transition-all ${priceRange === val ? "bg-slate-900 border-transparent text-white shadow-xs" : "bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"}`}
                    >{`Under ₹${(val / 1000).toLocaleString()}K`}</button>
                  ))}
                </div>
              </div>
              <hr className="border-slate-100" />

              {/* Processor Filter */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Processor
                </h4>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {processorCategories.map((proc) => {
                    const count = newArrival.filter(
                      (i) => getProcessorCategory(i.specs?.processor) === proc,
                    ).length;
                    if (count === 0) return null;
                    return (
                      <label
                        key={proc}
                        className="flex items-center justify-between cursor-pointer group text-sm"
                      >
                        <div className="flex items-center gap-2.5">
                          <input
                            type="checkbox"
                            checked={selectedProcessors.includes(proc)}
                            onChange={() => handleProcessorToggle(proc)}
                            className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900 accent-slate-900"
                          />
                          <span className="text-slate-700 group-hover:text-slate-950 font-medium transition-colors">
                            {proc}
                          </span>
                        </div>
                        <span className="text-xs text-slate-400 font-semibold bg-slate-50 px-2 py-0.5 rounded-md">
                          {count}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
              <hr className="border-slate-100" />

              {/* RAM Filter */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  RAM
                </h4>
                <div className="flex flex-wrap gap-2">
                  {ramOptions.map((ram) => {
                    const isActive = selectedRam.includes(ram);
                    return (
                      <button
                        key={ram}
                        onClick={() => handleRamToggle(ram)}
                        className={`text-xs font-bold px-3.5 py-2 rounded-xl border transition-all ${isActive ? "bg-slate-900 border-transparent text-white shadow-sm" : "bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100"}`}
                      >
                        {ram}
                      </button>
                    );
                  })}
                </div>
              </div>
              <hr className="border-slate-100" />

              {/* Storage Filter */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Storage
                </h4>
                <div className="flex flex-wrap gap-2">
                  {storageOptions.map((st) => {
                    const isActive = selectedStorage.includes(st);
                    return (
                      <button
                        key={st}
                        onClick={() => handleStorageToggle(st)}
                        className={`text-xs font-bold px-3.5 py-2 rounded-xl border transition-all ${isActive ? "bg-slate-900 border-transparent text-white shadow-sm" : "bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100"}`}
                      >
                        {st}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Apply on mobile — closes panel after viewing results */}
            <button
              type="button"
              onClick={() => setIsFilterOpen(false)}
              className="lg:hidden w-full mt-4 bg-slate-900 text-white font-bold text-sm py-3 rounded-xl hover:bg-slate-800 transition-all cursor-pointer"
            >
              View {filtered.length} Result{filtered.length !== 1 ? "s" : ""}
            </button>
          </div>

          {/* Right: Items Grid */}
          <div className="lg:col-span-3">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center py-20 bg-slate-50/50 border border-dashed border-slate-200 rounded-3xl p-8">
                <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-4">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  No items match your criteria
                </h3>
                <p className="text-slate-500 text-sm max-w-sm mb-6">
                  Try adjusting your filters or clearing them to see all items.
                </p>
                <button
                  onClick={handleClearAll}
                  className="bg-slate-900 text-white font-bold text-sm px-6 py-3 rounded-2xl hover:bg-slate-800 transition-all shadow-md flex items-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {filtered.map((item) => {
                  const { id, name, price, description, image, specs } = item;
                  return (
                    <div
                      key={id}
                      onClick={() => navigate(`/product/${item.category || 'new'}/${id}`)}
                      className="group bg-white border border-slate-100 rounded-2xl sm:rounded-3xl shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden min-h-0 sm:min-h-[420px] cursor-pointer"
                    >
                      <div className="relative aspect-[4/3] sm:aspect-video w-full overflow-hidden bg-slate-50 block">
                        <img
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          src={image}
                          alt={name}
                          loading="lazy"
                        />
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs font-bold text-xs text-slate-800 px-3 py-1 rounded-full shadow-xs">
                          {name.split(" ")[0]}
                        </div>
                      </div>
                      <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between">
                        <div>
                            <h4
                              className="text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 sm:line-clamp-1 mb-1"
                              title={name}
                            >
                              {name}
                            </h4>
                          <p className="text-base sm:text-lg font-black text-slate-900 mb-2 sm:mb-3">
                            ₹{price.toLocaleString()}
                          </p>
                          {/* Specs badges */}
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {specs?.processor && (
                              <span className="text-[10px] font-bold bg-slate-50 border border-slate-100 text-slate-600 px-2.5 py-1 rounded-lg flex items-center gap-1">
                                <svg
                                  className="w-3 h-3 text-slate-500"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2.5"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M15.75 3v1.5m-7.5 15v1.5m7.5-1.5v1.5M8.25 18v-1.5m7.5 1.5v-1.5m-7.5-3h7.5M9 15h1.5m3 0H15m-4.5-3H15m-6-6h7.5A2.25 2.25 0 0118 8.25v7.5A2.25 2.25 0 0115.75 18H8.25A2.25 2.25 0 016 15.75v-7.5A2.25 2.25 0 018.25 6z"
                                  />
                                </svg>
                                {specs.processor.split("(")[0].trim().replace("10-core CPU, 10-core GPU", "").trim()}
                              </span>
                            )}
                            {specs?.ram && (
                              <span className="text-[10px] font-bold bg-slate-50 border border-slate-100 text-slate-600 px-2.5 py-1 rounded-lg flex items-center gap-1">
                                <svg
                                  className="w-3 h-3 text-slate-500"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2.5"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 20.25h12m-12-3h12m-12-3h12m-12-3h12m-12-3h12m-12-3h12"
                                  />
                                </svg>
                                {getRamSize(specs.ram)}
                              </span>
                            )}
                            {specs?.storage && (
                              <span className="text-[10px] font-bold bg-slate-50 border border-slate-100 text-slate-600 px-2.5 py-1 rounded-lg flex items-center gap-1">
                                <svg
                                  className="w-3 h-3 text-slate-500"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2.5"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125v-3.75m16.5 0v3.75m-16.5-3.75v3.75"
                                  />
                                </svg>
                                {getStorageSize(specs.storage)}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                            {description}
                          </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-3 sm:mt-4 pt-3 border-t border-slate-50">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              addToCart(item);
                            }}
                            className="flex-1 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-bold py-2 sm:py-2.5 px-3 rounded-xl hover:bg-slate-50 text-xs transition-all cursor-pointer"
                          >
                            Add to Cart
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              addToCart(item);
                            }}
                            className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 sm:py-2.5 px-3 rounded-xl text-xs transition-all shadow-xs cursor-pointer"
                          >
                            Buy Now
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        </>
      )}
    </div>
  );
};

export default NewSection;
