'use client'


import React from 'react'
import { useGLTF } from '@react-three/drei'

export default function Kitchen(props) {
  const { nodes, materials } = useGLTF('/kitchen.glb')
  return (
    <group {...props} dispose={null} scale={0.6}>
      <ambientLight intensity={2} />
      <directionalLight position={[0, 0, 7]} intensity={2} />
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh geometry={nodes.Material2.geometry} material={materials.material_1} />
        <mesh geometry={nodes.Material2_1.geometry} material={materials.material_1} />
        <lineSegments geometry={nodes.Material4.geometry} material={materials.edge_color646464255} />
        <lineSegments geometry={nodes.Material2_2.geometry} material={materials.edge_color646464255} />
        <mesh geometry={nodes.Material2_3.geometry} material={materials.auto} />
        <mesh geometry={nodes.Material3.geometry} material={materials.auto_1} />
        <mesh geometry={nodes.Material3_1.geometry} material={materials.auto_2} />
        <mesh geometry={nodes.Material3_2.geometry} material={materials.auto_3} />
        <mesh geometry={nodes.Material3_3.geometry} material={materials.auto_6} />
        <mesh geometry={nodes.Material3_4.geometry} material={materials.auto_4} />
        <mesh geometry={nodes.Material3_5.geometry} material={materials.auto_5} />
        <mesh geometry={nodes.Material3_6.geometry} material={materials.auto_7} />
        <mesh geometry={nodes.Material3_7.geometry} material={materials.auto_8} />
        <mesh geometry={nodes.Material3_8.geometry} material={materials.auto_9} />
        <mesh geometry={nodes.Material3_9.geometry} material={materials.auto_11} />
        <mesh geometry={nodes.Material3_10.geometry} material={materials.auto_10} />
        <mesh geometry={nodes.Material3_11.geometry} material={materials.auto_12} />
        <mesh geometry={nodes.Material3_12.geometry} material={materials.auto_14} />
        <mesh geometry={nodes.Material3_13.geometry} material={materials.auto_16} />
        <mesh geometry={nodes.Material3_14.geometry} material={materials.auto_18} />
        <mesh geometry={nodes.Material3_15.geometry} material={materials.auto_20} />
        <mesh geometry={nodes.Material3_16.geometry} material={materials.auto_23} />
        <mesh geometry={nodes.Material3_17.geometry} material={materials.auto_22} />
        <mesh geometry={nodes.Material3_18.geometry} material={materials.auto_24} />
        <mesh geometry={nodes.Material3_19.geometry} material={materials.auto_25} />
        <mesh geometry={nodes.Material3_20.geometry} material={materials.auto_27} />
        <mesh geometry={nodes.Material3_21.geometry} material={materials.auto_28} />
        <mesh geometry={nodes.Material3_22.geometry} material={materials.auto_29} />
        <mesh geometry={nodes.Material3_23.geometry} material={materials.auto_30} />
        <mesh geometry={nodes.Material3_24.geometry} material={materials.auto_33} />
        <mesh geometry={nodes.Material3_25.geometry} material={materials.auto_34} />
        <mesh geometry={nodes.Material3_26.geometry} material={materials.auto_35} />
        <mesh geometry={nodes.Material3_27.geometry} material={materials.auto_38} />
        <mesh geometry={nodes.Material3_28.geometry} material={materials.auto_37} />
        <mesh geometry={nodes.Material3_29.geometry} material={materials.auto_39} />
        <mesh geometry={nodes.Material3_30.geometry} material={materials.auto_40} />
        <mesh geometry={nodes.Material3_31.geometry} material={materials.auto_41} />
        <mesh geometry={nodes.Material3_32.geometry} material={materials.auto_43} />
        <mesh geometry={nodes.Material3_33.geometry} material={materials.auto_45} />
        <mesh geometry={nodes.Material3_34.geometry} material={materials.auto_47} />
        <mesh geometry={nodes.Material3_35.geometry} material={materials.auto_48} />
        <mesh geometry={nodes.Material3_36.geometry} material={materials.auto_49} />
        <mesh geometry={nodes.Material3_37.geometry} material={materials.auto_51} />
        <mesh geometry={nodes.Material3_38.geometry} material={materials.auto_54} />
        <mesh geometry={nodes.Material3_39.geometry} material={materials.auto_55} />
      </group>
    </group>
  )
}

useGLTF.preload('/kitchen.glb')
