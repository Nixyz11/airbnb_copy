import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/register", {
        name,
        email,
        password,
      });
      alert("Registration successful");
      navigate("/login");
    } catch (error) {
      console.log(error.message);
      alert("Registartion failed");
    }
  };
  return (
    <div className="flex justify-center items-center flex-grow">
      <div className="items-center justify-center  flex-grow   flex flex-col">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form
          className="max-w-md mx-auto border p-2 rounded-xl"
          onSubmit={registerUser}
        >
          <input
            placeholder="Nikola Bogdanovich"
            type="text"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          ></input>

          <input
            placeholder={`your@email.com`}
            type="email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          ></input>
          <input
            placeholder="password"
            type="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          ></input>
          <button className="primary ">Register</button>
          <div className="text-center py-2 text-gray-500">
            Already a member?{" "}
            <Link className="underline text-black" to={`/login`}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
