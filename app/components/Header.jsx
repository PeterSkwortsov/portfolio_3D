'use client';

import { useEffect, useState } from 'react';

export default function Header() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Анимированный фон */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_var(--tw-gradient-stops))] from-purple-600/20 via-transparent to-transparent animate-pulse"></div>

      {/* Основной контент */}
      <div className="text-center relative z-10">
        {/* Верхний декоративный текст */}
        <div
          className={`transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <span className="text-lg md:text-xl text-purple-300/80 font-light tracking-widest">
            ДОБРО ПОЖАЛОВАТЬ В МОЕ ПОРТФОЛИО
          </span>
        </div>

        {/* Главное имя */}
        <h1
          className={`mt-6 mb-4 transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
        >
          <span className="text-5xl md:text-5xl lg:text-7xl font-black">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient bg-300%">
              ПЕТР
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient bg-300%">
              СКВОРЦОВ
            </span>
          </span>
        </h1>

        {/* Декоративная линия */}
        <div
          className={`w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6 rounded-full transition-all duration-1000 delay-700 ${
            isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
          }`}
        ></div>

        {/* Должность/специализация */}
        <div
          className={`transition-all duration-1000 delay-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-xl md:text-2xl text-gray-300 font-light">
            Frontend-developer с уклоном на 3D
          </p>
        </div>

        {/* CTA кнопка */}
        <div
          className={`mt-8 transition-all duration-1000 delay-1200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <button className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
            <span className="relative z-10">Исследовать работы</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          </button>
        </div>
      </div>

      {/* Декоративные элементы */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-purple-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-purple-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient {
          animation: gradient 6s ease infinite;
          background-size: 300% 300%;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .bg-300% {
          background-size: 300% 300%;
        }
      `}</style>
    </div>
  );
}