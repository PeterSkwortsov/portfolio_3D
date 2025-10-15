
"use client"


import { Suspense, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  MeshReflectorMaterial,
} from "@react-three/drei";
import * as THREE from "three";
import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import FlyingClouds from "./FlyingClouds";



function Model({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/shoe.gltf");
  return (
    <group ref={group} {...props} dispose={null} scale={2.5}>
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
      />
      <mesh
        geometry={nodes.shoe.geometry}
        material={materials.laces}
        material-color={props.customColors.setStripes}
      />
      <mesh
        geometry={nodes.shoe_1.geometry}
        material={materials.mesh}
        material-color={props.customColors.mesh}
      />
      <mesh
        geometry={nodes.shoe_2.geometry}
        material={materials.caps}
        material-color={props.customColors.soul}
      />
      <mesh
        geometry={nodes.shoe_3.geometry}
        material={materials.inner}
        material-color={props.customColors.soul}
      />
      <mesh
        geometry={nodes.shoe_4.geometry}
        material={materials.sole}
        material-color={props.customColors.soul}
      />
      <mesh
        geometry={nodes.shoe_5.geometry}
        material={materials.stripes}
        material-color={props.customColors.stripes}
      />
      <mesh
        geometry={nodes.shoe_6.geometry}
        material={materials.band}
        material-color={props.customColors.stripes}
      />
      <mesh
        geometry={nodes.shoe_7.geometry}
        material={materials.patch}
        material-color={props.customColors.patch}
      />
    </group>
  );
}
const Cross = () => {

const [mesh, setMesh] = useState("#ffffff");
const [stripes, setStripes] = useState("#ffffff");
const [soul, setSoul] = useState("#ffffff");
const [patch, setPatch] = useState("#ffffff");




  return (
    <div>
      <div>
        <div className="card text-black bg-amber-50">
          <div className="h-100">
            <Canvas>
              <fog attach="fog" args={["#87CEEB", 3, 15]} />

              {/* Отдельные летающие облака */}
              {/* <FlyingClouds count={30} radius={2} /> */}
              <color attach="background" args={["#87CEEB"]} />

              <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.3, 0]}>
                <planeGeometry args={[25, 25]} />
                <MeshReflectorMaterial
                  blur={[800, 800]}
                  resolution={524}
                  mixBlur={1}
                  mixStrength={80}
                  roughness={1}
                  depthScale={1.2}
                  minDepthThreshold={0.4}
                  maxDepthThreshold={1.4}
                  color="red"
                  metalness={0.5}
                />
              </mesh>
              {/* Фоновые звезды */}
              {/* Центральная 3D модель */}

              <Model
                customColors={{
                  mesh: mesh,
                  stripes: stripes,
                  soul: soul,
                  patch: patch,
                }}
              />
              <directionalLight position={[2, 10, 0]} intensity={3} />
              
            </Canvas>
          </div>
          <h6>Выбери цвет</h6>
          <div className=" text-black grid grid-cols-3 gap-1 p-2">
            <button
              className=" text-white bg-green-700 focus:ring-3  font-medium rounded-lg text-sm  py-2.5 me-2 mb-2 "
              type="button"
              id="mesh"
              name="mesh"
              onClick={() => {
                setMesh("PaleGreen");
              }}
            >
              PaleGreen
            </button>
            <button
              className="focus:outline-none text-white border-black bg-red-700  focus:ring-3 font-medium rounded-lg text-sm  py-2.5 me-2 mb-2 "
              type="button"
              id="mesh2"
              name="mesh2"
              onClick={() => {
                setMesh("IndianRed");
              }}
            >
              IndianRed
            </button>
            <button
              className="focus:outline-none text-black  focus:ring-3 font-medium rounded-lg text-sm  py-2.5 me-2 mb-2 bg-[#7FFFD4] "
              type="button"
              id="mesh3"
              name="mesh3"
              onClick={() => {
                setMesh("Aquamarine");
              }}
            >
              IndianRed
            </button>

            <button
              className="focus:outline-none focus:ring-3 text-black bg-[#FFE4B5] font-medium rounded-lg text-sm "
              type="button"
              id="stripes1"
              name="stripes1"
              onClick={() => {
                setStripes("Moccasin");
              }}
            >
              Moccasin
            </button>

            <button
              className="focus:outline-none focus:ring-3 text-black bg-[#ADFF2F] font-medium rounded-lg text-sm "
              type="button"
              id="stripes2"
              name="stripes2"
              onClick={() => {
                setStripes("GreenYellow");
              }}
            >
              GreenYellow
            </button>

            <button
              className="focus:outline-none focus:ring-3 text-black bg-[#00BFFF] font-medium rounded-lg text-sm "
              type="button"
              id="stripes3"
              name="stripes3"
              onClick={() => {
                setStripes("DeepSkyBlue");
              }}
            >
              DeepSkyBlue
            </button>

            <button
              className="focus:outline-none focus:ring-3 text-white bg-[#0000CD] font-medium rounded-lg text-sm "
              type="button"
              onClick={() => {
                setPatch("MediumBlue");
              }}
            >
              MediumBlue
            </button>
            <button
              className="focus:outline-none focus:ring-3 text-black bg-[#F5FFFA] font-medium rounded-lg text-sm "
              type="button"
              onClick={() => {
                setPatch("MintCream");
              }}
            >
              MintCream
            </button>
            <button
              className="focus:outline-none focus:ring-3 text-black bg-[#FFA500] font-medium rounded-lg text-sm "
              type="button"
              onClick={() => {
                setPatch("Orange");
              }}
            >
              Orange
            </button>

            <button
              className="focus:outline-none focus:ring-3 text-black bg-[#ffffff] font-medium rounded-lg text-sm "
              type="button"
              onClick={() => {
                setSoul("White");
              }}
            >
              White
            </button>

            <button
              className="focus:outline-none focus:ring-3 text-black bg-[#808080] font-medium rounded-lg text-sm "
              type="button"
              onClick={() => {
                setSoul("Gray");
              }}
            >
              Gray
            </button>

            <button
              className="focus:outline-none focus:ring-3 text-black bg-[#DA70D6] font-medium rounded-lg text-sm "
              type="button"
              id="soul"
              name="soul"
              value={soul}
              onClick={(e) => setSoul("Violet")}
            >
              Violet
            </button>
          </div>
          <button className="py-4  px-8 bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-extrabold rounded-2xl shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center  mb-6 mt-4 text-xl max-w-3xl">
            Купить Premium
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cross