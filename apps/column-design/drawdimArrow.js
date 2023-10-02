export default function drawdimArrow(canvas, x1, y1, x2, y2, offset) {
  const context = canvas.getContext("2d");

  // Calculate the angle between the two points
  const angle = Math.atan2(y2 - y1, x2 - x1);

  // Calculate the perpendicular points
  const offsetX = offset * Math.sin(angle);
  const offsetY = offset * Math.cos(angle);

  // Calculate the positions of the arrowheads at the ends of the dimension line
  const arrowhead1X = x1 + offsetX;
  const arrowhead1Y = y1 - offsetY;
  const arrowhead2X = x2 + offsetX;
  const arrowhead2Y = y2 - offsetY;

  // Draw the first arrowhead
  context.beginPath();
  context.moveTo(arrowhead1X, arrowhead1Y);
  context.lineTo(
    arrowhead1X + 10 * Math.cos(angle - Math.PI / 6),
    arrowhead1Y + 10 * Math.sin(angle - Math.PI / 6)
  );
  context.lineTo(
    arrowhead1X + 10 * Math.cos(angle + Math.PI / 6),
    arrowhead1Y + 10 * Math.sin(angle + Math.PI / 6)
  );
  context.closePath();
  context.fill();

  // Draw the second arrowhead
  context.beginPath();
  context.moveTo(arrowhead2X, arrowhead2Y);
  context.lineTo(
    arrowhead2X - 10 * Math.cos(angle - Math.PI / 6),
    arrowhead2Y - 10 * Math.sin(angle - Math.PI / 6)
  );
  context.lineTo(
    arrowhead2X - 10 * Math.cos(angle + Math.PI / 6),
    arrowhead2Y - 10 * Math.sin(angle + Math.PI / 6)
  );
  context.closePath();
  context.fill();

  // Draw the dimension line
  context.beginPath();
  context.moveTo(arrowhead1X, arrowhead1Y);
  context.lineTo(arrowhead2X, arrowhead2Y);
  context.stroke();
}
