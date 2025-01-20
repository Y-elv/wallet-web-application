import { Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./components/Dashboard/Layout";
import Overview from "./pages/Overview";
import Accounts from "./pages/Accounts";

function App() {

  return (
    <div>
      <Routes>
        <Route
          path="overview"
          element={
            <Layout>
              <Overview />
            </Layout>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
        <Route
          path="/accounts"
          element={
            <Layout>
              <Accounts />
            </Layout>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
