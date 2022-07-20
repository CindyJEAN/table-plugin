let data = [];
const settings = {
  start: 1,
  quantity: 10,
  // sortField: "lastName",
  // isSortOrderAsc: true,
};

/**
 * [getElementsToShow description]
 *
 * @param   {Object}  filters
 * @param   {Number}  filters.currentPage
 * @param   {Number}  filters.rowsPerPage
 * @param   {String}  filters.sortField
 * @param   {Boolean}  filters.isSortOrderAsc
 *
 * @return  {Array}           [return description]
 */
function getElementsToShow(filters) {
  // console.log(settings);
  settings.sortField = filters.sortField;
  settings.isSortOrderAsc = filters.isSortOrderAsc;
  settings.start = (filters.currentPage - 1) * filters.rowsPerPage;
  settings.quantity = filters.rowsPerPage;
  return data.slice(settings.start, settings.start + settings.qty);
}

function initData(data) {
  if (data.length !== 0) return;
  data = data;
}

function getPageInfo() {
  return {
    current: settings.start / settings.qty + 1,
    max: Math.ceil(data.length / settings.qty),
  };
}

function getSortArrowClassName(headCell) {
  if (headCell !== settings.sortField) return "default";
  if (settings.isSortOrderAsc) return "up";
  else return "down";
}

export { getPageInfo, getElementsToShow, initData, getSortArrowClassName };
