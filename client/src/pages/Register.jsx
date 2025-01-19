import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const Register = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.username || !formData.email || !formData.password) {
      toast({
        title: "Please fill all fields!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "https://wallet-web-application-bxne.onrender.com/api/v1/users/register",
        formData,
        config
      );

      toast({
        title: "Registration successful!",
        description: "You have successfully registered.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/login");
    } catch (error) {
      toast({
        title: "Registration failed!",
        description: error.response?.data?.message || "Invalid Input.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <div>
        <Logo>Wallet</Logo>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <LoginLink>
          Have an account? <Link to="/login">Login</Link>
        </LoginLink>
      </div>
    </Wrapper>
  );
};

export default Register;

// styles
const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  height: 100vh;
  background-color: #1a73e8;
  color: #fff;

  div {
    background: rgba(255, 255, 255, 0.9);
    padding: 3.5rem;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    color: #333;
  }

  h2 {
    text-align: center;
    margin-bottom: 1rem;
    font-size: 2rem;
    color: #1a73e8;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  label {
    margin-bottom: 0.5rem;
    font-weight: bold;
  }

  input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;
  }

  button {
    padding: 0.75rem;
    border: none;
    border-radius: 5px;
    background: #1a73e8;
    color: #fff;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.3s ease;
    margin-top: 1rem;
  }

  button:hover {
    background: #155bb5;
  }

  button:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const Logo = styled.h1`
  text-align: center;
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #fff;
  font-family: "Arial", sans-serif;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const LoginLink = styled.div`
  margin-top: 1rem;
  font-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  height: 0vh;


  a {
    color: #1a73e8;
    text-decoration: none;
    font-weight: bold;
  }

  a:hover {
    text-decoration: underline;
  }
`;
