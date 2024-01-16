import React, { useState } from "react";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = { username, password };
    try {
      const response = await fetch("http://localhost:3002/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.message === "User Registration Successful") {
            window.location.href = '/';
        } else {
          console.error("Registration failed");
        }
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="container">
      <div className="board">
        <h1 className="heading">Mokaro.</h1>
      </div>
      <div className="login">
        <div className="forms">
          <h1 className="form_heading">Register</h1>
          <p className="form_subHeading">Sign up for an account</p>

          <div className="login_card">
            <form className="form" onSubmit={handleSubmit}>
              <div className="form_group">
                <label htmlFor="username" className="label">
                  Username
                </label>
                <input
                  required
                  name="username"
                  id="username"
                  type="text"
                  className="input"
                  value={username}
                  onChange={handleUsernameChange}
                />
              </div>
              <div className="form_group">
                <label htmlFor="password" className="label">
                  Password
                </label>
                <input
                  required
                  name="password"
                  id="password"
                  type="password"
                  className="input"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="form_group">
                <input value="Sign Up" type="submit" className="input" />
              </div>
            </form>
          </div>
          <p className="register">
            Already have an account?{" "}
            <Link className="link" to="/login">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
