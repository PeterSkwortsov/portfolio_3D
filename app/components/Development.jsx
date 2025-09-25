import React, { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Atom from "./Atom";
import styled from "styled-components";
import { useRef, useState, useMemo } from "react";


export function InteractiveModel() {
  const groupRef = useRef()
  const pointRef = useRef()
  const [activePoint, setActivePoint] = useState(null)
  const [showText, setShowText] = useState(false)

  // Позиции точек на модели
  const hotSpots = useMemo(() => [
    { position: [1.2, 0.5, 0], title: "Двигатель", description: "Мощность: 250 л.с." },
    { position: [-1.2, 0.8, 0], title: "Кабина", description: "Вместимость: 5 человек" },
    { position: [0, 1.5, 0.5], title: "Крыша", description: "Солнечная панель" }
  ], [])

  // Анимация пульсации
  useFrame((state, delta) => {
    if (pointRef.current) {
      // Пульсация размера
      const scale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.2
      pointRef.current.scale.set(scale, scale, scale)
      
      // Пульсация цвета
      const intensity = 0.5 + Math.sin(state.clock.elapsedTime * 4) * 0.3
      pointRef.current.material.emissiveIntensity = intensity
    }
  })
}


  const handlePointClick = (point, event) => {
    event.stopPropagation();
    setActivePoint(point);
    setShowText(true);
  };

  const handleCloseText = () => {
    setShowText(false);
    setActivePoint(null);
  };


const Desc = styled.div`
  width: 200px;
  height: 100px;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  position: absolute;
  top: 120px;
  right: 150px;

  @media only screen and (max-width: 768px) {
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
`;

const Development = () => {
  return (
    <>
      <Canvas camera={{ position: [0, 0, 10] }}>
        <Suspense fallback={null}>
          <Atom />
          <OrbitControls enableZoom={false} autoRotate />
        </Suspense>
      </Canvas>
      <Desc>
        Это модель атома. Нажмите на точки, чтобы узнать больше.
      </Desc>
    </>
  );
};

export default Development;
