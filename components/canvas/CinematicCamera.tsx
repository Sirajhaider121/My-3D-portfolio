"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { pathCurve } from "./curve";

interface CinematicCameraProps {
  scrollProgress: number;
}

export default function CinematicCamera({ scrollProgress = 0 }: CinematicCameraProps) {
  const { camera } = useThree();
  const currentProgress = useRef(0);
  const currentCamPos = useRef(new THREE.Vector3(0, 0, 7));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state) => {
    const { pointer } = state;

    // Smooth inertia / damping lerp for scroll progress scrubbing
    currentProgress.current = THREE.MathUtils.lerp(
      currentProgress.current,
      scrollProgress,
      0.06
    );

    const t = THREE.MathUtils.clamp(currentProgress.current, 0.001, 0.995);

    // Calculate current position along the 3D CatmullRom curve
    const pathPos = pathCurve.getPointAt(t);

    // Calculate look-ahead point slightly further down the curve
    const lookAheadT = THREE.MathUtils.clamp(t + 0.05, 0.005, 0.999);
    const lookAheadPos = pathCurve.getPointAt(lookAheadT);

    // Camera offset relative to path (elevated & centered chase view)
    const targetCamPos = pathPos.clone().add(new THREE.Vector3(0, 0.3, 2.2));

    // Add interactive mouse parallax subtle tilt to lookAt target
    const targetLookAt = lookAheadPos.clone().add(
      new THREE.Vector3(pointer.x * 0.4, pointer.y * 0.4, 0)
    );

    // Smoothly lerp camera position and lookAt vector
    currentCamPos.current.lerp(targetCamPos, 0.08);
    currentLookAt.current.lerp(targetLookAt, 0.08);

    // Update R3F camera matrix
    camera.position.copy(currentCamPos.current);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}
