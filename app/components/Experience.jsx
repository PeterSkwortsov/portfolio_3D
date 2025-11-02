import {
  CameraControls,
  Float,
  MeshReflectorMaterial,
  RenderTexture,
  Text,
  useFont,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useAtom } from "jotai";
import { useEffect, useRef } from "react";
import { Color } from "three";
import { degToRad, lerp } from "three/src/math/MathUtils";
import { Camping } from "./Camping";
import { OrbitControls } from "@react-three/drei";
const bloomColor = new Color("#fff");
bloomColor.multiplyScalar(2);

export const Experience = () => {
  const controls = useRef();
  const meshFitCameraHome = useRef();
  const meshFitCameraStore = useRef();
  const textMaterial = useRef();


const intro = async () => {
  controls.current.dolly(-9);
  controls.current.smoothTime = 1.8;
  controls.current.dolly(9, true);
};

useEffect(() => {
  intro();
}, []);






  return (
    <>
      <CameraControls ref={controls} enabled={false} />
      <mesh ref={meshFitCameraHome} position-z={1.5} visible={false}>
        <boxGeometry args={[7.5, 2, 2]} />
        <meshBasicMaterial color="orange" transparent opacity={0.5} />
      </mesh>
      <Text
        font={"fonts/Geologica_Cursive-ExtraBold.ttf"}
        position-x={0}
        position-y={-1.5}
        position-z={0}
        lineHeight={1}
        fontSize={1.9}
        curveSegments={7}
        bevelEnabled={true}
        bevelThickness={0.05}
        bevelSize={0.09}
        bevelSegments={7}
        textAlign="center"
        rotation-y={degToRad(0)}
        anchorY={"bottom"}
      >
        Cмотреть{"\n"}портфолио
        <meshBasicMaterial
          color={bloomColor}
          toneMapped={false}
          ref={textMaterial}
        >
          <RenderTexture attach={"map"}>
            <color attach="background" args={["#fff"]} />
            <Float floatIntensity={2} rotationIntensity={3}>
              
              <Camping
                scale={2.5}
                rotation-y={-degToRad(25)}
                rotation-x={degToRad(40)}
                position-y={-0.5}
              />
              <OrbitControls />
            </Float>
          </RenderTexture>
        </meshBasicMaterial>
      </Text>
      
      <mesh position-y={-1.5} rotation-x={-Math.PI / 2}>
        <ambientLight intensity={1} />
        <planeGeometry args={[100, 100]} />
        <MeshReflectorMaterial
          blur={[50, 50]}
          resolution={1024}
          mixBlur={1}
          mixStrength={10}
          roughness={1}
          depthScale={1}
          opacity={1}
          transparent
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#333"
          metalness={0.5}
        />
      </mesh>
    </>
  );
};

