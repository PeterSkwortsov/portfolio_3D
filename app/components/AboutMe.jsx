// components/AboutMe.jsx

import { useState } from "react";
import DownloadWordFile from "./DownloadWordFile";
import TechnologiesList from "./TechnologiesList";

export default function AboutMe() {
  const [activeTab, setActiveTab] = useState("about");

  const skills = {
    frontend: ["Three.js", "React", "Next.js", "R3F", "Drei", "GSAP", "GLSL", "Daysi UI", "Tailwind", "TypeScript"],
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
            <div className="bg-base-200 rounded-2xl p-6 text-center">
              <div className="grid grid-cols-1 gap-4 text-sm">
                <div>
                  <span className="font-bold text-lg">🏢 Город:</span>
                  <p>Нижний Новгород</p>
                </div>
                <div>
                  <span className="font-bold text-lg">💼 Опыт:</span>
                  <p>3+ года</p>
                </div>
                <div>
                  <span className="font-bold text-lg">🎓 Образование:</span>
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
            <div className="tabs tabs-boxed bg-base-200 p-1 rounded-2xl">
              <button
                className={`tab tab-lg flex-1 text-md ${
                  activeTab === "about" ? "tab-active" : ""
                }`}
                onClick={() => setActiveTab("about")}
              >
                О себе
              </button>
              <button
                className={`tab tab-lg flex-1 ${
                  activeTab === "skills" ? "tab-active" : ""
                }`}
                onClick={() => setActiveTab("skills")}
              >
                Навыки
              </button>
              <button
                className={`tab tab-lg flex-1 ${
                  activeTab === "contact" ? "tab-active" : ""
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
                  <p className="text-lg leading-relaxed">
                    Стремлюсь к простым решениям во всех сферах проектирования.
                    Мне интересно создавать элементы на сайте, с которыми
                    пользователю будет интересно взаимодействовать, они должны
                    вызывать эмоции. <br></br>
                    <br></br>
                    Перед собой я всегда ставлю задачу понять суть проблемы »
                    поставить цель проекта » решить ее творчески, не усложнять.
                    <br></br>
                    Всё, что я делаю, — это творчество, а не программирование,
                    мне ближе такой подход.
                  </p>
                  <p className="text-lg leading-relaxed font-bold text-primary mt-2">
                    «Хорошо могут летать только красивые самолёты»
                  </p>
                  <span className="text-sm">
                    авиаконструктор Андрей Туполев
                  </span>

                  <div className="flex gap-4 mt-6">
                    <DownloadWordFile />
                  </div>
                </div>
              )}

              {activeTab === "skills" && (
                <div className="">
                  <h4 className="font-semibold text-lg">Frontend</h4>

                  <div>
                    <div className="flex flex-wrap gap-2">
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
                    <div className="w-10 h-10 bg-primary text-primary-content rounded-full flex items-center justify-center">
                      📧
                    </div>
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-base-content/80">
                        petr.skvorcov@example.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-3 bg-base-100 rounded-lg">
                    <div className="w-10 h-10 bg-accent text-accent-content rounded-full flex items-center justify-center">
                      🐙
                    </div>
                    <div>
                      <p className="font-semibold">GitHub</p>
                      <p className="text-base-content/80">
                        github.com/petr-skvorcov
                      </p>
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
