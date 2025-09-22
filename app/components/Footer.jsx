import React from 'react'
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-4 mt-24">
      <div className="container mx-auto">
      
      
        <div className="flex gap-2 justify-center mt-2">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <a href="https://vk.com/vika.borsch">
                <Image
                  src="/vk.svg"
                  width={200}
                  height={100}
                  alt="Picture of the author"
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
                  alt="Picture of the author"
                  style={{ width: "100%" }}
                />
              </a>
            </div>
          </div>
           <div className="avatar">
                          <div className="w-10 rounded-full">
                            <a href="https://wa.me/+79049017926">
                              {/* <Image
                                src="/whatsapp.svg"
                                width={200}
                                height={100}
                                alt="Picture of the author"
                                style={{ width: "100%" }}
                              /> */}
                            </a>
                          </div>
                        </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer