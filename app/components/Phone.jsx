'use client'

import React from 'react'
import Image from 'next/image';
import Cross from './Cross';
import { useState } from 'react';
import { Canvas } from '@react-three/fiber';


const Phone = () => {


  return (
    <>
      <div className="mt-12 mb-14 flex justify-center alighn-center m-auto max-w-sm p-1.5">
        <div className="mockup-phone border-orange-300 ">
          <div className="mockup-phone-camera "></div>
          <div className="mockup-phone-display w-full h-full">
            

            

            <div className="w-full h-full">
              <Cross />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Phone