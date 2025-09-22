'use client'

import React from 'react'
import Image from 'next/image';
import ChairPage from './ChairPage';

import { useState } from 'react';
import { Canvas } from '@react-three/fiber';



const Phone = () => {





  return (
    <>
      <div className="mt-12 mb-14 flex justify-center alighn-center m-auto max-w-sm p-1.5">
        <div className="mockup-phone border-orange-300 ">
          <div className="mockup-phone-camera "></div>
          <div className="mockup-phone-display w-full h-lvh">
            <div className="chat chat-start bg-gray-200">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full ml-1">
                  <Image
                    className="w-full"
                    src="/19.jpeg"
                    width={200}
                    height={200}
                    alt="Picture of the author"
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
              <div className="chat-header text-black mt-10">Дочка</div>
              <div className="chat-bubble bg-black text-white text-sm max-sm:text-sm max-md:text-md">
                Смотри! Я нашла место, где можно найти единомышленников,
                пообщаться и получить поддержку!
              </div>
            </div>

            <div className="chat chat-start bg-gray-200">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full ml-1">
                  <Image
                    className="w-full"
                    src="/19.jpeg"
                    width={200}
                    height={200}
                    alt="Picture of the author"
                    style={{ width: "100%" }}
                  />
                </div>
              </div>

              <div className="chat-bubble m-1 bg-black text-white text-sm max-sm:text-sm max-md:text-md">
                Я научилась пользоваться красками, разными техниками и
                материалами. Меня никто не осуждал за ошибки!
              </div>
            </div>

            

            <div className="h-1/2">
              {/* <ChairPage/>  */}
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}

export default Phone