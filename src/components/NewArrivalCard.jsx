import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NewArrivalCard = ({
  id,
  category,
  name,
  price,
  image,
  description,
  specs,
}) => {
  const navigate = useNavigate();

  if (!id) return null;

  return (
    <div
      className="shadow-md cursor-pointer hover:shadow-xl transition-all rounded-xl overflow-hidden h-full flex flex-col bg-white"
      onClick={() => navigate(`/product/${category || "new"}/${id}`)}
    >
      <img
        className="w-full h-40 sm:h-44 md:h-48 object-cover"
        src={image}
        alt={name}
      />

      <div className="px-4 sm:px-5 pt-4 sm:pt-5 flex items-start justify-between gap-2">
        <Link
          to={`/product/${category || "new"}/${id}`}
          className="flex-1 min-w-0"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="font-['manrope'] line-clamp-2 tracking-tight font-semibold text-sm sm:text-base md:text-lg leading-snug">
            {name}
          </p>
        </Link>
        <p className="font-['manrope'] tracking-tight font-bold text-sm sm:text-base md:text-lg text-slate-900 shrink-0">
          ₹{price.toLocaleString()}
        </p>
      </div>

      {description && (
        <p className="text-slate-500 px-4 sm:px-5 mt-2 mb-3 sm:mb-4 text-[11px] sm:text-xs line-clamp-2 leading-relaxed">
          {description}
        </p>
      )}

      {specs && (
        <div className="flex flex-wrap gap-1.5 px-4 sm:px-5 mb-3">
          {Object.entries(specs)
            .slice(0, 2)
            .map(([key, value]) => (
              <span
                key={key}
                className="text-[10px] font-bold bg-slate-50 border border-slate-100 text-slate-600 px-2 py-1 rounded-lg line-clamp-1 max-w-full truncate"
              >
                {`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`}
              </span>
            ))}
        </div>
      )}

      <div className="px-4 sm:px-5 mt-auto pb-4 sm:pb-5">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/product/${category || "new"}/${id}`);
          }}
          className="bg-white w-full border-2 border-slate-900 text-slate-900 font-medium px-4 py-2.5 sm:py-2 hover:bg-slate-800 hover:text-white transition-all cursor-pointer text-sm"
        >
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default NewArrivalCard;
