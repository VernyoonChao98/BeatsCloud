import React from "react";
import TopImage from "./TopImage/TopImage";
import SearchArea from "./SearchArea";
import Trending from "./Trending";
import MobileImage from "./MobileImage";
import AltSignUp from "./AltSignUp";

function Home({ audioFunction }) {
  return (
    <div className="wholeContent">
      <TopImage />
      <SearchArea />
      <Trending audioFunction={audioFunction} />
      <MobileImage />
      <AltSignUp />
    </div>
  );
}

export default Home;
