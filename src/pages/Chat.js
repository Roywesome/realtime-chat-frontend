import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AllUsersRoute, host } from "../helpers/ApiRoutes";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import io from "socket.io-client"


const Chat = () => {
  const [socket, setSocket] = useState();
 /* const socket = useRef();*/

  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (!data) {
      navigate("/login");
    } else {
      setCurrentUser(JSON.parse(data));
      setIsLoaded(true);
    }
  }, [navigate]);

  useEffect( () => {
    if(!socket){
      /*socket.current = io(host);*/
      const newSocket = io.connect(host);
      setSocket(newSocket);

    }
  }, [socket])

  useEffect(() => {
    if(currentUser){
      socket.emit("add-user", currentUser._id);
    }
    
  }, [socket, currentUser]);

  useEffect(() => {
    async function getUsers() {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${AllUsersRoute}/${currentUser._id}`);
          setContacts(data.data);
        } else {
          navigate("/avatar");
        }
      }
    }
    getUsers();
  }, [currentUser, navigate]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <Container>
      <div className="container">
        <Contacts
          contacts={contacts}
          currentUser={currentUser}
          changeChat={handleChatChange}
        />
        {isLoaded && currentChat === undefined ? (
          <Welcome currentUser={currentUser} />
        ) : (
          <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket}/>
        )}
      </div>
    </Container>
  );
};

export default Chat;

const Container = styled.div`
  height: 100vh;
  width: 100%;
  background-color: #212529;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-direction: column;
  .container {
    height: 85vh;
    width: 80%;
    background-color: #000;
    display: grid;
    grid-template-columns: 25% 75%;

    @media screen and (min-width: 768px) and (max-width: 1024px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
