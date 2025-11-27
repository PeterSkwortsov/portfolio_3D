'use client';

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import global from '../app/globals.css'
import { useEffect, useState } from "react";

export default function Ships() {

 const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);


  // Данные проекта (в реальном приложении можно брать из API)
  const projectData = {
    title: "Интерактивный план стадиона",
    description: "Лендинг сети детских аттракционов в Нижнем Новгороде",
    imageUrl: "/stadium.png",
    githubUrl: "https://github.com/PeterSkwortsov/my-stadium",
    overview:
      "Мне было интересно узнать как создается интерактивная карта выбора мест билетов в кино, тетаре или на стадионе.",
    description2:
      "За основу я взял нижегородский футбольный стадион, перерисовал ряды в Figma. С помощью Inkscape я обрисовал контуры нескольких рядов, полученные данные разместил в data-атрибутах. Добавил CSS при наведении. Добавил библиотеку leader-line, чтобы сделать линии и подсказки. Вставил цены для всплывающих подсказок и создал линии, соединяющие здания с информацией на странице.",

    technologies: ["SVG", "Inkscape", "JavaScript", "leader - line"],
    results: [
      "Соответствие страницы основным рекомендациям поисковой оптимизации - 90/100 баллов",
      "Total Blocking Time - 0 мс",
      "Cumulative Layout Shift - 0,067",
      "First Contentful Paint - 1.3 мс",
    ],
    liveDemoUrl: "https://peterskwortsov.github.io/my-stadium/",
    status: "Завершен",
    duration: "1 неделю",
  };

  const {
    title,
    description,
    imageUrl,
    githubUrl,
    overview,
    description2,
    technologies,
    results,
    liveDemoUrl,
    status,
    duration,
  } = projectData;

  return (
    <>
      <Head>
        <title>{title} | Проект</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Основной контент */}
      <div className="min-h-screen bg-gradient-to-br from-slate-50 bg-green-800">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Хедер проекта */}
          <Link href="/home-page/#7">
            <button className="group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300 inline-flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105 mb-5">
              <svg
                className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span className="relative">
                Назад
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
              </span>
            </button>
          </Link>
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              {status} за {duration}
            </div>

            <h1
              className={`mt-6 mb-4 transition-all duration-1000 delay-500 ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
              }`}
            >
              <span className="text-3xl md:text-5xl lg:text-7xl font-black">
                <span className="bg-gradient-to-r from-blue-400 via-green-800 to-green-500 bg-clip-text text-transparent animate-gradient bg-300%">
                  {title}
                </span>
              </span>
            </h1>

          
          </header>

          {/* Карточка проекта */}
          <div
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border
           border-white/60 overflow-hidden"
          >
            {/* Hero изображение */}
            <div className="relative h-80 md:h-96 w-full">
              <Image
                src={imageUrl}
                alt={title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Контент */}
            <div className="p-8 md:p-12">
              {/* Кнопки действий */}
              <div className="flex flex-wrap gap-4 mb-12">
                <Link
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-gray-900 text-white px-8 py-4 rounded-2xl font-semibold hover:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center gap-3"
                >
                  <svg
                    className="w-6 h-6 group-hover:scale-110 transition-transform"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  Исходный код
                </Link>

                {liveDemoUrl && (
                  <Link
                    href={liveDemoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-purple-700"
                  >
                    🚀 Посмотреть демо
                  </Link>
                )}
              </div>

              {/* Сетка с информацией */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Левая колонка */}
                <div className="space-y-12">
                  {/* Обзор проекта */}
                  <section>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        Обзор проекта
                      </h2>
                    </div>
                    <p className="text-gray-900 leading-relaxed text-lg">
                      {overview}
                    </p>
                    <p className="text-gray-700 leading-relaxed text-md mt-2">
                      {description2}
                    </p>
                  </section>
                </div>

                {/* Правая колонка */}
                <div className="space-y-12">
                  {/* Технологии */}
                  <section>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-2 h-8 bg-purple-600 rounded-full"></div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        Технологии
                      </h2>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800 px-4 py-2 rounded-xl font-medium border border-purple-200/50 hover:scale-105 transition-transform cursor-default"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </section>
                  <p className="text-gray-700 leading-relaxed text-md mt-2 max-w-90">Это был MVP проект, я не продолжил его развивать, мне важно было понять принцип.<br/>
                  Активны блоки с C006 по C009
                  </p>
                </div>
              </div>

             
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
