import React from "react";
import styles from "../styles.module.css";
import { getSortArrowClassName } from "../utils/dataManager";

export function TableHeadCell({ headCell, changeSortOrder }) {
  const sortArrowClassName = getSortArrowClassName(headCell.data);

  return (
    <th onClick={() => changeSortOrder(headCell.data)}>
      {headCell.label}
      <img src="/arrow_down.svg" className={styles[sortArrowClassName]} />
    </th>
  );
}
