'use client'
import Footer from "./components/Footer";
import Grid from "./components/Grid";
import Phone from "./components/Phone";
import Header from "./components/Header";
import { Loader } from "@react-three/drei";
import Works from "./components/Works";
import ImageModal from "./components/ImageModal";
import AboutMe from "./components/AboutMe";
import Line from "./components/Line";
import CookieConsent from "./components/CookieConsent";
import Start from "./components/Start";
import { useState } from "react";
import { Html } from "@react-three/drei";

export default function Home() {
    const [showModal, setShowModal] = useState(true);

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
                    fontSize: "30px",
                    fontWeight: "300",
                    marginTop: "15px",
                }}
                dataInterpolation={(p) => `Загружаем сайт  ${p.toFixed(0)}%`}
            />


        
            

            {/* <CookieConsent /> */}
        {/* <Header /> */}
        <Start />

            {showModal && (
                <div className="bg-white rounded-lg shadow-lg p-4 min-w-[300px] transform -translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2">
                    <h3 className="font-bold text-lg mb-2">Разрушь стену</h3>
                 
                    <button
                        className="w-full bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded text-sm"
                        onClick={() => setShowModal(false)}
                    >
                        Закрыть
                    </button>
                </div>
            )}

       {/* <AboutMe /> 
       <Grid />
       <Line /> 
     <Phone  />  
      <Works />
            <ImageModal />
            <Footer />  */}

          
        </>
    );
    
}