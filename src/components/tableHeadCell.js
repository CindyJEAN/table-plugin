import React from "react";
import styles from "../styles.module.css";
import { getSortArrowClassName } from "../utils/dataManager";
// import icon from "../assets/arrow_down.svg";
// import icon from "./assets/arrow_down.svg";
// const icon = `${require("arrow_down.svg")}`;

/**
 * @description Displays a headCell with a sort arrow
 * @param   {Object}  props
 * @param   {Object}  props.headCell     headCell data
 * @param   {Function}  props.changeSortOrder  sets new sort order and field
 * @component
 */
export function TableHeadCell({ headCell, changeSortOrder }) {
  const sortArrowClassName = getSortArrowClassName(headCell.data);

  return (
    <th onClick={() => changeSortOrder(headCell.data)}>
      {headCell.label}
      <img src={`${require("./arrow_down.svg")}`} className={styles[sortArrowClassName]} />
    </th>
  );
}
