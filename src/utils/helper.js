/**
 * Sorts array depending on active field and sort order
 * @param   {Array}  data
 * @param   {String}  sortField
 * @param   {Boolean}  isSortOrderAsc
 * @return  {Array}        sorted array
 */
function sortArray(data, sortField, isSortOrderAsc) {
  let dataToSort = [...data];

  const sortedArray = dataToSort.sort((a, b) => {
    const comparison = a[sortField].localeCompare(b[sortField]);
    return comparison * (isSortOrderAsc ? 1 : -1);
  });
  return sortedArray;
}

/**
 * format date in local format
 * @param   {String}  date
 * @return  {String}        formated date
 */
function formatDate(date) {
  const splitDate = date.split("-");
  let formatedDate = [...splitDate].reverse().join("/");
  return formatedDate;
}

/**
 * get pages to show depending on current active page and number of pages in the table,
 * and where to put ellipis
 *
 * @param   {Number}  length   number of pages in the table
 * @param   {Number}  current  current active page
 *
 * @return  {Array}           pages as numbers and ellipis
 */
function getPages(length, current) {
  const pages = [];
  if (length <= 5) {
    for (let i = 1; i <= length; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);

    if (current <= 4) {
      for (let i = 2; i <= 5 && i < length - 1; i++) {
        pages.push(i);
      }
      pages.push("...", length);
    } else if (current >= length - 3) {
      pages.push("...");
      for (let i = length === 6 ? 3 : length - 4; i <= length; i++) {
        pages.push(i);
      }
    } else {
      pages.push("...");
      for (let i = current - 2; i <= current + 2; i++) {
        pages.push(i);
      }
      pages.push("...", length);
    }
  }
  return pages;
}

/**
 * Returns array or rows that include search input
 * @param   {Array}  data
 * @param   {String}  filter  search input
 *
 * @return  {Array}         filtered array
 */
function filterArray(data, filter) {
  const filteredData = data.filter((row) => {
    const hasSearchInput = Object.values(row).some((el) =>
      el.toLowerCase().includes(filter.toLowerCase())
    );
    if (hasSearchInput) return row;
  });
  return filteredData;
}

export { sortArray, formatDate, getPages, filterArray };
