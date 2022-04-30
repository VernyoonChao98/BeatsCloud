import React from "react";

function SearchArea() {
  return (
    <div className="searchArea">
      <label className="search">
        Search
        <textarea name="Search" placeholder="Search"></textarea>
      </label>
      or
      <button className="button">Upload your own</button>
      <div>
        <button className="button">Explore trending playlists</button>
      </div>
    </div>
  );
}

export default SearchArea;
