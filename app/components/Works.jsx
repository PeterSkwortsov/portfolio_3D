'use client'

import React, { useState } from "react";
import styled from "styled-components";
import Development from "./Development";
import ProductDesign from "./ProductDesign";
import WebDesign from "./WebDesign";
import ChairPage from "./ChairPage";
import Cloud from "./Cloud";
import Rules from "./Rules";




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
    padding: 20px;
    justify-content: center;
    margin-right: 0rem;
  }
`;

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ListItem = styled.li`
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  color: white;
  position: relative;

  @media only screen and (max-width: 768px) {
    font-size: 24px;
    color: white;
    -webkit-text-stroke: 0px;
  }

  ::after {
    content: "${(props) => props.text}";
    position: absolute;
    top: 0;
    left: 0;
    width: 0px;
    overflow: hidden;
    white-space: nowrap;
    color: pink;
  }

  ::hover {
    ::after {
      animation: moveText 0.5s linear both;
      color: pink;
      @keyframes moveText {
        to {
          width: 100%;
        }
      }
    }
  }
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
`;

const items = [
  "Wow-эффекты",
  "Новые технологии",
  "Демонстрация",
  "Облака",
  "Управление камерой",
];


const Works = () => {
  const [activeItem, setActiveItem] = useState("Wow-эффекты");

  const handleItemClick = (index) => {
    setActiveItem(index);
  };
  return (
    <Section>
      <Container>
        <Left>
          <List>
            {items.map((item, index) => (
              <ListItem
                key={item}
                text={item}
                onClick={() => setActiveItem(item)}
                style={{
                  padding: "12px 16px",
                  margin: "8px 0",
                  fontize: "1.5rem",
                  backgroundColor: activeItem === item ? "#6f42c1" : "#f8f9fa",
                  color: activeItem === item ? "white" : "#333",
                  borderRadius: "6px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  border:
                    activeItem === item
                      ? "2px solid #5a3791"
                      : "2px solid transparent",
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
          ) : activeItem === "Новые технологии" ? (
            <Development />
          ) : activeItem === "Демонстрация" ? (
            <ChairPage />
          ) : activeItem === "Облака" ? (
            <Cloud />
          ) : activeItem === "Управление камерой" ? (
            <Rules />
          ) : null}
        </Right>
      </Container>
    </Section>
  );
};

export default Works;


