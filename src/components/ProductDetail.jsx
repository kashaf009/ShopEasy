import React, { useEffect, useState } from "react";
import "@fontsource/manrope";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const { source, id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        let dataUrl = "";
        if (source === "mobile") dataUrl = "./data/mobile.json";
        else if (source === "laptop") dataUrl = "./data/Laptop.json";
        else if (source === "new") dataUrl = "./data/newArrival.json";
        else dataUrl = "./data/newArrival.json";

        const res = await axios.get(dataUrl);
        const found = res.data.find((item) => String(item.id) === String(id));
        setProduct(found || null);
        setLoading(false);
      } catch (err) {
        console.error("Error loading product:", err);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [source, id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    if (!product) return;
    addToCart(product);
  };

  // Build specs entries dynamically
  const getSpecEntries = () => {
    if (!product?.specs) return [];
    return Object.entries(product.specs).filter(
      ([, value]) => value && value !== "N/A"
    );
  };

  const getSpecIcon = (key) => {
    switch (key.toLowerCase()) {
      case "processor":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M15.75 3v1.5m-7.5 15v1.5m7.5-1.5v1.5M8.25 18v-1.5m7.5 1.5v-1.5m-7.5-3h7.5M9 15h1.5m3 0H15m-4.5-3H15m-6-6h7.5A2.25 2.25 0 0118 8.25v7.5A2.25 2.25 0 0115.75 18H8.25A2.25 2.25 0 016 15.75v-7.5A2.25 2.25 0 018.25 6z" />
          </svg>
        );
      case "ram":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-12-3h12m-12-3h12m-12-3h12m-12-3h12" />
          </svg>
        );
      case "storage":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375" />
          </svg>
        );
      case "display":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25z" />
          </svg>
        );
      case "battery":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 10.5h.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H21M3.75 18h15A2.25 2.25 0 0021 15.75v-6a2.25 2.25 0 00-2.25-2.25h-15A2.25 2.25 0 001.5 9.75v6A2.25 2.25 0 003.75 18z" />
          </svg>
        );
      case "os":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
          </svg>
        );
    }
  };

  const getSpecLabel = (key) => {
    const labels = {
      processor: "Processor",
      ram: "Memory (RAM)",
      storage: "Storage",
      display: "Display",
      battery: "Battery",
      os: "Operating System",
      type: "Type",
      anc: "Active Noise Cancellation",
      connectivity: "Connectivity",
      sensor: "Sensor",
      video: "Video",
      refreshRate: "Refresh Rate",
      dpi: "DPI",
      waterproof: "Water Resistance",
      resolution: "Resolution",
    };
    return labels[key] || key.charAt(0).toUpperCase() + key.slice(1);
  };

  if (loading) {
    return (
      <div className="mt-28 mb-20 px-4 md:px-8 font-['manrope'] max-w-7xl mx-auto">
        <div className="flex justify-center items-center py-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-slate-900"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mt-28 mb-20 px-4 md:px-8 font-['manrope'] max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center py-40 text-center">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Product Not Found</h2>
          <p className="text-slate-500 mb-8 max-w-md">The product you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate("/")}
            className="bg-slate-900 text-white font-bold text-sm px-8 py-3.5 rounded-2xl hover:bg-slate-800 transition-all shadow-md shadow-slate-900/10 flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const specEntries = getSpecEntries();

  return (
    <div className="mt-28 mb-20 px-4 md:px-8 font-['manrope'] max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm">
        <button onClick={() => navigate("/")} className="text-slate-400 hover:text-slate-700 font-medium transition-colors">
          Home
        </button>
        <svg className="w-3.5 h-3.5 text-slate-300" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
        <button
          onClick={() => navigate(`/${source === "new" ? "new" : source}`)}
          className="text-slate-400 hover:text-slate-700 font-medium transition-colors capitalize"
        >
          {source === "new" ? "New Arrivals" : source + "s"}
        </button>
        <svg className="w-3.5 h-3.5 text-slate-300" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
        <span className="text-slate-900 font-semibold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Left: Image */}
        <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
          <div className="relative aspect-square w-full bg-slate-50 flex items-center justify-center p-8">
            <img
              src={product.image}
              alt={product.name}
              className="max-w-full max-h-full object-contain rounded-2xl"
            />
            {/* Brand badge */}
            <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-sm font-bold text-xs text-slate-800 px-4 py-1.5 rounded-full shadow-sm border border-slate-100">
              {product.name.split(" ")[0]}
            </div>
            {/* Category badge */}
            {product.category && (
              <div className="absolute top-5 right-5 bg-slate-900 text-white font-bold text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm">
                {product.category}
              </div>
            )}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col justify-between">
          <div>
            {/* Title */}
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2 leading-tight">
              {product.name}
            </h1>

            {/* Launched */}
            {product.launched && (
              <p className="text-sm font-medium text-slate-400 mb-5 flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
                Launched: {product.launched}
              </p>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-black text-slate-900">
                ₹{product.price.toLocaleString()}
              </span>
              <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                Inclusive of all taxes
              </span>
            </div>

            {/* Description */}
            <p className="text-base text-slate-600 leading-relaxed mb-8 max-w-lg">
              {product.description}
            </p>

            {/* Quick Spec Badges */}
            {product.specs && (
              <div className="flex flex-wrap gap-2 mb-8">
                {product.specs.processor && product.specs.processor !== "N/A" && (
                  <span className="text-xs font-bold bg-slate-50 border border-slate-100 text-slate-600 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M15.75 3v1.5m-7.5 15v1.5m7.5-1.5v1.5M8.25 18v-1.5m7.5 1.5v-1.5m-7.5-3h7.5M9 15h1.5m3 0H15m-4.5-3H15m-6-6h7.5A2.25 2.25 0 0118 8.25v7.5A2.25 2.25 0 0115.75 18H8.25A2.25 2.25 0 016 15.75v-7.5A2.25 2.25 0 018.25 6z" />
                    </svg>
                    {product.specs.processor}
                  </span>
                )}
                {product.specs.ram && product.specs.ram !== "N/A" && (
                  <span className="text-xs font-bold bg-slate-50 border border-slate-100 text-slate-600 px-3 py-1.5 rounded-xl">
                    {product.specs.ram} RAM
                  </span>
                )}
                {product.specs.storage && product.specs.storage !== "N/A" && (
                  <span className="text-xs font-bold bg-slate-50 border border-slate-100 text-slate-600 px-3 py-1.5 rounded-xl">
                    {product.specs.storage}
                  </span>
                )}
                {product.specs.display && (
                  <span className="text-xs font-bold bg-slate-50 border border-slate-100 text-slate-600 px-3 py-1.5 rounded-xl">
                    {product.specs.display}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className={`flex-1 font-bold py-4 px-6 rounded-2xl text-sm transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 ${
                  addedToCart
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20"
                    : "bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50"
                }`}
              >
                {addedToCart ? (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                    Add to Cart
                  </>
                )}
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-6 rounded-2xl text-sm transition-all shadow-lg shadow-slate-900/15 cursor-pointer flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
                Buy Now
              </button>
            </div>

            {/* Delivery info */}
            <div className="flex items-center gap-6 mt-4 px-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
                Free Delivery
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                1 Year Warranty
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
                7 Day Returns
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Specifications */}
      {specEntries.length > 0 && (
        <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
          <h2 className="text-xl font-extrabold text-slate-900 mb-6 flex items-center gap-2">
            <svg className="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
            </svg>
            Full Specifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {specEntries.map(([key, value]) => (
              <div
                key={key}
                className="flex items-center gap-4 bg-slate-50/70 border border-slate-100 rounded-2xl px-5 py-4 hover:bg-slate-50 transition-colors"
              >
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-500 border border-slate-100 flex-shrink-0">
                  {getSpecIcon(key)}
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                    {getSpecLabel(key)}
                  </p>
                  <p className="text-sm font-bold text-slate-900">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
