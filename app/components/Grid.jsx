import React from 'react'
import Image from "next/image";


const Grid = () => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-2 md:px-20 mb-20">
        <div className="card bg-base-200 image-full w-auto shadow-sm">
          <figure>
            <Image
              src="/letan.png"
              width={200}
              height={200}
              alt="Picture of the author"
              style={{ width: "200%" }}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Каталог картин художников</h2>
            <p>На React. Адаптивная верстка. Свой дизайн.</p>
            <div className="card-actions justify-end items-center z-20">
              <button className="btn btn-neutral bg-white text-black">
                Подробнее
              </button>
            </div>
          </div>
        </div>

        <div className="card bg-base-200 image-full w-auto shadow-sm">
          <figure>
            <Image
              src="/london.png"
              width={200}
              height={200}
              alt="Picture of the author"
              style={{ width: "200%" }}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              Сеть детских аттракционов в Нижнем Новгороде
            </h2>
            <p>Мой самый первый коммерческий проект, 2022 год. Адаптив, анимация.</p>
            <div className="card-actions justify-end items-center z-20">
              <button className="btn btn-neutral bg-white text-black">
                Подробнее
              </button>
            </div>
          </div>
        </div>

        <div className="card bg-base-200 image-full w-auto shadow-sm">
          <figure>
            <Image
              src="/family.png"
              width={200}
              height={200}
              alt="Picture of the author"
              style={{ width: "200%" }}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Сайт проекта «История семьи»</h2>
            <p>Адаптив. Кастомный прелоадер. Дизайн, анимация и графика.</p>
            <div className="card-actions justify-end items-center z-20">

              <button className="btn btn-neutral bg-white text-black">
                Подробнее
              </button>
            </div>
          </div>
        </div>

        <div className="card bg-base-200 image-full w-auto shadow-sm">
          <figure>
            <Image
              src="/borsh.png"
              width={200}
              height={200}
              alt="Picture of the author"
              style={{ width: "100%", height: "100%" }}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              Творческая студия «Вики Борщ»
            </h2>
            <p>
              Next.js, адаптив, многостраничный, дизайн. 
            </p>
            <div className="card-actions justify-end items-center z-20">

              <button className="btn btn-neutral bg-white text-black">
                Подробнее
              </button>
            </div>
          </div>
        </div>

        <div className="card bg-base-200 image-full w-auto shadow-sm">
          <figure>
            <Image
              src="/time.png"
              width={200}
              height={200}
              alt="Picture of the author"
              style={{ width: "100%", height: "100%" }}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Лендинг часов</h2>
            <p>
              Three.js, GSAP
            </p>
            <div className="card-actions justify-end items-center z-20">

              <button className="btn btn-neutral bg-white text-black">
                Подробнее
              </button>
            </div>
          </div>
        </div>

        <div className="card bg-base-200 image-full w-auto shadow-sm">
          <figure>
            <Image
              src="/game.png"
              width={200}
              height={200}
              alt="Picture of the author"
              style={{ width: "200%" }}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Игра в мяч</h2>
            <p>
              R3F, Drei
            </p>
            <div className="card-actions justify-end items-center z-20">

              <button className="btn btn-neutral bg-white text-black">
                Подробнее
              </button>
            </div>
          </div>
        </div>
        <div className="card bg-base-200 image-full w-auto shadow-sm">
          <figure>
            <Image
              src="/ships.png"
              width={200}
              height={200}
              alt="Picture of the author"
              style={{ width: "200%" }}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Лендинг с анимацией</h2>
            <p>
              GSAP
            </p>
            <div className="card-actions justify-end items-center z-20">

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