import React, { useEffect, useState } from "react";
import "@fontsource/manrope";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Headphone = () => {
  const { addToCart } = useCart();
  const [audioDevices, setAudioDevices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAudio = async () => {
      try {
        const res = await axios.get("/data/newArrival.json");
        const filtered = res.data.filter(
          (item) => item.category === "headphones" || item.category === "earbuds"
        );
        setAudioDevices(filtered);
        setLoading(false);
      } catch (err) {
        console.error("Error loading headphones:", err);
        setLoading(false);
      }
    };
    fetchAudio();
  }, []);

  return (
    <div className="mt-28 mb-20 px-4 md:px-8 font-['manrope'] max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 border-b border-slate-100 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 uppercase">
            Audio
          </h2>
          <p className="font-medium text-slate-500 text-base mt-1">
            Immersive high-fidelity audio, industry-leading active noise cancellation, and all-day comfort.
          </p>
        </div>
        <div className="text-sm font-semibold text-slate-600 bg-slate-100 px-4 py-2 rounded-full shadow-2xs">
          Showing {audioDevices.length} Audio Devices
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-slate-900"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {audioDevices.map((item) => {
            const { id, name, price, description, image, specs } = item;
            return (
              <div
                key={id}
                className="group bg-white border border-slate-100 rounded-3xl shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden h-[440px]"
              >
                {/* Image */}
                <Link to={`/product/${item.category || 'headphone'}/${id}`} className="relative aspect-video w-full overflow-hidden bg-slate-50 block">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={image}
                    alt={name}
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs font-bold text-xs text-slate-800 px-3 py-1 rounded-full shadow-xs">
                    {name.split(" ")[0]}
                  </div>
                </Link>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <Link to={`/product/${item.category || 'headphone'}/${id}`}>
                      <h4
                        className="text-base font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1 mb-1"
                        title={name}
                      >
                        {name}
                      </h4>
                    </Link>
                    <p className="text-lg font-black text-slate-900 mb-3">
                      ₹{price.toLocaleString()}
                    </p>

                    {/* Specs Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {specs?.anc && (
                        <span className="text-[10px] font-bold bg-slate-50 border border-slate-100 text-slate-600 px-2.5 py-1 rounded-lg flex items-center gap-1">
                          <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
                          </svg>
                          ANC: {specs.anc}
                        </span>
                      )}
                      {specs?.battery && (
                        <span className="text-[10px] font-bold bg-slate-50 border border-slate-100 text-slate-600 px-2.5 py-1 rounded-lg flex items-center gap-1">
                          <svg className="w-3 h-3 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                          </svg>
                          Battery: {specs.battery}
                        </span>
                      )}
                      {specs?.type && (
                        <span className="text-[10px] font-bold bg-slate-50 border border-slate-100 text-slate-600 px-2.5 py-1 rounded-lg flex items-center gap-1">
                          <svg className="w-3 h-3 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 0v15m0-15H9m10.5 15h-15V9h15Z" />
                          </svg>
                          {specs.type}
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

export default Headphone;
