import React from "react";
import LoginFormModal from "./SigninModal";
import CreateAccountModal from "./CreateAccountModal";

function TopImage() {
  return (
    <div className="topImageContainer">
      <div className="navButtons">
        <LoginFormModal />
        <CreateAccountModal />
      </div>
      <div className="topImageText">
        <h2>Discover more with BeatsCloud Go+</h2>
        <p>
          BeatsCloud Go+ lets you listen offline, ad-free, with over 150 million
          tracks — and growing.
        </p>
      </div>
    </div>
  );
}

export default TopImage;
