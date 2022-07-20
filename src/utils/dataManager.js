import { filterArray, getPages, sortArray } from "./helper";

let data = [];
let dataToShow = [];
const settings = {
  start: 0,
  quantity: 10,
  // current: 1,
};

function initData(initialData) {
  if (data.length !== 0) return;
  data = initialData;
}

/**
 * Updates settings and returns rows to show depending on them
 * @param   {Object}  options
 * @param   {Number}  options.currentPage
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
  console.log("settings before page", settings);
  //
  const page =
    settings.current !== options.currentPage
      ? options.currentPage
      : settings.start === 0
      ? 1
      : Math.ceil(settings.start / settings.quantity);
  settings.start = (page - 1) * settings.quantity;
  // settings.current = page;
  console.log("settings after page", settings);

  if (settings.filter !== "") {
    dataToShow = filterArray(data, settings.filter);
  } else dataToShow = [...data];
  dataToShow = sortArray(
    dataToShow,
    settings.sortField,
    settings.isSortOrderAsc
  );
  //
  return dataToShow.slice(settings.start, settings.start + settings.quantity);
}

function getPagesInfo() {
  console.log("settings in pages info", settings);
  const current = settings.start / settings.quantity + 1;
  // const current = settings.current;
  // settings.current = current;
  const max = Math.ceil(dataToShow.length / settings.quantity);
  const endRow =
    dataToShow.length < settings.start + settings.quantity
      ? dataToShow.length
      : settings.start + settings.quantity;

  const pageButtons = getPages(max, current);

  return {
    startRow: settings.start + 1,
    endRow,
    currentPage: current,
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
