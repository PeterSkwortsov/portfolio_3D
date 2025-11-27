"use client";

import React, { useState } from "react";
import styled from "styled-components";
import Development from "./Development";
import ProductDesign from "./ProductDesign";
import WebDesign from "./WebDesign";
import ChairPage from "./ChairPage";
import Cloud from "./Cloud";
import Rules from "./Rules";
import PrevCar from "./PrevCar";

const Section = styled.div`
  height: 100vh;
  scroll-snap-align: center;
  display: flex;
  justify-content: center;
  position: relative;
  color: black;
  font-size: 12px;
  font-weight: 300;
`;

const Container = styled.div`
  width: 1400px;
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 768px) {
    width: 100%;
    flex-direction: column;
  }
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  margin-right: 5rem;
  width: 100%;

  @media only screen and (max-width: 768px) {
    padding: 5px;
    justify-content: center;
    margin-right: 0rem;
  }
`;

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const ListItem = styled.li`
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  color: white;
  position: relative;

  @media only screen and (max-width: 768px) {
    font-size: 20px;
    color: white;
    -webkit-text-stroke: 0px;
  }
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  height: 100%;
`;

const items = [
  "Wow-эффекты",
  "Шейдеры",
  "Демонстрация",
  "Разрез детали",
  "Управление камерой",
  "Карточки товаров",
];

const Works = () => {
  const [activeItem, setActiveItem] = useState("Wow-эффекты");

 

   const handleDivClick = (e, item) => {
     // ✅ Добавляем параметр event
     e.preventDefault();
     e.stopPropagation();
     // твоя логика с item
     console.log("Клик по:", item);
   };

// setActiveItem(item);

  return (
    <>
      <div className="text-center mb-12">
        <h3 className="text-3xl md:text-3xl font-bold text-white mb-4">
          Различные технологии и техники Drei
        </h3>
      </div>
      <Section>
        <Container>
          <Left>
            <List>
              {items.map((item, index) => (
                <ListItem
                  key={item}
                  text={item}
                  onClick={(e) => {
                    handleDivClick(e, item);
                    setActiveItem(item);
                  }}
                  style={{
                    padding: "10px 16px",
                    margin: "3px 0",
                    fontize: "1.5rem",
                    backgroundColor: "white",
                    color: "black",
                    borderRadius: "10px",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    border:
                      activeItem === item
                        ? "5px solid blue"
                        : "5px solid transparent",
                  }}
                >
                  {item}
                </ListItem>
              ))}
            </List>
          </Left>
          <Right>
            {activeItem === "Wow-эффекты" ? (
              <WebDesign />
            ) : activeItem === "Шейдеры" ? (
              <Development />
            ) : activeItem === "Демонстрация" ? (
              <ChairPage />
            ) : activeItem === "Разрез детали" ? (
              <Cloud />
            ) : activeItem === "Управление камерой" ? (
              <Rules />
            ) : activeItem === "Карточки товаров" ? (
              <Rules />
            ) : null}
          </Right>
        </Container>
      </Section>
    </>
  );
  
};

export default Works;
