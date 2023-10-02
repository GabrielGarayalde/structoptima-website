export default function displayBeamSection(canvas, sectionData) {
  const ctx = canvas.getContext("2d");

  // Define the cross-sectional parameters
  const d = sectionData.d; // Depth
  const tf = sectionData.tf; // Thickness of flange
  const tw = sectionData.tw; // Thickness of web
  const bf = sectionData.bf; // Width of flange
  const r1 = sectionData.r1;
  const length = (bf - tw) / 2;

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

  // Draw the large thick arrow with arrowhead pointing downwards
  ctx.strokeStyle = "black";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, tf);
  ctx.lineTo(0, tf);
  ctx.lineTo(length - r1, tf);
  ctx.lineTo(length, tf + r1);
  ctx.lineTo(length, d - tf - r1);
  ctx.lineTo(length - r1, d - tf);
  ctx.lineTo(0, d - tf);
  ctx.lineTo(0, d);
  ctx.lineTo(bf, d);
  ctx.lineTo(bf, d - tf);
  ctx.lineTo(bf - length + r1, d - tf);
  ctx.lineTo(bf - length, d - tf - r1);
  ctx.lineTo(bf - length, tf + r1);
  ctx.lineTo(bf - length + r1, tf);
  ctx.lineTo(bf, tf);
  ctx.lineTo(bf, 0);
  ctx.lineTo(0, 0);
  ctx.stroke();

  ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset to the identity matrix
}
