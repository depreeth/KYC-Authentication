import React, { useState } from "react";
import img from "../assets/signup-bg.jpg";
import { useNavigate } from "react-router-dom";
import {AiFillEyeInvisible,AiFillEye} from 'react-icons/ai'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate ();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // navigate('/home')

    // Make HTTP request to server-side endpoint to authenticate user
    const userObject = {
      username: username,
      password: password
    };
    // fetch('http://192.168.1.13:5000/login', {
    //   method: 'POST',
    //   body: JSON.stringify(userObject),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })
    //   .then(response => response.json())
    //   .then(data => {console.log(data)})
    //   .catch(error => console.error(error));

      try {
        const response = await fetch('http://192.168.1.13:5000/login', {
          method: 'POST',
          body: JSON.stringify(userObject),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const data = await response.json();
        if(data.Message==="Successful login"){
          navigate('/home')
          // toast("Wow s easy!");
          
        }else{
          toast.error(data.Error,{
            position:"top-right"
          });
          // alert(data.Error)
        }
        console.log(data);

      } catch (error) {
        console.error(error);
      }
  };
  console.log("username:", username);
  console.log("password:", password);

  return (
    <div className=" grid grid-cols-1  lg:grid-cols-2 h-screen w-full">
      <div className="hidden lg:block rounded-lg">
        <img className=" w-full h-screen object-cover" src={img} alt="" />
      </div>
      <div className=" bg-gray-100 flex flex-col justify-center rounded-lg">
      
        <form
          //   action="/home"
          onSubmit={handleSubmit}
          className=" max-w-[400px] w-full mx-auto bg-white p-4 rounded-xl"
        >
          <h2 className=" text-4xl text-center font-bold py-6">Log in</h2>
          <div className=" flex flex-col py-2">
            <label htmlFor="username">Username</label>
            <input
              className=" border p-2"
              type="text"
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className=" flex flex-col py-2">
            <label htmlFor="password">Password</label>
            <div className=" relative ">
        <input
          type={showPassword ? 'text' : 'password'}
          id="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
          className='border p-2 w-full'
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className=' absolute inset-y-0 right-0 p-2 flex items-center'
        >
          {showPassword ? <AiFillEye size={20}/> : <AiFillEyeInvisible size={20}/>}
        </button>
      </div>
          </div>
          <button className=" border w-full my-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white">
            Sign In
          </button>
          <div className=" flex justify-between">
            <p className=" flex items-center">
              <input className=" mr-2" type="checkbox" />
              Remember me
            </p>
            <p>
              <a href="/signup">Create an Account?</a>
            </p>
            </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;