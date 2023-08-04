// import * as THREE from "/node_modules/three/build/three.js";
// import * as THREE from "https://cdnjs.cloudflare.com/ajax/libs/three.js/0.155.0/three.min.js";
// import { OrbitControls } from "/node_modules/three/examples/jsm/controls/OrbitControls.js";
import predictResult from "./predictResult.js";
import mapValueToColor from "./mapValueToColor.js";
import normalizeArray from "./normalizeArray.js";
const { OrbitControls } = THREE;
// import * as tf from "/node_modules/@tensorflow/tfjs/dist/index.js";

// const MODEL_URL_topopt_FCM = new URL(
//   "../research-articles/DYNUTOP/3DBridge_topopt_FCM/model.json",
//   import.meta.url
// ).href;
const MODEL_URL_topopt_FCM =
  "../research-articles/DYNUTOP/3DBridge_topopt_FCM/model.json";
// const MODEL_URL_topopt_FCM2 = new URL(
//   "../research-articles/DYNUTOP/3DBridge_topopt_FCM2/model.json",
//   import.meta.url
// ).href;
const MODEL_URL_topopt_FCM2 =
  "../research-articles/DYNUTOP/3DBridge_topopt_FCM2/model.json";
// const MODEL_URL_VM_FCM = new URL(
//   "../research-articles/DYNUTOP/3DBridge_VM_FCM/model.json",
//   import.meta.url
// ).href;
const MODEL_URL_VM_FCM =
  "../research-articles/DYNUTOP/3DBridge_VM_FCM/model.json";
// const MODEL_URL_VM_FCM2 = new URL(
//   "../research-articles/DYNUTOP/3DBridge_VM_FCM2/model.json",
//   import.meta.url
// ).href;
const MODEL_URL_VM_FCM2 =
  "../research-articles/DYNUTOP/3DBridge_VM_FCM2/model.json";

const MODEL_URL_TC_FCM =
  "../research-articles/DYNUTOP/3DBridge_TC_FCM/model.json";
// const MODEL_URL_TC_FCM = new URL(
//   "../research-articles/DYNUTOP/3DBridge_TC_FCM/model.json",
//   import.meta.url
// ).href;

const MODEL_URL_TC_FCM2 =
  "../research-articles/DYNUTOP/3DBridge_TC_FCM2/model.json";
// const MODEL_URL_TC_FCM2 = new URL(
//   "../research-articles/DYNUTOP/3DBridge_TC_FCM2/model.json",
//   import.meta.url
// ).href;

// Load models
console.time("loadModels");
const model_topopt_FCM = await tf.loadGraphModel(MODEL_URL_topopt_FCM);
const model_topopt_FCM2 = await tf.loadGraphModel(MODEL_URL_topopt_FCM2);
const model_VM_FCM = await tf.loadGraphModel(MODEL_URL_VM_FCM);
const model_VM_FCM2 = await tf.loadGraphModel(MODEL_URL_VM_FCM2);
const model_TC_FCM = await tf.loadGraphModel(MODEL_URL_TC_FCM);
const model_TC_FCM2 = await tf.loadGraphModel(MODEL_URL_TC_FCM2);
console.timeEnd("loadModels");

let supportAOutput = document.getElementById("supportAValue");
let supportBOutput = document.getElementById("supportBValue");
let forceAOutput = document.getElementById("forceAValue");
let forceBOutput = document.getElementById("forceBValue");

let paramSliders = document.querySelectorAll("input[name=params]");

paramSliders.forEach((param, index) =>
  param.addEventListener("input", () => {
    let number = param.value;
    if (index === 0) supportAOutput.textContent = (number * 15).toFixed(2);
    if (index === 1) supportBOutput.textContent = (number * 15 + 45).toFixed(2);
    if (index === 2) forceAOutput.textContent = (number * 60).toFixed(2);
    if (index === 3) forceBOutput.textContent = (number * 60).toFixed(2);

    params[index] = parseFloat(param.value);
    updateElements(currentType);
  })
);

