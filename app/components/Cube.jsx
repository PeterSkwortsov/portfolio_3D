
"use client";
import { useRef } from "react";
import styled from "styled-components";
import { PerspectiveCamera, Text } from "@react-three/drei";
import { OrbitControls, RenderTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

/**
 * A rotating cube with a rendered texture containing a pink background and a white 3D text.
 * The cube rotates around the x axis and the text moves horizontally according to the elapsed time.
 * @returns A rotating cube with a rendered texture containing a pink background and a white 3D text.
 */
const Cube = () => {
  const textRef = useRef();
  useFrame(
    (state) =>
      (textRef.current.position.x = Math.sin(state.clock.elapsedTime) * 1.8)
  );

  return (
    <mesh rotation={[1.2, 2, -2]}>
      <boxGeometry />

      <meshStandardMaterial>
        <RenderTexture attach="map">
          <PerspectiveCamera makeDefault position={[0, 0, 2]} />
          <color attach="background" args={["pink"]} />
          <Text ref={textRef} fontSize={0.4} color="white" position={[0, 0, 0]}>
            Next.js Three.js drei GSAP R3F
          </Text>
        </RenderTexture>
      </meshStandardMaterial>
    </mesh>
  );
};

export default Cube;
