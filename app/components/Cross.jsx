
"use client";


import React from 'react'
import { Suspense, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function Model({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/shoe.gltf");
  return (
    <group ref={group} {...props} dispose={null} scale={3}>
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
        material-color={props.customColors.soul}
      />
    </group>
  );
}
const Cross = () => {

const [mesh, setMesh] = useState("#ffffff");
const [stripes, setStripes] = useState("#ffffff");
const [soul, setSoul] = useState("#ffffff");


  return (
    <div>
      <div>
        <div className="card text-black bg-amber-50">
          <div className="h-110">
            <Canvas>
              <Suspense fallback={null}>
                <ambientLight intensity={2} />

                <Model
                  customColors={{ mesh: mesh, stripes: stripes, soul: soul }}
                />
                <OrbitControls
                  enablePan={true}
                  enableZoom={true}
                  enableRotate={true}
                  autoRotate
                />
              </Suspense>
            </Canvas>
          </div>
          <h2>Выбери цвет</h2>
          <div className="colors text-black grid grid-cols-2">
            <div>
              <input
                type="color"
                id="mesh"
                name="mesh"
                value={mesh}
                onChange={(e) => setMesh(e.target.value)}
              />
              <label htmlFor="mesh">Main</label>
            </div>
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => {
                setMesh("red");
              }}
            >
              Красный
            </button>

            <div>
              <button
                className="btn btn-orange"
                type="color"
                id="stripes"
                name="stripes"
                value={stripes}
                onClick={() => {
                  setStripes("orange");
                }}
              />
              <label htmlFor="stripes">Полоски</label>
            </div>
            <div>
              <button
                className="btn btn-error"
                type="button"
                id="soul"
                name="soul"
                value={soul}
                onClick={(e) => setSoul('yellow')}
              />
              <label htmlFor="soul">Soul</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cross