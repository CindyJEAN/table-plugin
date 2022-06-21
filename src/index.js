import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";

export const TablePlugin = ({ data, headCells }) => {
  const [tableData, setTableData] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortField, setSortField] = useState("");

  function handleSortRequest(headCell) {
    const order =
      headCell === sortField && sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(order);
    setSortField(headCell);
  }

  function sortArray(data, sortOrder, sortField) {
    const sortedArray = data.sort((a, b) => {
      return (
        a[sortField].localeCompare(b[sortField]) *
        (sortOrder === "asc" ? 1 : -1)
      );
    });
    return sortedArray;
  }

  useEffect(() => {
    setTableData(data);
  }, []);

  useEffect(() => {
    const sortedArray = sortArray(tableData, sortOrder, sortField);
    setTableData(sortedArray);
  }, [sortOrder, sortField]);


  return (
    <div className={styles.component}>
      <table>
        <thead>
          <tr>
            {headCells.map((headCell, index) => (
              <th key={index} onClick={() => handleSortRequest(headCell.data)}>
                {headCell.label}
              </th>
            ))}
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
