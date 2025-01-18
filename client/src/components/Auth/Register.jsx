import React, { useState } from "react";
import styled from "styled-components";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
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
            />
      
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
    
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
       
          <button type="submit">Register</button>
        </form>
      </div>
    </Wrapper>
  );
};

export default Register;

//// styles
const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  height: 105vh;
  background-color: #1a73e8;
  color: #fff;

  div {
    background: rgba(255, 255, 255, 0.9); /* White background for the form */
    padding: 5rem;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    color: #333; /* Dark text color inside the form */
  }

  h2 {
    text-align: center;
    margin-bottom: 1rem;
    font-size: 2rem;
    color: #1a73e8; /* Blue color for the heading */
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  div > div {
    margin-bottom: 1rem;
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
    background: #1a73e8; /* Blue background for the button */
    color: #fff;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.3s ease;
    margin-top: 1rem;
  }

  button:hover {
    background: #155bb5; /* Darker blue on hover */
  }
`;

const Logo = styled.h1`
  text-align: center;
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #fff; /* White color for the logo */
  font-family: "Arial", sans-serif;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;


