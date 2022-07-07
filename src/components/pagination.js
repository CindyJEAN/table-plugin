import React, { useEffect, useState } from "react";
import styles from "../styles.module.css";

export function Pagination({ dataLength, rowsLimit, lastRow, setLastRow }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesLength, setPagesLength] = useState(0);
  const [lastRowToShow, setLastRowToShow] = useState(0);

  useEffect(() => {
    const length = Math.ceil(dataLength / rowsLimit);
    setPagesLength(length);
    if (length < currentPage) setCurrentPage(length);
  }, [rowsLimit, dataLength]);

  useEffect(() => {
    let endIndex = currentPage * rowsLimit;
    setLastRow(endIndex);
    if (endIndex > dataLength) endIndex = dataLength;
    setLastRowToShow(endIndex);
  }, [currentPage, rowsLimit]);

  function handlePageChange(move) {
    if (dataLength <= rowsLimit) return;
    const newPage = currentPage + move;
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
        Showing {lastRow - rowsLimit + 1} to {lastRowToShow} of {dataLength}{" "}
        entries
      </p>
      <div>
        <p>
          Page {currentPage}/{pagesLength}
        </p>
        {buttons.map((btn) => (
          <button
            key={btn.label}
            onClick={() => handlePageChange(btn.move)}
            className={btn.disabled ? styles.disabled : ""}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}
