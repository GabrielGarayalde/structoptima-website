import React from "react";
import UB from "./UB";
// import { axialCapacity } from "../functions/axialCapacity";

import { axialbendingCapacity } from "./axialbendingCapacity";

function findClosestIndex(array) {
  let minDiff = Number.POSITIVE_INFINITY;
  let closestIndex = -1;

  for (let i = 0; i < array.length; i++) {
    const diff = 1 - array[i];
    if (diff > 0 && diff < minDiff) {
      minDiff = diff;
      closestIndex = i;
    }
  }

  return closestIndex;
}

Results = ({ Le_x, N_load, M_x_load }) => {
  const scores = [];
  const phi = 0.9; // this is the safety factor -

  for (let i = 0; i < 27; i++) {
    const fy = UB[i][19];
    const kf = UB[i][21];
    const Ag = UB[i][8];
    const I_x = UB[i][9];
    const Ze_x = UB[i][10];

    // const answers = axialCapacity(fy, kf, Ag, Ix, Le_x * 1000);

    const answers = axialbendingCapacity(
      phi,
      N_load * 1000,
      kf,
      fy,
      Ag,
      I_x,
      Le_x * 1000,
      Ze_x
    );
    const score = M_x_load / ((phi * answers.Mi_x) / 1000000);
    scores.push(score);
  }

  const index = findClosestIndex(scores);
  const id = UB[index][0];
  const fy = UB[index][19];
  const kf = UB[index][21];
  const Ag = UB[index][8];
  const I_x = UB[index][9];
  const Ze_x = UB[index][10];

  const answer = axialbendingCapacity(
    phi,
    N_load * 1000,
    kf,
    fy,
    Ag,
    I_x,
    Le_x * 1000,
    Ze_x
  );

  const score_N_load = N_load / ((phi * answer.Nc_x) / 1000);
  const score_M_x_load = M_x_load / ((phi * answer.Mi_x) / 1000000);

  return (
    <div>
      <h2>Member chosen: {id} [m]</h2>
      <p> Axial Compression Capacity</p>
      <p>
        {" "}
        N* = {N_load} &#8804; &phi;N<sub>c</sub> ={" "}
        {((phi * answer.Nc_x) / 1000).toFixed(2)} [kN] Strength Capacity:{" "}
        {(score_N_load * 100).toFixed(2)} %{" "}
      </p>
      <p> In-plane Member Moment Capacity</p>
      <p>
        {" "}
        M*<sub>x</sub> = {M_x_load} &#8804; &phi;M<sub>ix</sub> ={" "}
        {((phi * answer.Mi_x) / 1000000).toFixed(2)} [kNm] Strength Capacity:{" "}
        {(score_M_x_load * 100).toFixed(2)} %{" "}
      </p>
    </div>
  );
};

export default Results;
