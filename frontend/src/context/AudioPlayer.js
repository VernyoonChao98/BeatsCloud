import React, { useContext, useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";

const AudioPlayerContext = React.createContext();

export function ModalProvider({ children }) {
  const audioPlayerRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(audioPlayerRef.current);
  }, []);

  return (
    <>
      <AudioPlayerContext.Provider value={value}>
        {children}
      </AudioPlayerContext.Provider>
      <div ref={audioPlayerRef} />
    </>
  );
}
