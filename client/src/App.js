import logo from "./logo.svg";
import "./index.css";

export default function App() {
  return (
    <div>
      <h1>Secret Recipe's Page</h1>
      <button className="login-btn button">Log In</button>
      <button className="reg-btn button">Registration</button>
      <div>
        <p>
          This page is dedicated to all of our "secret recipes". Please feel
          free to add one you are especially fond of!
        </p>
      </div>
    </div>
  );
}
