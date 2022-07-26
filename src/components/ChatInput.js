import { useState } from "react";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import { RiSendPlaneFill } from "react-icons/ri";
import { BsEmojiSmileFill } from "react-icons/bs";

const ChatInput = ({ handleSendMessage }) => {
  const [showEmoji, setShowEmoji] = useState(false);
  const [msg, setMsg] = useState("");

  const handleEmojiPickerShow = () => {
    setShowEmoji(!showEmoji);
  };

  const handleEmojiClick = (evt, emoji) => {
    let message = msg;
    message += emoji.emoji;
    setMsg(message);
  };

  const sendChat = (e) => {
    e.preventDefault();
    if (msg.length > 0) {
      handleSendMessage(msg);
      setMsg("");
    }
  };
  return (
    <Container>
      <div className="btn-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerShow} />
          {showEmoji && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>

      <form className="input-container" onSubmit={(e) => sendChat(e)}>
        <input
          type="text"
          placeholder="Enter your message here"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button className="btn-submit">
          <RiSendPlaneFill />
        </button>
      </form>
    </Container>
  );
};

export default ChatInput;

const Container = styled.div`
  width: 90%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 5% 95%;
  align-items: center;
  background-color: #161a1d;
  padding: 0.7rem 2rem;
  border-radius: 2rem;
  .btn-container {
    display: flex;
    align-items: center;
    gap: 2rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffba08;
        cursor: pointer;
      }
      .emoji-picker-react {
        position: absolute;
        top: -350px;
        background-color: #000;
        box-shadow: 0 5px 10px #ef233c;
        border-color: #e5383b;
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #000;
          width: 10px;
          &-thumb {
            background-color: #d90429;
          }
        }
        .emoji-categories {
          button {
            filter: contrast(0);
            color: #fff;
          }
        }

        .emoji-search {
          background-color: transparent;
          border-color: #e5383b;
          color: #fff;
        }
        .emoji-group:before {
          background-color: #000;
        }
      }
    }
  }

  .input-container {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 2rem;

    input {
      color: #fff;
      width: 80%;
      padding: 0.5rem 2rem;
      border-radius: 2rem;
      background-color: #343a40;
      border: none;
      margin-left: 1rem;
      padding-left: 2rem;

      &::selection {
        background-color: red;
      }
      &:focus {
        outline: none;
      }
    }
    .btn-submit {
      background-color: #7b2cbf;
      border-radius: 2rem;
      margin-left: 2.2rem;
      cursor: pointer;
      padding: 0.5rem;
      svg {
        font-size: 1.5rem;
        color: #fff;
      }
    }
  }
`;
