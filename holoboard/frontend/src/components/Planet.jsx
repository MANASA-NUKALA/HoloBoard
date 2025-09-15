import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Planet({ position = [0,0,0], color = "orange", size = 1, orbitSpeed = 0.01, orbitRadius = 5, angleOffset = 0, onClick, id }) {
  const meshRef = useRef();
  // animate spin
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01 * delta * 60;
      // move around center in a circle (orbit)
      const t = state.clock.getElapsedTime() * orbitSpeed + angleOffset;
      meshRef.current.position.x = Math.cos(t) * orbitRadius + position[0];
      meshRef.current.position.z = Math.sin(t) * orbitRadius + position[2];
    }
  });

  return (
    <mesh ref={meshRef} onClick={() => onClick && onClick(id)} castShadow>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial color={color} metalness={0.3} roughness={0.6} />
    </mesh>
  );
}
