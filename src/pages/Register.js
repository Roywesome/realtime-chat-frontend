import React from "react";
import { NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Register = ({ user, onChange, onRegister }) => {
  return (
    <div className="container mx-auto py-10 px-5 mt-28 w-full md:w-1/3 items-center bg-gray-800 rounded-lg">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onRegister();
        }}
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-white uppercase font-bold"
          >
            User
          </label>{" "}
          <input
            type="text"
            placeholder="Hook"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            id="name"
            name="name"
            value={user?.name}
            onChange={onChange}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-white  uppercase font-bold"
          >
            Email
          </label>{" "}
          <input
            type="email"
            placeholder="admin@admin.com"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            id="email"
            name="email"
            value={user?.email}
            onChange={onChange}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-white uppercase font-bold"
          >
            Password
          </label>{" "}
          <input
            type="password"
            placeholder="Password"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            id="password"
            name="password"
            value={user?.password}
            onChange={onChange}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-white uppercase font-bold"
          >
            Repetir Password
          </label>{" "}
          <input
            type="password"
            placeholder="Repeat Password"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            id="repeatPassword"
            name="repeatPassword"
            value={user?.repeatPassword}
            onChange={onChange}
          />
        </div>

        <input
          type="submit"
          value="Registrarme"
          className="block bg-green-500 md:w-auto py-3 px-10 text-black uppercase font-bold hover:bg-green-300  cursor-pointer transition-all rounded-md"
        />
        <div className="mt-10 lg:flex lg:justify-between">
          <NavLink to="/login" className="block text-center my-2 text-gray-300">
            ¿ Ya tienes una cuenta ?{" "}
            <span className="font-bold text-white ">Iniciar Sesion</span>
          </NavLink>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Register;
