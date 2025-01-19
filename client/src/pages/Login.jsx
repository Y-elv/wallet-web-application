import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const Login = () => {
  
  const toast = useToast(); 
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!email || !password) {
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
        "https://wallet-web-application-bxne.onrender.com/api/v1/users/login",
        { email, password },
        config
      );

      console.log("Data received from login endpoint:", data);

      toast({
        title: "Login successful!",
        description: "You have successfully logged in.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      setIsLoggedIn(true);
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Invalid Credentials!",
        description: "Incorrect Email or password.",
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
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <SignUpLink>
          Don't have an account? <Link to="/sign-up">Create one</Link>
        </SignUpLink>
      </div>
    </Wrapper>
  );
};

export default Login;

// styles
const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #1a73e8;
  color: #fff;

  div {
    background: rgba(255, 255, 255, 0.9);
    padding: 2rem;
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
    margin-bottom: 1rem;
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

const SignUpLink = styled.div`
  margin-top: 1rem;
  text-align: center;
  font-size: 1rem;

  a {
    color: #1a73e8;
    text-decoration: none;
    font-weight: bold;
  }

  a:hover {
    text-decoration: underline;
  }
`;
