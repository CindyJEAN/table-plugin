import React from "react";

/**
 * @description Displays option to search data in the rows
 * @param   {Object}  props
 * @param   {String}  props.filter     actual filter value
 * @param   {Function}  props.setFilter  sets new filter value
 * @component
 */
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
