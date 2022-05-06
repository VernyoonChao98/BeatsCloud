import React from "react";

function SearchArea() {
  return (
    <div className="searchContainer">
      <label className="search">
        <input
          name="Search"
          id="searchHome"
          placeholder="Search for artists, bands, tracks, podcasts"
        ></input>
      </label>
      or
      <button className="button" id="uploadYourOwn">
        Upload your own
      </button>
    </div>
  );
}

export default SearchArea;
