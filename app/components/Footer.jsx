import React from 'react'
import Image from 'next/image';
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

const Footer = () => {

const [mesh, setMesh] = useState("#ffffff");
const [stripes, setStripes] = useState("#ffffff");
const [soul, setSoul] = useState("#ffffff");


  return (
    <footer className="bg-black text-white py-4 mt-24">
      <div className="container mx-auto">
        <div className="flex gap-2 justify-center mt-2">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <a href="https://vk.com/vika.borsch">
                <Image
                  src="/vk.svg"
                  width={200}
                  height={100}
                  alt="Picture of the author"
                  style={{ width: "100%" }}
                />
              </a>
            </div>
          </div>
          <div className="avatar avatar-online">
            <div className="w-10 rounded-full">
              <a href="https://t.me/vika_borsch99">
                <Image
                  src="/tg2.svg"
                  width={200}
                  height={100}
                  alt="Picture of the author"
                  style={{ width: "100%" }}
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="App">
        <div className="wrapper">
          <div className="card">
            <div className="product-canvas">
              <Canvas>
                <Suspense fallback={null}>
                  <ambientLight intensity={2}/>
                  
                  <Model
                    customColors={{ mesh: mesh, stripes: stripes, soul: soul }}
                  />
                  <OrbitControls
                    enablePan={true}
                    enableZoom={true}
                    enableRotate={true}
                  />
                </Suspense>
              </Canvas>
            </div>
            <h2>Color chooser</h2>
            <div className="colors">
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
              <button className='btn btn-primary'
              type='button'
              onClick={() => {
                setMesh('red');
              
              }}
              >
                Click
              </button>

              <div>
                <input
                  type="color"
                  id="stripes"
                  name="stripes"
                  value={stripes}
                  onChange={(e) => setStripes(e.target.value)}
                />
                <label htmlFor="stripes">Stripes</label>
              </div>
              <div>
                <input
                  type="color"
                  id="soul"
                  name="soul"
                  value={soul}
                  onChange={(e) => setSoul(e.target.value)}
                />
                <label htmlFor="soul">Soul</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer