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
        intensity={4}
        castShadow
        color={"red"}
      />
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

  return (
    <Html fullscreen>
      <div style={{ height: "50vh", overflow: "auto" }}>
        <div
          style={{
            position: "absolute",
            top: "80px",
            left: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {/* Основной контент */}
          <button
            onClick={cameraPresets.front}
            style={getButtonStyle(activeView === "front")}
          >
            🎥 Спереди
          </button>

          <button
            onClick={cameraPresets.back}
            style={getButtonStyle(activeView === "back")}
          >
            📹 Сзади
          </button>

          <button
            onClick={cameraPresets.left}
            style={getButtonStyle(activeView === "left")}
          >
            ◀️ Слева
          </button>

          <button
            onClick={cameraPresets.right}
            style={getButtonStyle(activeView === "right")}
          >
            ▶️ Справа
          </button>

          <button
            onClick={cameraPresets.top}
            style={getButtonStyle(activeView === "top")}
          >
            🔽 Сверху
          </button>

          <button
            onClick={cameraPresets.bottom}
            style={getButtonStyle(activeView === "bottom")}
          >
            🔼 Снизу
          </button>

          <button
            onClick={cameraPresets.diagonal}
            style={getButtonStyle(activeView === "diagonal")}
          >
            🔀 Диагональ
          </button>

          <button
            onClick={cameraPresets.close}
            style={getButtonStyle(activeView === "close")}
          >
            🔍 Близко
          </button>

          <button
            onClick={cameraPresets.far}
            style={getButtonStyle(activeView === "far")}
          >
            👁️ Далеко
          </button>
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

