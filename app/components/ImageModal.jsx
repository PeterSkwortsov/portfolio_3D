// components/ImageGridModal.jsx
"use client";

import { useState } from "react";
import Image from "next/image";

const images = [
  {
    src: "/1200.png",
    alt: "Выиграл грант",
    title: "Выиграл грант 1.200.000₽",
    description: "На развитие автоволонтерского сообщества в Нижнем Новгороде в 2021 году",
    description2: "Это была командная работа множества людей из Нижегородской службы добровольцев и клуба #МЫВМЕСТЕ в разгар пандемии коронавируса. Они помогали маломобильным пожилым людям и многодетным семьям, находящимся на попечении службы соцзащиты.",
    description3:"В этом проекте я развил свои организаторские способности, научился действовать в условиях хаоса, когда за день происходило больше событий, чем обычно за неделю. Я быстро принимал сложные решения и выстраивал с нуля каналы связи с другими организациями и сообществами. После этого проекта я обрел уверенность в себе."
  },
  {
    src: "/game.png",
    alt: "Город ночью",
    title: "Ночной город",
    description: "Огни большого города",
  },
  {
    src: "/ships.png",
    alt: "Лесная тропа",
    title: "Лесная тропа",
    description: "Прогулка по лесу",
  },
];

export default function ImageGridModal() {
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (image) => setSelectedImage(image);
  const closeModal = () => setSelectedImage(null);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12 text-white">
        Достижения, котрыми я горжусь
      </h1>

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
                <h3 className="card-title text-lg">{image.title}</h3>
                <p className="text-sm text-gray-600">{image.description}</p>
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
              className="btn btn-sm btn-circle absolute right-2 top-2 z-10"
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

            <div className="mt-4">
           
              <p className="text-gray-600">{selectedImage.description2}</p>
              <p className="text-gray-600 mt-2">{selectedImage.description3}</p>
            </div>
          </div>

          {/* Backdrop */}
          <div className="modal-backdrop" onClick={closeModal}></div>
        </div>
      )}
    </div>
  );
}
