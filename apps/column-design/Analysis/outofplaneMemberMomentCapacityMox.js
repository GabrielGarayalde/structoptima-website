export default function outofplaneMemberMomentCapacityMox(N_load, Mb_x, Nc_y) {
  // phi factor for steel
  const phi = 0.9;

  // reduce section moment capacity
  const Mox = Mb_x * (1 - N_load / (phi * Nc_y));

  return Mox;
}
