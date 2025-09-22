import React from 'react'
import Image from "next/image";


const Grid = () => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-2 md:px-20 mb-20">
        <div className="card bg-base-200 image-full w-auto shadow-sm">
          <figure>
            <Image
              src="/4.jpeg"
              width={200}
              height={200}
              alt="Picture of the author"
              style={{ width: "200%" }}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Мастер-классы для взрослых</h2>
            <p>
              14+ Навыки рисования не нужны. Свободная живопись или с пошаговым
              объяснением
            </p>
            <div className="card-actions justify-end items-center z-20">
              <p className="text-base">от 2000 ₽</p>

              <button className="btn btn-neutral bg-white text-black">
                Подробнее
              </button>
            </div>
          </div>
        </div>

        <div className="card bg-base-200 image-full w-auto shadow-sm">
          <figure>
            <Image
              src="/3.jpeg"
              width={200}
              height={200}
              alt="Picture of the author"
              style={{ width: "200%" }}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Занятия с детьми</h2>
            <p>Для детей от 4 лет. Все материалы включены в стоимость</p>
            <div className="card-actions justify-end items-center z-20">
              <p className="text-base">от 2800 ₽</p>

              <button className="btn btn-neutral bg-white text-black">
                Подробнее
              </button>
            </div>
          </div>
        </div>

        <div className="card bg-base-200 image-full w-auto shadow-sm">
          <figure>
            <Image
              src="/2.jpeg"
              width={200}
              height={200}
              alt="Picture of the author"
              style={{ width: "200%" }}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Подарочный сертификат</h2>
            <p>Подарите незабываемое удовольствие и пользу родным и друзьям!</p>
            <div className="card-actions justify-end items-center z-20">
              <p className="text-base">от 2000 ₽</p>

              <button className="btn btn-neutral bg-white text-black">
                Подробнее
              </button>
            </div>
          </div>
        </div>

        <div className="card bg-base-200 image-full w-auto shadow-sm">
          <figure>
            <Image
              src="/1.jpeg"
              width={200}
              height={200}
              alt="Picture of the author"
              style={{ width: "200%" }}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              Арт-вечеринки, Дни рождения для взрослых, корпоративы
            </h2>
            <p>
              Мастер-класс по живописи, вкусный чай и позитивное настроение
              сделают ваш вечер незабываемым.
            </p>
            <div className="card-actions justify-end items-center z-20">
              <p className="text-base">от 2000 ₽</p>

              <button className="btn btn-neutral bg-white text-black">
                Подробнее
              </button>
            </div>
          </div>
        </div>

        <div className="card bg-base-200 image-full w-auto shadow-sm">
          <figure>
            <Image
              src="/5.jpeg"
              width={200}
              height={200}
              alt="Picture of the author"
              style={{ width: "200%" }}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Индивидуальное занятие</h2>
            <p>
              A card component has a figure, a body part, and inside body there
              are title and actions parts
            </p>
            <div className="card-actions justify-end items-center z-20">
              <p className="text-base">от 2000 ₽</p>

              <button className="btn btn-neutral bg-white text-black">
                Подробнее
              </button>
            </div>
          </div>
        </div>

        <div className="card bg-base-200 image-full w-auto shadow-sm">
          <figure>
            <Image
              src="/6.jpeg"
              width={200}
              height={200}
              alt="Picture of the author"
              style={{ width: "200%" }}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Card Title</h2>
            <p>
              A card component has a figure, a body part, and inside body there
              are title and actions parts
            </p>
            <div className="card-actions justify-end items-center z-20">
              <p className="text-base">от 2000 ₽</p>

              <button className="btn btn-neutral bg-white text-black">
                Подробнее
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Grid