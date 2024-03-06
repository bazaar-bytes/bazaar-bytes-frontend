import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const API_URL = "http://localhost:5005";

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${API_URL}/auth/login`, { email, password })
      .then((response) => {
        console.log(response);
        const token = response.data.authToken;
        storeToken(token);
        authenticateUser();
        navigate("/");
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
