"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, MeshWobbleMaterial } from "@react-three/drei";
import * as THREE from "three";

interface FloatingGeometriesProps {
  scrollProgress?: number;
}

export default function FloatingGeometries({ scrollProgress = 0 }: FloatingGeometriesProps) {
  const icoRef = useRef<THREE.Mesh>(null);
  const torusRef = useRef<THREE.Mesh>(null);
  const dodecaRef = useRef<THREE.Mesh>(null);
  const octaRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const { pointer } = state;
    
    // Smooth group tilt based on mouse position
    if (groupRef.current) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, pointer.y * 0.2, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, pointer.x * 0.2, 0.05);
    }

    // Individual mesh rotations
    if (icoRef.current) {
      icoRef.current.rotation.x += delta * 0.3;
      icoRef.current.rotation.y += delta * 0.4;
      icoRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.4;
    }

    if (torusRef.current) {
      torusRef.current.rotation.x += delta * 0.2;
      torusRef.current.rotation.z += delta * 0.3;
      torusRef.current.position.y = Math.cos(state.clock.elapsedTime * 0.7) * 0.5 - 2;
    }

    if (dodecaRef.current) {
      dodecaRef.current.rotation.y += delta * 0.5;
      dodecaRef.current.rotation.z += delta * 0.2;
    }

    if (octaRef.current) {
      octaRef.current.rotation.x += delta * 0.4;
      octaRef.current.rotation.y += delta * 0.6;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Primary Hero Central Distorted Icosahedron */}
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        <mesh ref={icoRef} position={[2.5, 0.5, -1]} scale={1.8}>
          <icosahedronGeometry args={[1, 1]} />
          <MeshDistortMaterial
            color="#00f0ff"
            roughness={0.15}
            metalness={0.8}
            distort={0.35}
            speed={2.5}
            wireframe={true}
          />
        </mesh>
      </Float>

      {/* Hero Accent Solid Metallic Core inside wireframe */}
      <Float speed={1.5} rotationIntensity={1} floatIntensity={1.5}>
        <mesh position={[2.5, 0.5, -1]} scale={1.1}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#7000ff"
            roughness={0.2}
            metalness={0.9}
            emissive="#1a0033"
            emissiveIntensity={0.5}
          />
        </mesh>
      </Float>

      {/* Floating Cyber Torus Knot - Mid Left */}
      <Float speed={2.5} rotationIntensity={2} floatIntensity={2.5}>
        <mesh ref={torusRef} position={[-3.2, -1.5, -2]} scale={1.2}>
          <torusKnotGeometry args={[1, 0.3, 128, 32]} />
          <MeshWobbleMaterial
            color="#7000ff"
            factor={0.4}
            speed={1.5}
            roughness={0.1}
            metalness={0.95}
            wireframe={true}
          />
        </mesh>
      </Float>

      {/* Dodecahedron - Top Left */}
      <Float speed={1.8} rotationIntensity={1.2} floatIntensity={1.8}>
        <mesh ref={dodecaRef} position={[-2.8, 2.2, -3]} scale={1.1}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#00ff9d"
            wireframe={true}
            roughness={0.3}
            metalness={0.8}
          />
        </mesh>
      </Float>

      {/* Octahedron - Bottom Right */}
      <Float speed={2.2} rotationIntensity={1.8} floatIntensity={2.2}>
        <mesh ref={octaRef} position={[3.5, -3.2, -3.5]} scale={1.4}>
          <octahedronGeometry args={[1, 0]} />
          <MeshDistortMaterial
            color="#ff007f"
            distort={0.25}
            speed={2}
            roughness={0.2}
            metalness={0.85}
            wireframe={true}
          />
        </mesh>
      </Float>
    </group>
  );
}
