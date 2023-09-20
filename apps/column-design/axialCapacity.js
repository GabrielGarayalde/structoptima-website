
export function axialCapacity(kf, fy, Ag, Ix, Le) {

  // All the variables for calculating the axial capacity
  const rx = Math.sqrt(Ix / Ag);
  const lambda_n_x = (Le / rx) * Math.sqrt((kf * fy) / 250);
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
  const N_c_x = alpha_c_x * kf * Ag * fy; // Axial capacity [N]

  return {rx, lambda_n_x, alpha_a_x, alpha_b_x, lambda_x, eta_x, xi_x, alpha_c_x, N_c_x};
}

