import { useState } from "react";
import { Center, OrbitControls, Scroll, ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Pirates from "../pitat/Pirate";

export default function CreativeApproachAnimated() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="w-full flex items-center justify-center p-8">
      <div className="max-w-4xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
            Творческий подход
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto rounded-full"></div>
        </div>

        {/* Основной контент */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Текстовая часть */}
          <div className=" p-3">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">🎨</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Создание с нуля
                </h3>
                <p className="text-gray-200 leading-relaxed">
                  Получаю настоящее удовольствие, когда создаю что-то с чистого
                  листа. Каждый проект - это возможность воплотить уникальные
                  идеи и создать нечто особенное.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">⚡</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Полный контроль
                </h3>
                <p className="text-gray-200 leading-relaxed">
                  Возможность влиять на каждый аспект проекта - от концепции до
                  реализации. Это даёт свободу для творчества и инновационных
                  решений.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">🌟</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Уникальный результат
                </h3>
                <p className="text-gray-200 leading-relaxed">
                  Каждый созданный проект становится отражением моего подхода -
                  внимательного, вдумчивого и ориентированного на качество.
                </p>
              </div>
            </div>
          </div>

          {/* Визуальная часть */}
          <div
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div
              className={`
              relative bg-white rounded-2xl p-8  transform transition-all duration-700
              ${isHovered ? "rotate-5   " : "rotate-0 "}
            `}
            >
              {/* Декоративные элементы */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-yellow-400 rounded-full opacity-70"></div>
              <div className="absolute -bottom-4 -right-1 w-12 h-12 bg-pink-400 rounded-full opacity-60"></div>
              <div className="absolute top-1/2 -right-2 w-6 h-6 bg-green-400 rounded-full opacity-80 transform -translate-y-1/2"></div>

              <div className="relative z-10 h-80">
                <Canvas shadows camera={{ fov: 30 }}>
                  <color attach="background" args={["#61b6ff"]} />
                  <directionalLight position={[1, 2, 3]} intensity={4} />
                  <ambientLight intensity={0.5} />
                  <Center>
                    <Pirates />
                    <OrbitControls autoRotate autoRotateSpeed={3} enableZoom={false} enablePan={false} enableRotate={false} />
                  </Center>
                </Canvas>
              </div>
            </div>

            {/* Фоновая текстура */}
            <div className="absolute p-3 inset-0 bg-gradient-to-br from-purple-200/20 to-blue-200/20 rounded-2xl -z-10 transform rotate-6 scale-105"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
