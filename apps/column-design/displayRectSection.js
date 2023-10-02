export default function displayRectSection(canvas, sectionData) {
  const ctx = canvas.getContext("2d");

  // Define the cross-sectional parameters
  const d = sectionData.d; // Depth
  const b = sectionData.b; // Width of flange
  const t = sectionData.t; // Thickness of web

  // Define translation values
  const translateX = canvas.width * 0.7; // Adjust this as needed for horizontal translation
  const translateY = canvas.height * 0.2; // Adjust this as needed for vertical translation

  // Translate the context
  ctx.translate(translateX, translateY);
  // Define scale factors
  const scaleX = 0.5; // Scale factor for the horizontal direction
  const scaleY = 0.5; // Scale factor for the vertical direction

  // Scale the context
  ctx.scale(scaleX, scaleY);

  // Set outer rectangle properties
  const outerX = 0; // X-coordinate of the top-left corner
  const outerY = 0; // Y-coordinate of the top-left corner
  const cornerRadius = 20; // Border radius for rounded corners

  // Set inner rectangle properties
  const innerX = outerX + t; // X-coordinate of the top-left corner
  const innerY = outerY + t; // Y-coordinate of the top-left corner
  const innerWidth = b - t * 2; // Width of the inner rectangle (10px inset)
  const innerHeight = d - t * 2; // Height of the inner rectangle (10px inset)

  // Draw the outer rectangle with rounded corners
  ctx.beginPath();
  ctx.moveTo(outerX + cornerRadius, outerY);
  ctx.lineTo(outerX + b - cornerRadius, outerY);
  ctx.arcTo(
    outerX + b,
    outerY,
    outerX + b,
    outerY + cornerRadius,
    cornerRadius
  );
  ctx.lineTo(outerX + b, outerY + d - cornerRadius);
  ctx.arcTo(
    outerX + b,
    outerY + d,
    outerX + b - cornerRadius,
    outerY + d,
    cornerRadius
  );
  ctx.lineTo(outerX + cornerRadius, outerY + d);
  ctx.arcTo(
    outerX,
    outerY + d,
    outerX,
    outerY + d - cornerRadius,
    cornerRadius
  );
  ctx.lineTo(outerX, outerY + cornerRadius);
  ctx.arcTo(outerX, outerY, outerX + cornerRadius, outerY, cornerRadius);
  ctx.closePath();

  ctx.strokeStyle = "black";
  ctx.lineWidth = 4;

  ctx.stroke();

  // Draw the inner rectangle with rounded corners
  ctx.beginPath();
  ctx.moveTo(innerX + cornerRadius, innerY);
  ctx.lineTo(innerX + innerWidth - cornerRadius, innerY);
  ctx.arcTo(
    innerX + innerWidth,
    innerY,
    innerX + innerWidth,
    innerY + cornerRadius,
    cornerRadius
  );
  ctx.lineTo(innerX + innerWidth, innerY + innerHeight - cornerRadius);
  ctx.arcTo(
    innerX + innerWidth,
    innerY + innerHeight,
    innerX + innerWidth - cornerRadius,
    innerY + innerHeight,
    cornerRadius
  );
  ctx.lineTo(innerX + cornerRadius, innerY + innerHeight);
  ctx.arcTo(
    innerX,
    innerY + innerHeight,
    innerX,
    innerY + innerHeight - cornerRadius,
    cornerRadius
  );
  ctx.lineTo(innerX, innerY + cornerRadius);
  ctx.arcTo(innerX, innerY, innerX + cornerRadius, innerY, cornerRadius);
  ctx.closePath();

  ctx.stroke();

  ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset to the identity matrix
}
