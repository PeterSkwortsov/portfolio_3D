import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Physics, useRapier, RigidBody } from "@react-three/rapier";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";


// Прозрачная плоскость с физикой
function TransparentPhysicsPlane({ position, size = [4, 2], rotation = [0, 1, Math.PI / 2] }) {
  const planeRef = useRef()

  return (
    <RigidBody
      ref={planeRef}
      position={position}
      type="fixed" // Неподвижная плоскость
      colliders="cuboid"
      restitution={0.8} // Высокий коэффициент отскока
      friction={0.1}
      rotation={rotation}
    >
      <mesh receiveShadow>
        <planeGeometry args={size} />
        <meshPhysicalMaterial
          transparent
          opacity={0.2}
          transmission={0.9}
          roughness={0.1}
          metalness={0.3}
          rotation={rotation}
          color="#4dabf7"
          side={THREE.DoubleSide}
        />
      </mesh>
    </RigidBody>
  );
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
        (Math.random() - 0.5) * 0.5,
        (Math.random() - 0.5) * 0.5,
        (Math.random() - 0.5) * 0.5
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
      restitution={0.6}
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
    <RigidBody type="fixed" restitution={0.2} friction={0.8}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#444" />
      </mesh>
    </RigidBody>
  );
}

// Компонент фона (стены вокруг)
function Walls() {
  return (
    <>
      <RigidBody type="fixed">
        <mesh position={[0, 0, 10]} receiveShadow rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="blue" />
        </mesh>
      </RigidBody>

      <RigidBody
        type="fixed"
        // colliders="cuboid"
        restitution={0.1} // Высокий коэффициент отскока
        friction={0.1}
      >
        <mesh receiveShadow position={[0, 0, 8]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[5, 5]} />
          <meshPhysicalMaterial
            transparent
            color="#4dabf7"
            opacity={1}
            transmission={0.9}
            roughness={0.1}
            metalness={0.3}
          />
        </mesh>
      </RigidBody>
     

      <RigidBody type="fixed">
        <mesh
          position={[-8, 0, 0]}
          rotation={[0, Math.PI / 2, 0]}
          receiveShadow
        >
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#red" />
        </mesh>
      </RigidBody>
      <RigidBody type="fixed">
        <mesh
          position={[8, 0, 0]}
          rotation={[0, -Math.PI / 2, 0]}
          receiveShadow
        >
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="green" />
        </mesh>
      </RigidBody>
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
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <Canvas shadows camera={{ position: [0, 1, -8], fov: 50 }}>
        <Lighting />
        <Physics gravity={[0, -15, 0]}>
          <CubeWall />
          <Floor />
          <Walls />
        </Physics>
      
      

        
        <OrbitControls
          target={[0, 2, 5]} // Камера смотрит в центр (0,0,0)
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
          //   minDistance={8}
          //   maxDistance={25}
        />{" "}
      </Canvas>
    </div>
  );
}

export default PhysicsScene;
