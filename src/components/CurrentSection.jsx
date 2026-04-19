import React from "react";
import { CiHeadphones, CiMobile3 } from "react-icons/ci";
import CollectionCard from "./CollectionCard";
import { IoLaptopOutline } from "react-icons/io5";
import { IoIosTabletPortrait } from "react-icons/io";

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
      icon: <IoIosTabletPortrait className="h-7 w-7" />,
      title: "Tablet",
      description: "The ultimate canvas for digital artisans.",
    },
    {
      icon: <CiHeadphones className="h-7 w-7" />,
      title: "Headphone",
      description: "Immersive audio meets intelligent noise cancellation.",
    },
  ];
  return (
    <div className="bg-gray-100 pl-7">
      <div className="pt-20">
        <p className="text-4xl font-['manrope'] font-bold mb-4">
          Curated Collections
        </p>
        <p className="text-slate-700 font-['manrope'] mb-10">
          Precision instruments for every professional workflow.
        </p>
      </div>

      <section
        onClick={(title) => {}}
        className="grid grid-cols-4 gap-5  pr-10"
      >
        {Collections.map((items) => (
          <CollectionCard
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
