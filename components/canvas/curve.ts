import * as THREE from "three";

// 3D Control points winding smoothly through space from top to bottom
export const stationPoints = [
  new THREE.Vector3(-3.5, 6.0, 1.0),    // Top entry / Hero Start
  new THREE.Vector3(2.5, 3.5, -1.5),    // Station 1: Intro / Hero
  new THREE.Vector3(-3.0, 0.5, -0.5),   // Transition curve 1
  new THREE.Vector3(3.2, -2.5, 1.2),    // Station 2: Projects
  new THREE.Vector3(-2.8, -5.5, -1.8),  // Transition curve 2
  new THREE.Vector3(2.2, -8.5, 0.8),    // Station 3: Skills / Sandbox
  new THREE.Vector3(-2.0, -11.5, -0.8), // Transition curve 3
  new THREE.Vector3(0.0, -14.5, 0.5),   // Station 4: Contact / Footer
];

// Continuous CatmullRomCurve3 path
export const pathCurve = new THREE.CatmullRomCurve3(
  stationPoints,
  false,
  "catmullrom",
  0.45
);
