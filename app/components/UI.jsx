import { useState } from "react";
import { useRouter } from "next/navigation";

export const UI = () => {
   const router = useRouter();
   const [isHovered, setIsHovered] = useState(false);

   const handleClick = (e) => {
     e.stopPropagation();
     router.push("./home-page");
   };
  return (
    <div className="fixed inset-0 pointer-events-none">
      <section
        className={`flex w-full h-full flex-col items-center justify-center 
      duration-500
      `}
      >
        <div className="h-[66%]"></div>
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
          className="pointer-events-auto py-4 px-8 bg-orange-400 text-white font-black rounded-full hover:bg-orange-600 cursor-pointer transition-colors duration-1000"
        >
          ENTER
        </button>
      </section>
    </div>
  );
};
