'use client';


import { useRef, useState, Suspense, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Physics, useRapier, RigidBody } from "@react-three/rapier";
import * as THREE from "three";
import { OrbitControls, Float, MeshReflectorMaterial, Cloud } from "@react-three/drei";

import { Text, Text3D, Stars, Center } from "@react-three/drei";
import { useRouter } from "next/navigation";
import { CubeCamera } from "@react-three/drei";




export default function CloudSceneWithLoader() {
  const [loading, setLoading] = useState(true);
      const [showModal, setShowModal] = useState(true);

  function CubeWall() {
    const wallWidth = 10;
    const wallHeight = 10;
    const cubes = [];

    // Создаем сетку кубов для стены
    for (let x = 0; x < wallWidth; x++) {
      for (let y = 0; y < wallHeight; y++) {
        cubes.push({
          id: `${x}-${y}`,
          position: [x - (wallWidth - 1) / 2, y - (wallHeight - 1) / 2, 0],
        });
      }
    }

    return (
      <group>
        {cubes.map((cube) => (
          <InteractiveCube key={cube.id} position={cube.position} />
        ))}
      </group>
    );
  }

  // Компонент интерактивного куба
  function InteractiveCube({ position }) {
    const rigidBodyRef = useRef();
    const meshRef = useRef();
    const [isClicked, setIsClicked] = useState(false);

    // Случайный цвет для куба
    const color = useRef(new THREE.Color());

    // Обработчик клика по кубу
    const handleClick = (event) => {
      event.stopPropagation();
      setIsClicked(true);

      // Получаем направление от камеры к кубу
      const cameraDirection = new THREE.Vector3();
      event.camera.getWorldDirection(cameraDirection);

      // Инвертируем направление для толчка от камеры
      const impulseDirection = cameraDirection.negate();

      // Добавляем немного случайности
      impulseDirection.x += (Math.random() - 0.5) * 0.2;
      impulseDirection.y += (Math.random() - 0.5) * 0.2;
      impulseDirection.z = Math.abs(impulseDirection.z); // Убеждаемся, что толчок вперед

      // Нормализуем и умножаем на силу
      impulseDirection.normalize().multiplyScalar(15);

      // Применяем импульс к кубу
      if (rigidBodyRef.current) {
        rigidBodyRef.current.applyImpulse(impulseDirection, true);

        // Добавляем случайный вращательный импульс
        const torque = new THREE.Vector3(
          (Math.random() - 0.5) * 0.9,
          (Math.random() - 0.5) * 0.9,
          (Math.random() - 0.5) * 0.9
        );
        rigidBodyRef.current.applyTorqueImpulse(torque, true);
      }
    };

    // Анимация для плавного изменения цвета после клика
    useFrame(() => {
      if (meshRef.current && isClicked) {
        meshRef.current.material.color.lerp(new THREE.Color(1, 0.3, 0.3), 0.1);
      }
    });

    return (
      <RigidBody
        ref={rigidBodyRef}
        position={position}
        colliders="cuboid"
        restitution={0.8}
        friction={0.3}
        mass={1}
      >
        <mesh
          ref={meshRef}
          castShadow
          receiveShadow
          onClick={handleClick}
          onPointerEnter={() => (document.body.style.cursor = "pointer")}
          onPointerLeave={() => (document.body.style.cursor = "default")}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={color.current} />
        </mesh>
      </RigidBody>
    );
  }

  function Floor() {
    return (
      <RigidBody type="fixed" restitution={0.5} friction={0.8}>
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0, 0]}
          receiveShadow
        >
          <planeGeometry args={[40, 40]} />
          <meshStandardMaterial color="red"  />
        </mesh>
      </RigidBody>
    );
  }

  function Walls() {
    const router = useRouter();
    const [isHovered, setIsHovered] = useState(false);

    const handleClick = (e) => {
      e.stopPropagation();
      router.push("./discovery-page");
    };
    return (
      <>
        <RigidBody type="fixed">
          <mesh position={[0, 0, 15]} receiveShadow rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[40, 40]} />
            <meshStandardMaterial color="red" />
          </mesh>
        </RigidBody>

        <group
        onClick={handleClick}
        onPointerOver={() => {
          setIsHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setIsHovered(false);
          document.body.style.cursor = "default";
        }}
        >
          <RigidBody
            type="fixed"
            // colliders="cuboid"
            restitution={0.1} // Высокий коэффициент отскока
            friction={0.1}
          >
            <mesh
              receiveShadow
              position={[-0.2, 1.8, 7.78]}
              rotation={[0, Math.PI, 0]}
            >
              <planeGeometry args={[6.8, 1.3]} />
              <meshPhysicalMaterial
                transparent
                opacity={0}
                color="red"
                transmission={0.9}
                roughness={0.1}
                metalness={0.3}
              />
            </mesh>
          </RigidBody>
        </group>

        <Center position={[-0.4, 1.8, 8]} rotation={[0, Math.PI, 0]}>
            
          <Text3D
            font="../nunito_extraLight_regular.json"
            size={1.2}
            height={0.3}
            curveSegments={7}
            bevelEnabled={true}
            bevelThickness={0.05}
            bevelSize={0.09}
            bevelSegments={7}
            onClick={handleClick}
            onPointerOver={() => {
              setIsHovered(true);
              document.body.style.cursor = "pointer";
            }}
            onPointerOut={() => {
              setIsHovered(false);
              document.body.style.cursor = "default";
            }}
          >
            Переход
            <MeshReflectorMaterial
              blur={[0, 0]}
              position={[-5, 0, 0]}
              resolution={1048}
              mixBlur={1}
              mixStrength={80}
              roughness={1}
              depthScale={1.2}
              minDepthThreshold={0.4}
              maxDepthThreshold={1.4}
              metalness={0.5}
              color={"blue"}
            />
          </Text3D>
        </Center>

    
      </>
    );
  }
function Lighting() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 10, -7]}
        intensity={2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      {/* <pointLight position={[-5, 5, -5]} intensity={0.5} color="#0088ff" />
      <pointLight position={[5, 3, 5]} intensity={0.3} color="#ff8800" /> */}
    </>
  );
}

  return (
    <>
      <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
        {loading && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "white",
              fontSize: "20px",
              zIndex: 10,
            }}
          >
            Загрузка...
          </div>
        )}

        <Canvas
          onCreated={() => setLoading(false)}
          shadows
          camera={{ position: [0, 1.5, -7], fov: 35 }}
        >
          <Suspense fallback={null}>
            <Lighting />
            <Physics gravity={[0, -15, 0]}>
              <CubeWall />
              <Floor />
              <Walls />
            </Physics>
            <OrbitControls
              target={[0, 4.5, 12]} // Камера смотрит в центр (0,0,0)
              enablePan={false}
              enableZoom={false}
              enableRotate={false}
              // minPolarAngle={Math.PI } // 90 градусов
              // maxPolarAngle={Math.PI } // 90 градусов\ minAzimuthAngle={-Infinity}
              // maxAzimuthAngle={Infinity}
              // minDistance={8}
              // maxDistance={25}
            />
          </Suspense>
        </Canvas>

        <style jsx global>{`
          body {
            margin: 0;
            padding: 0;
            background: #000;
          }
        `}</style>
      </div>
    </>
  );
}
