import React, { useEffect, useState } from "react";
import { Pagination } from "./components/pagination";
import { RowsPerPageSelect } from "./components/rowsPerPageSelect";
import { SearchInput } from "./components/searchInput";
import { TableHeadCell } from "./components/tableHeadCell";
import styles from "./styles.module.css";
import { getElementsToShow, initData } from "./utils/dataManager";
import { formatDate } from "./utils/helper";

/**
 * @param   {Object}  props       
 * @param   {Array}  props.data       data rows
 * @param   {Array}  props.headCells  data columns
 *
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

  function setRowsPerPage(quantity) {
    setSettings((prev) => ({
      ...prev,
      rowsPerPage: Number(quantity),
    }));
  }

  function setFilter(filter) {
    setSettings((prev) => ({
      ...prev,
      filter,
    }));
  }

  function setPage(page) {
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
