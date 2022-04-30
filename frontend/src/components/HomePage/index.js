import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signup } from "../../store/session";
import TopImage from "./TopImage";
import SearchArea from "./SearchArea";
import MobileImage from "./MobileImage";
import SoundCloudTeaser from "./SoundCloudTeaser";
import AltSignUp from "./AltSignUp";
import Footer from "./Footer";

import "./Home.css";

function Home() {
  return (
    <div className="wholeContent">
      <TopImage />
      <SearchArea />
      <MobileImage />
      <SoundCloudTeaser />
      <AltSignUp />
      <Footer />
    </div>
  );
}

export default Home;