let radButtons = document.querySelectorAll("input[name=options]");

radButtons.forEach((rb) =>
  rb.addEventListener("change", () => {
    currentType = rb.value;
    updateElements(currentType);
  })
);

let params = [0.5, 0.5, 0.5, 0.5];
let valuesTopopt = [];
let valuesVM = [];
let valuesTC = [];
let currentType = "topopt";
valuesTopopt = predictResult(params, model_topopt_FCM, model_topopt_FCM2);

const qs = (s) => document.querySelector(s);
const canvas = qs("#canvas");

// TODO: this should be applied to the styles.css sheet
canvas.width = 600;
canvas.height = 400;
canvas.style.border = "1px solid black";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 50;

const numRows = 60;
const numCols = 20;
const numChannels = 4;
const cutoff = 0.1;

let index = 0;
let cubesArray1 = [];
let cubesArray2 = [];
const renderer = new THREE.WebGLRenderer({ canvas });
const controls = new OrbitControls(camera, canvas);
const gridHelper = new THREE.GridHelper(numRows, numRows);
scene.add(gridHelper);

renderer.setSize(canvas.width, canvas.height);

renderer.setClearColor(0xffffff);

// TODO: we really just need the for loops for the positions, the cubes can be initialized first and the positions updated later?
// also the cubes array can be a double column array
function initializeElements() {
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      for (let k = 0; k < numChannels; k++) {
        let density_value = valuesTopopt[index];

        const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
        const cubeMaterial = new THREE.MeshBasicMaterial({
          color: mapValueToColor(density_value, "topopt"),
          opacity: density_value > cutoff ? 1 : 0,
          transparent: true,
        });

        // first half of the bridge
        const position1 = [i - numRows / 2, numCols - j, k - numChannels + 1];
        let cube1 = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube1.position.set(...position1);
        scene.add(cube1);
        cubesArray1.push(cube1);

        // second half of the bridge
        const position2 = [i - numRows / 2, numCols - j, numChannels - 1 - k];
        let cube2 = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube2.position.set(...position2);
        scene.add(cube2);
        cubesArray2.push(cube2);

        index++;
      }
    }
  }
}

function updateElements(type) {
  if (type === "topopt")
    valuesTopopt = predictResult(params, model_topopt_FCM, model_topopt_FCM2);
  let valuesFinal = valuesTopopt;
  if (type === "VM") {
    valuesTopopt = predictResult(params, model_topopt_FCM, model_topopt_FCM2);
    valuesVM = predictResult(params, model_VM_FCM, model_VM_FCM2);
    // valuesFinal = valuesTopopt.map((x, i) => x * valuesVM[i]);
    valuesFinal = normalizeArray(valuesFinal);
  }
  if (type === "TC") {
    valuesTopopt = predictResult(params, model_topopt_FCM, model_topopt_FCM2);
    valuesTC = predictResult(params, model_TC_FCM, model_TC_FCM2);
    valuesFinal = valuesTC.map((x) => (x - 0.5) * 2);
    // valuesFinal = valuesTopopt.map((x, i) => x * valuesTC[i]);
    // console.log(valuesFinal);
    // valuesFinal = normalizeArray(valuesFinal);
  }
  let chosen_value = 0;
  for (let index in cubesArray1) {
    chosen_value = valuesFinal[index];

    cubesArray1[index].material.color.set(mapValueToColor(chosen_value, type));
    cubesArray1[index].material.opacity = valuesTopopt[index] > cutoff ? 1 : 0;

    cubesArray2[index].material.color.set(mapValueToColor(chosen_value, type));
    cubesArray2[index].material.opacity = valuesTopopt[index] > cutoff ? 1 : 0;
  }
}

initializeElements();

// Create an animation loop
const animate = function () {
  requestAnimationFrame(animate);

  // Render the scene with the camera
  renderer.render(scene, camera);
};

// Start the animation loop
animate();
