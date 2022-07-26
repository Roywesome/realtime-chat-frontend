import React, { useEffect, useState } from "react";
import styled from "styled-components";
import logo from "../assets/chat.svg";

const Contacts = ({ contacts, currentUser, changeChat }) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser.name);
      setCurrentUserImage(currentUser.avatarImage);
    }
  }, [currentUser]);

  const allcontacts = contacts.users;

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserImage && currentUserName && (
        <Container>
          <div className="brand">
            <img className="logo" src={logo} alt="logo" />
            <h3>Good chat</h3>
          </div>
          <div className="contacts">
            {allcontacts?.map((contact, index) => {
              return (
                <div
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  key={index}
                  onClick={() => {
                    changeCurrentChat(index, contact);
                  }}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt="avatar"
                    />
                  </div>
                  <div className="name">
                    <h3>{contact.name}</h3>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="name">
              <h3>{currentUserName}</h3>
            </div>
          </div>
        </Container>
      )}
    </>
  );
};

export default Contacts;

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #ced4da;
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    .logo {
      width: 10%;
    }
    h3 {
      text-transform: uppercase;
    }
    .logo {
      width: 4rem;
    }
    h3 {
      text-transform: uppercase;
    }
  }

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 1rem;
    &::-webkit-scrollbar {
      width: 0.5rem;
      &-thumb {
        background-color: #3f37c9;
        width: 0.2rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #4895ef;
      color: #fff;
      min-height: 5rem;
      width: 90%;
      cursor: pointer;
      border-radius: 0.2rem;
      padding: 0.4rem;
      gap: 1rem;
      display: flex;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .name {
        h3 {
          font-weight: medium;
          font-size: 1.5rem;
          text-transform: capitalize;
        }
      }
    }

    .selected {
      background-color: #4361ee;
    }
  }

  .current-user {
    color: #fff;
    background-color: #4361ee;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;

    .avatar {
      img {
        height: 5rem;
        max-inline-size: 100%;
      }
    }
    .name {
      h3 {
        font-weight: medium;
        font-size: 1.5rem;
        text-transform: capitalize;
      }
    }

    @media screen and (min-width: 768px) and (max-width: 1024px) {
      gap: 0.5rem;
      .name {
        font-size: 1rem;
      }
    }
  }
`;
