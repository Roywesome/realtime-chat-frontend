import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import NoMatch from "./pages/NoMatch";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { RegisterRoute, LoginRoute } from "./helpers/ApiRoutes";
import Avatar from "./pages/Avatar";

const initialValues = {
  name: "",
  email: "",
  password: "",
  repeatPassword: "",
};

const toastOptions = {
  position: "top-center",
  autoClose: 3000,
  pauseOnHover: true,
  draggable: true,
  theme: "colored",
  type: "error",
};

function App() {
  const [values, setValues] = useState(initialValues);
  const [user, setUser] = useState({
    name: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, []);

  //Register
  const registerValidation = () => {
    const { name, email, password, repeatPassword } = values;
    if (!name && !email && !password && !repeatPassword) {
      toast.error("Enter all the form fields", toastOptions);
      return false;
    } else if (password !== repeatPassword) {
      toast.error("Password and Repeat Password should be same", toastOptions);
      return false;
    } else if (name.length < 3) {
      toast.error("User should be at least 3 characters", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error("Password should be at least 8 characters", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("Email is required", toastOptions);
      return false;
    }
    return true;
  };

  const register = async () => {
    if (registerValidation()) {
      const { name, email, password } = values;
      const { data } = await axios.post(RegisterRoute, {
        name,
        email,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        //localStorage.setItem('user', JSON.stringify(data.User));
        navigate("/login");
      }
    }
  };

  const handleOnChangeRegister = ({ target: { value, name } }) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  //Login
  const loginValidation = () => {
    const { name, password } = user;
    if (name === "" && password === "") {
      toast.error("User & Password is required", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Password is required", toastOptions);
      return false;
    } else if (name === "") {
      toast.error("User is required", toastOptions);
      return false;
    }
    return true;
  };

  const handleOnChangeLogin = ({ target: { value, name } }) => {
    setUser({
      ...user,
      [name]: value,
    });
  };

  const login = async () => {
    if (loginValidation()) {
      const { name, password } = user;
      const { data } = await axios.post(LoginRoute, {
        name,
        password,
      });
      console.log(data);

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        console.log(data);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/avatar");
      }
    }
  };

  return (
    <div>
      <Routes>
        <Route index element={<Chat />} />
        <Route
          path="/register"
          element={
            <Register
              onRegister={register}
              user={values}
              onChange={handleOnChangeRegister}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login user={user} onLogin={login} onChange={handleOnChangeLogin} />
          }
        />
        <Route path="/avatar" element={<Avatar />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
}

export default App;
