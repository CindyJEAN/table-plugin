import React, { useEffect, useState } from "react";
import styles from "../styles.module.css";
import { getPages } from "../utils/helper";

export function Pagination({
  originalDataLength,
  dataLength,
  rowsPerPage,
  rowsToShow,
  setRowsToShow,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState([1, "..."]);

  useEffect(() => {
    const pagesLength = Math.ceil(dataLength / rowsPerPage);
    setPages(getPages(pagesLength, currentPage));

    let firstIndex = rowsToShow[0];
    const newPage = Math.ceil(firstIndex / rowsPerPage);
    let endIndex = newPage * rowsPerPage;
    if (endIndex > dataLength) endIndex = dataLength;
    const rows = [endIndex - rowsPerPage + 1, endIndex];

    setCurrentPage(Number(newPage));
    console.log("rows when change in state", rows);
    setRowsToShow(rows);
  }, [dataLength, rowsPerPage]);




  function handlePageChange(newPage) {
    if (dataLength <= rowsPerPage) return;
    if (newPage > pages.length || newPage < 1) return;
    setCurrentPage(Number(newPage));
    let endIndex = newPage * rowsPerPage;
    if (endIndex > dataLength) endIndex = dataLength;
    const rows = [endIndex - rowsPerPage + 1, endIndex];
    console.log("rows in handlePage", rows);
    setRowsToShow(rows);
    //Prendre en compte peu d'entrées (ex filtré).Ajouter fonction getRowsToShow? Vu qu'on l'utilise à 2 endroits
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
      disabled: Boolean(currentPage === pages.length),
    },
  ];

  return (
    <div className={styles.pagination}>
      {dataLength === originalDataLength ? (
        <p>
          Showing {rowsToShow[0]} to {rowsToShow[1]} of {dataLength} entries
        </p>
      ) : (
        <p>
          Showing {rowsToShow[0]} to {rowsToShow[1]} of {dataLength} entries
          (filtered from {dataLength} total entries)
        </p>
      )}

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
