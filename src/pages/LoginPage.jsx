import { useState } from "react";
import axios from "axios";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const API_URL = "http://localhost:5005";

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${API_URL}/auth/login`, { email, password })
      .then((response) => {
        console.log(response);
        const token = response.data.authToken;
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <>
      <h1>Login</h1>
      <form type="submit" onSubmit={handleLoginSubmit}>
        <label htmlFor="">Email:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="please enter your name"
        />
        <label htmlFor="">Password:</label>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="please enter your password"
        />
        <button>Login</button>
      </form>
    </>
  );
};
