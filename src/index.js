import React, { useEffect, useState } from "react";
import { Pagination } from "./components/pagination";
import { RowsPerPageSelect } from "./components/rowsPerPageSelect";
import { SearchInput } from "./components/searchInput";
import { TableHeadCell } from "./components/tableHeadCell";
import styles from "./styles.module.css";
import { filterArray, formatDate, getPages, sortArray } from "./utils/helper";

export const TablePlugin = ({ data, headCells }) => {
  const dataLength = data.length;
  const [tableData, setTableData] = useState(data);
  const [filteredData, setFilteredData] = useState(data);
  const [sort, setSort] = useState({ field: "lastName", order: "asc" });
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rowsToShow, setRowsToShow] = useState([1, 10]);

  useEffect(() => {
    setTableData(data);
    setFilteredData(data);
  }, []);

  useEffect(() => {
    const sortedArray = sortArray(filteredData, sort);
    const splicedArray = sortedArray.slice(
      rowsToShow[0] - 1,
      rowsToShow[1] - 1
    );

    setTableData(splicedArray);
  }, [sort, rowsToShow, filteredData]);

  return (
    <div className={styles.component}>
      <div className={styles.tableHeader}>
        <RowsPerPageSelect
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        />
        <SearchInput data={data} setFilteredData={setFilteredData} />
      </div>
      <table>
        <thead>
          <tr>
            {headCells.map((headCell, index) => (
              <TableHeadCell
                key={index}
                headCell={headCell}
                sort={sort}
                setSort={setSort}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData?.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headCells.map((headCell) => {
                const value = row[headCell.data];
                const formatedValue =
                  headCell.type === "date" ? formatDate(value) : value;
                return <td key={headCell.data}>{formatedValue || ""}</td>;
              })}
            </tr>
          ))}
          {!filteredData.length && (
            <tr>
              <td colSpan={headCells.length}>No matching records found</td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination
        originalDataLength={dataLength}
        dataLength={filteredData.length}
        rowsPerPage={rowsPerPage}
        rowsToShow={rowsToShow}
        setRowsToShow={setRowsToShow}
      />
    </div>
  );
};
