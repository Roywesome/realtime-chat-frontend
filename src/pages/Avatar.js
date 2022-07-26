import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Buffer } from "buffer";
import styled from "styled-components";
import { AvatarRoute } from "../helpers/ApiRoutes";

const toastOptions = {
  position: "bottom-center",
  autoClose: 3000,
  pauseOnHover: true,
  draggable: true,
  theme: "colored",
  type: "error",
};

const Avatar = () => {
  const api = "https://api.multiavatar.com/45678945";
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", toastOptions);
    } else {
      const user = await JSON.parse(localStorage.getItem("user"));
      const { data } = await axios.post(`${AvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });
      console.log(data);

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
      } else {
        toast.error("Error seting avatar, Please try again", toastOptions);
      }
    }
  };

  useEffect(() => {
    async function fetchData() {
      const data = [];
      for (let i = 0; i < 5; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        );
        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
      }
      setAvatars(data);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    if (data.isAvatarImageSet) {
      navigate("/");
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} alt="loader" className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title">
            <h1>Elige un avatar como tu foto de perfil</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, index) => {
              return (
                <div
                  key={index}
                  className={` avatar ${
                    selectedAvatar === index ? "selected" : ""
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt="avatar"
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              );
            })}
          </div>
          <button className="submit" onClick={setProfilePicture}>
            Seleccionar como foto de perfil
          </button>
        </Container>
      )}
      <ToastContainer />
    </>
  );
};

export default Avatar;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #343a40;
  height: 100vh;
  width: 100%;
  .loader {
    max-inline-size: 100%;
  }

  .title {
    h1 {
      color: #fff;
      font-size: 1.8rem;
      font-weight: bold;
    }
  }

  .avatars {
    display: flex;
    gap: 2rem;
    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img {
        height: 6rem;
      }
    }
    .selected {
      border: 0.4rem solid #f72585;
    }
  }

  .submit {
    background-color: #c9184a;
    color: #fff;
    padding: 1rem 2rem;
    border-radius: 0.7rem;
    cursor: pointer;
    text-transform: uppercase;
    transition: 0.5s ease-in-out;
    font-size: 1.1rem;
    font-weight: bold;
    &:hover {
      background-color: #f72585;
    }
  }
`;
