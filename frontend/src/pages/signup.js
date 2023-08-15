import React, { useState } from "react";
import img1 from "../assets/login-bg.jpg";
import {AiFillEyeInvisible,AiFillEye} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate ();


  const handleSubmit = async (event) => {
    event.preventDefault();

    // navigate('/login')
    

      const userObject = {
        username: username,
        email: email,
        password: password
      };
      // Make HTTP request to server-side endpoint
          // fetch("http://192.168.1.13:5000/signup", {
          //   method: "POST",
          //   // mode : "no-cors",
          //   body: JSON.stringify(userObject),
          //   headers: {
          //     "Content-Type": "application/json",
          //   },
          // })
          //   .then((response) => response.json())
          //   .then((data) => console.log(data))
          //   .catch((error) => console.error(error));


            try {
             const response = await fetch("http://192.168.1.13:5000/signup", {
            method: "POST",
            // mode : "no-cors",
            body: JSON.stringify(userObject),
            headers: {
              "Content-Type": "application/json",
            },
          })
              const data = await response.json();
              if(data.signup_status==="successful"){
                navigate('/appform')
                // toast("Wow s easy!");
                
              }else{
                toast.error(data.error,{
                  position:"top-right"
                });
                // alert(data.Error)
              }
              console.log(data);
      
            } catch (error) {
              console.error(error);
            }
  
      

    


    // if (!passwordRegex.test(password)) {
    //   alert('Password must be at least 8 characters long and contain at least one letter and one number.');
    //   return;
    // }
    
  };

  return (
    <div className=" grid grid-cols-1 lg:grid-cols-2 h-screen w-full">
      <div className=" bg-gray-100 flex flex-col justify-center rounded-lg">
        <form
          action="/home"
          onSubmit={handleSubmit}
          className=" max-w-[400px] w-full mx-auto bg-white p-4 rounded-xl"
        >
          <h2 className=" text-4xl text-center font-bold py-6">Sign Up</h2>
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
            <label htmlFor="email">Email</label>
            <input
              className=" border p-2"
              type="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
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
          <button type="submit" className=" border w-full my-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white">
            Register
          </button>
          <div className=" flex justify-between">
            <p className=" flex items-center">
              <input className=" mr-2" type="checkbox" />
              Remember me
            </p>
            <p>
              <a href="/login">Already have account?</a>
            </p>
          </div>
        </form>
        <ToastContainer />
      </div>
      <div className="hidden  lg:block rounded-lg">
        <img className=" w-full h-screen object-cover" src={img1} alt="" />
      </div>
    </div>
  );
};

export default Signup;