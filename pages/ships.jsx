import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import global from '../app/globals.css'
export default function Ships() {
  // Данные проекта (в реальном приложении можно брать из API)
  const projectData = {
    title: "E-Commerce Platform",
    description: "Современная платформа для онлайн-продаж с AI-рекомендациями",
    imageUrl: "/images/project-cover.jpg",
    githubUrl: "https://github.com/username/ecommerce-platform",
    overview:
      "Полнофункциональный интернет-магазин с системой рекомендаций на основе искусственного интеллекта, адаптивным дизайном и молниеносной производительностью.",
    goals: [
      "Создать интуитивно понятный пользовательский интерфейс",
      "Внедрить AI-систему рекомендаций товаров",
      "Обеспечить скорость загрузки менее 2 секунд",
      "Реализовать безопасную систему платежей",
    ],
    technologies: [
      "Next.js 14",
      "React 18",
      "Tailwind CSS",
      "Node.js",
      "MongoDB",
      "Stripe",
      "OpenAI API",
      "Vercel",
    ],
    results: [
      "Увеличение конверсии на 35%",
      "95+ баллов в Google PageSpeed",
      "Снижение времени загрузки на 60%",
      "10,000+ пользователей за первый месяц",
    ],
    liveDemoUrl: "https://ecommerce-demo.vercel.app",
    status: "Завершен",
    duration: "4 месяца",
  };

  const {
    title,
    description,
    imageUrl,
    githubUrl,
    overview,
    goals,
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 bg-blue-500">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Хедер проекта */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              {status} • {duration}
            </div>

            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent mb-6">
              {title}
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {description}
            </p>
          </header>

          {/* Карточка проекта */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/60 overflow-hidden">
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
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {overview}
                    </p>
                  </section>

                  {/* Цели проекта */}
                  <section>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-2 h-8 bg-green-600 rounded-full"></div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        Цели проекта
                      </h2>
                    </div>
                    <ul className="space-y-4">
                      {goals.map((goal, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <svg
                              className="w-3 h-3 text-green-600"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <span className="text-gray-700">{goal}</span>
                        </li>
                      ))}
                    </ul>
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

                  {/* Результаты */}
                  <section>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-2 h-8 bg-orange-600 rounded-full"></div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        Результаты
                      </h2>
                    </div>
                    <div className="space-y-4">
                      {results.map((result, index) => (
                        <div
                          key={index}
                          className="bg-gradient-to-r from-orange-50 to-amber-50/50 border border-orange-200/50 rounded-2xl p-4 hover:shadow-md transition-shadow"
                        >
                          <p className="text-gray-800 font-medium">{result}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </div>

              {/* Дополнительная информация */}
              <div className="mt-12 pt-8 border-t border-gray-200/60">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div className="bg-blue-50/50 rounded-2xl p-6">
                    <div className="text-2xl font-bold text-blue-600 mb-2">
                      95+
                    </div>
                    <div className="text-gray-600">PageSpeed Score</div>
                  </div>
                  <div className="bg-green-50/50 rounded-2xl p-6">
                    <div className="text-2xl font-bold text-green-600 mb-2">
                      35%
                    </div>
                    <div className="text-gray-600">Рост конверсии</div>
                  </div>
                  <div className="bg-purple-50/50 rounded-2xl p-6">
                    <div className="text-2xl font-bold text-purple-600 mb-2">
                      10K+
                    </div>
                    <div className="text-gray-600">Пользователей</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Футер */}
          <footer className="text-center mt-12 text-gray-500">
            <p>© 2024 Все права защищены</p>
          </footer>
        </div>
      </div>
    </>
  );
}
