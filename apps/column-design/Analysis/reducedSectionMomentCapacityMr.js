export default function reducedSectionMomentCapacityMr(type, N_load, Ms, Ns) {
  // phi factor for steel
  const phi = 0.9;

  // reduce section moment capacity
  const Mr = Ms * (1 - N_load / (phi * Ns));

  return Mr;
}
