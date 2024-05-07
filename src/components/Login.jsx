import React, { useState } from "react";
import "../styles/LoginScreen.css";
import SignInPage from "./SignInPage";
const Login = () => {
  const [signIn, setSignIn] = useState(false);
  return (
    <div className="loginScreen">
      <div className="loginScreen_background">
        <h2 className="loginScreen__logo">Interview Trainer</h2>
        <button onClick={() => setSignIn(true)} className="loginScreen__button">
          Login
        </button>
        <div className="loginScreen__gradient" />
        <div className="loginScreen__body">
          {signIn ? (
            <SignInPage />
          ) : (
            <>
              <h1>Beat the system and level up your interviewing skills.</h1>
              <h2>Get prepared anytime, anywhere!</h2>
              <h3>
                Ready to start? Enter your email to create or restart your
                membership.
              </h3>
              <div className="loginScreen__input">
                <form>
                  <input type="email" placeholder="Enter your email" />
                  <button
                    onClick={() => setSignIn(true)}
                    className="loginScreen__btn"
                  >
                    GET STARTED
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
