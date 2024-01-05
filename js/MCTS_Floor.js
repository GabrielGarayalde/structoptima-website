function setCanvasSize() {
  var canvas = document.getElementById("MCTS_floor_canvas");

  if (window.innerWidth < 700) {
    canvas.width = 300; // Set the canvas width to 80% of the window width
    canvas.height = 300; // Set the canvas height to 60% of the window height
  } else if (window.innerWidth < 1024) {
    canvas.width = 400; // Set the canvas width to 80% of the window width
    canvas.height = 400; // Set the canvas height to 60% of the window height
  } else if (window.innerWidth < 1440) {
    canvas.width = 450; // Set the canvas width to 80% of the window width
    canvas.height = 450; // Set the canvas height to 60% of the window height
  } else {
    canvas.width = 450; // Set the canvas width to 80% of the window width
    canvas.height = 450; // Set the canvas height to 60% of the window height
  }
}

// Call this function on page load or whenever you need to adjust the canvas size
setCanvasSize();

let responseData = null;

// callAPI function that takes the base and exponent numbers as parameters
var callAPI = () => {
  const startTime = performance.now(); // Record start time

  x = document.getElementById("x").value;
  y = document.getElementById("y").value;
  pressureLoad = document.getElementById("pressureLoad").value;
  maxDeflection = document.getElementById("maxDeflection").value;
  maxDepth = document.getElementById("maxDepth").value;
  console.log(x, y, pressureLoad, maxDeflection, maxDepth);
  // instantiate a headers object
  var myHeaders = new Headers();
  // add content type header to object
  myHeaders.append("Content-Type", "application/json");
  // using built in JSON utility package turn object to string and store in a variable
  var raw = JSON.stringify({
    x: x,
    y: y,
    pressureLoad: pressureLoad,
    maxDeflection: maxDeflection,
    maxDepth: maxDepth,
  });
  // create a JSON object with parameters for API call and store in a variable
  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  // make API call with parameters and use promises to get response
  fetch(
    "https://gg10w11xt0.execute-api.eu-north-1.amazonaws.com/prod",
    requestOptions
  )
    // .then((response) => response.json())
    .then((response) => response.json())
    .then((data) => {
      responseData = JSON.parse(data.body);
      drawGrid();

      const endTime = performance.now(); // Record end time
      let totalTime = (endTime - startTime) / 1000; // Calculate total time
      totalTime = totalTime.toFixed(3); // Round to 2 decimal places
      console.log(`API call took ${totalTime} seconds.`); // Print the time taken

      displayResults(responseData, totalTime);
      displayResultsGrid(responseData);
    })
    .catch((error) => console.log("error", error));
};

function displayResults(data, totalTime) {
  //  Results Slider Tile
  let results_slider_tile = document.getElementById("results_slider_tile");

  let allowed = false;
  if (
    data["Config allowed"] === true &&
    data["Within performance constraints"] === true
  ) {
    allowed = true;
  }
  results_slider_tile.innerHTML = `
    <h3>Results</h3>
    <p>Time taken: ${totalTime} secs</p>
    <p>${
      allowed
        ? "Floor config is within constraints"
        : "Floor config not allowed, try changing the parameters"
    }</p>
  `;

  //   Results Legend
  let results_legend = document.getElementById("results_legend");

  let stateDetails_legend = data.State.map((s, index) => {
    let details = "";
    if (s.type === "joist") {
      details += `J${index}: ${s.size} @ ${s.spacing}<br>`;
    } else if (s.type === "beam") {
      details += `B${index}: ${s.size} (x${s.quantity})<br>`;
    }
    return details;
  }).join("");

  results_legend.innerHTML = `
<h3>Legend </h3>
${stateDetails_legend}
`;

  //   Results Table
  let resultsDiv = document.getElementById("results");
  console.log(data);

  let stateRows = data.State.map((s, index) => {
    let spacing = s.type === "joist" ? `${s.spacing}` : ` - `;
    let quantity = s.type === "beam" ? `${s.quantity}` : ` - `;
    let key = s.type === "joist" ? `J${index}` : `B${index}`;
    let volume = s.volume.toFixed(3); // Display volume to 3 decimal places
    let displacement = s.displacement.toFixed(3); // Display volume to 3 decimal places

    return `
    
        <tr>
                <td>${s.type}</td>
                <td>${key}</td>
                <td>${s.size}</td>
                <td>${spacing}</td>
                <td>${quantity}</td>
                <td>${s.length}</td>
                <td>${volume}</td>
                <td>${displacement}</td>

        </tr>
    `;
  }).join("");

  resultsDiv.innerHTML = `
    <p>Max End State Depth: ${data["Max end state depth"]} [mm]</p>
    <p>Total Volume: ${data["Total volume"].toFixed(3)} [m^3]</p>
    <table class="results-table">
        <tr>
            <th>Type</th>
            <th>Key</th>
            <th>Size [mm]</th>
            <th>Spacing [mm]</th>
            <th>Quantity</th>
            <th>Length [mm]</th>
            <th>Volume [m^3]</th>
            <th>Displacement [mm]</th>
        </tr>
        ${stateRows}
        
    </table>
    
`;
}

