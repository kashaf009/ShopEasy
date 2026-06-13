import React, { useEffect, useState } from "react";
import "@fontsource/manrope";
import axios from "axios";
import { useCart } from "../context/CartContext";

const Tablet = () => {
  const { addToCart } = useCart();
  const [tablets, setTablets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTablets = async () => {
      try {
        const res = await axios.get("./data/newArrival.json");
        const filtered = res.data.filter((item) => item.category === "tablet");
        setTablets(filtered);
        setLoading(false);
      } catch (err) {
        console.error("Error loading tablets:", err);
        setLoading(false);
      }
    };
    fetchTablets();
  }, []);

  return (
    <div className="mt-28 mb-20 px-4 md:px-8 font-['manrope'] max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 border-b border-slate-100 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 uppercase">
            Tablets
          </h2>
          <p className="font-medium text-slate-500 text-base mt-1">
            Discover the ultimate portable screen for creativity, illustration, and digital artisans.
          </p>
        </div>
        <div className="text-sm font-semibold text-slate-600 bg-slate-100 px-4 py-2 rounded-full shadow-2xs">
          Showing {tablets.length} Premium Tablets
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-slate-900"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tablets.map((item) => {
            const { id, name, price, description, image, specs } = item;
            return (
              <div
                key={id}
                className="group bg-white border border-slate-100 rounded-3xl shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden h-[440px]"
              >
                {/* Image */}
                <div className="relative aspect-video w-full overflow-hidden bg-slate-50">
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

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4
                      className="text-base font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1 mb-1"
                      title={name}
                    >
                      {name}
                    </h4>
                    <p className="text-lg font-black text-slate-900 mb-3">
                      ₹{price.toLocaleString()}
                    </p>

                    {/* Specs Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {specs?.processor && (
                        <span className="text-[10px] font-bold bg-slate-50 border border-slate-100 text-slate-600 px-2.5 py-1 rounded-lg flex items-center gap-1">
                          <svg className="w-3 h-3 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M15.75 3v1.5m-7.5 15v1.5m7.5-1.5v1.5M8.25 18v-1.5m7.5 1.5v-1.5m-7.5-3h7.5M9 15h1.5m3 0H15m-4.5-3H15m-6-6h7.5A2.25 2.25 0 0118 8.25v7.5A2.25 2.25 0 0115.75 18H8.25A2.25 2.25 0 016 15.75v-7.5A2.25 2.25 0 018.25 6z" />
                          </svg>
                          {specs.processor}
                        </span>
                      )}
                      {specs?.ram && (
                        <span className="text-[10px] font-bold bg-slate-50 border border-slate-100 text-slate-600 px-2.5 py-1 rounded-lg flex items-center gap-1">
                          <svg className="w-3 h-3 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-12-3h12m-12-3h12m-12-3h12m-12-3h12" />
                          </svg>
                          {specs.ram}
                        </span>
                      )}
                      {specs?.storage && (
                        <span className="text-[10px] font-bold bg-slate-50 border border-slate-100 text-slate-600 px-2.5 py-1 rounded-lg flex items-center gap-1">
                          <svg className="w-3 h-3 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75" />
                          </svg>
                          {specs.storage}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {description}
                    </p>
                  </div>

                  <div className="flex gap-3 mt-4 pt-3 border-t border-slate-50">
                    <button
                      onClick={() => addToCart(item)}
                      className="flex-1 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 font-bold py-2.5 px-3 rounded-xl hover:bg-slate-50 text-xs transition-all cursor-pointer"
                    >
                      Add to Cart
                    </button>
                    <button className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 px-3 rounded-xl text-xs transition-all shadow-xs cursor-pointer">
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
  );
};

export default Tablet;
