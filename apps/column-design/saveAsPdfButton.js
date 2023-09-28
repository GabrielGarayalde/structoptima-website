// Save the PDF when the button is clicked
const saveButton = document.getElementById("saveAsPdfButton");

let LexRangeOutput = document.getElementById("LexRangeValue");
let LeyRangeOutput = document.getElementById("LeyRangeValue");
let NRangeOutput = document.getElementById("NRangeValue");
let MxiRangeOutput = document.getElementById("MxiRangeValue");
let MyiRangeOutput = document.getElementById("MyiRangeValue");

const resultsItems = document.querySelectorAll(".results-item");

// Create a new Date object
const currentDate = new Date();

// Get the current date
const year = currentDate.getFullYear(); // Four-digit year (e.g., 2023)
const month = currentDate.getMonth(); // Month (0-11, where 0 is January)
const day = currentDate.getDate(); // Day of the month (1-31)

// Get the current time
const hours = currentDate.getHours(); // Hours (0-23)
const minutes = currentDate.getMinutes(); // Minutes (0-59)
const seconds = currentDate.getSeconds(); // Seconds (0-59)

saveButton.addEventListener("click", function () {
  const doc = new jsPDF();
  doc.setFontSize(8);
  doc.text(
    `Date Created: ${year}-${month + 1}-${day}, ${hours}:${minutes}:${seconds}`,
    10,
    10
  );

  doc.setFontSize(16);
  doc.setFont("courier", "bold");
  doc.text("Column Design Calculator: Results File", 10, 20);

  doc.setFontSize(10);
  doc.text("Length Parameters", 10, 40);
  doc.text(`Effective Length in x, Lex = ${LexRangeOutput.innerText}m`, 10, 50);
  doc.text(`Effective Length in y, Ley = ${LeyRangeOutput.innerText}m`, 10, 60);
  doc.text(
    `Design Axial Compression Force, N* = ${NRangeOutput.innerText} kN`,
    10,
    70
  );
  doc.text(
    `Design Bending Moment in x, Mix* = ${MxiRangeOutput.innerText} kNm`,
    10,
    80
  );
  doc.text(
    `Design Bending Moment in y, Miy* = ${MyiRangeOutput.innerText} kNm`,
    10,
    90
  );

  doc.text(
    "   ID                   Failure Mode                           Score [%]",
    10,
    110
  );

  resultsItems.forEach((resultsItem, resultsItem_index) => {
    const resultsId = resultsItem.querySelector(".results-id");
    const texts = resultsItem.querySelectorAll(".results-text");
    const scores = resultsItem.querySelectorAll(".results-score");

    doc.text(resultsId.innerText, 10, 120 + resultsItem_index * 60);

    texts.forEach((text, texts_index) => {
      doc.text(
        `${text.innerText}`,
        50,
        120 + resultsItem_index * 50 + texts_index * 10
      );
    });

    scores.forEach((score, scores_index) => {
      doc.text(
        score.innerText,
        150,
        120 + resultsItem_index * 50 + scores_index * 10
      );
    });
  });

  doc.save("your-document.pdf");
});
