// export function axialbendingCapacity(N_load, E, G, kf, fy, Ag, I_x, I_y, Le, Le_x, Le_y, Ze_x, Ze_y, J, I_w) {
import inplaneMemberMomentCapacityMi from "./Analysis/inplaneMemberMomentCapacityMi.js";
import memberCompressionCapacityNc from "./Analysis/memberCompressionCapacityNc.js";
import memberMomentCapacityMb from "./Analysis/memberMomentCapacityMb.js";
import outofplaneMemberMomentCapacityMox from "./Analysis/outofplaneMemberMomentCapacityMox.js";
import reducedSectionMomentCapacityMr from "./Analysis/reducedSectionMomentCapacityMr.js";
import sectionCapacityNs from "./Analysis/sectionCapacityNs.js";
import sectionMomentCapacityMs from "./Analysis/sectionMomentCapacityMs.js";

export default function axialbendingCapacity(
  phi,
  N_load,
  kf,
  fy,
  rx,
  Ix,
  Ag,
  Le_x,
  Ze_x,
  alpha_m,
  G,
  J,
  E
) {
  // NOTES
  // - Le is the effective length wrt flexural torsional buckling -> need k factors etc..
  const Ns = sectionCapacityNs(kf, Ag, fy);

  // ---------------------------
  // Finding Axial Compression Capacity
  // ---------------------------
  const Nc_x = memberCompressionCapacityNc(rx, kf, fy, Le_x, Ns); // Axial capacity [N]

  // ---------------------------
  // 5.2 NOMINAL SECTIONAL MOMENT CAPACITY
  // --------------------------------
  const Ms_x = sectionMomentCapacityMs(Ze_x, fy); //Nominal section moment capacity

  // ---------------------------
  // 5... NOMINAL MEMBER MOMENT CAPACITY
  // --------------------------------
  const Mb_x = memberMomentCapacityMb(Ms_x, E, Ix, Le_x, G, J, Iw);

  // -------------------------------------
  // 5... REDUCED MEMBER MOMENT CAPACITY
  // --------------------------------
  const Mr = reducedSectionMomentCapacityMr(type, N_load, Ms_x, Ns);

  // ------------------------------------
  // 5... IN-PLANE MEMBER MOMENT CAPACITY
  // --------------------------------
  const Mi_x = inplaneMemberMomentCapacityMi(type, N_load, Ms_x, Nc_x);

  // ------------------------------------
  // 5... OUT-OF-PLANE MEMBER MOMENT CAPACITY
  // --------------------------------
  const Mo_x = outofplaneMemberMomentCapacityMox(N_load, Mb_x, Nc_y);

  return { Nc_x, Mi_x };
}
