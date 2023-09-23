export default function colorChange(value, id) {
  let result = document.getElementById(id);

  // Remove existing color classes for each individual item
  result.classList.remove(
    "red-color",
    "orange-color",
    "yellow-color",
    "green-color"
  );

  // Check the condition and set the appropriate class for each item
  if (value > 0.9) {
    result.classList.add("red-color");
  } else if (value > 0.8) {
    result.classList.add("orange-color");
  } else if (value > 0.7) {
    result.classList.add("yellow-color");
  } else {
    result.classList.add("green-color");
  }
}
