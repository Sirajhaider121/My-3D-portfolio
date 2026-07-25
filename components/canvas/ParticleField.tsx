"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function ParticleField({ count = 1200 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const posArr = new Float32Array(count * 3);
    const colorArr = new Float32Array(count * 3);

    const palette = [
      new THREE.Color("#00f0ff"),
      new THREE.Color("#7000ff"),
      new THREE.Color("#00ff9d"),
      new THREE.Color("#ffffff"),
    ];

    for (let i = 0; i < count; i++) {
      // Spread in 3D box
      posArr[i * 3] = (Math.random() - 0.5) * 20;
      posArr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      posArr[i * 3 + 2] = (Math.random() - 0.5) * 15;

      const chosenColor = palette[Math.floor(Math.random() * palette.length)];
      colorArr[i * 3] = chosenColor.r;
      colorArr[i * 3 + 1] = chosenColor.g;
      colorArr[i * 3 + 2] = chosenColor.b;
    }

    return [posArr, colorArr];
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.03;
      pointsRef.current.rotation.x += delta * 0.015;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        vertexColors
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
