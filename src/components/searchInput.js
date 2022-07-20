import React from "react";

export function SearchInput({ filter, setFilter }) {
  function handleSearchInputChange(e) {
    setFilter(e.target.value);
  }

  return (
    <div>
      <label htmlFor={"search"}>Search :</label>
      <input
        type="search"
        id="search"
        name="search"
        value={filter}
        onChange={handleSearchInputChange}
      />
    </div>
  );
}
