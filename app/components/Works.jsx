'use client'

import React, { useState } from "react";
import styled from "styled-components";
import Development from "./Development";
import ProductDesign from "./ProductDesign";
import WebDesign from "./WebDesign";
import ChairPage from "./ChairPage";
import Cloud from "./Cloud";
import Rules from "./Rules";


const data = [
  "Wow-эффекты",
  "Новые технологии",
  "Демонстрация",
  "Облака",
  "Управление камерой",
];

const Section = styled.div`
  height: 100vh;
  scroll-snap-align: center;
  display: flex;
  justify-content: center;
  position: relative;
  color: black;
  font-size: 14px;
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

  @media only screen and (max-width: 768px) {
    padding: 20px;
    justify-content: center;
  }
`;

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ListItem = styled.li`
  font-size: 30px;
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

  &:hover {
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

const Works = () => {
  const [work, setWork] = useState("Wow-эффекты");
  return (
    <Section>
      <Container>
        <Left>
          <List>
            {data.map((item) => (
              <ListItem key={item} text={item} onClick={() => setWork(item)}>
                {item}
              </ListItem>
            ))}
          </List>
        </Left>
        <Right>
          {work === "Wow-эффекты" ? (
            <WebDesign />
          ) : work === "Новые технологии" ? (
            <Development />
          ) : work === "Демонстрация" ? (
            <ChairPage />
          ) : work === "Облака" ? (
            <Cloud />
          ) : work === "Управление камерой" ? (
            <Rules />
          ) : null}
        </Right>
      </Container>
    </Section>
  );
};

export default Works;


