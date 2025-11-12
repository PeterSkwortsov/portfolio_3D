'use client'

import React, { Suspense } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import global from "../app/globals.css";
import { useEffect, useState } from "react";
import DownloadWordFile from "@/app/components/DownloadWordFile";
import TechnologiesList from "@/app/components/TechnologiesList";
import Cross from "@/app/components/Cross";
import { Canvas } from "@react-three/fiber";
import { Loader } from "@react-three/drei";
import Works from "@/app/components/Works";
import ImageModal from "@/app/components/ImageModal";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import Line from "@/app/components/Line";
import AboutMe from "@/app/components/AboutMe";
import Grid from "@/app/components/Grid";
import Phone from "@/app/components/Phone";
import { AnimatePresence, motion } from "framer-motion";
import WhyChooseMe from "@/app/components/elementBlock/Superpower";
import { useRouter } from "next/navigation";






export default function Family() {
   
  {
    // Данные проекта (в реальном приложении можно брать из API)
    const projectData = {
      title: "Портфолио Скворцова Петра",
      description:
        "Сохранение памяти о своих родителях, бабушек и дедушек через интервью. Полноценный фильм о своей семье.",
      imageUrl: "/history.png",
      githubUrl: "https://github.com/PeterSkwortsov/family",
      overview:
        "Мой первый многостраничный сайт, где было добавлено несколько маленьких фишечек. Например, кастомный анимированный прилоадер, фоновое видео, скрипт стрелки наверх. Была работа с графическим художником по созданию рисунков персонажей",
      goals: [
        "Создать многостраничный сайт который точно объяснит предоставляемые услуги",
        "Самостоятельно создать UI компоненты + работа с художником",
        "Подключить админ-панель для управления контентом",
        "Провести SEO оптимизацию",
      ],
      technologies: ["HTML", "Textolite", "AOS", "JavaScript"],
      results: [
        "First Contentful Paint - 0,5 сек",
        "Cumulative Layout Shift - 0,006",
        "Speed Index - 0,9 сек",
      ],
      liveDemoUrl: "https://peterskwortsov.github.io/family/",
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


    const router = useRouter()


    return (
      <>
        <Head>
          <title>{title} | Проект</title>
          <meta name="description" content={description} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        <Loader
          containerStyles={{
            background: "rgba(10, 10, 10, 0.95)",
            padding: "30px 40px",
          }}
          innerStyles={{
            width: "300px",
            height: "6px",
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "3px",
          }}
          barStyles={{
            height: "100%",
            background: "linear-gradient(90deg, #667eea, #764ba2)",
            borderRadius: "3px",
          }}
          dataStyles={{
            color: "#e2e8f0",
            fontSize: "30px",
            fontWeight: "300",
            marginTop: "15px",
          }}
          dataInterpolation={(p) => `Загружаем сайт  ${p.toFixed(0)}%`}
        />
        <Suspense>
          <Header />
          <AboutMe />
          <Grid />
          <Line />
          {/* <Phone /> */}
          <WhyChooseMe />
          <Works />
          <ImageModal />
          <Footer />
        </Suspense>
      </>
    );
  }
}
