// app/page.jsx
'use client'

import { useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Physics, usePlane, useBox } from '@react-three/cannon'
import { Text, OrbitControls } from '@react-three/drei'
import { useRouter } from 'next/navigation'
import { MeshReflectorMaterial } from '@react-three/drei'
import * as THREE from "three";


const textProps = {
  fontSize: 0.7,
  font: "https://fonts.gstatic.com/s/kanit/v7/nKKU-Go6G5tXcr4WPBWnVac.woff",
};

function Ground() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0],
  }))
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[25, 25]} />
      <MeshReflectorMaterial
        blur={[1000, 1000]}
        resolution={824}
        mixBlur={1}
        mixStrength={80}
        roughness={1}
        depthScale={1.2}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color="purple"
        metalness={0.5}
      />
    </mesh>
  );
}
function BackWall() {
  const [ref] = usePlane(() => ({
    rotation: [0, 0, 0], // Смотрит на +Z
    position: [0, 0, -7], // Центр стены на высоте 4, отступ 15
    args: [2, 2], // Ширина 20, высота 10
    material: {
      restitution: 0.7, // Кубы хорошо отскакивают
      friction: 0.2, // Малое трение
    },
  }));

  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[4, 1]} position={[0, 0, -6]} /> 
      <meshStandardMaterial color="#1e40af" transparent={true} opacity={0.5} />
    </mesh>
  );
}
// Интерактивный куб
function InteractiveCube({ position, color, index, onClick }) {
  const [ref, api] = useBox(() => ({
    mass: 1,
    position,
    args: [1, 1, 1],
  }))

  const handleClick = (event) => {
    event.stopPropagation()
    // Применяем случайный импульс
    const impulseX = (Math.random() - 0.5) * 3
    const impulseY = Math.random() * 2
    const impulseZ = -8 - Math.random() * 4
    
    api.applyImpulse([impulseX, impulseY, impulseZ], [0, 0, 0])
    onClick(index)
  }

  return (
    <mesh 
      ref={ref} 
      castShadow 
      onClick={handleClick}
      onPointerOver={() => document.body.style.cursor = 'pointer'}
      onPointerOut={() => document.body.style.cursor = 'default'}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

// 3D Кнопка с использованием useRouter
 function ThreeDTextLink({ 
  text = "ПЕРЕЙТИ ДАЛЕЕ", 
  position = [0, 1, -4], 
  fontSize = 0.5,
  side = THREE.DoubleSide,
  href = "/next-page",
  color = "#ffffff",
  hoverColor = "#10b981",
  ...props 
}) {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)



  const handleClick = (e) => {
    e.stopPropagation()
    router.push(href)
  }

  return (
    <group
      position={position}
      onClick={handleClick}
      onPointerOver={() => {
        setIsHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setIsHovered(false);
        document.body.style.cursor = "default";
      }}
      {...props}
    >
      {/* Физическое тело (невидимое) */}
      <Text
        castShadow
        depthTest={false}
        material-toneMapped={false}
        {...textProps}
      >
        {text}
        <meshBasicMaterial color={color} />
      </Text>

    
    </group>
  );
}
// Основной компонент сцены
function CubesScene() {
  const [clickedCubes, setClickedCubes] = useState([])
  
  // Позиции кубов в три ряда
  const cubeRows = [
    // Первый ряд (нижний)
    [
      [-4, 0.5, 0],
      [-3, 0.5, 0],
      [-2, 0.5, 0],
      [-1, 0.5, 0],
      [0, 0.5, 0],
      [1, 0.5, 0],
      [2, 0.5, 0],
      [3, 0.5, 0],
      [4, 0.5, 0],
    ],
    // Второй ряд (средний)
    [
      [-4, 1.7, 0],
      [-3, 1.7, 0],
      [-2, 1.7, 0],
      [-1, 1.7, 0],
      [0, 1.7, 0],
      [1, 1.7, 0],
      [2, 1.7, 0],
      [3, 1.7, 0],
      [4, 1.7, 0],
    ],
    // Третий ряд (верхний)
    [
      [-4, 2.9, 0],
      [-3, 2.9, 0],
      [-2, 2.9, 0],
      [-1, 2.9, 0],
      [0, 2.9, 0],
      [1, 2.9, 0],
      [2, 2.9, 0],
      [3, 2.9, 0],
      [4, 2.9, 0],
    ],
  ];

  const colorPalettes = [
    [
      "#ef4444",
      "#f97316",
      "#eab308",
      "#22c55e",
      "#3b82f6",
      "#eab308",
      "#f97316",
      "#ec4899",
    ],
    [
      "#8b5cf6",
      "#ec4899",
      "#06b6d4",
      "#84cc16",
      "#f59e0b",
      "#eab308",
      "#f97316",
    ],
    [
      "#dc2626",
      "#ea580c",
      "#ca8a04",
      "#16a34a",
      "#2563eb",
      "#eab308",
      "#ec4899",
    ],
  ];

  const handleCubeClick = (index) => {
    setClickedCubes(prev => [...prev, index])
  }

  let cubeIndex = 0

  return (
    <>
      {/* Освещение */}
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[5, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[-5, 5, 5]} intensity={0.5} color="#93c5fd" />

      <Physics gravity={[0, -4, 0]}>
        <Ground />
        <BackWall />

        {/* Рендерим кубы по рядам */}
        {cubeRows.map((row, rowIndex) => (
          <group key={`row-${rowIndex}`}>
            {row.map((position, colIndex) => {
              const currentIndex = cubeIndex++;
              return (
                <InteractiveCube
                  key={currentIndex}
                  position={position}
                  color={colorPalettes[rowIndex][colIndex]}
                  index={currentIndex}
                  onClick={handleCubeClick}
                />
              );
            })}
          </group>
        ))}
      </Physics>

      {/* 3D Кнопка */}
      <Physics>
        <ThreeDTextLink />
      </Physics>

      {/* Счетчик кликов */}
    </>
  );
}

// Главный компонент
export default function Home() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas
        shadows
        camera={{ position: [0, 1, 4], fov: 60 }}
        gl={{ alpha: false }}
        onCreated={({ gl }) => {
          gl.setClearColor("red");
        }}
      >
        <CubesScene />
        <OrbitControls
          target={[0, 1, 0]} // Камера смотрит в центр (0,0,0)
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          //   minDistance={8}
          //   maxDistance={25}
        />
      </Canvas>

      {/* Инструкция */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          color: "white",
          fontFamily: "Arial, sans-serif",
          background: "rgba(0,0,0,0.7)",
          padding: "15px",
          borderRadius: "10px",
          maxWidth: "300px",
        }}
      >
        <h3>🎯 Три ряда кубов</h3>
        <p>• 15 кубов в три ряда</p>
        <p>• Кликни по любому кубу - он улетит</p>
        <p>• Нажми зеленую кнопку "ПЕРЕЙТИ ДАЛЕЕ" для перехода</p>
        <p>• Используй мышь для вращения камеры</p>
      </div>
    </div>
  );
}