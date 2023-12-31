import updateCanvas from "./updateCanvas.js";
import selectedOptions from "./selectedOptions.js";
import updateResults from "./updateResults.js";
import { predictResult } from "./predictResult.js";
const qs = (s) => document.querySelector(s);

const canvas = qs("#column-design-canvas");
const CANVAS_W = 800;
const CANVAS_H = 600;
canvas.width = CANVAS_W;
canvas.height = CANVAS_H;
const ctx = canvas.getContext("2d");

let LexRangeOutput = document.getElementById("LexRangeValue");
let LeyRangeOutput = document.getElementById("LeyRangeValue");
let NRangeOutput = document.getElementById("NRangeValue");
let MxiRangeOutput = document.getElementById("MxiRangeValue");
let MyiRangeOutput = document.getElementById("MyiRangeValue");

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
      LeyRangeOutput.textContent = number.toFixed(2);
      //  convert [m] to [mm]
      params[index] = number * 1000;
    }

    if (index === 2) {
      NRangeOutput.textContent = number.toFixed(2);
      //  convert [kN] to [N]
      params[index] = number * 1000;
    }

    if (index === 3) {
      MxiRangeOutput.textContent = number.toFixed(2);
      //  convert [kNm] to [Nmm]
      params[index] = number * 1000000;
    }
    if (index === 4) {
      MyiRangeOutput.textContent = number.toFixed(2);
      //  convert [kNm] to [Nmm]
      params[index] = number * 1000000;
    }

    let selectedTypes = selectedOptions();
    if (selectedTypes.length > 0) {
      let resultsSorted = predictResult(params, selectedTypes);
      updateResults(resultsSorted);
      updateCanvas(canvas, resultsSorted, params);
    }
  })
);

// CHECKBOXES

const checkboxes = document.querySelectorAll(".checkbox-steel-sizes");

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    let selectedTypes = selectedOptions();
    if (selectedTypes.length > 0) {
      let resultsSorted = predictResult(params, selectedTypes);
      updateResults(resultsSorted);
      updateCanvas(canvas, resultsSorted, params);
    }
  });
});

// Get references to the checkbox and slider elements
const checkboxFLR = document.getElementById("checkbox-FLR");
const LeyRange = document.getElementById("LeyRange");

// Add an event listener to the checkbox
checkboxFLR.addEventListener("change", function () {
  // Check if the checkbox is checked
  if (checkboxFLR.checked) {
    // If checked, disable the slider
    LeyRange.disabled = true;
    let selectedTypes = selectedOptions();
    if (selectedTypes.length > 0) {
      let resultsSorted = predictResult(params, selectedTypes);
      updateResults(resultsSorted);
      updateCanvas(canvas, resultsSorted, params);
    }
  } else {
    // If unchecked, enable the slider
    LeyRange.disabled = false;
    let selectedTypes = selectedOptions();
    if (selectedTypes.length > 0) {
      let resultsSorted = predictResult(params, selectedTypes);
      updateResults(resultsSorted);
      updateCanvas(canvas, resultsSorted, params);
    }
  }
});

let params = [5000, 5000, 250000, 50000000, 50000000];
