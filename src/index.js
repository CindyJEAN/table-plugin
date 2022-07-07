import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { formatDate, sortArray } from "./utils/helper";

export const TablePlugin = ({ data, headCells }) => {
  const dataLength = data.length;
  const [tableData, setTableData] = useState(data);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortField, setSortField] = useState("lastName");
  const [rowsLimit, setRowsLimit] = useState(10);
  // const [currentPage, setCurrentPage] = useState(1);
  const [pagesConfig, setPagesConfig] = useState({ current: 1, length: 1 });
  // const [config, setConfig] = useState({
  //   sortOrder: "asc",
  //   sortField: "lastName",
  //   rowsLimit: 10,
  //   currentPage: 1,
  // });

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

  function handlePageChange(move) {
    if (dataLength <= rowsLimit) return;
    const newPage = pagesConfig.current + move;
    if (newPage > pagesConfig.length || newPage < 1) return;
    setPagesConfig({ ...pagesConfig, current: newPage });
  }

  useEffect(() => {
    const sortedArray = sortArray(data, sortOrder, sortField);

    const pagesLength = Math.ceil(dataLength / rowsLimit);
    setPagesConfig({...pagesConfig, length: pagesLength });

    const endIndex = pagesConfig.current * rowsLimit;

    const splicedArray = sortedArray.slice(endIndex - rowsLimit, endIndex - 1);
    
    setTableData(splicedArray);

  }, [sortOrder, sortField, rowsLimit, pagesConfig.current]);

  const buttons = [
    {
      label: "Previous",
      move: -1,
      disabled: Boolean(pagesConfig.current === 1),
    },
    {
      label: "Next",
      move: 1,
      disabled: Boolean(pagesConfig.current === pagesConfig.length),
    },
  ];
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
        </tbody>
      </table>
      <div className={styles.pagination}>
        <p>Showing ... to ... of ... entries</p>
        <div>
          <p>
            Page {pagesConfig.current}/{pagesConfig.length}
          </p>
          {buttons.map((btn) => (
            <button
              key={btn.label}
              onClick={() => handlePageChange(btn.move)}
              className={btn.disabled ? styles.disabled : ""}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
