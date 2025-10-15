// components/ThreeDTextLink.jsx
"use client";

import { useRef, useState } from "react";
import { Text } from "@react-three/drei";
import { useRouter } from "next/navigation";

export function ThreeDTextLink({
  text = "ПЕРЕЙТИ ДАЛЕЕ",
  position = [0, 0, 0],
  fontSize = 0.5,
  href = "/next-page",
  color = "#ffffff",
  hoverColor = "#10b981",
  ...props
}) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const textRef = useRef();

  const handleClick = (e) => {
    e.stopPropagation();
    router.push(href);
  };

  return (
    <group
      position={position}
      onClick={handleClick}
      onPointerOver={() => {
        setIsHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setIsHovered(false);
        document.body.style.cursor = "default";
      }}
      {...props}
    >
      {/* Основной объемный текст */}
      <Text
        ref={textRef}
        fontSize={fontSize}
        color={isHovered ? hoverColor : color}
        anchorX="center"
        anchorY="middle"
        bevelEnabled
        bevelSize={0.02}
        bevelThickness={0.05}
        bevelSegments={8}
        curveSegments={24}
        letterSpacing={0.03}
      >
        {text}
        <meshPhysicalMaterial
          metalness={0.7}
          roughness={0.3}
          clearcoat={1}
          clearcoatRoughness={0.1}
          color={isHovered ? hoverColor : color}
          emissive={isHovered ? hoverColor : "#333333"}
          emissiveIntensity={isHovered ? 0.6 : 0.1}
        />
      </Text>

      {/* Свечение при наведении */}
      {isHovered && (
        <Text
          fontSize={fontSize * 1.02}
          color={hoverColor}
          anchorX="center"
          anchorY="middle"
          bevelEnabled
          bevelSize={0.01}
          bevelThickness={0.03}
        >
          {text}
          <meshBasicMaterial color={hoverColor} transparent opacity={0.3} />
        </Text>
      )}
    </group>
  );
}

// Альтернативная версия с анимацией
export function AnimatedThreeDTextLink({
  text = "ПЕРЕЙТИ ДАЛЕЕ",
  position = [0, 0, 0],
  fontSize = 0.5,
  href = "/next-page",
  color = "#ffffff",
  hoverColor = "#10b981",
  ...props
}) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const textRef = useRef();
  const timeRef = useRef(0);

  const handleClick = (e) => {
    e.stopPropagation();
    router.push(href);
  };

  // Анимация будет в useFrame если нужна

  return (
    <group
      position={position}
      onClick={handleClick}
      onPointerOver={() => {
        setIsHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setIsHovered(false);
        document.body.style.cursor = "default";
      }}
      {...props}
    >
      {/* Основной текст с глубиной */}
      <Text
        ref={textRef}
        fontSize={fontSize}
        color={isHovered ? hoverColor : color}
        anchorX="center"
        anchorY="middle"
        bevelEnabled
        bevelSize={0.03}
        bevelThickness={0.08}
        bevelSegments={12}
        curveSegments={32}
        letterSpacing={0.05}
        lineHeight={0.8}
      >
        {text}
        <meshPhysicalMaterial
          metalness={0.8}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.05}
          color={isHovered ? hoverColor : color}
          emissive={isHovered ? hoverColor : "#444444"}
          emissiveIntensity={isHovered ? 1 : 0.2}
          transmission={0.1}
          thickness={1}
        />
      </Text>

      {/* Подсветка сзади */}
      <Text
        position={[0, 0, -0.1]}
        fontSize={fontSize * 0.98}
        color={isHovered ? hoverColor : color}
        anchorX="center"
        anchorY="middle"
        bevelEnabled
        bevelSize={0.02}
        bevelThickness={0.04}
      >
        {text}
        <meshBasicMaterial
          color={isHovered ? hoverColor : color}
          transparent
          opacity={isHovered ? 0.4 : 0.1}
        />
      </Text>
    </group>
  );
}

// Версия с иконкой
export function IconThreeDTextLink({
  text = "ПЕРЕЙТИ ДАЛЕЕ",
  position = [0, 0, 0],
  fontSize = 0.4,
  href = "/next-page",
  color = "#ffffff",
  hoverColor = "#10b981",
  icon = "→",
  ...props
}) {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    router.push(href);
  };

  return (
    <group
      position={position}
      onClick={handleClick}
      onPointerOver={() => {
        setIsHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setIsHovered(false);
        document.body.style.cursor = "default";
      }}
      {...props}
    >
      {/* Текст */}
      <Text
        fontSize={fontSize}
        color={isHovered ? hoverColor : color}
        anchorX="center"
        anchorY="middle"
        position={[-0.2, 0, 0]}
        bevelEnabled
        bevelSize={0.015}
        bevelThickness={0.04}
        bevelSegments={6}
      >
        {text}
        <meshPhysicalMaterial
          metalness={0.6}
          roughness={0.4}
          color={isHovered ? hoverColor : color}
          emissive={isHovered ? hoverColor : "#333333"}
          emissiveIntensity={isHovered ? 0.5 : 0.1}
        />
      </Text>

      {/* Иконка */}
      <Text
        fontSize={fontSize * 1.2}
        color={isHovered ? hoverColor : color}
        anchorX="center"
        anchorY="middle"
        position={[text.length * 0.12, 0, 0]}
        bevelEnabled
        bevelSize={0.02}
        bevelThickness={0.05}
      >
        {icon}
        <meshPhysicalMaterial
          metalness={0.8}
          roughness={0.2}
          color={isHovered ? hoverColor : color}
          emissive={isHovered ? hoverColor : "#444444"}
          emissiveIntensity={isHovered ? 0.8 : 0.2}
        />
      </Text>

      {/* Анимация иконки при наведении */}
      {isHovered && (
        <Text
          fontSize={fontSize * 1.3}
          color={hoverColor}
          anchorX="center"
          anchorY="middle"
          position={[text.length * 0.12 + 0.1, 0, -0.05]}
          opacity={0.3}
        >
          {icon}
          <meshBasicMaterial color={hoverColor} transparent opacity={0.3} />
        </Text>
      )}
    </group>
  );
}
