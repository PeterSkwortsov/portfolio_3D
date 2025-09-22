import Link from "next/link";
import React from "react";
import Image from "next/image";


const Header = () => {
  return (
    <header className="mb-12">
      <div className="hero min-h-screen background-image mask-b-from-85% mask-b-to-100%">
        <div className=" text-neutral-content text-center pl-0 pr-0">
          <div className="hero-overlay-2 rounded-4xl w-full p-8">
            <h1
              className="w-full h-full text-xl
 cursor-default font-bold bg-black/70 p-5 rounded-2xl"
            >
              Frontend-developer<br></br>Скворцов Петр
            </h1>

            {/* <a
              href="tel:+79049017926"
              className="p-3 mt-5 font-extrabold text-white-400  hover:text-blue-400"
            >
              +7-904-901-79-26
            </a> */}
            <div className="flex gap-2 justify-center mt-2">
              <div className="avatar">
                <div className="w-10 rounded-full">
                  <a href="https://vk.com/borsch_art?from=groups">
                    <Image
                      src="/vk.svg"
                      width={200}
                      height={100}
                      alt="Социальная сеть ВКонтакте"
                      style={{ width: "100%" }}
                    />
                  </a>
                </div>
              </div>
              <div className="avatar avatar-online">
                <div className="w-10 rounded-full">
                  <a href="https://t.me/vika_borsch99">
                    <Image
                      src="/tg2.svg"
                      width={200}
                      height={100}
                      alt="Мессенджер Telegram"
                      style={{ width: "100%" }}
                    />
                  </a>
                </div>
              </div>
           
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
