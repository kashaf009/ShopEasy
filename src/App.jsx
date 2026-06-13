import React from "react";
import Container from "./components/Container";
import { Routes, Route } from "react-router-dom";
import NewSection from "./components/NewSection";
import Body from "./components/Body";
import Laptop from "./components/Laptop";
import Mobile from "./components/Mobile";
import Tablet from "./components/Tablet";
import Headphone from "./components/Headphone";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="/" element={<Container />} />
          <Route path="/new" element={<NewSection />} />
          <Route path="/laptop" element={<Laptop />} />
          <Route path="/mobile" element={<Mobile />} />
          <Route path="/tablet" element={<Tablet />} />
          <Route path="/headphone" element={<Headphone />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
