import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup(props) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    cpassword: "",
    name: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, password, email, cpassword } = credentials;
    if (password!==cpassword){
      props.showAlert("Passwords do not match", "warning");
    } else {
    const response = await fetch("http://localhost:9000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        cpassword
      }),
    });
  
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // redirect and save the auth token
      localStorage.setItem("token", json.authtoken);
      navigate("/");
      props.showAlert("Account Created Successfully", "success");
    } else {
        props.showAlert("Invalid Creadentials", "danger");
    }
  }
}
  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <form onSubmit={handleSubmit} style={{marginBlock: 50,padding:50, border: "2px solid black"}}>
      <h2>NoteBook App</h2>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            onChange={onchange}
            value={credentials.name}
            name="name"
            aria-describedby="emailHelp"
            
          />
        </div>
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
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            onChange={onchange}
            value={credentials.password}
            name="password"
            required
            minLength={6}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            onChange={onchange}
            value={credentials.cpassword}
            name="cpassword"
            required
            minLength={6}

          />
        </div>
        <button style={{width:210, marginTop:20}} type="submit" className="btn btn-primary">
          Sign up
        </button>
        <div style={{padding: 10,display: "flex", justifyContent: "center"}}>
        Have an account? <Link to="/login">Log in</Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
