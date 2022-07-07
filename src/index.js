import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { sortArray } from "./utils/helper";
const logo = `${require("./arrow_down.svg")}`;
// const logo = "/static/media/arrow_down.svg";

export const TablePlugin = ({ data, headCells }) => {
  const [tableData, setTableData] = useState(data);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortField, setSortField] = useState("lastName");
  const [rowsLimit, setRowsLimit] = useState(10);

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

  function handleRowsLimitChange(e) {
    setRowsLimit(e.target.value);
  }

  useEffect(() => {
    // const sortHeadCell = headCells.find(
    //   (headCell) => headCell.data === sortField
    // );
    // const sortedArray = sortArray(tableData, sortOrder, sortHeadCell);
    const sortedArray = sortArray(data, sortOrder, sortField);
    const splicedArray = sortedArray.slice(0, rowsLimit - 1);
    setTableData(splicedArray);
  }, [sortOrder, sortField, rowsLimit]);

  return (
    <div className={styles.component}>
      <div className={styles.select}>
        <label htmlFor={"rowsLimit"}>Show</label>
        <select
          id="rowsLimit"
          value={rowsLimit}
          onChange={handleRowsLimitChange}
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
                  <img src={logo} className={styles[arrowClassName]} />
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
        </tbody>
      </table>
    </div>
  );
};

/**
 * format date in local format
 * @param   {String}  date
 * @return  {String}        formated date
 */
function formatDate(date) {
  const splitDate = date.split("-");
  // let formatedDate = splitDate[2] + "/" + splitDate[1] + "/" + splitDate[0];
  let formatedDate = [...splitDate].reverse().join("/");
  return formatedDate;
}
