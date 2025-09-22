"use client";

import React from "react";
import styled from "styled-components";
import { Canvas } from "@react-three/fiber";

import Cube from "./Cube";
import { Loader, OrbitControls } from "@react-three/drei";
const Container = styled.div`
  height: 90vh;
  width: 100%;
  scroll-snap-align: center;
`;
const Test = () => {
  return (<>

    <Container>
      <Canvas camera={{ fov: 20, position: [5, 5, 5] }} className="flex m-auto">
        <OrbitControls enableZoom={false} />
        <directionalLight position={[3, 2, 1]} intensity={2} />
        <ambientLight intensity={1} />
        <Cube />
      </Canvas>
    </Container>
        </>
  );
};

export default Test;
