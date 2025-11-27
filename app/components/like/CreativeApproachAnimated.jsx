'use client'

import * as THREE from "three";
import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Clouds,
  Cloud,
  CameraControls,
  Sky as SkyImpl,
  OrbitControls,
  Loader,
} from "@react-three/drei";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { degToRad } from "three/src/math/MathUtils";
import { useState } from "react"; 


export default function App() {
const [isHovered, setIsHovered] = useState(false);


  return (

    <div className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
        <Canvas camera={{ position: [0, -10, 10], fov: 75 }}>
          <Sky />
          <ambientLight intensity={Math.PI / 1.5} />
          <spotLight
            position={[0, 40, 0]}
            decay={0}
            distance={45}
            penumbra={1}
            intensity={100}
          />
          <spotLight
            position={[-20, 0, 10]}
            color="red"
            angle={0.15}
            decay={0}
            penumbra={-1}
            intensity={30}
          />
          <spotLight
            position={[20, -10, 10]}
            color="red"
            angle={0.2}
            decay={0}
            penumbra={-1}
            intensity={20}
          />
        </Canvas>
        <Loader />
        </Suspense>
      </div>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div
          className="
        bg-black/20 
        backdrop-blur-md
        border border-white/20
        p-6 
        md:p-8 
        lg:p-12 
        rounded-2xl
        text-center 
        max-w-md
        md:max-w-2xl
        lg:max-w-4xl
        mx-auto
        shadow-2xl
        h-full
      "
        >
          <h5
            className="
          text-3xl 
          md:text-4xl 
          lg:text-5xl 
          font-bold 
         text-white
          mb-4 
          md:mb-6
        "
          >
            Творческий подход
          </h5>
          <p
            className="
          text-base 
          md:text-lg 
          lg:text-xl 
          text-white/80 
          
          mb-5
        "
          >
            Получаю настоящее удовольствие, когда создаю что-то с чистого листа.<br></br>
            Каждый проект - это попытка создать что-то особенное.
          </p>
          <p
            className="
          text-base 
          md:text-lg 
          lg:text-xl 
          text-white/80 
         
        "
          >
            Мне нравится влиять на каждый аспект сайта - от концепции до
            реализации. Это даёт свободу для творчества и новых решений.
          </p>
        </div>
      </div>
    </div>
  );
  
}

function Sky() {
  const ref = useRef();
  const cloud0 = useRef();

  useFrame((state, delta) => {
    ref.current.rotation.y = Math.cos(state.clock.elapsedTime / 2) / 2;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime / 2) / 2;
    // cloud0.current.rotation.y -= delta;
  });
  return (
    <>
      <SkyImpl />
      <group ref={ref}>
        <Clouds material={THREE.MeshLambertMaterial} limit={400}>
          {/* <Cloud ref={cloud0} bounds={[2, 7, 9]} color={"red"} /> */}
          <Cloud
            bounds={[1, 3, 4]}
            color="#eed0d0"
            seed={1}
            position={[15, 0, 0]}
          />
          {/* <Cloud
            bounds={[3, 5, 14]}
            color="purple"
            seed={1}
            position={[-15, 0, 0]}
          />*/}
          <Cloud
            bounds={[5, 12, 3]}
            color="#a0b0d0"
            seed={1}
            position={[0, 0, -12]}
          />
          {/* <Cloud
            bounds={[2, 10, 17]}
            color="purple"
            seed={1}
            position={[0, 0, 12]}
          /> */}
          <Cloud
            concentrate="outside"
            growth={100}
            color="blue"
            opacity={0.25}
            seed={0.3}
            bounds={200}
            volume={200}
          />
        </Clouds>
       
      </group>
       <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
        />
    </>
  );
}
