import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FaPowerOff } from "react-icons/fa";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    navigate("/login");
    console.log("Ok");
  };
  return (
    <Button onClick={handleLogOut}>
      <span>Log Out</span> <FaPowerOff />
    </Button>
  );
};

export default Logout;

const Container = styled.div`
  color: #fff;
  button {
    display: flex;
    align-items: center;
    span {
      margin-right: 1rem;
    }
  }
`;

const Button = styled.button`
  color: #fff;
  background-color: #ff0a54;
  display: flex;
  padding: 0.5rem 1.5rem;
  align-items: center;
  border-radius: 20px;

  &:hover {
    background-color: #ff477e;
  }
  span {
    margin-right: 1rem;
  }
`;
