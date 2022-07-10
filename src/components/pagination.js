import React, { useEffect, useState } from "react";
import styles from "../styles.module.css";
import { getPages } from "../utils/helper";

export function Pagination({ dataLength, rowsPerPage, lastRow, setLastRow }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesLength, setPagesLength] = useState(1);
  const [lastRowToShow, setLastRowToShow] = useState(0);
  const [pages, setPages] = useState(getPages(pagesLength, currentPage));

  useEffect(() => {
    const length = Math.ceil(dataLength / rowsPerPage);
    setPagesLength(length);
    if (length < currentPage) setCurrentPage(length);

    let endIndex = currentPage * rowsPerPage;
    setLastRow(endIndex);
    if (endIndex > dataLength) endIndex = dataLength;
    setLastRowToShow(endIndex);
    setPages(getPages(length, currentPage));
  }, [currentPage, rowsPerPage, dataLength]);

  function handlePageChange(newPage) {
    if (dataLength <= rowsPerPage) return;
    if (newPage > pagesLength || newPage < 1) return;
    setCurrentPage(newPage);
  }

  const buttons = [
    {
      label: "Previous",
      move: -1,
      disabled: Boolean(currentPage === 1),
    },
    {
      label: "Next",
      move: 1,
      disabled: Boolean(currentPage === pagesLength),
    },
  ];

  return (
    <div className={styles.pagination}>
      <p>
        Showing {lastRow - rowsPerPage + 1} to {lastRowToShow} of {dataLength}{" "}
        entries
      </p>
      <div>
        {pages.map((page, index) => {
          return page === "..." ? (
            <p key={index}>...</p>
          ) : (
            <button
              key={index}
              onClick={() => handlePageChange(page)}
              className={currentPage !== page ? styles.inactive : ""}
            >
              {page}
            </button>
          );
        })}
        {buttons.map((btn) => (
          <button
            key={btn.label}
            onClick={() => handlePageChange(currentPage + btn.move)}
            className={btn.disabled ? styles.disabled : ""}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}
