import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Suspense } from "react";
import { Experience } from "./Experience";
import { UI } from "./UI";
import { OrbitControls } from "@react-three/drei";
import { useState, useEffect } from "react";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  return isMobile;
}

function App() {
    const isMobile = useIsMobile();

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <Canvas camera={{ position: [0, 0, 8], fov: isMobile ? 109 : 60 
 }}>
        <color attach="background" args={["#171720"]} />
        <fog attach="fog" args={["#171720", 10, 30]} />
        <Suspense>
          <Experience />
        </Suspense>
        <EffectComposer>
          <Bloom mipmapBlur intensity={0.5} />
        </EffectComposer>
   
      </Canvas>
      <UI />
    </div>
  );
}

export default App;
