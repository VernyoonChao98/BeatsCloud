import React from "react";

function TopImage() {
  return (
    <div className="topImageContainer">
      <div className="logo">logo</div>
      <div className="navButtons">
        <button className="button" id="signUpButton">
          Sign in
        </button>
        <button className="button" id="createAccountButton">
          Create account
        </button>
      </div>
      <div className="text">
        <h2>Discover more with SoundCloud Go+</h2>
        <p>
          SoundCloud Go+ lets you listen offline, ad-free, with over 150 million
          tracks — and growing.
        </p>
      </div>
    </div>
  );
}

export default TopImage;
