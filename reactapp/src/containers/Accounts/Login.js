import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import axios from "axios";
import "./index.css";
import myConfig from "../../configs/config";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function formData() {
    const form_data = new FormData();

    form_data.append("username", email);
    form_data.append("password", password);
    form_data.append("grant_type", "password");
    form_data.append("client_id", "api");
    form_data.append(
      "client_secret",
      "H4s2b6ATJHBnmYcah9vxnpwuKJxQgEjbRo0TlmvDgVVgB02MYugfNGLpGU1w3Pz9CbRwoR9caGOw3zXOCv0GUS13udR8GAgMIYzLKBcBh5ErnFg7r8EW6gPw2jKVQnsm"
    );

    return form_data;
  }

  function handleSave(e) {
    e.preventDefault();

    const LOGIN_URL = `${myConfig.CRU_URL}/o/token/`;

    axios({
      baseURL: LOGIN_URL,
      method: "POST",
      data: formData(),
    })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          localStorage.setItem("user-token", res.data.access_token);
          toast("Login successfully.");
          window.location.href = "/";
        }
      })
      .catch((error) => {
        console.log("ERROR", error);
        toast("Email ou password invalid.");
      });
  }

  return (
    <div className="login_content">
      <section className="form">
        <form onSubmit={handleSave}>
          <h1>Login</h1>

          <input
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
          />
          <br />
          <input
            value={password}
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <br />
          <button className="button" type="submit">
            Enter
          </button>
          <br />
          <Link to="/signup" className="back-link">
            <FiLogIn size={16} color="b366ff" />
            I have no registration
          </Link>
        </form>
        <ToastContainer />
      </section>
    </div>
  );
};

export default Login;
