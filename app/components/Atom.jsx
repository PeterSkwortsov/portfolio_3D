// components/AdvancedAtomShader.js (исправленная версия)
"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Исправленный компонент орбитальных линий
function OrbitalLines({ count = 3 }) {
  const linesRef = useRef();

  const orbits = useMemo(() => {
    const orbitsArray = [];

    for (let i = 0; i < count; i++) {
      const radius = 1.5 + i * 0.8;
      const segments = 64;
      const points = [];

      // Создаем точки для круговой орбиты
      for (let j = 0; j <= segments; j++) {
        const theta = (j / segments) * Math.PI * 2;
        points.push(Math.cos(theta) * radius, Math.sin(theta) * radius, 0);
      }

      orbitsArray.push({
        radius,
        color: new THREE.Color(0.1, 0.4, 0.8 - i * 0.2),
        points: new Float32Array(points),
      });
    }

    return orbitsArray;
  }, [count]);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      linesRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.05) * 0.2;
    }
  });

  return (
    <group ref={linesRef}>
      {orbits.map((orbit, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={orbit.points.length / 3}
              array={orbit.points}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color={orbit.color} transparent opacity={0.3} />
        </line>
      ))}
    </group>
  );
}

export default function AdvancedAtomShader() {
  const groupRef = useRef();
  const nucleusRef = useRef();

  // Создаем ядро атома
  const nucleusGeometry = useMemo(() => {
    const geometry = new THREE.IcosahedronGeometry(0.5, 2);
    const count = geometry.attributes.position.count;
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      colors[i * 3] = 1.0; // R
      colors[i * 3 + 1] = 0.3; // G
      colors[i * 3 + 2] = 0.1; // B
    }

    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return geometry;
  }, []);

  // Материал ядра
  const nucleusMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        glowIntensity: { value: 10 },
      },
      vertexShader: `
        uniform float time;
        varying vec3 vNormal;
        varying vec3 vPosition;

        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          
          // Легкая пульсация
          float pulse = sin(time * 2.0) * 0.05 + 1.0;
          vec3 pulsedPosition = position * pulse;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pulsedPosition, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform float glowIntensity;
        varying vec3 vNormal;
        varying vec3 vPosition;

        void main() {
          // Яркое свечение из центра
          float intensity = pow(0.5 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          vec3 glow = vec3(1.0, 0.5, 0.2) * intensity * glowIntensity;
          
          // Пульсирующий эффект
          float pulse = sin(time * 3.0) * 0.3 + 0.7;
          
          gl_FragColor = vec4(glow * pulse, 1.0);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    });
  }, []);

  // Создаем электроны на орбитах
  const electrons = useMemo(() => {
    const electronCount = 8;
    const electrons = [];

    for (let i = 0; i < electronCount; i++) {
      const radius = 2 + Math.random() * 1;
      const speed = 0.5 + Math.random() * 1;
      const angle = (i / electronCount) * Math.PI * 2;

      electrons.push({
        radius,
        speed,
        angle,
        phase: Math.random() * Math.PI * 2,
      });
    }

    return electrons;
  }, []);

  // Анимация
  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (nucleusRef.current) {
      nucleusRef.current.material.uniforms.time.value = time;
      nucleusRef.current.rotation.y = time * 0.2;
    }

    if (groupRef.current) {
      electrons.forEach((electron, index) => {
        const electronMesh = groupRef.current.children[index];
        if (electronMesh) {
          const x =
            Math.cos(time * electron.speed + electron.phase + electron.angle) *
            electron.radius;
          const y =
            Math.sin(
              time * electron.speed * 0.7 + electron.phase + electron.angle
            ) * electron.radius;
          const z =
            Math.sin(time * electron.speed * 0.5 + electron.phase) *
            electron.radius *
            0.5;

          electronMesh.position.set(x, y, z);
        }
      });
    }
  });

  return (
    <group>
      {/* Ядро атома */}

      <mesh ref={nucleusRef} geometry={nucleusGeometry}>
        <primitive object={nucleusMaterial} attach="material" />
      </mesh>

      {/* Электроны */}
      <group ref={groupRef}>
        {electrons.map((electron, index) => (
          <mesh key={index}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshBasicMaterial
              color={new THREE.Color(0.2, 0.8, 1.0)}
              transparent
              opacity={0.8}
            />
          </mesh>
        ))}
      </group>

      {/* Орбитальные линии */}
      <OrbitalLines count={3} />
    </group>
  );
}