// Function to update slider value display
function updateSliderValue(sliderId, displayId) {
  var slider = document.getElementById(sliderId);
  var display = document.getElementById(displayId);
  display.textContent = slider.value;

  // Add event listener to update the display when the slider value changes
  slider.addEventListener("input", function () {
    display.textContent = slider.value;
    drawGrid();
  });
}

// Function to draw grid on canvas
function drawGrid() {
  var canvas = document.getElementById("MCTS_floor_canvas");
  var ctx = canvas.getContext("2d");

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  var x = parseInt(document.getElementById("x").value);
  var y = parseInt(document.getElementById("y").value);

  // Define maximum values for sliders
  var maxX = document.getElementById("x").max;
  var maxY = document.getElementById("y").max;

  // Calculate margins as a fraction of the canvas dimensions
  var marginX = canvas.width * 0.1;
  var marginY = canvas.height * 0.1;

  // Adjusted width and height for grid drawing
  var adjustedWidth = canvas.width - 2 * marginX;
  var adjustedHeight = canvas.height - 2 * marginY;

  // Calculate grid size relative to the slider values and adjusted dimensions
  var gridSizeX = (adjustedWidth / 10) * (x / maxX);
  var gridSizeY = (adjustedHeight / 10) * (y / maxY);

  // Set fill color to grey
  ctx.fillStyle = "rgb(100,100,100";

  // Draw dots within the adjusted area
  for (var i = 0; i <= 10; i++) {
    for (var j = 0; j <= 10; j++) {
      ctx.beginPath();
      ctx.arc(
        marginX + gridSizeX * i,
        marginY + gridSizeY * j,
        1,
        0,
        2 * Math.PI
      );
      ctx.fill();
    }
  }

  // Draw a thin black border around the grid
  ctx.strokeStyle = "black"; // Set stroke color to black
  ctx.lineWidth = 2; // Set line width

  ctx.strokeRect(
    marginX,
    marginY,
    adjustedWidth * (x / maxX),
    adjustedHeight * (y / maxY)
  );
}

// Initialize the canvas grid
drawGrid();

// Call this function for each slider with its corresponding display element
updateSliderValue("x", "xValue");
updateSliderValue("y", "yValue");
updateSliderValue("pressureLoad", "pressureLoadValue");
updateSliderValue("maxDeflection", "maxDeflectionValue");
updateSliderValue("maxDepth", "maxDepthValue");

function getGridCoordinates() {
  var xSliderValue = parseInt(document.getElementById("x").value);
  var ySliderValue = parseInt(document.getElementById("y").value);

  var numOfPointsX = 11; // Number of points in x direction
  var numOfPointsY = 11; // Number of points in y direction

  var spacingX = xSliderValue / (numOfPointsX - 1); // Spacing between points in x direction
  var spacingY = ySliderValue / (numOfPointsY - 1); // Spacing between points in y direction

  var coordinates = [];

  for (var i = 0; i < numOfPointsY; i++) {
    for (var j = 0; j < numOfPointsX; j++) {
      var xCoord = j * spacingX;
      var yCoord = i * spacingY;
      coordinates.push([xCoord, yCoord]);
    }
  }

  return coordinates;
}

