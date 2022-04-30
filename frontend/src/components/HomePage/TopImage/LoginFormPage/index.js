import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../../../store/session";
import "./LoginForm.css";

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/myHome" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    return dispatch(login({ credential, password })).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
  };

  return (
    <div>
      <h1>LoginFormPage</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Username
          <input
            type="username"
            placeholder="Username"
            required
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
          />
        </label>
        <label>
          Password
          <input
            type="Password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default LoginFormPage;
