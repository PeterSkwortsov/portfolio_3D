'use client'
import Footer from "./components/Footer";
import Grid from "./components/Grid";
import Phone from "./components/Phone";
import Header from "./components/Header";
import Test from "./components/Test";
import { Loader } from "@react-three/drei";

export default function Home() {
    return (
        <>
     
    
       <Header />
        <Grid />
        <Phone  />
        <Test />
        <Footer />
       <Loader
        // Основные параметры
        containerClass="loader-container"
        innerClass="loader-inner"
        barClass="loader-bar"
        dataClass="loader-data"
        dataInterpolation={(p) => `Loading ${p.toFixed(2)}%`}
        
        // Стилизация
        backgroundColor="#f0f0f0"
        barColor="hotpink"
        scale={1}
  
      />
          
        </>
    );
    
}