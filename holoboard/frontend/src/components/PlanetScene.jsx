import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import Planet from "./Planet";

function statusToColor(status) {
  if (!status) return "gray";
  if (status.toLowerCase().includes("done")) return "#34d399"; // green
  if (status.toLowerCase().includes("progress")) return "#f59e0b"; // yellow
  return "#ef4444"; // red for pending
}

export default function PlanetScene({ tasks = [], onSelect }) {
  return (
    <div className="w-full h-full">
      <Canvas shadows camera={{ position: [0, 8, 18], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Stars radius={100} depth={50} count={4000} factor={4} saturation={0} fade />
        {/* Sun at center */}
        <mesh position={[0,0,0]}>
          <sphereGeometry args={[1.2, 32, 32]} />
          <meshStandardMaterial emissive={"#ffd166"} emissiveIntensity={1} />
        </mesh>

        {tasks.map((t, i) => {
          const orbitRadius = 3 + i * 3; // spread
          const size = 0.7 + (t.priority === "High" ? 0.6 : t.priority === "Low" ? 0.1 : 0.3);
          const color = statusToColor(t.status);
          return (
            <Planet
              key={t._id}
              id={t._id}
              position={[0, 0, 0]}
              orbitRadius={orbitRadius}
              orbitSpeed={0.5 + i * 0.05}
              size={size}
              color={color}
              angleOffset={i * 0.9}
              onClick={onSelect}
            />
          );
        })}

        <OrbitControls enablePan={true} enableZoom={true} />
      </Canvas>
    </div>
  );
}
