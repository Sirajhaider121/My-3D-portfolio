"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { pathCurve } from "./curve";

interface PathParticlesProps {
  count?: number;
}

export default function PathParticles({ count = 1800 }: PathParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors, sizes] = useMemo(() => {
    const posArr = new Float32Array(count * 3);
    const colorArr = new Float32Array(count * 3);
    const sizeArr = new Float32Array(count);

    const palette = [
      new THREE.Color("#00f0ff"),
      new THREE.Color("#7000ff"),
      new THREE.Color("#00ff9d"),
      new THREE.Color("#ff007f"),
      new THREE.Color("#ffffff"),
    ];

    for (let i = 0; i < count; i++) {
      // Sample a position along the 3D CatmullRom curve
      const t = Math.random();
      const pointOnCurve = pathCurve.getPointAt(t);

      // Add a random radial offset around the curve
      const radius = 0.5 + Math.random() * 4.5;
      const angle = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      const offsetX = radius * Math.sin(phi) * Math.cos(angle);
      const offsetY = radius * Math.sin(phi) * Math.sin(angle);
      const offsetZ = radius * Math.cos(phi);

      posArr[i * 3] = pointOnCurve.x + offsetX;
      posArr[i * 3 + 1] = pointOnCurve.y + offsetY;
      posArr[i * 3 + 2] = pointOnCurve.z + offsetZ;

      // Color variation
      const chosenColor = palette[Math.floor(Math.random() * palette.length)];
      colorArr[i * 3] = chosenColor.r;
      colorArr[i * 3 + 1] = chosenColor.g;
      colorArr[i * 3 + 2] = chosenColor.b;

      // Particle size
      sizeArr[i] = 0.03 + Math.random() * 0.06;
    }

    return [posArr, colorArr, sizeArr];
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.02;
      pointsRef.current.rotation.z += delta * 0.01;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
