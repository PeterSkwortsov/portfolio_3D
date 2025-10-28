// components/InteractiveCloudScene.js
"use client";

import { Canvas } from "@react-three/fiber";
import {
  Cloud,
  OrbitControls,
  Sparkles,
  Text,
} from "@react-three/drei";
import { useState } from "react";

export default function InteractiveCloudScene() {
  const [cloudColor, setCloudColor] = useState("#ffffff");
  const [cloudSpeed, setCloudSpeed] = useState(0.1);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(to bottom, #667eea, #764ba2)",
      }}
    >
      {/* UI контролы */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          zIndex: 1000,
          background: "rgba(255,255,255,0.9)",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <h3>Настройки облаков</h3>

        <div style={{ marginBottom: "10px" }}>
          <label>Цвет облаков: </label>
          <input
            type="color"
            value={cloudColor}
            onChange={(e) => setCloudColor(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Скорость: {cloudSpeed}</label>
          <input
            type="range"
            min="0"
            max="0.5"
            step="0.01"
            value={cloudSpeed}
            onChange={(e) => setCloudSpeed(parseFloat(e.target.value))}
          />
        </div>
      </div>

      <Canvas camera={{ position: [0, 2, 10], fov: 60 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />

        <InteractiveClouds color={cloudColor} speed={cloudSpeed} />

        <Sparkles count={100} size={2} color="#ffffff" />


        <OrbitControls enableZoom={true} enablePan={true} autoRotate={false} />
      </Canvas>
    </div>
  );
}

function InteractiveClouds({ color, speed }) {
  return (
    <group>
      <Cloud
        position={[0, 2, 0]}
        speed={speed}
        opacity={0.8}
        width={6}
        depth={1.2}
        segments={20}
        color={color}
      />

      <Cloud
        position={[-3, 3, -2]}
        speed={speed * 1.5}
        opacity={0.6}
        width={4}
        depth={0.8}
        segments={15}
        color={color}
      />

      <Cloud
        position={[4, 1, 2]}
        speed={speed * 0.8}
        opacity={0.7}
        width={5}
        depth={1}
        segments={18}
        color={color}
      />
    </group>
  );
}
