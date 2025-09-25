'use client'

import React, { Suspense } from "react";
import { OrbitControls, Text, Html } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Shoe from "./Shoe";
import styled from "styled-components";

const Desc = styled.div`
  width: 200px;
  height: 20%;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  position: absolute;
  bottom: 200px;
  right: 100px;

  @media only screen and (max-width: 768px) {
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
`;

const ProductDesign = () => {
  return (
    <>
      <Canvas>
        <Suspense fallback={null}>
          <Shoe />
          <OrbitControls enableZoom={false}  autoRotate />
          <Html
            position={[0, 0.5, -1]}
            occlude
            distanceFactor={15}
            style={{
              width: "7rem",
              background: "linear-gradient(45deg, #000, #333)",
              color: "white",
              padding: "6px 10px",
              borderRadius: "8px",
              fontSize: "7px",
              fontWeight: "bold",
              border: "2px solid #ff6b6b",
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            Клиент в онлайн режиме может выбрать себе цвета.
          </Html>
        </Suspense>
      </Canvas>
      {/* <Desc>
        We design products with a strong focus on both world class design and
        ensuring your product is a market success.
      </Desc> */}
    </>
  );
};

export default ProductDesign;
