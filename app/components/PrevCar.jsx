import React, { Suspense } from "react";
import { Loader, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Atom from "./Atom";
import styled from "styled-components";
import { useRef, useState, useMemo } from "react";
import Experiences from "./Experiences";
import { Leva } from "leva";
import { Overlay } from "./Overlay";



const PrevCar = () => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Suspense fallback={null}>
        <Leva hidden />
        <Canvas shadows camera={{ position: [0, 0, 5], fov: 30 }}>
          <color attach="background" args={["#ececec"]} />
          <Experiences />
          <Loader />
        </Canvas>
        <Overlay style={{ width: "100%", height: "100%" }} />
      </Suspense>
    </div>
  );
};

export default PrevCar;
