import React from "react";
import Nav from "./Nav";
import Home from "./Home";
import CurrentSection from "./CurrentSection";
import NewArrival from "./NewArrival";
import NewSection from "./newSection";

const Container = () => {
  return (
    <div>
      <Home />
      <CurrentSection />
      <NewArrival />
    </div>
  );
};

export default Container;
