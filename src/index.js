import React, { useEffect, useState } from "react";
import { Pagination } from "./components/pagination";
import { RowsPerPageSelect } from "./components/rowsPerPageSelect";
import { SearchInput } from "./components/searchInput";
import { TableHeadCell } from "./components/tableHeadCell";
import styles from "./styles.module.css";
import { getElementsToShow, initData } from "./utils/dataManager";
import { filterArray, formatDate, getPages, sortArray } from "./utils/helper";

/**
 * [TablePlugin description]
 *
 * @param   {Object}  props       [data description]
 * @param   {Array}  props.data       [data description]
 * @param   {Array}  props.headCells  [headCells description]
 *
 * @component
 */
export const TablePlugin = ({ data, headCells }) => {
  initData(data);
  // const settings = {
  //   currentPage: 1,
  //   rowsPerPage: 10,
  //   sortField: "lastName",
  //   isSortOrderAsc: true,
  // };
  const [settings, setSettings] = useState({
    currentPage: 1,
    rowsPerPage: 10,
    sortField: "lastName",
    isSortOrderAsc: true,
  });

  const [tableData, setTableData] = useState(getElementsToShow(settings));
  const [sort, setSort] = useState({ field: "lastName", order: "asc" });

  function changeSortOrder(field) {
    console.log("settings before", settings);
    if (settings.sortField === field) {
      settings.isSortOrderAsc = !settings.isSortOrderAsc;
    } else settings.isSortOrderAsc = true;
    settings.sortField = field;
    console.log("settings after", settings);
    
    setTableData(getElementsToShow(settings));
  }

  function setRowsPerPage(newQty) {
    settings.rowsPerPage = newQty;
    setTableData(getElementsToShow(settings));
  }

  return (
    <div className={styles.component}>
      <div className={styles.tableHeader}>
        {/* <RowsPerPageSelect
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        />
        <SearchInput data={data} setFilteredData={setFilteredData} /> */}
      </div>
      <table>
        <thead>
          <tr>
            {headCells.map((headCell, index) => {
              return (
                <TableHeadCell
                  key={index}
                  headCell={headCell}
                  changeSortOrder={changeSortOrder}
                />
              );
            })}
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
          {/* {!filteredData.length && (
            <tr>
              <td colSpan={headCells.length}>No matching records found</td>
            </tr>
          )} */}
        </tbody>
      </table>
      {/* <Pagination
        originalDataLength={dataLength}
        dataLength={filteredData.length}
        rowsPerPage={rowsPerPage}
        rowsToShow={rowsToShow}
        setRowsToShow={setRowsToShow}
      /> */}
    </div>
  );
};
