"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

const BUBBLE_COLORS = ["#2b7de9", "#3cb878", "#ffd23f", "#ff4757", "#8b5cf6", "#f472b6"];

interface BubbleProps {
  position: [number, number, number];
  scale: number;
  color: string;
  speed: number;
}

function Bubble({ position, scale, color, speed }: BubbleProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * speed + position[0]) * 0.3;
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={1.5}>
      <Sphere ref={meshRef} args={[scale, 32, 32]} position={position}>
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.35}
          distort={0.3}
          speed={2}
          roughness={0}
          metalness={0.1}
        />
      </Sphere>
    </Float>
  );
}

function BubbleField() {
  const bubbles = useMemo(
    () =>
      Array.from({ length: 25 }, (_, i) => ({
        position: [
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 6 - 2,
        ] as [number, number, number],
        scale: 0.15 + Math.random() * 0.4,
        color: BUBBLE_COLORS[i % BUBBLE_COLORS.length],
        speed: 0.5 + Math.random() * 1.5,
      })),
    []
  );

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <pointLight position={[-10, -10, -5]} intensity={0.4} color="#ffd23f" />
      {bubbles.map((bubble, i) => (
        <Bubble key={i} {...bubble} />
      ))}
    </>
  );
}

function MouseFollower() {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (groupRef.current) {
      mouse.current.x = THREE.MathUtils.lerp(
        mouse.current.x,
        (state.pointer.x * state.viewport.width) / 4,
        0.05
      );
      mouse.current.y = THREE.MathUtils.lerp(
        mouse.current.y,
        (state.pointer.y * state.viewport.height) / 4,
        0.05
      );
      groupRef.current.position.x = mouse.current.x;
      groupRef.current.position.y = mouse.current.y;
    }
  });

  return (
    <group ref={groupRef}>
      <Sphere args={[0.3, 16, 16]}>
        <MeshDistortMaterial
          color="#2b7de9"
          transparent
          opacity={0.2}
          distort={0.4}
          speed={3}
        />
      </Sphere>
    </group>
  );
}

interface BubbleSceneProps {
  className?: string;
  interactive?: boolean;
}

export function BubbleScene({ className = "", interactive = true }: BubbleSceneProps) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <BubbleField />
          {interactive && <MouseFollower />}
        </Suspense>
      </Canvas>
    </div>
  );
}
