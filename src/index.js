import React, { useEffect, useState } from "react";
import { Pagination } from "./components/pagination";
import { RowsPerPageSelect } from "./components/rowsPerPageSelect";
import { SearchInput } from "./components/searchInput";
import { TableHeadCell } from "./components/tableHeadCell";
import styles from "./styles.module.css";
import { getElementsToShow, initData } from "./utils/dataManager";
import { formatDate } from "./utils/helper";

/**
 * @description Sortable table with pagination and search feature
 * @param   {Object}  props
 * @param   {Array}  props.data       data rows
 * @param   {Array<Object>}  props.headCells  columns : {data, label, type}
 * @component
 */
export const TablePlugin = ({ data, headCells }) => {
  const [settings, setSettings] = useState({
    start: 0,
    rowsPerPage: 10,
    sortField: "lastName",
    isSortOrderAsc: true,
    filter: "",
  });

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    initData(data);
    // @ts-ignore
    setTableData(getElementsToShow(settings));
  }, []);

  function changeSortOrder(field) {
    let newOrder;
    if (settings.sortField === field) {
      newOrder = !settings.isSortOrderAsc;
    } else newOrder = true;
    setSettings((prev) => ({
      ...prev,
      isSortOrderAsc: newOrder,
      sortField: field,
    }));
  }

  function changeRowsPerPage(quantity) {
    setSettings((prev) => ({
      ...prev,
      rowsPerPage: Number(quantity),
    }));
  }

  function changeFilter(filter) {
    setSettings((prev) => ({
      ...prev,
      filter,
    }));
  }

  function changeRowStart(page) {
    setSettings((prev) => ({
      ...prev,
      start: (page - 1) * settings.rowsPerPage,
    }));
  }

  useEffect(() => {
    // @ts-ignore
    setTableData(getElementsToShow(settings));
  }, [settings]);

  return (
    <div className={styles.component}>
      <div className={styles.tableHeader}>
        <RowsPerPageSelect
          rowsPerPage={settings.rowsPerPage}
          changeRowsPerPage={changeRowsPerPage}
        />
        <SearchInput filter={settings.filter} handleSearchInputChange={changeFilter} />
      </div>
      <div className={styles.tableContainer}>
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
              <tr
                key={rowIndex}
                className={styles[rowIndex % 2 !== 0 ? "even" : "odd"]}
              >
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
      </div>
      <Pagination changeRowStart={changeRowStart} />
    </div>
  );
};
