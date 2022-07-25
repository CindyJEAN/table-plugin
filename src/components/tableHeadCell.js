import React from "react";
import styles from "../styles.module.css";
import { getSortArrowClassName } from "../utils/dataManager";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
// import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'


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
      {/* <img src={icon} className={styles[sortArrowClassName]} /> */}
      {/* <FontAwesome
        className={styles[sortArrowClassName]}
        name="arrow-down" /> */}
        <FontAwesomeIcon icon={faSortDown} />
        {/* <FontAwesomeIcon icon={solid('arrow-down')} /> */}
    </th>
  );
}
