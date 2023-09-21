export const drawdimArrow = (context: CanvasRenderingContext2D, startX: number, startY: number, endX: number, endY: number, sliderValue1: number) => {
    
  // endY = sliderValue1 *20 ;
  // Draw dimension leader
    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.strokeStyle = "black";
    context.lineWidth = 2;
    context.stroke();
  
    // Draw arrows
    context.beginPath();
    context.moveTo(endX - 5, endY - 10);
    context.lineTo(endX, endY);
    context.lineTo(endX + 5, endY - 10);
    context.strokeStyle = "black";
    context.lineWidth = 2;
    context.stroke();
  
    context.beginPath();
    context.moveTo(startX - 5, startY + 10);
    context.lineTo(startX, startY);
    context.lineTo(startX + 5, startY + 10);
    context.strokeStyle = "black";
    context.lineWidth = 2;
    context.stroke();
  
    // Draw dimension number
    context.save(); // save the current canvas state
    context.translate((startX + endX) / 2 - 20, (startY + endY) / 2); // move the canvas origin to the center of the text
    context.rotate(-Math.PI / 2); // rotate the canvas by 90 degrees counterclockwise
    context.font = "14px sans-serif";
    context.textAlign = "center";
    context.fillStyle = "black";
    context.fillText("Effective Length ", 0, 0); // draw the first line of text
    context.fillText("Le: " + sliderValue1.toString() + " [m]", 0, 14); // draw the second line of text below the first
    context.restore();
  };