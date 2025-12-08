import { useState } from "react";
import "./Auth.css"; // өөрийн CSS холбох

export default function AuthBox() {
  const [state, setState] = useState("login"); 
  // login / register гэсэн 2 variant

  return (
    <div className="auth-box">

      {/* Header tabs */}
      <div className="auth-tabs">
        <button 
          className={state === "login" ? "active" : ""} 
          onClick={() => setState("login")}
        >
          Нэвтрэх
        </button>

        <button 
          className={state === "register" ? "active" : ""} 
          onClick={() => setState("register")}
        >
          Бүртгүүлэх
        </button>
      </div>

      {/* Content Area */}
      <div className="auth-content">

        {state === "login" && (
          <div className="login-form">
            <input type="text" placeholder="Имэйл" />
            <input type="password" placeholder="Нууц үг" />
            <button className="primary-btn">Нэвтрэх</button>
          </div>
        )}

        {state === "register" && (
          <div className="register-form">
            <input type="text" placeholder="Нэр" />
            <input type="email" placeholder="Имэйл" />
            <input type="password" placeholder="Нууц үг" />
            <button className="primary-btn">Бүртгүүлэх</button>
          </div>
        )}

      </div>
    </div>
  );
}