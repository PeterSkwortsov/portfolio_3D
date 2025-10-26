'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export const UI = () => {
   const router = useRouter();
   const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);


useEffect(() => {
  const timer = setTimeout(() => {
    setIsVisible(true);
  }, 2000); // 2 секунды

  // Очистка таймера при размонтировании компонента
  return () => clearTimeout(timer);
}, []);

   const handleClick = (e) => {
     e.stopPropagation();
     router.push("./home-page");
   };
  return (
    <div className="fixed inset-0 pointer-events-none">
      <section
        className={`flex w-full h-full flex-col items-center justify-center 
      opacity-0 ${
        isVisible ? "opacity-100" : ""
      } transition-opacity duration-1500
      `}
      >
        <div className="h-[66%]"></div>
        {isVisible && (
          <button
            onClick={handleClick}
            onPointerOver={() => {
              setIsHovered(true);
              document.body.style.cursor = "pointer";
            }}
            onPointerOut={() => {
              setIsHovered(false);
              document.body.style.cursor = "default";
            }}
            className="pointer-events-auto py-4 px-8 bg-orange-400 text-white font-black rounded-full hover:bg-orange-900 cursor-pointer transition-colors duration-3000"
          >
            ENTER
          </button>
        )}
      </section>
    </div>
  );
};
