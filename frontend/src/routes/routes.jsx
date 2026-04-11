import React from "react";
import Landingpg from "../pages/Landingpg";
import { Routes, Route } from "react-router-dom";

const routes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landingpg />} />
    </Routes>
  );
};

export default routes;
