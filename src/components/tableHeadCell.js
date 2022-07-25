import React from "react";
import styles from "../styles.module.css";
import { getSortArrowInfo } from "../utils/dataManager";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown, faSortUp } from "@fortawesome/free-solid-svg-icons";

/**
 * @description Displays a headCell with a sort arrow
 * @param   {Object}  props
 * @param   {Object}  props.headCell     headCell data
 * @param   {Function}  props.changeSortOrder  sets new sort order and field
 * @component
 */
export function TableHeadCell({ headCell, changeSortOrder }) {
  const {direction, className} = getSortArrowInfo(headCell.data);

  return (
    <th onClick={() => changeSortOrder(headCell.data)}>
      {headCell.label}

      <FontAwesomeIcon
        icon={direction === "up" ? faSortUp : faSortDown}
        className={styles[className]}
      />
    </th>
  );
}
