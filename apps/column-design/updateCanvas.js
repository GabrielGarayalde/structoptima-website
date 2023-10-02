import displaySectionSelect from "./displaySectionSelect.js";
export default function updateCanvas(canvas, resultsSorted, params) {
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);

  // -----------------------------------------------
  // DISPLAY THE SECTION
  // -------------------------------------------
  displaySectionSelect(canvas, resultsSorted[1][0], params[3], params[4]);
  // Define translation values

  // -------------------------------------
  // DRAWING THE FIRST EFFECTIVE LENGTH X
  // -------------------------------------
  const Le_x = params[0];

  const start_x_Le_x = canvas.width * 0.1;
  const start_y_Le_x =
    canvas.height * 0.9 - canvas.height * 0.7 * (Le_x / 10000);
  const width_Le_x = canvas.height * 0.1;
  // we want a ratio between the Le_x and the max length (10000mm)
  const height_Le_x = canvas.height * 0.7 * (Le_x / 10000);

  // Set the stroke color (black) and line width
  context.strokeStyle = "black";
  context.lineWidth = 4;

  // Begin the path
  context.beginPath();
  // Move to the starting point (top-right corner)
  context.moveTo(start_x_Le_x + width_Le_x / 2, start_y_Le_x);
  context.lineTo(start_x_Le_x + width_Le_x / 2, start_y_Le_x + height_Le_x); // Top-right corner
  context.stroke();

  const height = 30; // Height of the triangle

  // Begin the path
  context.beginPath();
  // Move to the starting point (top-right corner)
  context.moveTo(start_x_Le_x + width_Le_x / 2, start_y_Le_x);
  context.lineTo(start_x_Le_x + width_Le_x, start_y_Le_x + height / 2); // Top-right corner
  context.lineTo(start_x_Le_x + width_Le_x, start_y_Le_x - height / 2); // Bottom-left corner
  context.lineTo(start_x_Le_x + width_Le_x / 2, start_y_Le_x); // Back to the starting point

  // Move to the starting point (top-right corner)
  context.moveTo(start_x_Le_x + width_Le_x / 2, start_y_Le_x + height_Le_x);
  context.lineTo(
    start_x_Le_x + width_Le_x,
    start_y_Le_x + height_Le_x + height / 2
  ); // Top-right corner
  context.lineTo(
    start_x_Le_x + width_Le_x,
    start_y_Le_x + height_Le_x - height / 2
  ); // Bottom-left corner
  context.lineTo(start_x_Le_x + width_Le_x / 2, start_y_Le_x + height_Le_x);
  // Close the path to automatically connect the last point to the first
  context.closePath();
  // Set the stroke and fill styles
  context.strokeStyle = "black"; // Border color
  context.lineWidth = 2; // Border width

  // Fill and stroke the triangle
  context.stroke(); // Stroke the triangle border

  // End the path
  context.closePath();

  // Draw the text above the arrow
  context.fillStyle = "black";
  context.font = "36px Arial";
  context.textAlign = "center";
  context.fillText(
    `Lex* = ${Le_x / 1000}m`,
    start_x_Le_x + width_Le_x / 2,
    start_y_Le_x + height_Le_x + canvas.height * 0.07
  );

  // -------------------------------------
  // DRAWING THE SECOND EFFECTIVE LENGTH X
  // -------------------------------------
  const Le_y = params[1];

  const start_x_Le_y = canvas.width * 0.4;
  const start_y_Le_y =
    canvas.height * 0.9 - canvas.height * 0.7 * (Le_y / 10000);
  const width_Le_y = canvas.height * 0.1;
  // we want a ratio between the Le_y and the max length (10000mm)
  const height_Le_y = canvas.height * 0.7 * (Le_y / 10000);

  // Set the stroke color (black) and line width
  context.strokeStyle = "black";
  context.lineWidth = 4;

  // Begin the path
  context.beginPath();
  // Move to the starting point (top-right corner)
  context.moveTo(start_x_Le_y + width_Le_y / 2, start_y_Le_y);
  context.lineTo(start_x_Le_y + width_Le_y / 2, start_y_Le_y + height_Le_y); // Top-right corner
  context.stroke();

  // Set the triangle's properties

  // Begin the path
  context.beginPath();

  // Move to the starting point (top-right corner)
  context.moveTo(start_x_Le_y + width_Le_x / 2, start_y_Le_y);
  context.lineTo(start_x_Le_y + width_Le_x, start_y_Le_y + height / 2); // Top-right corner
  context.lineTo(start_x_Le_y + width_Le_x, start_y_Le_y - height / 2); // Bottom-left corner
  context.lineTo(start_x_Le_y + width_Le_x / 2, start_y_Le_y); // Back to the starting point

  // Move to the starting point (top-right corner)
  context.moveTo(start_x_Le_y + width_Le_x / 2, start_y_Le_y + height_Le_y);
  context.lineTo(
    start_x_Le_y + width_Le_x,
    start_y_Le_y + height_Le_y + height / 2
  ); // Top-right corner
  context.lineTo(
    start_x_Le_y + width_Le_x,
    start_y_Le_y + height_Le_y - height / 2
  ); // Bottom-left corner
  context.lineTo(start_x_Le_y + width_Le_x / 2, start_y_Le_y + height_Le_y);
  // Close the path to automatically connect the last point to the first
  context.closePath();

  // Set the stroke and fill styles
  context.strokeStyle = "black"; // Border color
  context.lineWidth = 2; // Border width

  context.stroke(); // Stroke the triangle border

  // End the path
  context.closePath();

  // Draw the text above the arrow
  context.fillStyle = "black";
  context.font = "36px Arial";
  context.textAlign = "center";
  context.fillText(
    `Ley* = ${Le_y / 1000}m`,
    start_x_Le_y + width_Le_y / 2,
    start_y_Le_y + height_Le_y + canvas.height * 0.07
  );

  // -------------------------------------
  // AXIAL COMPRESSION ARROW ABOVE THE LEX
  // -------------------------------------
  const arrowTipX_Le_x = start_x_Le_x + width_Le_x / 2;
  const arrowTipY_Le_x = start_y_Le_x - canvas.height * 0.25; // 10px above the top of the rectangle

  // Draw the large thick arrow with arrowhead pointing downwards
  context.strokeStyle = "black";
  context.lineWidth = 5;
  context.beginPath();
  context.moveTo(arrowTipX_Le_x, arrowTipY_Le_x);
  context.lineTo(arrowTipX_Le_x, arrowTipY_Le_x + canvas.height * 0.2);
  context.lineTo(arrowTipX_Le_x - 10, arrowTipY_Le_x + canvas.height * 0.18); // Arrowhead
  context.moveTo(arrowTipX_Le_x, arrowTipY_Le_x + canvas.height * 0.2);
  context.lineTo(arrowTipX_Le_x + 10, arrowTipY_Le_x + canvas.height * 0.18); // Arrowhead
  context.stroke();

  // Draw the text above the arrow
  context.fillStyle = "black";
  context.font = "36px Arial";
  context.textAlign = "center";
  context.fillText(
    `N* = ${params[2] / 1000}kN`,
    arrowTipX_Le_x,
    arrowTipY_Le_x - 10
  );

  const arrowTipX_Le_y = start_x_Le_y + width_Le_y / 2;
  const arrowTipY_Le_y = start_y_Le_y - canvas.height * 0.25; // 10px above the top of the rectangle

  // Draw the large thick arrow with arrowhead pointing downwards
  context.strokeStyle = "black";
  context.lineWidth = 5;
  context.beginPath();
  context.moveTo(arrowTipX_Le_y, arrowTipY_Le_y);
  context.lineTo(arrowTipX_Le_y, arrowTipY_Le_y + canvas.height * 0.2);
  context.lineTo(arrowTipX_Le_y - 10, arrowTipY_Le_y + canvas.height * 0.18); // Arrowhead
  context.moveTo(arrowTipX_Le_y, arrowTipY_Le_y + canvas.height * 0.2);
  context.lineTo(arrowTipX_Le_y + 10, arrowTipY_Le_y + canvas.height * 0.18); // Arrowhead
  context.stroke();

  // Draw the text above the arrow
  context.fillStyle = "black";
  context.font = "36px Arial";
  context.textAlign = "center";
  context.fillText(
    `N* = ${params[2] / 1000}kN`,
    arrowTipX_Le_y,
    arrowTipY_Le_y - 10
  );
}
