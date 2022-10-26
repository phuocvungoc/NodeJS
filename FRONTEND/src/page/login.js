import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [err, setErr] = useState("");
  const postLogin = (e) => {
    e.preventDefault();
    const user = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    axios
      .post("http://localhost:3000/api/auth/login", user, {
        withCredentials: true,
      })
      .then((res) => {
        window.location.href = "http://localhost:3000/";
      })
      .catch((err) => {
        if (err.response.status == 422) {
          setErr(err.response.data);
        }
      });
  };

  return (
    <main>
      {err && <div className="user-message user-message--error">{err}</div>}
      <form
        className="product-form"
        type="submit"
        onSubmit={postLogin}
        noValidate
      >
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>
        <button className="btn" type="submit">
          Login
        </button>
      </form>
    </main>
  );
};

export default Login;
