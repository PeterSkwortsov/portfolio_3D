// components/Atom.jsx
"use client";

import { useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, Text } from "@react-three/drei";
import * as THREE from "three";
import { Line, Sphere } from "@react-three/drei";





const Shape = () => {
  const points = useMemo(
    () =>
      new THREE.EllipseCurve(0, 0, 3, 1.15, 0, 2 * Math.PI, false, 0).getPoints(
        100
      ),
    []
  );
  return (
    <group>
      <Line worldUnits points={points} color="#cae6f1" lineWidth={0.3} />
      <Line
        worldUnits
        points={points}
        color="#cae6f1"
        lineWidth={0.3}
        rotation={[0, 0, 1]}
      />
      <Line
        worldUnits
        points={points}
        color="#cae6f1"
        lineWidth={0.3}
        rotation={[0, 0, -1]}
      />
      <Sphere args={[0.55, 64, 64]}>
        <meshBasicMaterial color={[6, 0.5, 2]} toneMapped={false} />
      </Sphere>
    </group>
  );
};


export default function Atom() {


 const meshRef = useRef();
 const materialRef = useRef();

 // Создаем кастомный шейдерный материал
 const iridescentMaterial = useMemo(() => {
   const material = new THREE.ShaderMaterial({
     uniforms: {
       time: { value: 0 },
       baseColor: { value: new THREE.Color(0.1, 0.1, 0.3) },
       iridescenceColor: { value: new THREE.Color(1, 0.5, 0.2) },
       frequency: { value: 3.0 },
     },
     vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vViewDir;
        
        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vViewDir = normalize(cameraPosition - worldPosition.xyz);
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
     fragmentShader: `
        uniform float time;
        uniform vec3 baseColor;
        uniform vec3 iridescenceColor;
        uniform float frequency;
        
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vViewDir;
        
        void main() {
          // Иридисцентный эффект на основе угла обзора
          float fresnel = dot(vNormal, vViewDir);
          fresnel = pow(1.0 - fresnel, 2.0);
          
          // Добавляем анимацию
          float pulse = sin(time * 2.0) * 0.5 + 0.5;
          
          // Создаем радужный эффект
          float hue = fresnel * frequency + time * 0.5;
          vec3 rainbow = 0.5 + 0.5 * cos(6.28318 * (hue + vec3(0.0, 0.33, 0.67)));
          
          // Смешиваем цвета
          vec3 finalColor = mix(baseColor, rainbow * iridescenceColor, fresnel + pulse * 0.3);
          
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
   });

   return material;
 }, []);

 useFrame((state) => {
   if (materialRef.current) {
     materialRef.current.uniforms.time.value = state.clock.elapsedTime;
   }

   if (meshRef.current) {
     meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
   }
 });


  const groupRef = useRef();
  const pointRef = useRef();
  const [activePoint, setActivePoint] = useState(null);
  const [showText, setShowText] = useState(false);

  // Позиции точек на модели
  const hotSpots = useMemo(
    () => [
      {
        position: [3, -0.5, 0],
        title: "Облочка",
        description: "Мощность: 250 л.с.",
        color: "#00ff88",
      },
      {
        position: [-1.2, 0.8, 2],
        title: "Кварки",
        description: "Вместимость: 5 человек",
        color: "#00ff88",
      },
      {
        position: [-3, 1.5, -0.5],
        title: "Ионы",
        description: "Солнечная панель",
        color: "#0088ff",
      },
    ],
    []
  );

  // Анимация пульсации
  useFrame((state, delta) => {
    if (pointRef.current) {
      // Пульсация размера
      const scale = 3 + Math.sin(state.clock.elapsedTime * 5) * 0.2;
      pointRef.current.scale.set(scale, scale, scale);

      // Пульсация цвета
      const intensity = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.3;
      pointRef.current.material.emissiveIntensity = intensity;
    }
  });

  const handlePointClick = (point, event) => {
    event.stopPropagation();
    setActivePoint(point);
    setShowText(true);
  };

  const handleCloseText = () => {
    setShowText(false);
    setActivePoint(null);
  };

  return (
    <group ref={groupRef}>

      <mesh ref={meshRef}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <primitive object={iridescentMaterial} ref={materialRef} />
      </mesh>

      {/* Интерактивные точки */}
      {hotSpots.map((point, index) => (
        <mesh
          key={index}
          ref={index === 0 ? pointRef : null}
          position={point.position}
          onClick={(e) => handlePointClick(point, e)}
          onPointerOver={() => (document.body.style.cursor = "pointer")}
          onPointerOut={() => (document.body.style.cursor = "default")}
        >
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial
            color="#ff0000"
            emissive="#ff3333"
            emissiveIntensity={0.5}
            transparent
            opacity={2}
          />
        </mesh>
      ))}

      {/* Всплывающий текст */}
      {activePoint && showText && (
        <Html
          position={[
            activePoint.position[0],
            activePoint.position[1] + 0.8,
            activePoint.position[2],
          ]}
          distanceFactor={15}
          style={{
            background: "rgba(0,0,0,0.9)",
            color: "white",
            padding: "15px",
            borderRadius: "10px",
            border: "2px solid #ff0000",
            minWidth: "200px",
            backdropFilter: "blur(10px)",
            pointerEvents: "auto",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <h3 style={{ margin: "0 0 10px 0", color: "#ff6b6b" }}>
              {activePoint.title}
            </h3>
            <p style={{ margin: "0 0 15px 0", fontSize: "14px" }}>
              {activePoint.description}
            </p>
            <button
              onClick={handleCloseText}
              style={{
                background: "#ff6b6b",
                border: "none",
                padding: "5px 15px",
                borderRadius: "5px",
                color: "white",
                cursor: "pointer",
              }}
            >
              Закрыть
            </button>
          </div>
        </Html>
      )}
    </group>
  );
}
