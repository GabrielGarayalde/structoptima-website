export default function memberCompressionCapacityNc(r, kf, fy, Le, Ns) {
  // const r = Math.sqrt(I_x / Ag);

  // Modified Compression Member Slenderness
  const lambda_n = (Le / r) * Math.sqrt((kf * fy) / 250);

  //Factor alpha_a
  const alpha_a =
    (2100 * (lambda_n - 13.5)) /
    (Math.pow(lambda_n, 2) - 15.3 * lambda_n + 2050);

  // Member section constant alpha_b
  const alpha_b = 0; // this changes depending on the type of member [-1, -0.5, 0, +0.5, +1]

  // Combined slenderness
  const lambda = lambda_n + alpha_a * alpha_b;

  // Imperfection Factor
  const eta = 0.00326 * (lambda - 13.5); //imperfection factor

  // Factor xi
  const xi =
    (Math.pow(lambda / 90, 2) + 1 + eta) / (2 * Math.pow(lambda / 90, 2)); //Factor

  // Slenderness reduction Factor
  const alpha_c = xi * (1 - Math.sqrt(1 - Math.pow(90 / (xi * lambda), 2)));

  // Nominal Member Capacity
  const Nc = alpha_c * Ns;

  return Nc;
}
