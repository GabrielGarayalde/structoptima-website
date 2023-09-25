export default function inplaneMemberMomentCapacityMi(type, N_load, Ms, Nc) {
  // phi factor for steel
  const phi = 0.9;

  // reduce section moment capacity
  const Mi = Ms * (1 - N_load / (phi * Nc));

  return Mi;
}
