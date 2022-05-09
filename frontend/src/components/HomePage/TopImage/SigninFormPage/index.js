import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../../../store/session";

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/discover" />;

  const handleDemoUser = async (e) => {
    e.preventDefault();
    setErrors([]);

    const credential = "Demo-lition";
    const password = "password";

    return dispatch(login({ credential, password })).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    return dispatch(login({ credential, password })).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
  };

  return (
    <div className="loginFormContainer">
      <h2>Sign in</h2>
      <form className="loginForm" onSubmit={handleSubmit}>
        <div className="errors">
          {errors.map((error, idx) => (
            <div key={idx}>{error}</div>
          ))}
        </div>
        <input
          id="usernameInput"
          type="username"
          placeholder="Username"
          required
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
        />
        <input
          id="passwordInput"
          type="Password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="button" type="submit">
          Continue
        </button>
      </form>
      <form onSubmit={handleDemoUser}>
        <button type="submit">Demo User</button>
      </form>
    </div>
  );
}

export default LoginFormPage;
