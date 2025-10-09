// pages/rainbow-scene.js
import { Canvas } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function RainbowScene() {
  const meshRef = useRef();

  const shader = useMemo(
    () => ({
      uniforms: {
        uTime: { value: 0 },
        uResolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
      },
      vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
      fragmentShader: `
      uniform float uTime;
      uniform vec2 uResolution;
      varying vec2 vUv;

      vec3 brightRainbow(float t) {
        t = fract(t);
        vec3 color;
        
        if (t < 0.16) color = vec3(1.0, 0.0, 0.0);
        else if (t < 0.32) color = vec3(1.0, 0.5, 0.0);
        else if (t < 0.48) color = vec3(1.0, 1.0, 0.0);
        else if (t < 0.64) color = vec3(0.0, 1.0, 0.0);
        else if (t < 0.80) color = vec3(0.0, 0.0, 1.0);
        else color = vec3(0.5, 0.0, 1.0);
        
        return color * 1.2;
      }

      void main() {
        vec2 uv = (vUv - 0.5) * 2.0;
        uv.x *= uResolution.x / uResolution.y;
        
        // Создаем спиральную радугу
        float angle = atan(uv.y, uv.x);
        float radius = length(uv);
        
        float spiral = angle / 6.283 + radius * 0.5 + uTime * 0.1;
        vec3 color = brightRainbow(spiral);
        
        // Добавляем свечение к центру
        float glow = 1.0 - smoothstep(0.0, 1.5, radius);
        color += glow * 0.3;
        
        gl_FragColor = vec4(color, 1.0);
      }
    `,
    }),
    []
  );

  return (
    <mesh ref={meshRef} position={[0, 0, -10]} scale={[100, 100, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        args={[shader]}
        onUpdate={(material) => {
          material.uniforms.uTime.value = performance.now() * 0.001;
        }}
      />
    </mesh>
  );
}

export default function SimpleRainbow() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas>
        <RainbowScene />
      </Canvas>
    </div>
  );
}
