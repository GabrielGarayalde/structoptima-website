export default function memberMomentCapacityMb(Ms, E, I, Le, G, J, Iw) {
  // Reference buckling moment Mo, for a DOUBLY SYMMETRIC SECTION
  const Mo = Math.sqrt(
    ((Math.pow(Math.PI, 2) * E * I) / Math.pow(Le, 2)) *
      (G * J + (Math.pow(Math.PI, 2) * E * Iw) / Math.pow(Le, 2))
  );

  // Beam slenderness reduction factor
  const alpha_s = 0.6 * (Math.sqrt(Math.pow(Ms / Mo, 2) + 3) - Ms / Mo);

  const alpha_m = 1.75; // for moment applied at one end of a SS beam
  // const alpha_sm = alpha_s * alpha_m; // combined slenderness reduction factor
  // if (alpha_sm > 1) {
  //   alpha_sm = 1;
  // }
  // Nominal Member Moment Capacity
  const Mb = alpha_m * alpha_s * Ms;

  return Mb;
}
