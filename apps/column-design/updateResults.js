import colorChange from "./colorChange.js";

let id_1_Output = document.getElementById("id_1");
let score_Nx_1_Output = document.getElementById("score_Nx_1");
let score_Mxi_1_Output = document.getElementById("score_Mxi_1");

let id_2_Output = document.getElementById("id_2");
let score_Nx_2_Output = document.getElementById("score_Nx_2");
let score_Mxi_2_Output = document.getElementById("score_Mxi_2");

let id_3_Output = document.getElementById("id_3");
let score_Nx_3_Output = document.getElementById("score_Nx_3");
let score_Mxi_3_Output = document.getElementById("score_Mxi_3");

export default function updateResults(resultsSorted) {
  console.log(resultsSorted);
  const slicedMatrix = resultsSorted.slice(1); // Extract headers (excluding "id")

  const trimmedMatrix = slicedMatrix.map((row) => row.slice(1));

  const max1 = Math.max(...trimmedMatrix[0]);
  const maxIndex1 = trimmedMatrix[0].indexOf(max1);
  const headerValue1 = resultsSorted[0][maxIndex1 + 1];

  id_1_Output.textContent = resultsSorted[1][0];
  score_Nx_1_Output.textContent = headerValue1;
  score_Mxi_1_Output.textContent = max1.toFixed(3);

  const max2 = Math.max(...trimmedMatrix[1]);
  const maxIndex2 = trimmedMatrix[1].indexOf(max2);
  const headerValue2 = resultsSorted[0][maxIndex2 + 1];

  id_2_Output.textContent = resultsSorted[2][0];
  score_Nx_2_Output.textContent = headerValue2;
  score_Mxi_2_Output.textContent = max2.toFixed(3);

  const max3 = Math.max(...trimmedMatrix[2]);
  const maxIndex3 = trimmedMatrix[2].indexOf(max3);
  const headerValue3 = resultsSorted[0][maxIndex3 + 1];

  id_3_Output.textContent = resultsSorted[3][0];
  score_Nx_3_Output.textContent = headerValue3;
  score_Mxi_3_Output.textContent = max3.toFixed(3);

  colorChange(max1.toFixed(3), "results-1");
  colorChange(max2.toFixed(3), "results-2");
  colorChange(max3.toFixed(3), "results-3");
}
