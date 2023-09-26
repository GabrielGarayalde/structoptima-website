import colorChange from "./colorChange.js";

const resultsItems = document.querySelectorAll(".results-item");

export default function updateResults(resultsSorted) {
  console.log(resultsSorted);
  const slicedMatrix = resultsSorted.slice(1); // Extract headers (excluding "id")
  const trimmedMatrix = slicedMatrix.map((row) => row.slice(1));

  // Iterate over each resultsItem
  resultsItems.forEach((resultsItem, resultsItem_index) => {
    // Selects on the elements within the resultsItem
    const resultsSubItems = resultsItem.querySelectorAll(".results-sub-item");
    const resultsId = resultsItem.querySelector(".results-id");
    const texts = resultsItem.querySelectorAll(".results-text");
    const scores = resultsItem.querySelectorAll(".results-score");

    // Replace the content of each <span> with a predetermined value
    resultsId.textContent = resultsSorted[resultsItem_index + 1][0];

    // Create an array of objects with number and index
    const numberObjects = trimmedMatrix[resultsItem_index].map(
      (number, index) => ({ number, index })
    );

    // Sort the array in descending order based on the numbers
    numberObjects.sort((a, b) => b.number - a.number);

    // Extract the sorted numbers and indices
    const sortedNumbers = numberObjects.map((item) => item.number);
    const sortedIndices = numberObjects.map((item) => item.index);

    scores.forEach((score, scores_index) => {
      const value = sortedNumbers[scores_index];
      score.textContent = value.toFixed(3);
    });

    texts.forEach((text, texts_index) => {
      text.textContent = resultsSorted[0][sortedIndices[texts_index] + 1];
    });

    resultsSubItems.forEach((resultSubItem, resultSubItem_index) => {
      colorChange(sortedNumbers[resultSubItem_index], resultSubItem);
    });
  });
}
