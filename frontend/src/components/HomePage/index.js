import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import TopImage from "./TopImage/TopImage";
import SearchArea from "./SearchArea";
import Trending from "./Trending";
import MobileImage from "./MobileImage";
import AltSignUp from "./AltSignUp";
import { loadAllSongs } from "../../store/audioFile";

function Home({ audioFunction, audioFunctionPlaylist }) {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(loadAllSongs()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    isLoaded && (
      <div className="wholeContent">
        <TopImage />
        <SearchArea />
        <Trending
          audioFunction={audioFunction}
          audioFunctionPlaylist={audioFunctionPlaylist}
        />
        <MobileImage />
        <AltSignUp />
      </div>
    )
  );
}

export default Home;
