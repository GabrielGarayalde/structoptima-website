import drawdimArrow from "./dimArrow.js";
import { predictResult } from "./predictResult.js";
const qs = (s) => document.querySelector(s);

const canvas = qs("#column-design-canvas");
const CANVAS_W = 800;
const CANVAS_H = 600;
canvas.width = CANVAS_W;
canvas.height = CANVAS_H;
const ctx = canvas.getContext("2d");

let LexRangeOutput = document.getElementById("LexRangeValue");
let NRangeOutput = document.getElementById("NRangeValue");
let MxiRangeOutput = document.getElementById("MxiRangeValue");

let id_1_Output = document.getElementById("id_1");
let score_Nx_1_Output = document.getElementById("score_Nx_1");
let score_Mxi_1_Output = document.getElementById("score_Mxi_1");

let id_2_Output = document.getElementById("id_2");
let score_Nx_2_Output = document.getElementById("score_Nx_2");
let score_Mxi_2_Output = document.getElementById("score_Mxi_2");

let id_3_Output = document.getElementById("id_3");
let score_Nx_3_Output = document.getElementById("score_Nx_3");
let score_Mxi_3_Output = document.getElementById("score_Mxi_3");

let paramSliders = document.querySelectorAll("input[name=params]");

paramSliders.forEach((param, index) =>
  param.addEventListener("input", () => {
    let number = parseFloat(param.value);
    if (index === 0) {
      LexRangeOutput.textContent = number.toFixed(2);
      //  convert [m] to [mm]
      params[index] = number * 1000;
    }

    if (index === 1) {
      NRangeOutput.textContent = number.toFixed(2);
      //  convert [kN] to [N]
      params[index] = number * 1000;
    }

    if (index === 2) {
      MxiRangeOutput.textContent = number.toFixed(2);
      //  convert [kNm] to [Nmm]
      params[index] = number * 1000000;
    }
    let resultsSorted = predictResult(params, currentType); // updateElements(currentType);
    id_1_Output.textContent = resultsSorted[0][0];
    score_Nx_1_Output.textContent = resultsSorted[0][1].toFixed(3);
    score_Mxi_1_Output.textContent = resultsSorted[0][2].toFixed(3);
    id_2_Output.textContent = resultsSorted[1][0];
    score_Nx_2_Output.textContent = resultsSorted[1][1].toFixed(3);
    score_Mxi_2_Output.textContent = resultsSorted[1][2].toFixed(3);
    id_3_Output.textContent = resultsSorted[2][0];
    score_Nx_3_Output.textContent = resultsSorted[2][1].toFixed(3);
    score_Mxi_3_Output.textContent = resultsSorted[2][2].toFixed(3);

    drawdimArrow(
      canvas,
      canvas.width / 2, // startX
      50, // startY
      canvas.width / 2, // endX
      canvas.height - 20, // endY
      params[0] // dimLength
    );
  })
);

let radButtons = document.querySelectorAll("input[name=options]");

radButtons.forEach((rb) =>
  rb.addEventListener("change", () => {
    currentType = rb.value;
    updateElements(currentType);
  })
);

let params = [5000, 250000, 50000000];
let currentType = "UB";
let resultsSorted = predictResult(params, currentType);

console.log(resultsSorted);
// function updateElements(type) {
//   if (type === "UB") {
//     let results = predictResult(params, currentType);
//   }
//   if (type === "UC") {
//     let results = predictResult(params, currentType);
//   }
// }

drawdimArrow(
  canvas,
  canvas.width / 2, // startX
  50, // startY
  canvas.width / 2, // endX
  canvas.height - 20, // endY
  params[0] // dimLength
);

console.log(params);
