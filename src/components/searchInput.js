import React, { useEffect, useState } from "react";
import { filterArray } from "../utils/helper";

export function SearchInput({ data, setFilteredData }) {
  const [filter, setFilter] = useState("");

  function handleSearchInputChange(e) {
    setFilter(e.target.value);
  }

  useEffect(() => {
    if (!filter) return setFilteredData(data);
    const filteredArray = filterArray(data, filter);
    setFilteredData(filteredArray);
  }, [data, filter]);

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
