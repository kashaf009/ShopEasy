import React from "react";
import Nav from "./Nav";
import Home from "./Home";
import CurrentSection from "./CurrentSection";
import NewArrival from "./NewArrival";

const Container = () => {
  return (
    <div>
      <Nav />
      <Home />
      <CurrentSection />
      <NewArrival />
    </div>
  );
};

export default Container;
