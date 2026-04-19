import React from "react";
import NewArrivalCard from "./NewArrivalCard";

const NewArrival = () => {
  const newArrivals = [
    {
      id: 1,
      category: "laptop",
      name: "Apple MacBook Air M5 (13-inch)",
      price: 114900,
      launched: "March 2026",
      specs: {
        processor: "Apple M5 (10-core CPU, 10-core GPU)",
        ram: "16GB Unified Memory",
        storage: "512GB SSD",
        display: "13.6-inch Liquid Retina",
        battery: "Up to 18 hours",
        os: "macOS Tahoe",
      },
      description:
        "World's most popular laptop with M5 chip, 4x faster AI performance, Wi-Fi 7, and 512GB base storage.",
      image:
        "https://www.macworld.com/wp-content/uploads/2026/03/MacBook-Air.jpg?quality=50&strip=all&w=1024",
    },
    {
      id: 2,
      category: "laptop",
      name: "Dell XPS 14 (2026)",
      price: 139999,
      launched: "January 2026",
      specs: {
        processor: "Intel Core Ultra X9 (Panther Lake)",
        ram: "32GB LPDDR5X",
        storage: "1TB PCIe 5.0 SSD",
        display: "14.5-inch Tandem OLED, 120Hz",
        battery: "Up to 14 hours",
        os: "Windows 11",
      },
      description:
        "Dell's best ultrabook in years — Tandem OLED panel and Panther Lake chip make it a true MacBook Pro rival.",
      image:
        "https://i.pcmag.com/imagery/articles/01rSDv7tr5B90bVop0yIQzk-12..v1766421652.jpg",
    },
    {
      id: 3,
      category: "tablet",
      name: "Apple iPad Air 11-inch (M4, 2026)",
      price: 74900,
      launched: "March 2026",
      specs: {
        processor: "Apple M4",
        ram: "8GB",
        storage: "128GB",
        display: "11-inch Liquid Retina, 60Hz",
        battery: "Up to 10 hours",
        os: "iPadOS 19",
      },
      description:
        "2026's refined iPad Air with M4 chip and Apple Intelligence — perfect balance of price and power.",
      image:
        "https://www.apple.com/v/ipad-air/ag/images/meta/ipad-air_overview__bc2fd15uec0y_og.png?202603160105",
    },
    {
      id: 4,
      category: "tablet",
      name: "Samsung Galaxy Tab S11 Ultra",
      price: 129999,
      launched: "January 2026",
      specs: {
        processor: "Snapdragon 8 Elite Gen 2",
        ram: "12GB",
        storage: "256GB",
        display: "14.6-inch Dynamic AMOLED 2X, 120Hz",
        battery: "11200 mAh",
        os: "One UI 8 (Android 16)",
      },
      description:
        "Samsung's ultimate tablet with S Pen — best large-screen drawing and productivity device of 2026.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdQk-8J9Y3r_Z9Sm0RYz6rU2pfYTVPMWBaWg&s",
    },
    {
      id: 5,
      category: "headphones",
      name: "Sony WH-1000XM6",
      price: 34999,
      launched: "February 2026",
      specs: {
        type: "Over-ear wireless",
        anc: "Yes – Industry-leading ANC",
        battery: "30 hours ANC on",
        connectivity: "Bluetooth 5.3, LDAC, aptX Lossless",
        audio: "360 Reality Audio",
        charging: "USB-C, 3-min quick charge = 3hrs",
      },
      description:
        "Sony's best-ever noise-cancelling headphones — cross-platform king with LDAC, aptX Lossless, and 30hr battery.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi0ONHP2vg2bq-PxKbADp3Ahxsxhv-5YB3sg&s",
    },
  ];
  return (
    <div className="mt-20 pl-7 mb-10">
      <p className="text-4xl font-['manrope'] font-bold mb-7">
        <span className="text-slate-900 border-b-3">New</span> Arrivals
      </p>
      <p className="text-slate-700 font-['manrope'] mb-10">
        Discover the latest in technology and design.
      </p>

      <section className="grid grid-cols-2 gap-5 pr-10">
        {/* left section */}
        <section className="">
          <div className="shadow-md ">
            <img className="w-full" src={newArrivals[0].image} />
            <div className="flex px-7 justify-between mt-10">
              <p className="font-['manrope'] text-2xl font-bold">
                {newArrivals[0].name}
              </p>
              <p className="font-['manrope'] tracking-tighter text-2xl font-semibold">
                ₹{newArrivals[0].price}
              </p>
            </div>
            <p className="px-7 text-[14px] pt-2 text-slate-600 ">
              {newArrivals[0].description}
            </p>

            <div className="px-7 ">
              <button className="bg-white border-2 border-slate-900 w-full mt-5 mb-10 text-slate-900 font-medium px-5 py-3 hover:bg-slate-800 hover:text-white transition-all duration-300">
                Shop Now
              </button>
            </div>
          </div>
        </section>

        {/* right section */}
        <section className="grid grid-cols-2 gap-5">
          {newArrivals.slice(1).map((items) => (
            <NewArrivalCard
              key={items.id}
              image={items.image}
              name={items.name}
              price={items.price}
              description={
                items.specs?.processor
                  ? items.specs?.processor
                  : items.specs?.battery
              }
            />
          ))}
        </section>
      </section>
    </div>
  );
};

export default NewArrival;
