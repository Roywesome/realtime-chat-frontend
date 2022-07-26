import React from "react";
import { NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Login = ({ user, onLogin, onChange }) => {
  return (
    <div className="container mx-auto pt-5 pb-10 px-5 mt-28 w-full md:w-1/3 items-center bg-gray-800 rounded-lg">
      <div>
        <h1 className="my-10 text-center text-white text-3xl font-mono font-semibold	">
          Good Chat
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onLogin();
          }}
        >
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-white  uppercase font-bold"
            >
              User
            </label>{" "}
            <input
              type="text"
              placeholder="admin@admin.com"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              id="name"
              name="name"
              value={user?.name}
              onChange={onChange}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="passwordUser"
              className="block text-white uppercase font-bold"
            >
              Password
            </label>{" "}
            <input
              type="password"
              placeholder="password"
              className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
              id="password"
              name="password"
              value={user?.password}
              onChange={onChange}
            />
          </div>

          <input
            type="submit"
            value="Iniciar Sesión "
            className="block bg-green-500 md:w-auto py-3 px-10 text-white uppercase font-bold hover:bg-green-300 cursor-pointer transition-all rounded-md"
          />
        </form>
        <ToastContainer />

        <nav className="mt-10 lg:flex lg:justify-between">
          <NavLink
            to="/register"
            className="block text-center my-2 text-gray-300"
          >
            ¿ No tienes una cuenta ?{" "}
            <span className="font-bold text-white ">Regístrate.</span>
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Login;
