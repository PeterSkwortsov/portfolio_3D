'use client'
import Footer from "./components/Footer";
import Grid from "./components/Grid";
import Phone from "./components/Phone";
import Header from "./components/Header";
import Test from "./components/Test";
import { Loader } from "@react-three/drei";
import Works from "./components/Works";
import ImageModal from "./components/ImageModal";
import TechnologiesList from "./components/TechnologiesList";

export default function Home() {
    return (
        <>
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
                    fontSize: "24px",
                    fontWeight: "300",
                    marginTop: "15px",
                }}
                dataInterpolation={(p) => `Загружаем сцену  ${p.toFixed(0)}%`}
            />
    
       <Header />
        <Grid />
       <Phone  /> 
        {/* <Test /> */}
        <Works />
            <ImageModal />
            <TechnologiesList />
            <Footer />

          
        </>
    );
    
}