export default function drawCOG(ctx, x, y) {
  const armLength = 30; // Length of each arm
  const armThickness = 2;
  const x_round = Math.round(x);
  const y_round = Math.round(y);

  ctx.save(); // Save the current drawing state

  ctx.beginPath();

  // Draw horizontal line (left to right)
  ctx.moveTo(x_round - armLength, y_round);
  ctx.lineTo(x_round + armLength, y_round);

  // Draw vertical line (top to bottom)
  ctx.moveTo(x_round, y_round - armLength);
  ctx.lineTo(x_round, y_round + armLength);

  // Set line thickness
  ctx.lineWidth = armThickness;

  // Set line color (optional)
  ctx.strokeStyle = "black";

  // Draw the lines
  ctx.stroke();

  // Draw x and y values above the cross
  const textOffsetX = 5;
  const textOffsetY = -5;
  ctx.font = "bold 16px Arial";
  const textColor = "blue";
  ctx.fillStyle = textColor;
  ctx.fillText(
    `COG:`,
    x_round + textOffsetX,
    y_round + textOffsetY - armLength - 16
  );
  ctx.fillText(
    `x: ${x_round}`,
    x_round + textOffsetX,
    y_round + textOffsetY - armLength - 2
  );
  ctx.fillText(
    `y: ${y_round}`,
    x_round + textOffsetX,
    y_round + textOffsetY - armLength + 12
  );

  ctx.restore(); // Restore the previous drawing state
}
