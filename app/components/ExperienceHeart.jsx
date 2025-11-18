import {
  Billboard,
  Float,
  OrbitControls,
  useTexture,
} from "@react-three/drei";
import { useControls } from "leva";
import { Heart } from "./Heart";
import { Canvas } from "@react-three/fiber";

export default function Experience () {
  const { item } = useControls({
    item: {
      value: "heart",
      options: ["heart"],
    },
  });

  return (
    <>
      <OrbitControls enableZoom={false} />
      <Float floatIntensity={2} speed={3}>
        <Heart scale={0.25} visible={item === "heart"} />

       
      </Float>
    </>
  );
};
