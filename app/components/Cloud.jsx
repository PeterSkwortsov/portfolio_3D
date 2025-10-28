// components/DebugScene.js
"use client";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html, Environment } from "@react-three/drei";
import { Suspense } from "react";
import GUI from "lil-gui";
import CustomSheaderMaterial from "three-custom-shader-material/vanilla";
import { useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";

 


const particlesVertexShader = `
  varying vec3 vPosition;

void main() {
vPosition = csm_Position.xyz;

}
`;

const particlesFragmentShader = `
varying vec3 vPosition;

uniform float uSliceArc;
uniform float uSliceStart;

void main()
{
    

    float angale = atan(vPosition.y, vPosition.x);
    angale -= uSliceStart;
    angale = mod(angale, PI2);

    if(angale > 0.0 && angale < uSliceArc)
    discard;

    float csm_Slice;
 
}
`;

const uniforms = {
  uSliceStart: new THREE.Uniform(1.75),
  uSliceArc: new THREE.Uniform(1.25),
};


const patchMap = {
  csm_Slice: {
    "#include <colorspace_fragment>": `
    #include <colorspace_fragment>

    if(!gl_FrontFacing)
    gl_FragColor = vec4(0.75, 0.5, 0.3, 1.0);
    `,
  },
};


const material = new THREE.MeshStandardMaterial({
  metalness: 0.5,
  roughness: 0.25,
  envMapIntensity: 0.5,
  color: "#858080",
});

const slicedMaterial = new CustomSheaderMaterial({
  baseMaterial: THREE.MeshStandardMaterial,
  vertexShader: particlesVertexShader,
  fragmentShader: particlesFragmentShader,
  uniforms: uniforms,
  patchMap: patchMap,
  metalness: 0.5,
  roughness: 0.25,
  envMapIntensity: 0.5,
  color: "#858080",
  side: THREE.DoubleSide,
});

const slicedDephMaterial = new CustomSheaderMaterial({
  // материал для обновления тени
  baseMaterial: THREE.MeshDepthMaterial,
  vertexShader: particlesVertexShader,
  fragmentShader: particlesFragmentShader,
  uniforms: uniforms,
  patchMap: patchMap,

  depthPacking: THREE.RGBADepthPacking,
});

function Gears(props) {
  const { nodes, materials } = useGLTF('/gears.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.outerHull.geometry} material={nodes.outerHull.material} scale={3.714} />
      <mesh geometry={nodes.axle.geometry} material={nodes.axle.material} />
      <mesh geometry={nodes.gears.geometry} material={nodes.gears.material} position={[0, 1.595, -0.691]} rotation={[-Math.PI, 0, -Math.PI]} scale={[1, 1, 1.016]} />
    </group>
  )
}

useGLTF.preload('/gears.glb')


export default function DebugScene() {

function GUIScene() {
  const [gui, setGui] = useState(null);

  useEffect(() => {
    // Динамический импорт только на клиенте
    import("lil-gui").then(({ GUI }) => {
      const guiInstance = new GUI({ width: 325 });
      setGui(guiInstance);

      // Очистка при размонтировании
      return () => {
        guiInstance.destroy();
      };
    });
  }, []);
}




  return (
    <div style={{ width: "100vw", height: "100vh", background: "black" }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        {/* Освещение - ОБЯЗАТЕЛЬНО! */}
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />

        <Suspense fallback={<Loader />}>
          <Gears />
        </Suspense>

        {/* Сетка для ориентации */}
        <gridHelper args={[10, 10, "#fff", "#444"]} />

        <OrbitControls />
        <GUIScene />
      </Canvas>
    </div>
  );
}

function Loader() {
  return (
    <Html center>
      <div style={{ color: "white", fontSize: "20px" }}>Загрузка модели...</div>
    </Html>
  );
}

function SimpleModel() {
  // Простая модель куба для теста
  return (
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
}
