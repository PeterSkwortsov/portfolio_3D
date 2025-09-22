"use client";

import { useState } from "react";
import { Helper, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import Chair from "./Chair";
import { CustomizationProvider } from "../context/Customization";
import Configurator from "./Configurator";

export default function HomePage() {
  const [color, setColor] = useState("#2F4F4F");

  const handleColorChange = (newColor) => {
    setColor(newColor);
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "10px", display: "flex", gap: "10px" }}>
        <button
          onClick={() => handleColorChange("#ff6b6b")}
          style={{
            padding: "10px 15px",
            backgroundColor: "#ff6b6b",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Красный
        </button>
        <button
          onClick={() => handleColorChange("#339af0")}
          style={{
            padding: "10px 15px",
            backgroundColor: "#339af0",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Синий
        </button>
      </div>

      <div style={{ flex: 1 }} className="h-1/3">
        <CustomizationProvider>
          <Canvas camera={{ position: [0, 2, 5] }}>
            <Helper axis={true} />
            <pointLight position={[1, 4, 2]} intensity={40} />
            <ambientLight intensity={2} />
            <Chair />
            <OrbitControls enableZoom={false} autoRotate enablePan={false} />
          </Canvas>
          <Configurator />
        </CustomizationProvider>
      </div>
    </div>
  );
}
