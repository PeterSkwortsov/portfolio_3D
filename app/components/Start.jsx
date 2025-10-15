// app/page.jsx
'use client'

import { useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Physics, usePlane, useBox } from '@react-three/cannon'
import { Text, OrbitControls } from '@react-three/drei'
import { useRouter } from 'next/navigation'

// Пол
function Ground() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -1, 0],
  }))
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[25, 25]} />
      <meshStandardMaterial color="#374151" />
    </mesh>
  )
}

// Интерактивный куб
function InteractiveCube({ position, color, index, onClick }) {
  const [ref, api] = useBox(() => ({
    mass: 1,
    position,
    args: [0.7, 0.7, 0.7],
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
      <boxGeometry args={[0.7, 0.7, 0.7]} />
      <meshStandardMaterial color={color} />
    </mesh>
  )
}

// 3D Кнопка с использованием useRouter
function ThreeDButton() {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = (e) => {
    e.stopPropagation()
    router.push('/next-page')
  }

  return (
    <group 
      position={[0, 0.2, -6]}
      onClick={handleClick}
      onPointerOver={() => {
        setIsHovered(true)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        setIsHovered(false)
        document.body.style.cursor = 'default'
      }}
    >
      {/* Текст кнопки */}
      <Text
        fontSize={0.6}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        ПЕРЕЙТИ ДАЛЕЕ
      </Text>
      
      {/* Подложка кнопки */}
      <mesh position={[0, 0, -0.1]}>
        <planeGeometry args={[4, 0.8]} />
        <meshStandardMaterial 
          color={isHovered ? "#047857" : "#059669"} 
          transparent 
          opacity={0.8} 
        />
      </mesh>
    </group>
  )
}

// Основной компонент сцены
function CubesScene() {
  const [clickedCubes, setClickedCubes] = useState([])
  
  // Позиции кубов в три ряда
  const cubeRows = [
    // Первый ряд (нижний)
    [
      [-3, 0.5, 0], [-1.5, 0.5, 0], [0, 0.5, 0], [1.5, 0.5, 0], [3, 0.5, 0]
    ],
    // Второй ряд (средний)
    [
      [-3, 1.7, 0], [-1.5, 1.7, 0], [0, 1.7, 0], [1.5, 1.7, 0], [3, 1.7, 0]
    ],
    // Третий ряд (верхний)
    [
      [-3, 2.9, 0], [-1.5, 2.9, 0], [0, 2.9, 0], [1.5, 2.9, 0], [3, 2.9, 0]
    ]
  ]

  const colorPalettes = [
    ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6'],
    ['#8b5cf6', '#ec4899', '#06b6d4', '#84cc16', '#f59e0b'],
    ['#dc2626', '#ea580c', '#ca8a04', '#16a34a', '#2563eb']
  ]

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
      
      <Physics gravity={[0, -9.81, 0]}>
        <Ground />
        
        {/* Рендерим кубы по рядам */}
        {cubeRows.map((row, rowIndex) => (
          <group key={`row-${rowIndex}`}>
            {row.map((position, colIndex) => {
              const currentIndex = cubeIndex++
              return (
                <InteractiveCube
                  key={currentIndex}
                  position={position}
                  color={colorPalettes[rowIndex][colIndex]}
                  index={currentIndex}
                  onClick={handleCubeClick}
                />
              )
            })}
          </group>
        ))}
      </Physics>

      {/* 3D Кнопка */}
      <ThreeDButton />
      
      {/* Счетчик кликов */}
      <Text
        position={[0, 5, 0]}
        fontSize={0.3}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        Кликнуто: {clickedCubes.length} из 15
      </Text>
    </>
  )
}

// Главный компонент
export default function Home() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#111827' }}>
      <Canvas
        shadows
        camera={{ position: [0, 0, 3], fov: 90 }}
        gl={{ alpha: false }}
        onCreated={({ gl }) => {
          gl.setClearColor('#0f172a')
        }}
      >
        <CubesScene />
        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
        //   minDistance={8}
        //   maxDistance={25}
        />
      </Canvas>
      
      {/* Инструкция */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        color: 'white',
        fontFamily: 'Arial, sans-serif',
        background: 'rgba(0,0,0,0.7)',
        padding: '15px',
        borderRadius: '10px',
        maxWidth: '300px'
      }}>
        <h3>🎯 Три ряда кубов</h3>
        <p>• 15 кубов в три ряда</p>
        <p>• Кликни по любому кубу - он улетит</p>
        <p>• Нажми зеленую кнопку "ПЕРЕЙТИ ДАЛЕЕ" для перехода</p>
        <p>• Используй мышь для вращения камеры</p>
      </div>
    </div>
  )
}