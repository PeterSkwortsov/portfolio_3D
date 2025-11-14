// components/ModelWithGUI.js
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import CustomSheaderMaterial from "three-custom-shader-material/vanilla";
import '../styles/lil-gui-overrides.css';


const uniforms = {
  uSliceStart: new THREE.Uniform(1.75),
  uSliceArc: new THREE.Uniform(1.25),
};
const particlesVertexShader = `
  varying vec3 vPosition;

void main() {
vPosition = csm_Position.xyz;

}
`;

const particlesFragmentShader = `
varying vec3 vPosition;

uniform float uSliceArc;
uniform float uSliceStart;

void main()
{
    

    float angale = atan(vPosition.y, vPosition.x);
    angale -= uSliceStart;
    angale = mod(angale, PI2);

    if(angale > 0.0 && angale < uSliceArc)
    discard;

    float csm_Slice;
 
}
`;



const patchMap = {
  csm_Slice: {
    "#include <colorspace_fragment>": `
    #include <colorspace_fragment>

    if(!gl_FrontFacing)
    gl_FragColor = vec4(0.75, 0.5, 0.3, 1.0);
    `,
  },
};

const material = new CustomSheaderMaterial({
  // CSM, для пользовательского шейдера
  baseMaterial: THREE.MeshPhysicalMaterial,
  vertexShader: `varying vec3 vPosition;

void main() {
vPosition = csm_Position.xyz;

}


`,
  fragmentShader: `
varying vec3 vPosition;

uniform float uSliceArc;
uniform float uSliceStart;

void main()
{
    

    float angale = atan(vPosition.y, vPosition.x);
    angale -= uSliceStart;
    angale = mod(angale, PI2);

    if(angale > 0.0 && angale < uSliceArc)
    discard;

    float csm_Slice;
 
}`,
  uniforms: uniforms,

  //свойства материала
  metalness: 0,
  roughness: 0.5,
  color: "#ffffff",
  transmission: 0,
  ior: 1.5,
  thickness: 1.5,
  transparent: true,
  wireframe: true,
});


const slicedMaterial = new CustomSheaderMaterial({
  baseMaterial: THREE.MeshStandardMaterial,
  vertexShader: particlesVertexShader,
  fragmentShader: particlesFragmentShader,
  uniforms: uniforms,
  patchMap: patchMap,
  metalness: 0.5,
  roughness: 0.25,
  envMapIntensity: 0.5,
  color: "#858080",
  side: THREE.DoubleSide,
});

const slicedDephMaterial = new CustomSheaderMaterial({
  // материал для обновления тени
  baseMaterial: THREE.MeshDepthMaterial,
  vertexShader: particlesVertexShader,
  fragmentShader: particlesFragmentShader,
  uniforms: uniforms,
  patchMap: patchMap,

  depthPacking: THREE.RGBADepthPacking,
});



export default function ModelWithGUI() {
  const [guiContainer, setGuiContainer] = useState(null);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#1a1a2e",
        
      }}
    >
      {/* Контейнер для GUI */}
      <div
        ref={setGuiContainer}
        style={{
          
          zIndex: 1000,
        }}
      />

      <Canvas camera={{ position: [3, 2, 5], fov: 70 }}>
        {/* <directionalLight position={[0, 0, 5]} intensity={2} /> */}
        <ModelScene guiContainer={guiContainer} />
        
        <OrbitControls />
      </Canvas>
    </div>
  );
}

