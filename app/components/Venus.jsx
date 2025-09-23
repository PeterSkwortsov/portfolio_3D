"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  useCursor,
  useTexture,
  Text,
  Decal,
  OrbitControls,
  RenderTexture,
  RandomizedLight,
  PerspectiveCamera,
  AccumulativeShadows,
  Loader,
} from "@react-three/drei";

export default function Venus(props) {
  const textRef = useRef();
  const { nodes } = useGLTF("/bunny-transformed.glb");
  useFrame(
    (state) =>
      (textRef.current.position.x = Math.sin(state.clock.elapsedTime) * 5.5)
  );

  return (
    <>
      <ambientLight intensity={1} />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.bunny.geometry}
        {...props}
        dispose={null}
        scale={3}
      >
        <meshStandardMaterial color="white" />
        <Decal
          position={[0, 0.9, 0.75]}
          rotation={[-0.4, Math.PI, 0]}
          scale={[1.2, 0.45, 1]}
        >
          <meshStandardMaterial
            roughness={1}
            transparent
            polygonOffset
            polygonOffsetFactor={-1}
          >
            <RenderTexture attach="map">
              <PerspectiveCamera
                makeDefault
                manual
                aspect={0.9 / 0.25}
                position={[0, 0, 5]}
              />
              <color attach="background" args={["#af2040"]} />
              <ambientLight intensity={Math.PI} />
              {/* <directionalLight position={[10, 10, 5]} /> */}
              <Text
                rotation={[0, Math.PI, 0]}
                ref={textRef}
                fontSize={4}
                color="white"
              >
                ваш логотип
              </Text>
            </RenderTexture>
          </meshStandardMaterial>
        </Decal>
      </mesh>
      <Loader/>
    </>
  );
}
