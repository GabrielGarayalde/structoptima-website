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

let paramSliders = document.querySelectorAll("input[name=params]");

paramSliders.forEach((param, index) =>
  param.addEventListener("input", () => {
    let number = parseFloat(param.value);
    if (index === 0) LexRangeOutput.textContent = number.toFixed(2);
    if (index === 1) NRangeOutput.textContent = number.toFixed(2);
    if (index === 2) MxiRangeOutput.textContent = number.toFixed(2);
    params[index] = parseFloat(param.value);
    let results = predictResult(params); // updateElements(currentType);
    console.log(results);
  })
);

let radButtons = document.querySelectorAll("input[name=options]");

radButtons.forEach((rb) =>
  rb.addEventListener("change", () => {
    currentType = rb.value;
    // updateElements(currentType);
  })
);

let params = [0.5, 0.5, 0.5, 0.5];
let valuesTopopt = [];
let valuesVM = [];
let valuesTC = [];
let currentType = "UB";
// valuesTopopt = predictResult(params, model_topopt_FCM, model_topopt_FCM2);

function updateElements(type) {
  if (type === "UB")
    if (type === "UC") {
      // valuesTopopt = predictResult(params, model_topopt_FCM, model_topopt_FCM2);
      // valuesTopopt = predictResult(params, model_topopt_FCM, model_topopt_FCM2);
    }
}

drawdimArrow(
  ctx,
  canvas.width / 2, // startX
  50, // startY
  canvas.width / 2, // endX
  canvas.height - 20, // endY
  params[0] // dimLength
);

console.log(params);
