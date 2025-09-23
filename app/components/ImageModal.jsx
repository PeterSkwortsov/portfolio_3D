// components/ImageGridModal.jsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const images = [
  {
    src: "/1200.png",
    src2: "/car.jpg",
    alt: "Выиграл грант",
    title: "Выиграл грант 1.200.000₽",
    description: "На развитие автоволонтерского сообщества в Нижнем Новгороде",
    description1_1:
      "Это была командная работа множества людей из совершенно разных общественных организаций, объединенных целью действовать, чтобы минимизировать последствия вируса для самых незащищенных людей. Мы помогали маломобильным пожилым людям, инвалидам и многодетным семьям, находящимся на попечении службы социальной защиты города.",
    description1_2:
      "В этом проекте я развил свои организаторские способности, научился действовать в условиях хаоса, когда за день происходило больше событий, чем за неделю. Я быстро принимал сложные решения и выстраивал с нуля каналы связи с другими организациями. После этого проекта я обрел уверенность в себе",
  },
  {
    src: "/medal.jpg",
    src2: "/medal2.jpg",
    alt: "Медаль «В память 800-летия Нижнего Новгорода»",
    title: "Медаль «В память 800-летия Нижнего Новгорода",
    description2_1:
      "За вклад в Общероссийскую акцию #МыВместе по борьбе с COVID-19 ",
    description2_2:
      "Как и любому человеку, мне приятно, что мою работу заметили и оценили. Я горжусь тем, что оказался там в нужное время и с такими замечательными людьми.",
  },
  {
    src: "/studia.png",
    src2: "/syudia2.png",
    alt: "Студия живописи и гончарного мастерства",
    title: `Студия живописи и гончарного мастерства «Вики Борщ» 🎉`,
    description:
      "Вместе с женой откыли новое пространство для детей и взрослых",
    description3_2: "https://borsch-art.ru/",
  },
];

/**
 * Модальное окно для фотографий
 * 
 * @param {function} openModal - функция для открытия модального окна
 * @param {function} closeModal - функция для закрытия модального окна
 * @param {object} selectedImage - выбранное изображение
 * 
 * @returns {JSX.Element} - модальное окно с фотографией
 */
export default function ImageGridModal() {
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (image) => setSelectedImage(image);
  const closeModal = () => setSelectedImage(null);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-4xl font-bold text-center mb-12 text-white">
        Достижения
      </h2>

      {/* Адаптивный grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {images.map((image, index) => (
          <div key={index} className="group relative">
            <div
              className="card card-compact bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
              onClick={() => openModal(image)}
            >
              <figure className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-30 transition duration-300 flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition duration-300 bg-gray-800 rounded-lg p-2">
                    👆 Нажмите для увеличения
                  </span>
                </div>
              </figure>
              <div className="card-body">
                <h3 className="card-title text-lg leading-5">{image.title}</h3>
                <p className="text-sm text-gray-600 leading-5">
                  {image.description}
                </p>
                <p className="text-sm text-gray-600 leading-5">
                  {image.description2_1}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Модальное окно */}
      {selectedImage && (
        <div className="modal modal-open">
          <div className="modal-box max-w-4xl max-h-[90vh] relative">
            <button
              className="btn btn-sm btn-circle absolute right-2 top-2 z-10 bg-black text-white "
              onClick={closeModal}
            >
              ✕
            </button>

            <div className="relative h-96 md:h-[500px]">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 80vw"
              />
            </div>

            <div className="mt-4 ">
              <p className="text-gray-600">{selectedImage.description1_1}</p>
              <p className="text-gray-600 mt-2">
                {selectedImage.description1_2}
              </p>
              <p className="text-gray-600 mt-2">
                {selectedImage.description2_2}
              </p>

              { selectedImage.description3_2 && <Link
                href="https://borsch-art.ru/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-warning mt-4 rounded-lg text-black flex m-0 text-lg"
              >
                {`Подробнее на сайте`}
              </Link>}

              <div className="relative h-96 md:h-[900px] md:w-[90%] m-auto mt-6">
                <Image
                  src={selectedImage.src2 ? selectedImage.src2 : null}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            </div>
          </div>

          {/* Backdrop */}
          <div className="modal-backdrop" onClick={closeModal}></div>
        </div>
      )}
    </div>
  );
}
