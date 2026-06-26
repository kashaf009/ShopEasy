import React from "react";
import Container from "./components/Container";
import { Routes, Route } from "react-router-dom";

import Body from "./components/Body";
import Laptop from "./components/Laptop";
import Mobile from "./components/Mobile";
import Headphone from "./components/Headphone";
import ProductDetail from "./components/ProductDetail";
import NewproductSection from "./components/NewproductSection";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="/" element={<Container />} />
          <Route path="/new" element={<NewproductSection />} />
          <Route path="/laptop" element={<Laptop />} />
          <Route path="/mobile" element={<Mobile />} />

          <Route path="/headphone" element={<Headphone />} />
          <Route path="/product/:source/:id" element={<ProductDetail />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
