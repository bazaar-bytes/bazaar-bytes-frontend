import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const API_URL = "http://localhost:5005";

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${API_URL}/auth/signup`, { name, email, password })
      .then((response) => {
        console.log(response);
        navigate("/login");
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <h1>SignUp</h1>
      <form typeof="submit" onSubmit={handleSignupSubmit}>
        <label htmlFor="">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="Email:">Email:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Signup</button>
      </form>
    </>
  );
};
