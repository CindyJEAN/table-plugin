import React from "react";
import styles from "../styles.module.css";

export function TableHeadCell({ headCell, sort, setSort }) {
  const { field, order } = sort;
  
  /**
   * sets field to sort and its order (asc or desc)
   * @param   {Object}  headCell
   */
  function handleSortRequest(headCell) {
    const sortOrder = headCell === field && order === "asc" ? "desc" : "asc";
    setSort({ order: sortOrder, field: headCell });
  }

  const sortDirection = field === headCell.data ? order : false;
  const arrowClassName =
    sortDirection === "asc"
      ? "up"
      : sortDirection === "desc"
      ? "down"
      : "default";

  return (
    <th onClick={() => handleSortRequest(headCell.data)}>
      {headCell.label}
      <img src="/arrow_down.svg" className={styles[arrowClassName]} />
    </th>
  );
}
