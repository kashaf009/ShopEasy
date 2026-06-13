import React from "react";
import Nav from "./Nav";
import CartDrawer from "./CartDrawer";
import { Outlet } from "react-router-dom";

const Body = () => {
  return (
    <div>
      <Nav />
      <CartDrawer />
      <Outlet />
    </div>
  );
};

export default Body;
