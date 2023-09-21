// export function axialbendingCapacity(N_load, E, G, kf, fy, Ag, I_x, I_y, Le, Le_x, Le_y, Ze_x, Ze_y, J, I_w) {
export default function axialbendingCapacity(
  phi,
  N_load,
  kf,
  fy,
  Ag,
  I_x,
  Le_x,
  Ze_x
) {
  // NOTES
  // - Le is the effective length wrt flexural torsional buckling -> need k factors etc..

  // ---------------------------
  // Finding column Section Slenderness
  // ---------------------------
  // x-axis
  const rx = Math.sqrt(I_x / Ag);
  const lambda_n_x = (Le_x / rx) * Math.sqrt((kf * fy) / 250);
  const alpha_a_x =
    (2100 * (lambda_n_x - 13.5)) /
    (Math.pow(lambda_n_x, 2) - 15.3 * lambda_n_x + 2050);
  const alpha_b_x = 0; // this changes depending on the type of member [-1, -0.5, 0, +0.5, +1]
  const lambda_x = lambda_n_x + alpha_a_x * alpha_b_x;
  const eta_x = 0.00326 * (lambda_x - 13.5); //imperfection factor
  const xi_x =
    (Math.pow(lambda_x / 90, 2) + 1 + eta_x) / (2 * Math.pow(lambda_x / 90, 2)); //Factor
  const alpha_c_x =
    xi_x * (1 - Math.sqrt(1 - Math.pow(90 / (xi_x * lambda_x), 2))); // slenderness reduction factor

  // y-axis
  // const ry = Math.sqrt(I_y / Ag);
  // const lambda_n_y = (Le_y / ry) * Math.sqrt((kf * fy) / 250);
  // const alpha_a_y = (2100 * (lambda_n_y - 13.5)) / (Math.pow(lambda_n_y, 2) - 15.3 * lambda_n_y + 2050);
  // const alpha_b_y = 0; // this changes depending on the type of member [-1, -0.5, 0, +0.5, +1]
  // const lambda_y = lambda_n_y + alpha_a_y * alpha_b_y;
  // const eta_y = 0.00326 * (lambda_y - 13.5); //imperfection factor
  // const xi_y = (Math.pow(lambda_y / 90, 2) + 1 + eta_y) / (2 * Math.pow(lambda_y / 90, 2)); //Factor
  // const alpha_c_y = xi_y * (1 - Math.sqrt(1 - Math.pow(90 / (xi_y * lambda_y), 2))); // slenderness reduction factor

  // ---------------------------
  // Finding Axial Compression Capacity
  // ---------------------------
  const Nc_x = alpha_c_x * kf * Ag * fy; // Axial capacity [N]
  // const Nc_y = alpha_c_y * kf * Ag * fy; // Axial capacity [N]

  // ---------------------------
  // 5.2 NOMINAL SECTIONAL MOMENT CAPACITY
  // --------------------------------
  const Ms_x = fy * Ze_x; //Nominal section moment capacity
  // const Ms_y = fy * Ze_y; //Nominal section moment capacity

  // ---------------------------
  // 5... NOMINAL MEMBER MOMENT CAPACITY
  // --------------------------------
  // beam slenderness reduction factor alpha_s
  // Mo = Reference buckling moment (formula for equal flanged I-beams and PFCs)
  // const M0 = Math.sqrt(Math.pow(Math.PI, 2) * E * I_y / Math.pow(Le, 2)) * Math.sqrt(G*J + Math.pow(Math.PI, 2) * E * I_w / Math.pow(Le, 2));
  // const alpha_s = 0.6 * ( Math.sqrt(Math.pow((Ms_x / M0), 2) + 3) - (Ms_x / M0) ); // slenderness reduction factor
  // const alpha_m = 1.75 // for moment applied at one end of a SS beam
  // const alpha_sm = alpha_s * alpha_m; // combined slenderness reduction factor
  // if (alpha_sm > 1) {
  //   alpha_sm = 1;
  // }
  // const M_b_x = alpha_sm * Ms_x; // Nominal member moment capacity [Nmm]

  // ---------------------------
  // 5... IN-PLANE MEMBER MOMENT CAPACITY
  // --------------------------------
  const Mi_x = Ms_x * (1 - N_load / (phi * Nc_x)); // in-plane member moment capacity [Nmm]

  return { Nc_x, Mi_x };
}
