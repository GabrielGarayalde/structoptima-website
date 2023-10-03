export default function sectionCapacityBiaxialBending(
  phi,
  N_load,
  Mx_load,
  My_load,
  Ns,
  Msx,
  Msy
) {
  const result =
    [N_load / (phi * Ns)] + [Mx_load / (phi * Msx)] + [My_load / (phi * Msy)];
  return result;
}
