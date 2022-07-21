import React from "react";
import styles from "../styles.module.css";
import { getSortArrowClassName } from "../utils/dataManager";

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
      <img src="/arrow_down.svg" className={styles[sortArrowClassName]} />
    </th>
  );
}
