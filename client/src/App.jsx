import { Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Auth/login";
import Register from "./components/Auth/Register";

function App() {
  return <div>
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<Register/>} />
    </Routes>
  </div>;
}

export default App;
