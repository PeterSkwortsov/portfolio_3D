import { useState } from "react";

export default function TimelineComponent() {
  const [activeDate, setActiveDate] = useState(0);

  const timelineData = [
    {
      date: "2021",
      title: "Product manager",
      description:
        "Прошел профессиональную переподгатовку по программе «Управление цифровым продуктом»",
      firma: "НИУ ВШЭ",
    },
    {
      date: "2020",
      title: "«Риторика для эффективного общения»",
      description: "Переговорщик",
      firma: "ННГУ им. Н. И. Лобачевского",
    },
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-3xl font-bold text-white mb-4">
            Повышение квалификации
          </h3>
        </div>

        {/* Timeline для десктопа */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Линия времени */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full rounded-full bg-white"></div>

            <div className="space-y-12">
              {timelineData.map((item, index) => (
                <div
                  key={index}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  {/* Контент */}
                  <div
                    className={`w-1/2 ${
                      index % 2 === 0 ? "pr-8 text-right" : "pl-8"
                    }`}
                  >
                    <div
                      className={` rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 ${
                        activeDate === index
                          ? "ring-2 ring-purple-500 transform scale-90"
                          : ""
                      }`}
                      onMouseEnter={() => setActiveDate(index)}
                    >
                      <div className="text-sm font-semibold text-white mb-2">
                        {item.date}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">
                        {item.title}
                      </h3>
                      <p className="text-white leading-relaxed">
                        {item.description}
                      </p>
                      <p className="text-white leading-relaxed text-sm mt-2">
                        {item.firma}
                      </p>
                    </div>
                  </div>

                  {/* Точка на линии */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 z-10 ">
                    <div
                      className={`w-6 h-6 rounded-full border-4 border-white flex items-center justify-center transition-all duration-300 ${
                        activeDate === index
                          ? "bg-blue-600 transform scale-125 shadow-lg"
                          : "bg-blue-400 shadow-md"
                      }`}
                    ></div>
                  </div>

                  {/* Пустое пространство для чередования */}
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline для мобильных */}
        <div className="md:hidden">
          <div className="relative">
            {/* Вертикальная линия */}

            <div className="space-y-8">
              {timelineData.map((item, index) => (
                <div key={index} className="relative flex">
                  {/* Точка на линии */}
              

                  {/* Контент */}
                  <div className="px-5 flex-1">
                    <div
                      className={`bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 ${
                        activeDate === index ? "ring-5 ring-blue-500" : ""
                      }`}
                      onClick={() => setActiveDate(index)}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className="text-sm font-semibold text-blue-600 bg-blue-50 px-3
                        py-1 rounded-full"
                        >
                          {item.date}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                      <p className="text-gray-900 font-bold leading-relaxed text-sm mt-2">
                        {item.firma}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Индикатор текущей даты для мобильных */}
        <div className="md:hidden mt-8">
          <div className="flex justify-center space-x-2">
            {timelineData.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveDate(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeDate === index ? "bg-blue-600 scale-125" : "bg-blue-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Статистика */}
      </div>
    </div>
  );
}
