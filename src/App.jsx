import React from "react";
import Container from "./components/container";
import { Routes, Route } from "react-router-dom";
import NewSection from "./components/NewSection";
import Body from "./components/Body";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="/" element={<Container />} />
          <Route path="new" element={<NewSection />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
