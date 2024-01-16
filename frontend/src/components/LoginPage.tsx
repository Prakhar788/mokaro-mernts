import React, { useState } from "react";
import { Link } from "react-router-dom";

interface FormData {
  username: string;
  password: string;
}

const LoginPage = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://localhost:3002/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.message === "User Login Successful") {
            window.location.href = '/';
        } else {
          console.error("Registration failed");
          window.location.href = '/';
        }
      } else {
        console.error("Registration failed");
        window.location.href = '/';
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
          <h1 className="form_heading">Sign In</h1>
          <p className="form_subHeading">Sign in to your account</p>

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
                  value={formData.username} // Set value to formData
                  onChange={handleChange}   // Handle onChange event
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
                  value={formData.password} // Set value to formData
                  onChange={handleChange}   // Handle onChange event
                />
              </div>
              <a href="/" className="link">
                Forgot password?
              </a>
              <div className="form_group">
                <input value="Sign In" type="submit" className="input" />
              </div>
            </form>
          </div>
          <p className="register">
            Don't have an account?{" "}
            <Link className="link" to="/register">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
