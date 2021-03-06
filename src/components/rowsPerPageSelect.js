import React from "react";

/**
 * @description Displays option to select the number of rows per page
 * @param   {Object}  props
 * @param   {Number}  props.rowsPerPage     actual option value
 * @param   {Function}  props.setRowsPerPage  sets new option value
 * @component
 */
export function RowsPerPageSelect({ rowsPerPage, setRowsPerPage }) {
  function handleRowsPerPageChange(e) {
    setRowsPerPage(e.target.value);
  }
  return (
    <div>
      <label htmlFor={"rowsPerPage"}>Show</label>
      <select
        id="rowsPerPage"
        value={rowsPerPage}
        onChange={handleRowsPerPageChange}
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
