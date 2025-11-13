"use client";

import { Html, OrbitControls } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import Kitchen2 from "./Kitchen2";
import { Center } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

function ComplexLightMovement() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      // Вращение всей группы
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.5;

      // Пульсация света
      const intensity = 0.8 + Math.sin(state.clock.getElapsedTime() * 2) * 0.2;
      groupRef.current.children[0].intensity = intensity;
    }
  });

  return (
    <group ref={groupRef}>
      <directionalLight
        position={[0, 0, 5]} // Относительно группы
        intensity={8}
        castShadow
        color={"white"}
      />
      <ambientLight intensity={1} />
    </group>
  );
}
export default function Rules() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: 120,
        }}
      >
        <CameraButtons />
        <ComplexLightMovement />
        <Center>
          <Kitchen2 />
        </Center>

      </Canvas>
    </div>
  );
}

function CameraButtons() {
  const [activeView, setActiveView] = useState("default");
  const cameraRef = useRef();

  // Получаем камеру и элементы управления через useThree
  const { camera, gl } = require("@react-three/fiber").useThree();

  const moveCamera = (newPosition, newTarget = new THREE.Vector3(0, 0, 0)) => {
    const startPosition = new THREE.Vector3().copy(camera.position);
    const startTarget = new THREE.Vector3()
      .copy(camera.position)
      .add(camera.getWorldDirection(new THREE.Vector3()));
    const endPosition = new THREE.Vector3(...newPosition);

    const duration = 1000; // 1 секунда
    const startTime = Date.now();

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Плавная интерполяция
      const easeProgress = easeInOutCubic(progress);

      // Интерполируем позицию
      camera.position.lerpVectors(startPosition, endPosition, easeProgress);

      // Интерполируем взгляд (lookAt)
      const currentTarget = new THREE.Vector3().lerpVectors(
        startTarget,
        newTarget,
        easeProgress
      );
      camera.lookAt(currentTarget);

      camera.updateMatrixWorld();

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  };

  const easeInOutCubic = (t) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  const cameraPresets = {
    front: () => {
      setActiveView("front");
      moveCamera([0, 0, 8]);
    },
    back: () => {
      setActiveView("back");
      moveCamera([0, 0, -8]);
    },
    left: () => {
      setActiveView("left");
      moveCamera([-8, 0, 0]);
    },
    right: () => {
      setActiveView("right");
      moveCamera([8, 0, 0]);
    },
    top: () => {
      setActiveView("top");
      moveCamera([10, 8, -6]);
    },
    bottom: () => {
      setActiveView("bottom");
      moveCamera([0, -8, 0]);
    },
    diagonal: () => {
      setActiveView("diagonal");
      moveCamera([5, 5, 5]);
    },
    close: () => {
      setActiveView("close");
      moveCamera([2, 1, 3]);
    },
    far: () => {
      setActiveView("far");
      moveCamera([55, 5, 65]);
    },

    
  };
const buttons = [
  {
    id: 1,
    label: "Кнопка 1",
    onClick: () => cameraPresets.front(),
    active: activeView === "front",
  },
  {
    id: 2,
    label: "Кнопка 2",
    onClick: () => cameraPresets.back(),
    active: activeView === "back",
  },
  { id: 3, label: "Кнопка 3", onClick: () => console.log("Кнопка 3") },
  { id: 4, label: "Кнопка 4", onClick: () => console.log("Кнопка 4") },
  { id: 5, label: "Кнопка 5", onClick: () => console.log("Кнопка 5") },
  { id: 6, label: "Кнопка 6", onClick: () => console.log("Кнопка 6") },
  { id: 7, label: "Кнопка 7", onClick: () => console.log("Кнопка 7") },
  { id: 8, label: "Кнопка 8", onClick: () => console.log("Кнопка 8") },
  { id: 9, label: "Кнопка 9", onClick: () => console.log("Кнопка 9") },
  { id: 10, label: "Кнопка 10", onClick: () => console.log("Кнопка 10") },
];

  return (
    <Html fullscreen>
      <div className="w-28 h-96 rounded-lg overflow-hidden">
        <div className="h-full overflow-y-auto p-2 flex flex-col gap-2">
          {buttons.map((button) => (
            <button
              key={button.id}
              className="w-full px-4 py-3  border border-gray-200 rounded-md 
                       hover:bg-blue-50 hover:border-blue-300 hover:shadow-sm 
                       active:bg-blue-100 active:scale-95 
                       transition-all duration-200 ease-in-out
                       text-gray-700 font-medium text-left
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              onClick={button.onClick}
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>
    </Html>
  );
}

function getButtonStyle(isActive) {
  return {
    padding: "10px 15px",
    background: isActive ? "#ff6b6b" : "rgba(255,255,255,0.1)",
    color: "white",
    border: "2px solid " + (isActive ? "#ff6b6b" : "rgba(255,255,255,0.3)"),
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    backdropFilter: "blur(10px)",
    transition: "all 0.3s ease",
  };
}

