import React from "react";

function SearchArea() {
  return (
    <div className="searchContainer">
      <label className="search">
        Search
        <input name="Search" id="searchHome" placeholder="Search"></input>
      </label>
      or
      <button className="button" id="uploadYourOwn">Upload your own</button>
    </div>
  );
}

export default SearchArea;
