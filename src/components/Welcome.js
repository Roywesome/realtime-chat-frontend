import React from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";

const Welcome = ({ currentUser }) => {
  return (
    <Container>
      <img src={Robot} alt="" />
      <h1>
        Welcome, <span>{currentUser?.name}!</span>
      </h1>
      <h3>Please select a chat to start Messaging</h3>
    </Container>
  );
};

export default Welcome;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: #fff;

  h1 {
    font-size: 40px;
    margin-bottom: 20px;
    font-family: "Josefin Sans", sans-serif;
  }
  h3 {
    font-size: 25px;
    font-family: "Raleway", sans-serif;
  }

  span {
    color: #f72585;
  }
`;
