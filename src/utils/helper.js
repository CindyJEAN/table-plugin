function sortArray(data, sortOrder, sortField) {
  let dataToSort = [...data];

  const sortedArray = dataToSort.sort((a, b) => {
    const comparison = a[sortField].localeCompare(b[sortField]);
    return comparison * (sortOrder === "asc" ? 1 : -1);
  });
  return sortedArray;
}

export { sortArray };