function ModelScene({ guiContainer }) {
  const modelRef = useRef();
  const [params, setParams] = useState({
    rotationSpeed: 0.1,
    scale: 1,
    positionX: 0,
    positionY: 0,
    positionZ: 0,
    color: "#4ecdc4",
    metalness: 0.5,
    roughness: 0.5,
    wireframe: false,
    bounce: false,
    bounceHeight: 0.5,
    bounceSpeed: 1,
  });

  // Загрузка модели из public папки
  const { scene, error } = useGLTF("/gears.glb");

  // Обработка ошибок загрузки
  if (error) {
    return (
      <Html center>
        <div
          style={{
            color: "white",
            background: "rgba(255,0,0,0.8)",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          Ошибка загрузки модели! 
        </div>
      </Html>
    );
  }

  // Инициализация GUI
  useEffect(() => {
    if (!guiContainer) return;

    let guiInstance = null;

    import("lil-gui").then(({ GUI }) => {
      guiInstance = new GUI({
        width: 200,
        title: "Настройка модели",
            position: "absolute"
      });

      // Добавляем GUI в переданный контейнер
      guiContainer.appendChild(guiInstance.domElement);



      // Группа: Трансформации
      const transformFolder = guiInstance.addFolder("Трансформация");
      transformFolder
        .add(params, "rotationSpeed", 0, 2, 0.1)
        .name("Rotation Speed");
      transformFolder.open();

      transformFolder
        .add(uniforms.uSliceStart, "value", -Math.PI, Math.PI, 0.001)
        .name("uSliceStart");
      transformFolder
        .add(uniforms.uSliceArc, "value", 0, Math.PI * 2, 0.001)
        .name("uSliceArc");

      // Группа: Материал
      const materialFolder = guiInstance.addFolder("Material");
      materialFolder.addColor(params, "color").name("Color");
      materialFolder.add(params, "metalness", 0, 1, 0.1).name("Metalness");
      materialFolder.add(params, "roughness", 0, 1, 0.1).name("Roughness");
      materialFolder.add(params, "wireframe").name("Wireframe");
      materialFolder.open();
const patchMap = {
  csm_Slice: {
    "#include <colorspace_fragment>": `
    #include <colorspace_fragment>

    if(!gl_FrontFacing)
    gl_FragColor = vec4(0.75, 0.5, 0.3, 1.0);
    `,
  },
};
      // Группа: Анимация
      const animationFolder = guiInstance.addFolder("Animation");
      animationFolder.add(params, "bounce").name("Bounce");
      animationFolder
        .add(params, "bounceHeight", 0, 2, 0.1)
        .name("Bounce Height");
      animationFolder
        .add(params, "bounceSpeed", 0.1, 3, 0.1)
        .name("Bounce Speed");
      animationFolder.open();

      guiInstance.onChange(() => {
        setParams({ ...params });
      });
    });

    return () => {
      if (guiInstance && guiContainer) {
        guiContainer.removeChild(guiInstance.domElement);
        guiInstance.destroy();
      }
    };
  }, [guiContainer]);

  useFrame((state) => {
    if (modelRef.current) {
      const time = state.clock.elapsedTime;

      modelRef.current.rotation.y = time * params.rotationSpeed;
   

      if (params.bounce) {
        modelRef.current.position.y =
          params.positionY +
          Math.sin(time * params.bounceSpeed) * params.bounceHeight;
      } else {
        modelRef.current.position.y = params.positionY;
      }
    }
  });

  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.traverse((child) => {
        if (child.isMesh) {
          child.material = slicedMaterial;
          child.customDepthMaterial = slicedDephMaterial;

          child.material.color = new THREE.Color(params.color);
          child.material.metalness = params.metalness;
          child.material.roughness = params.roughness;
          child.material.wireframe = params.wireframe;
          child.material.needsUpdate = true;
        } else {
        child.material = material
      }

    
    
      });
    }
  }, [params.color, params.metalness, params.roughness, params.wireframe, slicedMaterial, slicedDephMaterial]);

  return (
    <>
      {/* <ambientLight intensity={0.6} /> */}
      <directionalLight
        position={[6.25, 3, 4]}
        castShadow={true}
        color={"ffffff"}
        intensity={4}
      />
      {/* <pointLight position={[-5, 3, -5]} intensity={0.5} color="#4fc3f7" /> */}

      <primitive ref={modelRef} object={scene} scale={1} />
    </>
  );
}
