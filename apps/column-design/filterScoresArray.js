export function filterScoresArray(matrix) {
  // Filter out rows with entries greater than or equal to 1
  const filteredMatrix = matrix.filter(
    (row) => !row.slice(1).some((entry) => entry >= 1)
  );

  // Sort the filtered matrix based on the row with the greatest individual entry
  filteredMatrix.sort((rowA, rowB) => {
    const maxA = Math.max(...rowA.slice(1));
    const maxB = Math.max(...rowB.slice(1));
    return maxB - maxA;
  });

  return filteredMatrix;
}

export default filterScoresArray;
