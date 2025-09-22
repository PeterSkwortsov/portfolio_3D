"use client";

import React, { Suspense } from "react";
import styled from "styled-components";
import Mac from "./Mac";
import { Canvas } from "@react-three/fiber";
import { Loader } from "@react-three/drei";


const ChairPage = () => {
  return (
    <>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <Suspense fallback={null}>
          <Mac />
          {/* <OrbitControls enableZoom={false}  /> */}
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