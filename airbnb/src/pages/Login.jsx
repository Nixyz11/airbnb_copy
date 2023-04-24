import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user,setUser } = useContext(UserContext);

  const navigate = useNavigate();
 useEffect(() => {
  
 
  if(user){
    navigate('/every')
  }
 }, []);
  const loginSub = async (ev) => {
    ev.preventDefault();
    try {
      const { data } = await axios.post(
        "/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data);
      setUser(data);
      alert("login successful!");
       navigate('/accounts')
    } catch (error) {
      console.log(error);
      alert("login failed");
    }
  };
  return (
    <div className="flex justify-center items-center flex-grow">
    <div className="items-center justify-center  flex-grow   flex flex-col">
      <h1 className="text-4xl text-center mb-4">LOGIN</h1>
      <form
        onSubmit={loginSub}
        className="max-w-md mx-auto border p-2 rounded-xl"
      >
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
        <button type="submit" className="primary ">
          login
        </button>
        <div className="text-center py-2 text-gray-500">
          Dont have an account yet?{" "}
          <Link className="underline text-black" to={`/register`}>
            Register now
          </Link>
        </div>
      </form>
    </div>
    </div>
  );
};

export default Login;
