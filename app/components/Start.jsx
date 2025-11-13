import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Suspense, useRef } from "react";
import { Experience } from "./Experience";
import { UI } from "./UI";
import { OrbitControls } from "@react-three/drei";
import { useState, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";
import Gears from "./Gears";

function CameraController() {
  const { camera } = useThree();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      camera.fov = mobile ? 110 : 65;
      camera.updateProjectionMatrix();
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [camera]);

  return null;
}

function App() {
  

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <Canvas camera={{ position: [0, 0, 8]}}>
        <CameraController />

        <color attach="background" args={["#171720"]} />
        <fog attach="fog" args={["#171720", 10, 30]} />
        <Suspense>
          <Experience />
        </Suspense>
        <EffectComposer>
          <Bloom mipmapBlur intensity={0.7} />
        </EffectComposer>
      </Canvas>
      <UI />
      <Gears />
    </div>
  );
}

export default App;
