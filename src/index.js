import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { sortArray } from "./utils/helper";

export const TablePlugin = ({ data, headCells }) => {
  const [tableData, setTableData] = useState(data);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortField, setSortField] = useState("lastName");

  useEffect(() => {
    setTableData(data);
  }, []);

  function handleSortRequest(headCell) {
    const order =
      headCell === sortField && sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(order);
    setSortField(headCell);
  }

  useEffect(() => {
    const sortedArray = sortArray(tableData, sortOrder, sortField);
    setTableData(sortedArray);
  }, [sortOrder, sortField]);

  return (
    <div className={styles.component}>
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
                  className={arrowClassName}
                >
                  {headCell.label}
                  {/* <img src="arrow_down.svg" /> */}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {tableData?.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headCells.map(({ data: headCell }) => {
                return <td key={headCell}>{row[headCell] || ""}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
