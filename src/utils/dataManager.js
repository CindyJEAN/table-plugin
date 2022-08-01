import { filterArray, getPages, sortArray } from "./helper";

let data = [];
let dataToShow = [];
const settings = {
  start: 0,
  quantity: 10,
  currentPage: 1,
};

/**
 * updates data in dataManager
 * @param   {Array}  newData
 */
function updateData(newData) {
  data = newData;
}

/**
 * Updates settings and returns rows to show depending on them
 * @param   {Object}  options
 * @param   {Number}  options.start
 * @param   {Number}  options.rowsPerPage
 * @param   {String}  options.sortField
 * @param   {Boolean}  options.isSortOrderAsc
 * @param   {String}  options.filter
 *
 * @return  {Array}
 */
function getElementsToShow(options) {
  settings.sortField = options.sortField;
  settings.isSortOrderAsc = options.isSortOrderAsc;
  settings.filter = options.filter;
  settings.quantity = options.rowsPerPage;

  if (settings.filter !== "") {
    dataToShow = filterArray(data, settings.filter);
  } else dataToShow = [...data];

  settings.start = getStartRow(options.start, dataToShow.length);

  settings.currentPage = Math.floor(
    settings.start === 0 ? 1 : settings.start / settings.quantity + 1
  );

  dataToShow = sortArray(
    dataToShow,
    settings.sortField,
    settings.isSortOrderAsc
  );

  return dataToShow.slice(settings.start, settings.start + settings.quantity);
}

/**
 * Gets new start row depending on changes in options and dataLength
 * @param   {Number}  newStartSetting  new start from table options
 * @param   {Number}  dataLength
 *
 * @return  {Number}
 */
function getStartRow(newStartSetting, dataLength) {
  let newStart = newStartSetting;
  if (newStartSetting === settings.start) {
    newStart =
      Math.floor(settings.start / settings.quantity) * settings.quantity;
  }
  if (dataLength <= newStart) {
    newStart = Math.floor(dataLength / settings.quantity) * settings.quantity;
  }
  return newStart;
}

/**
 * gets all pages info for current data and options
 * @return  {Object}
 */
function getPagesInfo() {
  const max = Math.ceil(dataToShow.length / settings.quantity);
  const startRow = dataToShow.length === 0 ? 0 : settings.start + 1;
  const endRow =
    dataToShow.length < settings.start + settings.quantity
      ? dataToShow.length
      : settings.start + settings.quantity;

  const pageButtons = getPages(max, settings.currentPage);

  return {
    startRow: startRow,
    endRow,
    currentPage: settings.currentPage,
    maxPage: max,
    length: dataToShow.length,
    initialLength: data.length,
    pageButtons,
    isFiltered: settings.filter !== "",
  };
}

/**
 * get direction of arrow in headCell and className to apply
 * @param   {String}  headCell
 * @return  {Object}           direction, className
 */
function getSortArrowInfo(headCell) {
  const isSelected = headCell === settings.sortField;
  const className = !isSelected ? "noSort" : "";
  const direction = isSelected && settings.isSortOrderAsc ? "up" : "down";
  return { direction, className };
}

export { getPagesInfo, getElementsToShow, updateData, getSortArrowInfo };
