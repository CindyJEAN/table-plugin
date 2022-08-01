import React from "react";

/**
 * @description Displays option to search data in the rows
 * @param   {Object}  props
 * @param   {String}  props.filter     actual filter value
 * @param   {Function}  props.handleSearchInputChange  updates filter with new value
 * @component
 */
export function SearchInput({ filter, handleSearchInputChange }) {
  return (
    <div>
      <label htmlFor={"search"}>Search :</label>
      <input
        type="search"
        id="search"
        name="search"
        value={filter}
        onChange={(e) => handleSearchInputChange(e.target.value)}
      />
    </div>
  );
}
