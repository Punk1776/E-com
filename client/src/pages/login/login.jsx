// Login.jsx
import React, { useState } from "react";
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations'; // Import login mutation from the utils folder

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [loginUser] = useMutation(LOGIN_USER, {
    onError: (error) => {
      setError(error.message);
    },
    onCompleted: (data) => {
      console.log(data); // Handle success: redirect, update state, etc.
    }
  });

  const handleLogin = async () => {
    try {
      await loginUser({ variables: { email, password } });
    } catch (error) {
      setError("Something went wrong");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <div>
        <label>Email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;
