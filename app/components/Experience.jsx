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
bloomColor.multiplyScalar(1.5);

export const Experience = () => {
  const controls = useRef();
  const meshFitCameraHome = useRef();
  const meshFitCameraStore = useRef();
  const textMaterial = useRef();








  return (
    <>
      <CameraControls ref={controls} enabled={false} zoomEnabled={true} />
      <mesh ref={meshFitCameraHome} position-z={1.5} visible={false}>
        <boxGeometry args={[7.5, 2, 2]} />
        <meshBasicMaterial color="orange" transparent opacity={0.5} />
      </mesh>
      <Text
        font={"fonts/Geologica_Cursive-ExtraBold.ttf"}
        position-x={0}
        position-y={-0.5}
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
        Смотреть{"\n"}портфолио
        <meshBasicMaterial
          color={bloomColor}
          toneMapped={false}
          ref={textMaterial}
        >
          <RenderTexture attach={"map"}>
            <color attach="background" args={["#fff"]} />
            <Float floatIntensity={4} rotationIntensity={5}>
              <Camping
                scale={1.6}
                rotation-y={-degToRad(25)}
                rotation-x={degToRad(40)}
                position-y={-0.5}
              />
            </Float>
          </RenderTexture>
        </meshBasicMaterial>
      </Text>
      {/* <group rotation-y={degToRad(-25)} position-x={3}>
        <Camping scale={0.6} html />
        <mesh ref={meshFitCameraStore} visible={true}>
          <boxGeometry args={[2, 1, 2]} />
          <meshBasicMaterial color="red" transparent opacity={0.5} />
        </mesh>
      </group> */}
      {/* <mesh position-y={-0.48} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[100, 100]} />
        <MeshReflectorMaterial
          blur={[100, 100]}
          resolution={2048}
          mixBlur={1}
          mixStrength={10}
          roughness={1}
          depthScale={1}
          opacity={0.5}
          transparent
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#333"
          metalness={0.5}
        />
      </mesh> */}
    
    </>
  );
};

