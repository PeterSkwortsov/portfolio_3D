"use client";

import { useState } from "react";
import DownloadWordFile from "./DownloadWordFile";
import TechnologiesList from "./TechnologiesList";
import Link from "next/link";

export default function AboutMe() {
  const [activeTab, setActiveTab] = useState("about");

  const skills = {
    frontend: [
      "Three.js",
      "React",
      "Next.js",
      "R3F",
      "Drei",
      "GSAP",
      "GLSL",
      "Daysi UI",
      "Tailwind",
      "TypeScript",
    ],
    backend: ["Node.js", "Express", "MongoDB", "PostgreSQL"],
    tools: ["Git", "Figma"],
  };

  return (
    <section id="about" className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-16 rounded-2xl">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
            Обо мне
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 ">
          {/* Левая колонка - Фото и базовая информация */}
          <div className="space-y-8">
            {/* Аватар с декоративными элементами */}
            <div className="relative">
              <div className=" h-80 mx-auto">
                <div className="relative w-full h-full group">
                  {/* Основное фото */}
                  <div className="w-full h-full rounded-2xl overflow-hidden border-4 border-base-300 shadow-2xl">
                    <img
                      src="/foto.jpg"
                      alt="Петр Скворцов"
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Свечение при hover */}
                  {/* <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> */}
                </div>
              </div>
            </div>

            {/* Краткая информация */}
            <div className="rounded-2xl p-6 text-center text-white">
              <div className="grid grid-cols-1 gap-4 text-sm">
                <div>
                  <span className="font-bold text-lg">Город:</span>
                  <p>Нижний Новгород</p>
                </div>
                <div>
                  <span className="font-bold text-lg">Опыт:</span>
                  <p>3+ года</p>
                </div>
                <div>
                  <span className="font-bold text-lg">Образование:</span>
                  <p>
                    Московский университет имени С.Ю. Витте (PR и связи с
                    общественностью)
                  </p>
                  <p>Нижегородский Строительный Техникум (Архитектор)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Правая колонка - Детальная информация */}
          <div className="space-y-6 ">
            {/* Табы */}
            <div className="tabs tabs-boxed bg-base-200 p-1 rounded-2xl ">
              <button
                className={`tab tab-lg flex-1 text-md font-bold ${
                  activeTab === "about" ? "tab-active" : ""
                }`}
                onClick={() => setActiveTab("about")}
              >
                О себе
              </button>
              <button
                className={`tab tab-lg flex-1 font-bold ${
                  activeTab === "skills" ? "tab-active" : ""
                }`}
                onClick={() => setActiveTab("skills")}
              >
                Навыки
              </button>
              <button
                className={`tab tab-lg flex-1 font-bold${
                  activeTab === "contact" ? "tab-active font-bold" : ""
                }`}
                onClick={() => setActiveTab("contact")}
              >
                Контакты
              </button>
            </div>

            {/* Контент табов */}
            <div className="bg-base-200 rounded-2xl p-6">
              {activeTab === "about" && (
                <div className="space-y-4">
                  <p className="text-md leading-relaxed font-sans">
                    Мне хочется удивлять людей, создавать вещи, которые вызывают
                    эмоции. Именно поэтому я стал углубляться в возможности
                    Three.js и объемной графики.
                    <br /> Самостоятельно освоил фронтенд-разработку через
                    создание pet-проектов и изучение документации. Первый коммерческий проект реализовал через три месяца после начала обучения, затем создавал сайты для друзей и знакомых. 
                    <br /> Горю желанием присоединиться к команде, где смогу
                    быть полезным и развиваться профессионально.
                  </p>

                  <div className="flex gap-4 mt-6">
                    <DownloadWordFile />
                  </div>
                </div>
              )}

              {activeTab === "skills" && (
                <div className="">
                  <h4 className="font-semibold text-lg">Frontend</h4>

                  <div>
                    <div className="flex flex-wrap gap-2 justify-center">
                      <TechnologiesList />
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg mt-3">Инструменты</h4>
                    <div className="flex flex-wrap gap-2">
                      {skills.tools.map((skill) => (
                        <span
                          key={skill}
                          className="badge badge-accent badge-lg mt-2"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "contact" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 bg-base-100 rounded-lg">
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-base-content/80">
                        skwortsow.petia@yandex.ru
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-3 bg-base-100 rounded-lg">
                    <div>
                      <Link
                        href="https://github.com/PeterSkwortsov"
                        className="btn bg-black shadow-2xl  text-white rounded-2xl"
                      >
                        GitHub
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
