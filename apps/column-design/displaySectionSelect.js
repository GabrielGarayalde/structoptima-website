import steelSectionData from "./steelSectionData.js";
import displayBeamSection from "./displayBeamSection.js";
import displayRectSection from "./displayRectSection.js";
export default function displaySectionSelect(canvas, sectionId, Mx, My) {
  const ctx = canvas.getContext("2d");

  let sectionData = null; // Initialize it to null
  let d = null;
  let bf = null;
  // Check if the section ID exists in the "UB" object
  if (steelSectionData.UB.hasOwnProperty(sectionId)) {
    // Retrieve the data for the section
    sectionData = steelSectionData.UB[sectionId]; // Assign the value
    displayBeamSection(canvas, sectionData);
    d = sectionData.d; // Depth
    bf = sectionData.bf; // Width of flange
  } else if (steelSectionData.UC.hasOwnProperty(sectionId)) {
    sectionData = steelSectionData.UC[sectionId]; // Assign the value
    displayBeamSection(canvas, sectionData);
    d = sectionData.d; // Depth
    bf = sectionData.bf; // Width of flange
  } else if (steelSectionData.SHS.hasOwnProperty(sectionId)) {
    sectionData = steelSectionData.SHS[sectionId]; // Assign the value
    displayRectSection(canvas, sectionData);
    d = sectionData.d; // Depth
    bf = sectionData.b; // Width of flange
  }

  // Define translation values
  const translateX = canvas.width * 0.7; // Adjust this as needed for horizontal translation
  const translateY = canvas.height * 0.2; // Adjust this as needed for vertical translation

  // Draw the text above the arrow
  ctx.fillStyle = "black";
  ctx.font = "36px Arial";
  ctx.textAlign = "center";
  ctx.fillText(`${sectionId}`, translateX + 20, translateY - 10);

  // Define scale factors
  const scaleX = 0.5; // Scale factor for the horizontal direction
  const scaleY = 0.5; // Scale factor for the vertical direction

  const arrowTipX_Mx = translateX + (bf / 2) * scaleX; // Adjust this as needed for horizontal translation
  const arrowTipY_Mx = translateY + (d / 2) * scaleY; // Adjust this as needed for vertical translation

  // Draw the large thick arrow with arrowhead pointing to the left
  ctx.strokeStyle = "black";
  ctx.lineWidth = 5;
  const direction_Mx = +1; // Change direction to -1 for left-pointing arrow
  ctx.beginPath();
  ctx.moveTo(arrowTipX_Mx + direction_Mx * canvas.width * 0.15, arrowTipY_Mx);
  ctx.lineTo(arrowTipX_Mx, arrowTipY_Mx);
  ctx.lineTo(
    arrowTipX_Mx + direction_Mx * canvas.width * 0.02,
    arrowTipY_Mx - 10
  ); // Arrowhead
  ctx.moveTo(arrowTipX_Mx, arrowTipY_Mx);
  ctx.lineTo(
    arrowTipX_Mx + direction_Mx * canvas.width * 0.02,
    arrowTipY_Mx + 10
  ); // Arrowhead
  ctx.moveTo(
    arrowTipX_Mx + direction_Mx * canvas.width * 0.04,
    arrowTipY_Mx - 10
  );
  ctx.lineTo(arrowTipX_Mx + direction_Mx * canvas.width * 0.02, arrowTipY_Mx);
  ctx.lineTo(
    arrowTipX_Mx + direction_Mx * canvas.width * 0.04,
    arrowTipY_Mx + 10
  ); // Arrowhead
  ctx.stroke();

  ctx.fillStyle = "black";
  ctx.font = "36px Arial";
  ctx.textAlign = "center";
  ctx.fillText(
    `Mx* = `,
    translateX + bf * 0.8 * 2 * scaleX,
    translateY + d * 0.7 * scaleY
  );
  ctx.fillText(
    `${Mx / 1000000}kNm`,
    translateX + bf * 0.8 * 2 * scaleX,
    translateY + d * 0.9 * scaleY
  );

  const arrowTipX_My = translateX + (bf / 2) * scaleX; // Adjust this as needed for horizontal translation
  const arrowTipY_My = translateY + (d / 2) * scaleY;
  // Draw the large thick arrow with arrowhead pointing downwards
  ctx.strokeStyle = "black";
  ctx.lineWidth = 5;
  const direction_My = 1;
  ctx.beginPath();
  ctx.moveTo(arrowTipX_My, arrowTipY_My + direction_My * canvas.height * 0.2);
  ctx.lineTo(arrowTipX_My, arrowTipY_My);
  ctx.lineTo(
    arrowTipX_My - 10,
    arrowTipY_My + direction_My * canvas.height * 0.02
  ); // Arrowhead
  ctx.moveTo(arrowTipX_My, arrowTipY_My);
  ctx.lineTo(
    arrowTipX_My + 10,
    arrowTipY_My + direction_My * canvas.height * 0.02
  ); // Arrowhead
  ctx.moveTo(
    arrowTipX_My - 10,
    arrowTipY_My + direction_My * canvas.height * 0.04
  );
  ctx.lineTo(arrowTipX_My, arrowTipY_My + direction_My * canvas.height * 0.02);
  ctx.lineTo(
    arrowTipX_My + 10,
    arrowTipY_My + direction_My * canvas.height * 0.04
  ); // Arrowhead
  ctx.stroke();
  // Draw the text above the arrow
  ctx.fillStyle = "black";
  ctx.font = "36px Arial";
  ctx.textAlign = "center";

  ctx.fillText(
    `My* = `,
    translateX + 20,
    translateY + (d + canvas.height * 0.15) * scaleY
  );
  ctx.fillText(
    `${My / 1000000}kNm`,
    translateX + 20,
    translateY + (d + canvas.height * 0.3) * scaleY
  );
}
