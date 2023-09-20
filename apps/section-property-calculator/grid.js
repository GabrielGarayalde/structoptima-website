/*
    document.
        querySelector(<css selector>)
        getElementById(<id>)
        querySelectorAll(<css selector>)
*/

import Rectangle from "./Rectangle.js";
import drawCOG from "./drawCOG.js";

const DOTS_X = 31;
const DOTS_Y = 23;
const CANVAS_W = 800;
const CANVAS_H = 600;
const SPACING_X = CANVAS_W / (DOTS_X + 1);
const SPACING_Y = CANVAS_H / (DOTS_Y + 1);
const SQUARE_AREA = SPACING_X * SPACING_Y;
const SQUARE_MOI = (SQUARE_AREA * SQUARE_AREA) / 12;

const qs = (s) => document.querySelector(s);

const dotSize = 4;

const canvas = qs("#section-property-calculator-canvas");
canvas.width = CANVAS_W;
canvas.height = CANVAS_H;
canvas.style.border = "1px solid black";
const ctx = canvas.getContext("2d");

const currentWidthEl = qs("#current-width");
const currentHeightEl = qs("#current-height");
const currentAreaEl = qs("#current-area");
const totalCOGEl = qs("#total-COG");
const totalAreaEl = qs("#total-area");
const totalMOIEl = qs("#total-MOI");

const clearAllBtn = qs("#clear-all-button");
const clearBtn = qs("#clear-button");

let dots = [];
let dots_centroid = [];
let selectionStart;
let dragging = false;

// selection contains the x, y, w, h of the selection rectangle
let rectProperties;

initializeGrid(DOTS_X, DOTS_Y);

clearAllBtn.addEventListener("click", () => {
  Rectangle.all = [];
  rectProperties = null;
  dots.forEach((dot) => {
    dot.selected = false;
  });
  renderCanvasElements();
});

clearBtn.addEventListener("click", () => {
  Rectangle.all.pop();
  rectProperties = null;
  renderCanvasElements();
});

// rect function draws the rectangle
export function drawRect(x, y, w, h, color) {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

function drawCircle(x, y, radius, color) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fillStyle = color; // Set the fill color
  ctx.fill(); // Fill the circle
}

function initializeGrid(dots_x, dots_y) {
  for (let i = 0; i < dots_y; i++) {
    for (let j = 0; j < dots_x; j++) {
      let x = (j + 1) * SPACING_X;
      let y = (i + 1) * SPACING_Y;
      dots.push({ id: i * dots_y + j, x, y });
    }
  }
  for (let i = 0; i < dots_y + 1; i++) {
    for (let j = 0; j < dots_x + 1; j++) {
      let x = SPACING_X / 2 + j * SPACING_X;
      let y = SPACING_Y / 2 + i * SPACING_Y;
      dots_centroid.push({ id: i * dots_y + j, x, y });
    }
  }
  renderCanvasElements();
}

function drawGrid() {
  dots.forEach((dot) => {
    drawCircle(dot.x, dot.y, dotSize / 2, "black");
  });
  dots_centroid.forEach((dot) => {
    drawCircle(dot.x, dot.y, dotSize / 2, "white");
  });
}

function renderCanvasElements() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let COG = calculateCOG();
  drawGrid();
  findSelectedDots();
  renderTotalPropertiesInfo();
  if (rectProperties) {
    drawRect(...rectProperties, "magenta");
  }
  if (Rectangle.all) {
    renderRectangles();
  }
  drawCOG(ctx, COG[0], COG[1]);
}

canvas.addEventListener("mousedown", startDrag);
document.addEventListener("mouseup", endDrag);
canvas.addEventListener("click", handleClick);

function getNearestDot(x, y) {
  let copy = [...dots];
  copy.forEach((dot, i) => {
    copy[i].dist = Math.sqrt((dot.x - x) ** 2 + (dot.y - y) ** 2);
  });
  copy.sort((a, b) => a.dist - b.dist);
  return copy[0];
} // returns {x: Number, y: Number}

