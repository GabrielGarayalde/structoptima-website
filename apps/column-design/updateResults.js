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
  id_1_Output.textContent = resultsSorted[0][0];
  score_Nx_1_Output.textContent = resultsSorted[0][1].toFixed(3);
  score_Mxi_1_Output.textContent = resultsSorted[0][2].toFixed(3);
  id_2_Output.textContent = resultsSorted[1][0];
  score_Nx_2_Output.textContent = resultsSorted[1][1].toFixed(3);
  score_Mxi_2_Output.textContent = resultsSorted[1][2].toFixed(3);
  id_3_Output.textContent = resultsSorted[2][0];
  score_Nx_3_Output.textContent = resultsSorted[2][1].toFixed(3);
  score_Mxi_3_Output.textContent = resultsSorted[2][2].toFixed(3);

  colorChange(resultsSorted[0][2].toFixed(3), "results-1");
  colorChange(resultsSorted[1][2].toFixed(3), "results-2");
  colorChange(resultsSorted[2][2].toFixed(3), "results-3");
}
