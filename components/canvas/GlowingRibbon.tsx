"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { pathCurve } from "./curve";

interface GlowingRibbonProps {
  scrollProgress?: number;
}

export default function GlowingRibbon({ scrollProgress = 0 }: GlowingRibbonProps) {
  const tubeMeshRef = useRef<THREE.Mesh>(null);
  const outerGlowMeshRef = useRef<THREE.Mesh>(null);

  // Create tube geometry along the shared curve
  const tubeGeometry = useMemo(() => {
    return new THREE.TubeGeometry(pathCurve, 300, 0.08, 16, false);
  }, []);

  // Outer volumetric glow tube
  const outerGlowGeometry = useMemo(() => {
    return new THREE.TubeGeometry(pathCurve, 300, 0.18, 16, false);
  }, []);

  // 4 Station Nodes markers along the curve
  const stationPositions = useMemo(() => {
    return [
      pathCurve.getPointAt(0.12), // Station 1: Intro
      pathCurve.getPointAt(0.38), // Station 2: Projects
      pathCurve.getPointAt(0.65), // Station 3: Skills
      pathCurve.getPointAt(0.92), // Station 4: Contact
    ];
  }, []);

  // Animate neon glow pulses
  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;

    if (tubeMeshRef.current) {
      const mat = tubeMeshRef.current.material as THREE.MeshStandardMaterial;
      if (mat) {
        mat.emissiveIntensity = THREE.MathUtils.lerp(
          mat.emissiveIntensity,
          1.8 + Math.sin(time * 2.5) * 0.5,
          0.1
        );
      }
    }

    if (outerGlowMeshRef.current) {
      outerGlowMeshRef.current.rotation.z += delta * 0.05;
    }
  });

  return (
    <group>
      {/* Primary Cyber Core Glowing Tube Ribbon */}
      <mesh ref={tubeMeshRef} geometry={tubeGeometry}>
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#7000ff"
          emissiveIntensity={2.0}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Outer Volumetric Aura / Wireframe Energy Ribbon */}
      <mesh ref={outerGlowMeshRef} geometry={outerGlowGeometry}>
        <meshStandardMaterial
          color="#00ff9d"
          emissive="#00f0ff"
          emissiveIntensity={0.8}
          wireframe={true}
          transparent={true}
          opacity={0.35}
        />
      </mesh>

      {/* 4 Station Orbit Nodes representing Intro, Projects, Skills, Contact */}
      {stationPositions.map((pos, idx) => {
        const colors = ["#00f0ff", "#7000ff", "#00ff9d", "#ff007f"];

        return (
          <group key={idx} position={pos}>
            <Float speed={3} rotationIntensity={1} floatIntensity={1}>
              {/* Outer Station Ring */}
              <mesh>
                <torusGeometry args={[0.45, 0.02, 16, 32]} />
                <meshStandardMaterial
                  color={colors[idx]}
                  emissive={colors[idx]}
                  emissiveIntensity={2.5}
                  wireframe
                />
              </mesh>

              {/* Inner Glowing Core Sphere */}
              <mesh>
                <sphereGeometry args={[0.18, 16, 16]} />
                <meshStandardMaterial
                  color={colors[idx]}
                  emissive={colors[idx]}
                  emissiveIntensity={3.0}
                  roughness={0.1}
                  metalness={1.0}
                />
              </mesh>
            </Float>
          </group>
        );
      })}
    </group>
  );
}
