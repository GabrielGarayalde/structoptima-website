import UB from "./UB.js";
import UC from "./UC.js";

// import { axialCapacity } from "../functions/axialCapacity";

import axialbendingCapacity from "./axialbendingCapacity.js";

function filterAndSort2DArray(inputArray) {
  // Create an array of objects containing row data and original index
  const indexedArray = inputArray.map((row, index) => ({ row, index }));

  // Filter rows based on the values in the third column (column index 2)
  const filteredArray = indexedArray.filter(
    (item) => item.row[2] >= 0 && item.row[2] <= 1
  );

  // Sort in decreasing order by the values in the third column
  filteredArray.sort((a, b) => b.row[2] - a.row[2]);

  // Extract and return the sorted rows
  const sortedRows = filteredArray.map((item) => item.row);

  return sortedRows;
}

export function predictResult(params, selectedTypes) {
  let Le_x = params[0];
  let N_load = params[1];
  let M_x_load = params[2];

  const scores = [];
  const phi = 0.9; // this is the safety factor -

  if (selectedTypes.includes("UB")) {
    for (let i = 0; i < UB.length; i++) {
      const id = UB[i][0];
      const fy = UB[i][19];
      const kf = UB[i][21];
      const Ag = UB[i][8];
      const I_x = UB[i][9];
      const Ze_x = UB[i][10];

      const capacities = axialbendingCapacity(
        phi,
        N_load,
        kf,
        fy,
        Ag,
        I_x,
        Le_x,
        Ze_x
      );

      const score_N_load = N_load / (phi * capacities.Nc_x);
      const score_M_x_load = M_x_load / (phi * capacities.Mi_x);
      scores.push([id, score_N_load, score_M_x_load]);
    }
  }

  if (selectedTypes.includes("UC")) {
    for (let i = 0; i < UC.length; i++) {
      const id = UC[i][0];
      const fy = UC[i][19];
      const kf = UC[i][21];
      const Ag = UC[i][8];
      const I_x = UC[i][9];
      const Ze_x = UC[i][10];

      const capacities = axialbendingCapacity(
        phi,
        N_load,
        kf,
        fy,
        Ag,
        I_x,
        Le_x,
        Ze_x
      );

      const score_N_load = N_load / (phi * capacities.Nc_x);
      const score_M_x_load = M_x_load / (phi * capacities.Mi_x);
      scores.push([id, score_N_load, score_M_x_load]);
    }
  }

  let resultsSorted = filterAndSort2DArray(scores);

  return resultsSorted;
}

export default predictResult;
