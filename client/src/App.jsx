import { Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./components/Dashboard/Layout";
import Overview from "./pages/Overview";
import Accounts from "./pages/Accounts";
import Categories from "./pages/Categories";
import Budget from "./pages/Budget";
import Transactions from "./pages/Transactions";

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
        <Route
          path="/categories"
          element={
            <Layout>
              <Categories />
            </Layout>
          }
        />
        <Route
          path="/budget"
          element={
            <Layout>
              <Budget />
            </Layout>
          }
        />
        <Route
          path="/transactions"
          element={
            <Layout>
              <Transactions />
            </Layout>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
