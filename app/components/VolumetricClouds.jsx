// components/VolumetricClouds.jsx
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function VolumetricClouds() {
  const groupRef = useRef();

  const clouds = useMemo(() => {
    const temp = [];
    const positions = [
      [8, 2, 0],
      [-6, 3, 4],
      [5, -1, -7],
      [-3, 4, 6],
      [7, 1, 5],
      [-4, -2, -3],
      [2, 3, -8],
      [-7, 0, 2],
      [3, -3, 7],
      [-5, 2, -4],
      [6, 4, 3],
      [-2, -1, -6],
    ];

    positions.forEach((pos, i) => {
      temp.push({
        position: pos,
        scale: 0.8 + Math.random() * 1.2,
        speed: 0.1 + Math.random() * 0.2,
        rotation: Math.random() * Math.PI * 2,
      });
    });
    return temp;
  }, []);

  const cloudShader = useMemo(
    () => ({
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color(0.95, 0.95, 1.0) },
        uColor2: { value: new THREE.Color(0.8, 0.85, 0.9) },
      },
      vertexShader: `
      varying vec2 vUv;
      varying vec3 vPosition;
      
      void main() {
        vUv = uv;
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
      fragmentShader: `
      uniform float uTime;
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      varying vec2 vUv;
      varying vec3 vPosition;

      // 3D шум для объемных облаков
      float noise(vec3 p) {
        return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453);
      }

      float fbm(vec3 p) {
        float value = 0.0;
        float amplitude = 0.5;
        for (int i = 0; i < 4; i++) {
          value += amplitude * noise(p);
          amplitude *= 1.5;
          p *= 2.0;
        }
        return value;
      }

      void main() {
        vec3 pos = vPosition;
        
        // Создаем объемное облако
        float cloud = fbm(pos * 2.0 + uTime * 0.1);
        cloud = smoothstep(1.3, 1.8, cloud);
        
        // Градиент цвета
        vec3 color = mix(uColor2, uColor1, cloud);
        
        // Прозрачность по расстоянию от центра
        float distance = length(vUv - 0.5);
        float alpha = cloud * (1.0 - smoothstep(0.3, 0.5, distance));
        
        gl_FragColor = vec4(color, alpha * 0.9);
      }
    `,
    }),
    []
  );

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;

      groupRef.current.children.forEach((cloud, i) => {
        const data = clouds[i];
        // Медленное вращение вокруг своей оси
        cloud.rotation.y = time * data.speed * 0.5 + data.rotation;
        // Движение по орбите
        cloud.position.x = data.position[0] + Math.sin(time * data.speed) * 2;
        cloud.position.z = data.position[2] + Math.cos(time * data.speed) * 2;

        cloud.material.uniforms.uTime.value = time;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {clouds.map((cloud, i) => (
        <mesh
          key={i}
          position={cloud.position}
          scale={[cloud.scale, cloud.scale * 0.6, cloud.scale]}
        >
          <sphereGeometry args={[1, 16, 16]} />
          <shaderMaterial
            args={[cloudShader]}
            transparent={true}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}
