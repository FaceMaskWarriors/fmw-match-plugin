import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Searchbar = (props) => {
  return (
    <div className="sb-box-1">
      <div className="search">
        <input
          type="text"
          className="searchTerm"
          placeholder="Search"
          onChange={props.handleOnChange}
        />
        <button type="submit" className="searchButton" onClick={props.OnSubmit}>
          <FontAwesomeIcon icon={faSearch} color="#fff" />
        </button>
      </div>
    </div>
  );
};
export default Searchbar;
