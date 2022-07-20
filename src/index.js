import React, { useEffect, useState } from "react";
import { Pagination } from "./components/pagination";
import { RowsPerPageSelect } from "./components/rowsPerPageSelect";
import { SearchInput } from "./components/searchInput";
import { TableHeadCell } from "./components/tableHeadCell";
import styles from "./styles.module.css";
import { getElementsToShow, initData } from "./utils/dataManager";
import { formatDate } from "./utils/helper";

/**

 * @param   {Object}  props       [data description]
 * @param   {Array}  props.data       [data description]
 * @param   {Array}  props.headCells  [headCells description]
 *
 * @component
 */
export const TablePlugin = ({ data, headCells }) => {
  initData(data);
  const [settings, setSettings] = useState({
    currentPage: 1,
    rowsPerPage: 10,
    sortField: "lastName",
    isSortOrderAsc: true,
    filter: "",
  });
  const [tableData, setTableData] = useState(getElementsToShow(settings));

  function changeSortOrder(field) {
    if (settings.sortField === field) {
      settings.isSortOrderAsc = !settings.isSortOrderAsc;
    } else settings.isSortOrderAsc = true;
    settings.sortField = field;
    setTableData(getElementsToShow(settings));
  }

  function setRowsPerPage(quantity) {
    settings.rowsPerPage = Number(quantity);
    setTableData(getElementsToShow(settings));
  }

  function setFilter(filter) {
    settings.filter = filter;
    setTableData(getElementsToShow(settings));
  }

  function setPage(page) {
    settings.currentPage = page;
    setTableData(getElementsToShow(settings));
  }

  return (
    <div className={styles.component}>
      <div className={styles.tableHeader}>
        <RowsPerPageSelect
          rowsPerPage={settings.rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        />
        <SearchInput filter={settings.filter} setFilter={setFilter} />
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
          {!tableData.length && (
            <tr>
              <td colSpan={headCells.length}>No matching records found</td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination setPage={setPage} />
    </div>
  );
};
