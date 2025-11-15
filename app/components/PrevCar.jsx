import React, { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Atom from "./Atom";
import styled from "styled-components";
import { useRef, useState, useMemo } from "react";
import Experiences from "./Experiences";
import { Leva } from "leva";
import { Overlay } from "./Overlay";



const PrevCar = () => {
  return (
    <div className="w-screen h-screen">
      <Leva hidden />
      <Overlay />
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 30 }}>
        <color attach="background" args={["#ececec"]} />
        <Experiences />
      </Canvas>
    </div>
  );
};

export default PrevCar;
