// components/FlyingClouds.jsx
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function FlyingClouds({ count = 15, radius = 10 }) {
  const cloudsRef = useRef();
  const clouds = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const randomRadius = radius * (0.8 + Math.random() * 0.4);
      const position = [
        Math.cos(angle) * randomRadius,
        (Math.random() - 0.5) * 4,
        Math.sin(angle) * randomRadius,
      ];
      const scale = 0.5 + Math.random() * 1.6;
      const speed = 0.6 + Math.random() * 0.3;
      const offset = Math.random() * Math.PI * 2;

      temp.push({ position, scale, speed, offset });
    }
    return temp;
  }, [count, radius]);

  const cloudShader = useMemo(
    () => ({
      uniforms: {
        uTime: { value: 0 },
      },
      vertexShader: `
      varying vec2 vUv;
      varying float vAlpha;
      
      void main() {
        vUv = uv;
        
        // Прозрачность по краям для круглой формы облака
        vec2 center = uv - 0.5;
        float distance = length(center);
        vAlpha = 1.0 - smoothstep(0.3, 0.5, distance);
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
      fragmentShader: `
      uniform float uTime;
      varying vec2 vUv;
      varying float vAlpha;

      // Шум для текстуры облака
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }

      float fbm(vec2 p) {
        float value = 0.0;
        float amplitude = 0.5;
        for (int i = 0; i < 4; i++) {
          value += amplitude * noise(p);
          amplitude *= 0.5;
          p *= 2.0;
        }
        return value;
      }

      void main() {
        vec2 uv = vUv - 0.5;
        
        // Создаем текстуру облака
        float cloud = fbm(uv * 4.0 + uTime * 0.5);
        cloud = smoothstep(0.3, 0.7, cloud);
        
        // Цвет облака
        vec3 color = mix(
          vec3(0.8, 0.85, 0.9),
          vec3(1.0, 1.0, 1.0),
          cloud
        );
        
        // Финальная прозрачность
        float alpha = cloud * vAlpha;
        
        gl_FragColor = vec4(color, alpha);
      }
    `,
    }),
    []
  );

  return (
    <group ref={cloudsRef}>
      {clouds.map((cloud, i) => (
        <Cloud
          key={i}
          position={cloud.position}
          scale={cloud.scale}
          speed={cloud.speed}
          offset={cloud.offset}
          shader={cloudShader}
        />
      ))}
    </group>
  );
}

function Cloud({ position, scale, speed, offset, shader }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      // Вращение вокруг центра сцены
      const time = state.clock.elapsedTime;
      meshRef.current.rotation.y = time * speed + offset;

      // Легкое плавающее движение вверх-вниз
      meshRef.current.position.y =
        position[1] + Math.sin(time * speed * 2.0 + offset) * 0.3;

      // Обновление времени в шейдере
      meshRef.current.material.uniforms.uTime.value = time;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={[scale, scale, scale]}>
      <circleGeometry args={[1, 32]} />
      <shaderMaterial
        args={[shader]}
        transparent={true}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
