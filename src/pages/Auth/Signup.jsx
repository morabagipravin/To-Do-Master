
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css"; 

function Signup() {
  const history = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async () => {
    const response= await fetch("http://65.2.189.213:8000/api/auth/signup", {

        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password,
            confirmPassword
        })
    });
    const data = await response.json();
    if(response.status === 200){
        history("/");
    } else {
        alert(data.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>
      <form>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          className="input"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          className="input"
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          className="input"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="button" className="button" onClick={handleSignup}>
          Signup
        </button>
      </form>
    </div>
  );
}

export default Signup;
