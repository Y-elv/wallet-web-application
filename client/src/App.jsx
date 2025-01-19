import { Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./components/Dashboard/Layout";

function App() {

  return (
    <div>
      <Routes>
        <Route path="/dashboard" element={<Layout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
