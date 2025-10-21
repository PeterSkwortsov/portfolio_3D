import { useRef, useState } from "react";
import { Canvas, useFrame, useThree  } from "@react-three/fiber";
import { Physics, useRapier, RigidBody } from "@react-three/rapier";
import * as THREE from "three";
import { OrbitControls, Decal, useTexture, Html } from "@react-three/drei";

import {
  Text,
  Text3D,
  Stars,
  Center,
  Box,
} from "@react-three/drei";
import { useRouter } from "next/navigation";
import { MeshReflectorMaterial, CubeCamera } from "@react-three/drei";



function MouseCameraController() {
  const { camera, mouse } = useThree()
  const [isEnabled, setIsEnabled] = useState(true)
  
  useFrame(() => {
    if (!isEnabled) return
    
    // Ограниченный поворот камеры
    const maxRotation = Math.PI / 4 // 45 градусов
    const targetRotationX = mouse.y * maxRotation
    const targetRotationY = mouse.x * maxRotation
    
    // Плавная интерполяция
    camera.rotation.x = THREE.MathUtils.lerp(
      camera.rotation.x, 
      targetRotationX, 
      0.1
    )
    camera.rotation.y = THREE.MathUtils.lerp(
      camera.rotation.y * 20, 
      targetRotationY, 
      0.1
    )
  })

  return (
  null
  )

}

// Компонент для создания стены из кубов
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

// Компонент пола
function Floor() {
  return (
    <RigidBody type="fixed" restitution={0.5} friction={0.8}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="red" />
      </mesh>
    </RigidBody>
  );
}

// Компонент фона (стены вокруг)
function Walls() {
  return (
    <>
      <RigidBody type="fixed">
        <mesh position={[0, 0, 15]} receiveShadow rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[40, 40]} />
          <meshStandardMaterial color="red" />
        </mesh>
      </RigidBody>

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
            color="red"
            opacity={0}
            transmission={0.9}
            roughness={0.1}
            metalness={0.3}
          />
        </mesh>
      </RigidBody>
      <Center position={[-0.4, 1.8, 8]} rotation={[0, Math.PI, 0]}>
        <Text3D
          font="./nunito_extraLight_regular.json"
          size={1.6}
          height={0.3}
          curveSegments={7}
          bevelEnabled={true}
          bevelThickness={0.05}
          bevelSize={0.06}
          bevelSegments={5}
        >
          начать
          <meshNormalMaterial />
        </Text3D>
      </Center>

      {/* <RigidBody type="fixed">
        <mesh
          position={[-8, 0, 0]}
          rotation={[0, Math.PI / 2, 0]}
          receiveShadow
        >
          <planeGeometry args={[30, 20]} />
          <meshStandardMaterial color="#red" />
        </mesh>
      </RigidBody> */}
      {/* <RigidBody type="fixed">
        <mesh
          position={[8, 0, 0]}
          rotation={[0, -Math.PI / 2, 0]}
          receiveShadow
        >
          <planeGeometry args={[30, 20]} />
          <meshStandardMaterial color="red" opacity={0} />
        </mesh>
      </RigidBody> */}
    </>
  );
}

// Компонент освещения
function Lighting() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 10, -7]}
        intensity={1}
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

// Компонент камеры с контроллерами


// Основной компонент сцены
function PhysicsScene() {
    const [showModal, setShowModal] = useState(true);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <Canvas shadows camera={{ position: [0, 5, -7], fov: 40 }}>
        <Html
          position={[0, 4, 0]}
          distanceFactor={10}
          occlude
          style={{
            pointerEvents: showModal ? "auto" : "none",
          }}
        >
          {showModal && (
            <div className="bg-white rounded-lg shadow-lg p-4 min-w-[300px] transform -translate-x-1/2 -translate-y-1/2">
              <h3 className="font-bold text-lg mb-2">3D Модальное окно</h3>
              <p className="text-gray-600 text-sm mb-3">
                Это окно находится в 3D пространстве!
              </p>
              <button
                className="w-full bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded text-sm"
                onClick={() => setShowModal(false)}
              >
                Закрыть
              </button>
            </div>
          )}
        </Html>
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
        <MouseCameraController />
      </Canvas>
    </div>
  );
}

export default PhysicsScene;
