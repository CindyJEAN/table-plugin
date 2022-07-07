function sortArray(data, sortOrder, sortField) {
  let dataToSort = [...data];

  const sortedArray = dataToSort.sort((a, b) => {
    const comparison = a[sortField].localeCompare(b[sortField]);
    return comparison * (sortOrder === "asc" ? 1 : -1);
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


export { sortArray, formatDate };
