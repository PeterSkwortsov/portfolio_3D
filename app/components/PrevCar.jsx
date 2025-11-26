'use client';

import React, { Suspense } from "react";
import { Loader, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Atom from "./Atom";
import styled from "styled-components";
import { useRef, useState, useMemo } from "react";
import Experiences from "./Experiences";
import { Leva } from "leva";
import { Overlay } from "./Overlay";


const Container = styled.div`
  width: 1400px;
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 768px) {
    width: 100%;
    flex-direction: column;
  }
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  height: 100%;
`;

const PrevCar = () => {
  return (
    <Suspense fallback={null}>
      <Leva hidden />
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 30 }}>
        <color attach="background" args={["#ececec"]} />
        <Experiences />
        <Loader />
      </Canvas>
     
          <Overlay  />
    </Suspense>
  );
};

export default PrevCar;