function handleClick(e) {
  let [x, y] = getCanvasClient(e);

  dots.forEach((dot, i) => {
    dots[i].dist = Math.sqrt((dot.x - x) ** 2 + (dot.y - y) ** 2);
    dots[i].selected = false;
  });
  dots.sort((a, b) => a.dist - b.dist);
  dots[0].selected = true;
  renderCanvasElements();
}

function getCanvasClient(e) {
  let { top, left } = canvas.getBoundingClientRect();
  let x = e.clientX - left;
  let y = e.clientY - top;
  return [x, y];
}

function startDrag(e) {
  selectionStart = getNearestDot(...getCanvasClient(e));
  document.addEventListener("mousemove", drag);
  dragging = true;
}

function endDrag(e) {
  if (!dragging) return;
  document.removeEventListener("mousemove", drag);
  recordRectProperties(e);
  new Rectangle(...rectProperties);
  renderCurrentPropertiesInfo();
  renderCanvasElements();
  dragging = false;
}

function drag(e) {
  recordRectProperties(e);
  renderCurrentPropertiesInfo();
  renderCanvasElements();
}

function recordRectProperties(e) {
  let { x, y } = getNearestDot(...getCanvasClient(e));
  let w = x - selectionStart.x;
  let h = y - selectionStart.y;
  rectProperties = [selectionStart.x, selectionStart.y, w, h];
}

function renderCurrentPropertiesInfo() {
  currentWidthEl.innerText = Math.round(Math.abs(rectProperties[2]));
  currentHeightEl.innerText = Math.round(Math.abs(rectProperties[3]));
  currentAreaEl.innerText = Math.round(
    Math.abs(rectProperties[2] * rectProperties[3])
  );
}

function renderTotalPropertiesInfo() {
  totalAreaEl.innerText = Math.round(calculateArea());
  let COG = calculateCOG();
  totalCOGEl.innerText = `(${Math.round(COG[0])}, ${Math.round(COG[1])})`;
  let MOI = calculateMomentOfInertia(COG);
  totalMOIEl.innerText = `(${MOI[0].toExponential(2)}, ${MOI[1].toExponential(
    2
  )})`;
}

function renderRectangles() {
  Rectangle.all.forEach((rectangle) => {
    rectangle.render();
  });
}

function findSelectedDots() {
  dots_centroid.forEach((d, i) => {
    dots_centroid[i].selected = false;
  });
  Rectangle.all.forEach((rectangle) => {
    dots_centroid.forEach((dot, dotIndex) => {
      if (
        dot.x >= rectangle.left &&
        dot.x <= rectangle.right &&
        dot.y >= rectangle.top &&
        dot.y <= rectangle.bottom &&
        rectangle.w &&
        rectangle.h
      ) {
        dots_centroid[dotIndex].selected = true;
      }
    });
  });
}

function calculateArea() {
  let area = 0;
  dots_centroid.forEach((dot) => {
    if (dot.selected) {
      area += SQUARE_AREA;
    }
  });
  return area;
}

function calculateCOG() {
  let x_total = 0;
  let y_total = 0;
  let counter = 0;
  dots_centroid.forEach((dot) => {
    if (dot.selected) {
      x_total += dot.x;
      y_total += dot.y;
      counter++;
    }
  });
  return [x_total / counter, y_total / counter];
}

function calculateMomentOfInertia(COG) {
  let MOI_X = 0;
  let MOI_Y = 0;
  let r_x;
  let r_y;
  dots_centroid.forEach((dot) => {
    if (dot.selected) {
      r_x = dot.x - COG[0];
      r_y = dot.y - COG[1];
      MOI_X += SQUARE_MOI + r_y ** 2 * SQUARE_AREA;
      MOI_Y += SQUARE_MOI + r_x ** 2 * SQUARE_AREA;
    }
  });
  return [MOI_X, MOI_Y];
}

// TODO:
// - the render properties info function needs to be updated to render the total properties of all the rectangles
// - can getNearestDot and handleClick be combined into one function?
