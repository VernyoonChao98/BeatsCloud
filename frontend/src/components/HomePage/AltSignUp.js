import React from "react";
import { ExternalLink } from "react-external-link";

function AltSignUp() {
  return (
    <div className="altSignUp">
      <p id="thankYou">Thanks for listening</p>
      <p id="saveTracks">Come check out my Links :)</p>
      <p>Github and Linkedin</p>
      <div className="myLinks">
        <span>Vernyoon Chao</span>
        <ExternalLink href="https://www.linkedin.com/in/vernyoon-chao-783494123/">
          <span>Linkedin</span>
        </ExternalLink>
        <ExternalLink href="https://github.com/VernyoonChao98">
          <span>My GitHub</span>
        </ExternalLink>
        <ExternalLink href="https://github.com/VernyoonChao98/BeatsCloud">
          <span>GitHub Repo</span>
        </ExternalLink>
      </div>
    </div>
  );
}

export default AltSignUp;
