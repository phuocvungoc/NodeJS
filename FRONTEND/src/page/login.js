import React from "react";
import axios from "axios";

const Login = () => {
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
      .catch((err) => console.log(err));
  };

  return (
    <main>
      <form className="product-form" type="submit" onSubmit={postLogin}>
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
