import { filterArray, getPages, sortArray } from "./helper";

let data = [];
let dataToShow = [];
const settings = {
  start: 0,
  quantity: 10,
  currentPage: 1,
};

/**
 * Initialises data in dataManager
 * @param   {Array}  initialData  
 */
function initData(initialData) {
  if (data.length !== 0) return;
  data = initialData;
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

  // console.log("settings in getElementsToShow", settings);
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
 * get className for arrow in headCell,
 * to style depending on sort field and order
 * @param   {String}  headCell
 * @return  {String}            className
 */
function getSortArrowClassName(headCell) {
  if (headCell !== settings.sortField) return "default";
  if (settings.isSortOrderAsc) return "up";
  else return "down";
}

export { getPagesInfo, getElementsToShow, initData, getSortArrowClassName };
