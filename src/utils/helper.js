function sortArray(data, sortOrder, sortField) {
  const sortedArray = [...data].sort((a, b) => {
    return (
      a[sortField].localeCompare(b[sortField]) * (sortOrder === "asc" ? 1 : -1)
    );
  });
  return sortedArray;
}

export { sortArray };
