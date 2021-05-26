import React from "react";

const handleClick = () => {};

function LandingPage() {
  return (
    <div>
      <h1 class="home-page">Secret Recipe's Page</h1>
      <button onClick={handleClick} className="login-btn button">
        Log In
      </button>
      <button onClick={handleClick} className="reg-btn button">
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
