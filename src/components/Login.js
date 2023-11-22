import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:9000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // redirect and save the auth token
      localStorage.setItem("token", json.authtoken);
      navigate("/");
      props.showAlert("Login Successfully", "success");
    } else {
      props.showAlert("Invalid Creadentials", "danger")
    }
  };
  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
  
    <div style={{display: "flex", justifyContent: "center" }}>
      <form onSubmit={handleSubmit} style={{margin: 30, padding:50, border: "2px solid black"}}>
        <h2>NoteBook App</h2>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            onChange={onchange}
            value={credentials.email}
            name="email"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type={showPassword? "text" : "password"}
            className="form-control"
            id="password"
            onChange={onchange}
            value={credentials.password}
            name="password"
          />
        </div>
        <div className="my-2">         
          Show Password <i class="fas fa-eye"  onClick={() => {
              setShowPassword(!showPassword);
            }}></i>
        </div>
        <button style={{width:240, marginTop:10}} type="submit" className="btn btn-primary">
          Log in
        </button>
        <div style={{padding: 10,display: "flex", justifyContent: "center"}}>
        Don't have an account? <Link to="/signup"> Sign up</Link>
        </div>
        
      </form>
    </div>
  
  );
};

export default Login;
