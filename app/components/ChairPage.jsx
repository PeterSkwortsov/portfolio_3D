
'use client'

import React, { Suspense } from "react";
import styled from "styled-components";
import Mac from "./Mac";
import { Canvas } from "@react-three/fiber";
import { Loader } from "@react-three/drei";
import { Center } from "@react-three/drei";
import Pirates from "./pitat/Pirate";
import { OrbitControls } from "@react-three/drei";

const ChairPage = () => {
  return (
    <>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <Suspense fallback={null}>
          <color attach="background" args={["#61b6ff"]} />
          <directionalLight position={[1, 2, 3]} intensity={4} />
          <ambientLight intensity={0.7} />
          <Center>
            <Pirates />
            <OrbitControls
              autoRotate
              autoRotateSpeed={3}
              enableZoom={false}
              enablePan={false}
              enableRotate={true}
            />
          </Center>
        </Suspense>
      </Canvas>
      <Loader />
      {/* <Desc>
        We design products with a strong focus on both world class design and
        ensuring your product is a market success.
      </Desc> */}
    </>
  );
};

export default ChairPage;