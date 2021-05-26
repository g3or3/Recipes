import React from "react";

function LandingPage() {
  return (
    <div>
      <h1 class="home-page">Secret Recipe's Page</h1>
      <button
        onClick={() => history.push("./login")}
        className="login-btn button"
      >
        Log In
      </button>
      <button
        onClick={() => history.push("./register")}
        className="reg-btn button"
      >
        Registration
      </button>
      <div>
        <p class="home-para">
          This page is dedicated to all of our "secret recipes". Please feel
          free to add one you are especially fond of!
        </p>
      </div>
    </div>
  );
}

export default LandingPage;