function displayResultsGrid(data) {
  let canvas = document.getElementById("MCTS_floor_canvas");
  let ctx = canvas.getContext("2d");

  coordinates = getGridCoordinates();

  // Define maximum values for sliders
  var maxX = document.getElementById("x").max;
  var maxY = document.getElementById("y").max;
  // Get the values of xSlider and ySlider
  var xSlider = parseInt(document.getElementById("x").value);
  var ySlider = parseInt(document.getElementById("y").value);

  // Calculate margins as a fraction of the canvas dimensions
  var marginX = canvas.width * 0.1;
  var marginY = canvas.height * 0.1;

  // Adjusted width and height for grid drawing
  var adjustedWidth = canvas.width - 2 * marginX;
  var adjustedHeight = canvas.height - 2 * marginY;

  var elementWidth = xSlider / maxX;
  var elementHeight = ySlider / maxY;

  // Calculate grid size relative to the slider values and adjusted dimensions
  var elementWidth = adjustedWidth * (xSlider / maxX);
  var elementHeight = adjustedHeight * (ySlider / maxY);

  // Draw joists from the state data
  data.State.forEach((element, index) => {
    let type = element.type;

    let labelX, labelY, labelText;

    let legendEntry;

    if (type === "joist") {
      ctx.beginPath();
      ctx.strokeStyle = "blue"; // Color for the element line
      ctx.lineWidth = 2; // Width of the element line

      // Map node numbers to coordinates
      var [x1, y1] = coordinates[element.start[0]];
      var [x2, y2] = coordinates[element.start[1]];
      var [x3, y3] = coordinates[element.end[0]];
      var [x4, y4] = coordinates[element.end[1]];

      // Calculate width and height
      var width = Math.max(x1, x2, x3, x4) - Math.min(x1, x2, x3, x4);
      var height = Math.max(y1, y2, y3, y4) - Math.min(y1, y2, y3, y4);

      // Calculate the center of the joist
      var centerX = (x1 + x2 + x3 + x4) / 4;
      var centerY = (y1 + y2 + y3 + y4) / 4;

      var centerX_n = marginX + adjustedWidth * (centerX / maxX);
      var centerY_n =
        marginY + elementHeight - adjustedHeight * (centerY / maxY);

      // Draw line
      ctx.beginPath();
      if (x1 === x2) {
        // Joist is horizontal
        var lineLength = width * 0.5;
        var lineStart = centerX - lineLength / 2;
        var lineEnd = centerX + lineLength / 2;

        var lineStart_n = marginX + adjustedWidth * (lineStart / maxX);
        var lineEnd_n = marginX + adjustedWidth * (lineEnd / maxX);

        ctx.moveTo(lineStart_n, centerY_n);
        ctx.lineTo(lineEnd_n, centerY_n);
      } else {
        // Joist is vertical
        var lineLength = height * 0.5;
        var lineStart = centerY - lineLength / 2;
        var lineEnd = centerY + lineLength / 2;

        var lineStart_n =
          marginY + elementHeight - adjustedHeight * (lineStart / maxY);
        var lineEnd_n =
          marginY + elementHeight - adjustedHeight * (lineEnd / maxY);

        ctx.moveTo(centerX_n, lineStart_n);
        ctx.lineTo(centerX_n, lineEnd_n);
      }

      console.log(
        `Element ${index}: Type: ${type}, Start: [${x1}, ${y1}], End: [${x4}, ${y4}]`
      );

      ctx.strokeStyle = "green";
      ctx.stroke();

      labelX = centerX_n;
      labelY = centerY_n;
      labelText = `J${index}`; // Label for joist
    } else if (type === "beam") {
      ctx.beginPath();
      ctx.strokeStyle = "red"; // Color for the element line
      ctx.lineWidth = 2; // Width of the element line

      let startNode = [element.start[0]];
      let endNode = [element.end[0]];

      let startX =
        marginX + adjustedWidth * (coordinates[element.start[0]][0] / maxX);

      let startY =
        marginY +
        elementHeight -
        adjustedHeight * (coordinates[element.start[0]][1] / maxY);

      let endX =
        marginX + adjustedWidth * (coordinates[element.end[0]][0] / maxX);
      let endY =
        marginY +
        elementHeight -
        adjustedHeight * (coordinates[element.end[0]][1] / maxY);

      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();

      console.log(
        `Element ${index}: Type: ${type} Start Node ID: ${startNode}, End Node ID: ${endNode}, Start: [${startX}, ${startY}], End: [${endX}, ${endY}]`
      );

      labelX = (startX + endX) / 2;
      labelY = (startY + endY) / 2;
      labelText = `B${index}`; // Label for beam
    }

    labelX += 3; // Offset the label a bit to the right
    labelY += 3; // Offset the label a bit downwards

    // Draw the label
    ctx.font = "12px Arial"; // Set font size and style
    ctx.fillStyle = "black"; // Set text color
    ctx.fillText(labelText, labelX, labelY); // Draw text
  });
}
