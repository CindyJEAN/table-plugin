import React, { useEffect, useState } from "react";
import { Pagination } from "./components/pagination";
import styles from "./styles.module.css";
import { filterArray, formatDate, getPages, sortArray } from "./utils/helper";

export const TablePlugin = ({ data, headCells }) => {
  const dataLength = data.length;
  const [tableData, setTableData] = useState(data);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortField, setSortField] = useState("lastName");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [lastRow, setLastRow] = useState(0);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    setTableData(data);
  }, []);

  /**
   * sets field to sort and its order (asc or desc)
   * @param   {Object}  headCell
   */
  function handleSortRequest(headCell) {
    const order =
      headCell === sortField && sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(order);
    setSortField(headCell);
  }

  function handleSearchInputChange(e) {
    setFilter(e.target.value);
  }

  function handleRowsPerPageChange(e) {
    setRowsPerPage(e.target.value);
  }

  useEffect(() => {
    let array = data;
    if (filter) {
      array = filterArray(data, filter);
    }
    const sortedArray = sortArray(array, sortOrder, sortField);
    const splicedArray = sortedArray.slice(lastRow - rowsPerPage, lastRow - 1);

    setTableData(splicedArray);
  }, [sortOrder, sortField, rowsPerPage, lastRow, filter]);

  return (
    <div className={styles.component}>
      <div className={styles.tableHeader}>
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
      </div>
      <table>
        <thead>
          <tr>
            {headCells.map((headCell, index) => {
              const sortDirection =
                sortField === headCell.data ? sortOrder : false;
              const arrowClassName =
                sortDirection === "asc"
                  ? "up"
                  : sortDirection === "desc"
                  ? "down"
                  : "default";
              return (
                <th
                  key={index}
                  onClick={() => handleSortRequest(headCell.data)}
                >
                  {headCell.label}
                  <img
                    src="/arrow_down.svg"
                    className={styles[arrowClassName]}
                  />
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {tableData?.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headCells.map((headCell) => {
                const value = row[headCell.data];
                const formatedValue =
                  headCell.type === "date" ? formatDate(value) : value;
                return <td key={headCell.data}>{formatedValue || ""}</td>;
              })}
            </tr>
          ))}
          {filter && !tableData.length && (
            <tr>
              <td colSpan={headCells.length}>No matching records found</td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination
        dataLength={dataLength}
        rowsPerPage={rowsPerPage}
        lastRow={lastRow}
        setLastRow={setLastRow}
      />
    </div>
  );
};
