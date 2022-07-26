import {useState, useEffect, useRef} from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import { v4 as uuidv4 } from "uuid";
import {sendMessageRoute, getAllMessagesRoute} from '../helpers/ApiRoutes';
import axios from "axios"

const ChatContainer = ({ currentChat, currentUser, socket }) => {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();

  useEffect(()=> {
    const getMessages = async() => {
     if(currentChat){
      const response = await axios.post(getAllMessagesRoute, {
        from: currentUser?._id,
        to: currentChat?._id
      });
      setMessages(response.data.projectMessages);

    }
     }
    getMessages();
  }, [currentChat,  currentUser])


  const handleSendMessage = async (msg) => {
    socket.emit("send-msg", {
      to: currentUser._id,
      from: currentChat._id,
      message: msg,
    });

   await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg
    });


    const msgs = [...messages, {fromSelf: true, message:msg}];

    setMessages(msgs);
  };


  if(socket){
    socket.on("msg-recieve", (msg) => {
      console.log({msg})
      setArrivalMessage({fromSelf: false, message: msg})
    })
  }

  /*useEffect(() => {
    console.log(socket)
    if(socket){
      socket.on("msg-recieve", (msg) => {
        console.log({msg})
        setArrivalMessage({fromSelf: false, message: msg})
      })
    }
  }, [socket])*/



  useEffect(() => {
    console.log(arrivalMessage)
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage])
  }, [arrivalMessage])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {currentChat && (
        <Container>
          <div className="chat-header">
            <div className="user-details">
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${currentChat?.avatarImage}`}
                  alt="avatar"
                />
              </div>
              <div className="username">
                <h3>{currentChat?.name}</h3>
              </div>
            </div>
            <Logout />
          </div>

         <div className="chat-messages">
          {
            messages?.map((message) => {
              return (
                <div  ref={scrollRef} key={uuidv4()}>
                  <div className={`message ${message.fromSelf ? "sended" : "recieved"}`}>
                    <div className="content">
                      <p>
                        {message.message}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })
          }
         </div>

          <ChatInput handleSendMessage={handleSendMessage} />
        </Container>
      )}
    </>
  );
};

export default ChatContainer;

const Container = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
  display: grid;
  grid-template-rows: 12% 78% 10%;
  gap: 0.1rem;
  overflow: hidden;
  
  @media screen and (min-width: 720px) and (max-width: 1024px) {
    grid-auto-rows: 15% 70% 1%;
  }
  
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 4rem;
        }
      }
      .username {
        h3 {
          color: #fff;
          font-size: 1.6rem;
        }
      }
    }
  }

  

  .chat-messages{
    color: #fff;
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    .message {
      display: flex;
      align-itmes: center;
      .content{
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        color: #fff;
      }
    }

    .sended{
      justify-content: flex-end;
      .content{
        background-color: #4f04ff21;
      }

    }

    .recieved{
      justify-content: flex-star;
      .content{
        background-color: #9900ff20;
      }
    }
  }
`;
