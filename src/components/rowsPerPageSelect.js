import React from "react";

/**
 * @description Displays option to select the number of rows per page
 * @param   {Object}  props
 * @param   {Number}  props.rowsPerPage     actual option value
 * @param   {Function}  props.changeRowsPerPage  updates option value
 * @component
 */
export function RowsPerPageSelect({ rowsPerPage, changeRowsPerPage }) {
  return (
    <div>
      <label htmlFor={"rowsPerPage"}>Show</label>
      <select
        id="rowsPerPage"
        value={rowsPerPage}
        onChange={(e) => changeRowsPerPage(e.target.value)}
        required
      >
        {[10, 25, 50, 100].map((number, index) => (
          <option key={index} value={number}>
            {number}
          </option>
        ))}
      </select>
      <p>entries</p>
    </div>
  );
}
