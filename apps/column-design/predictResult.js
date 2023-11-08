import steelSectionData from "./steelSectionData.js";
import inplaneMemberMomentCapacityMi from "./Analysis/inplaneMemberMomentCapacityMi.js";
import memberCompressionCapacityNc from "./Analysis/memberCompressionCapacityNc.js";
import memberMomentCapacityMb from "./Analysis/memberMomentCapacityMb.js";
import outofplaneMemberMomentCapacityMox from "./Analysis/outofplaneMemberMomentCapacityMox.js";
import reducedSectionMomentCapacityMr from "./Analysis/reducedSectionMomentCapacityMr.js";
import sectionCapacityNs from "./Analysis/sectionCapacityNs.js";
import sectionMomentCapacityMs from "./Analysis/sectionMomentCapacityMs.js";
import { filterScoresArray } from "./filterScoresArray.js";

export function predictResult(params, selectedTypes) {
  let Le_x = params[0];
  let Le_y = params[1];

  let N_load = params[2];
  let M_x_load = params[3];
  let M_y_load = params[4];

  const checkboxFLR = document.getElementById("checkbox-FLR");

  let scores = [];

  if (checkboxFLR.checked) {
    scores = [
      [
        "id",
        "Member Compression Capacity Ncx",
        "Member Moment Capacity Mbx",
        "Section Moment Capacity Msy",
        "Reduced Section Moment Capacity Mrx",
        "Reduced Section Moment Capacity Mry",
        "Section Biaxial Bending Capacity",
        "In-plane Member Moment Capacity Mix",
        "Member Biaxial Bending Capacity FLR",
      ],
    ];
  } else {
    scores = [
      [
        "id",
        "Member Compression Capacity Ncx",
        "Member Compression Capacity Ncy",
        "Member Moment Capacity Mbx",
        "Section Moment Capacity Msy",
        "Reduced Section Moment Capacity Mrx",
        "Reduced Section Moment Capacity Mry",
        "Section Biaxial Bending Capacity",
        "In-plane Member Moment Capacity Mix",
        "In-plane Member Moment Capacity Miy",
        "Member Biaxial Bending Capacity",
      ],
    ];
  }
  const phi = 0.9; // this is the safety factor -

  selectedTypes.forEach((selectedType) => {
    let typeData = steelSectionData[selectedType];

    for (const key in typeData) {
      const id = key;
      const Ag = typeData[key].Ag;
      const fy = typeData[key].fyf;
      const kf = typeData[key].kf;
      const r_x = typeData[key].rx;
      const r_y = typeData[key].ry;
      const Ze_x = typeData[key].Zex;
      const Ze_y = typeData[key].Zey;
      const I_x = typeData[key].Ix;
      const I_y = typeData[key].Iy;
      const Iw = typeData[key].Iw;
      const E = 2e5; //200,000 [MPa]
      const G = 8e4; // 80,000 [MPa]
      const J = typeData[key].J;

      const Ns = sectionCapacityNs(kf, Ag, fy);

      const Nc_x = memberCompressionCapacityNc(r_x, kf, fy, Le_x, Ns); // Axial capacity [N]
      const Nc_y = memberCompressionCapacityNc(r_y, kf, fy, Le_y, Ns); // Axial capacity [N]

      const Ms_x = sectionMomentCapacityMs(Ze_x, fy); //Nominal section moment capacity
      const Ms_y = sectionMomentCapacityMs(Ze_y, fy); //Nominal section moment capacity

      const Mb_x = memberMomentCapacityMb(Ms_x, E, I_y, Le_x, G, J, Iw);

      const Mr_x = reducedSectionMomentCapacityMr(
        selectedType,
        N_load,
        Ms_x,
        Ns
      );

      const Mr_y = reducedSectionMomentCapacityMr(
        selectedType,
        N_load,
        Ms_y,
        Ns
      );

      const Mi_x = inplaneMemberMomentCapacityMi(
        selectedType,
        N_load,
        Ms_x,
        Nc_x
      );

      const Mi_y = inplaneMemberMomentCapacityMi(
        selectedType,
        N_load,
        Ms_y,
        Nc_y
      );

      const Mo_x = outofplaneMemberMomentCapacityMox(N_load, Mb_x, Nc_y);

      //Critical member moment capacity in x-axis
      const Mc_x = Math.min(Mi_x, Mo_x);

      // -----------------
      // SCORES
      // -----------------
      const scoreMemberCompressionCapacityNc_x = N_load / (phi * Nc_x);

      const scoreMemberCompressionCapacityNc_y = N_load / (phi * Nc_y);

      let scoreMemberMomentCapacityMb_x;
      console.log(selectedType);
      if (selectedType == "SHS" || selectedType == "CHS") {
        scoreMemberMomentCapacityMb_x = 0;
      } else {
        scoreMemberMomentCapacityMb_x = M_x_load / (phi * Mb_x);
      }

      const scoreSectionMomentCapacityMs_y = M_y_load / (phi * Ms_y);

      const scoreReducedSectionMomentCapacityMr_x = M_x_load / (phi * Mr_x);
      const scoreReducedSectionMomentCapacityMr_y = M_y_load / (phi * Mr_y);

      const scoreSectionCapacityBiaxialBending =
        N_load / (phi * Ns) + M_x_load / (phi * Ms_x) + M_y_load / (phi * Ms_y);

      const scoreinplaneMemberMomentCapacityMi_x = M_x_load / (phi * Mi_x);
      const scoreinplaneMemberMomentCapacityMi_y = M_y_load / (phi * Mi_y);

      let scoreMemberCapacityBiaxialBending;
      let scoreMemberCapacityBiaxialBendingFLR;
      if (selectedType == "SHS" || selectedType == "CHS") {
        scoreMemberCapacityBiaxialBending = 0;
        scoreMemberCapacityBiaxialBendingFLR = 0;
      } else {
        scoreMemberCapacityBiaxialBending =
          Math.pow(M_x_load / (phi * Mc_x), 1.4) +
          Math.pow(M_y_load / (phi * Mi_y), 1.4);
        scoreMemberCapacityBiaxialBendingFLR =
          Math.pow(M_x_load / (phi * Mi_x), 1.4) +
          Math.pow(M_y_load / (phi * Mi_y), 1.4);
      }

      // IF FLR
      if (checkboxFLR.checked) {
        scores.push([
          id,
          scoreMemberCompressionCapacityNc_x,
          scoreMemberMomentCapacityMb_x,
          scoreSectionMomentCapacityMs_y,
          scoreReducedSectionMomentCapacityMr_x,
          scoreReducedSectionMomentCapacityMr_y,
          scoreSectionCapacityBiaxialBending,
          scoreinplaneMemberMomentCapacityMi_x,
          scoreMemberCapacityBiaxialBendingFLR,
        ]);
      } else {
        scores.push([
          id,
          scoreMemberCompressionCapacityNc_x,
          scoreMemberCompressionCapacityNc_y,
          scoreMemberMomentCapacityMb_x,
          scoreSectionMomentCapacityMs_y,
          scoreReducedSectionMomentCapacityMr_x,
          scoreReducedSectionMomentCapacityMr_y,
          scoreSectionCapacityBiaxialBending,
          scoreinplaneMemberMomentCapacityMi_x,
          scoreinplaneMemberMomentCapacityMi_y,
          scoreMemberCapacityBiaxialBending,
        ]);
      }
    }
  });

  console.log(scores);
  let resultsSorted = filterScoresArray(scores);
  console.log(resultsSorted.length);
  return resultsSorted;
}

export default predictResult;
