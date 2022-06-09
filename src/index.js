import React from "react";
// import "./styles.css";
import styles from "./styles.module.css";

export const TablePlugin = ({ data, headCells }) => {
  return (
    <div className={styles.component}>
      <table>
        <thead>
          <tr>
            {headCells.map((headCell, index) => (
              <th key={index}>{headCell.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((employee, employeeIndex) => (
            <tr key={employeeIndex}>
              {Object.keys(employee).map((cell, cellIndex) => (
                <td key={cellIndex}>{employee[cell]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
