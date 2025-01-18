import React, { useState } from 'react';
import styled from "styled-components";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle login logic here
        console.log('Email:', email);
        console.log('Password:', password);
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
   
            <button type="submit">Login</button>
          </form>
        </div>
      </Wrapper>
    );
};

export default Login;

//// styles
const Wrapper = styled.section`
display: flex;
justify-content: center;
align-items: center;
height: 100vh;
background-color: #1a73e8; /* Blue background */
color: #fff;

div {
    background: rgba(255, 255, 255, 0.9); /* White background for the form */
    padding: 2rem;
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
    background: #1a73e8; /* Blue background for the button */
    color: #fff;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.3s ease;
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
font-family: 'Arial', sans-serif;
font-weight: bold;
text-transform: uppercase;
letter-spacing: 0.1em;
`;

