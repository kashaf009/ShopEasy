import React from "react";
import { CiHeadphones, CiMobile3 } from "react-icons/ci";
import CollectionCard from "./CollectionCard";
import { IoLaptopOutline } from "react-icons/io5";

const CurrentSection = () => {
  const Collections = [
    {
      icon: <CiMobile3 className="h-7 w-7" />,
      title: "Mobile",
      description: "Next-generation connectivity and camera systems.",
    },
    {
      icon: <IoLaptopOutline className="h-7 w-7" />,
      title: "Laptop",
      description: "Desktop power in a portable aluminum frame.",
    },
    {
      icon: <CiHeadphones className="h-7 w-7" />,
      title: "Headphone",
      description: "Immersive audio meets intelligent noise cancellation.",
    },
  ];
  return (
    <div className="bg-gray-100 px-4 sm:px-6 md:px-8 lg:pl-7 lg:pr-10">
      <div className="pt-12 sm:pt-16 md:pt-20 max-w-7xl mx-auto lg:max-w-none">
        <p className="text-2xl sm:text-3xl md:text-4xl font-['manrope'] font-bold mb-3 sm:mb-4">
          Curated Collections
        </p>
        <p className="text-slate-700 font-['manrope'] mb-6 sm:mb-10 text-sm sm:text-base">
          Precision instruments for every professional workflow.
        </p>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 pb-12 sm:pb-16 md:pb-20 max-w-7xl mx-auto lg:max-w-none">
        {Collections.map((items) => (
          <CollectionCard
            key={items.title}
            icon={items.icon}
            title={items.title}
            description={items.description}
          />
        ))}
      </section>
    </div>
  );
};

export default CurrentSection;
