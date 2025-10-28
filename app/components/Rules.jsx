"use client";

import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";

export default function Rules() {
  return (
    <div style={{ width: "100vw", height: "100vh", background: "#1a1a2e" }}>
      <Canvas
        camera={{
          position: [0, 0, 10],
          fov: 50,
        }}
      >
        <CameraButtons />
        <SceneObjects />
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
      moveCamera([0, 8, 0]);
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
      moveCamera([0, 0, 15]);
    },
  };

  return (
    <Html fullscreen>
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <h3 style={{ color: "white", margin: "0 0 10px 0" }}>
          Управление камерой
        </h3>

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

function SceneObjects() {
  return (
    <group>
      {/* Центральный куб */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#4ecdc4" />
      </mesh>

      {/* Вспомогательные объекты для ориентации */}
      <mesh position={[4, 0, 0]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color="#ff6b6b" />
      </mesh>

      <mesh position={[-4, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 2, 16]} />
        <meshStandardMaterial color="#ffd700" />
      </mesh>

      <mesh position={[0, 4, 0]}>
        <coneGeometry args={[0.5, 1, 16]} />
        <meshStandardMaterial color="#48dbfb" />
      </mesh>

      {/* Освещение */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={3} />
      <pointLight position={[-10, -10, -10]} intensity={1.5} />
    </group>
  );
}
