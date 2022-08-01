import React, { useEffect, useState } from "react";
import styles from "../styles.module.css";
import { getPagesInfo } from "../utils/dataManager";

/**
 * @description Displays number of entries shown and if filtered from search, and buttons to change pages
 * @param   {Object}  props
 * @param   {Function}  props.changeRowStart sets new rowStart from page change
 * @component
 */
export function Pagination({ changeRowStart }) {
  const {
    startRow,
    endRow,
    currentPage,
    maxPage,
    pageButtons,
    isFiltered,
    length,
    initialLength,
  } = getPagesInfo();

  const moveButtons = [
    {
      label: "Previous",
      move: -1,
      disabled: Boolean(currentPage === 1),
    },
    {
      label: "Next",
      move: 1,
      disabled: Boolean(currentPage === maxPage),
    },
  ];

  return (
    <div className={styles.pagination}>
      <p>
        Showing {startRow} to {endRow} entries of {length} entries
        {isFiltered && ` (filtered from ${initialLength} total entries)`}
      </p>

      <div>
        {pageButtons.map((page, index) => {
          return page === "..." ? (
            <p key={index}>...</p>
          ) : (
            <button
              key={index}
              onClick={() => changeRowStart(page)}
              className={currentPage !== page ? styles.inactive : ""}
            >
              {page}
            </button>
          );
        })}
        {moveButtons.map((btn) => (
          <button
            key={btn.label}
            onClick={() => {
              !btn.disabled && changeRowStart(currentPage + btn.move);
            }}
            className={btn.disabled ? styles.disabled : ""}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}
