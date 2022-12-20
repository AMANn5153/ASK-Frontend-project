import React, { useState } from 'react'
import NavBar from '../Navbar/Navbar'
import "./Login.css"
import login from "./login.svg"
import Heading from '../Extras/Heading'
import {useNavigate} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux'
import { postLogin,Logged,out } from '../../feature/Log_in_out/Login_out'
import { PendingQuestion } from '../show_Question/Question'

const Login = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const state=useSelector(state=>state.Login)
  const [showField,setField]=useState({
    email:"",Password:""
  })
  let name,value

  const fieldHandler=(e)=>{
     name=e.target.name;
     value=e.target.value;

    setField({...showField,[name]:value})
  }


  const dataT=async(e)=>{
    e.preventDefault();
    dispatch(postLogin(showField))
    setField({...showField,email:"",Password:""})
  }

  if(state.status==="pending"){
    <PendingQuestion/>
  }
  else if(state.status==="fulfilled"){
    dispatch(Logged({loginOrOut:true}))
    navigate("/") 
  }
  else if(state.status==="rejected"){
    toast(state.message,{
          position:"top-center",
          pauseOnHover:false,
          theme:"light",
        })
    dispatch(out({loginOrOut:false,status:"idle"}))
  }

  return (
    <>
        <div className='Login-page'>
            <div className='Login-page-navbar'>
                <NavBar/>
            </div>
            <div className='Login-content'>
                <div className='Login-content-box'>
                        <div className="login-form">
                            <Heading name="Login"/>
                            <form method="post">
                            <div>
                              <input placeholder="email" name="email" value={showField.email} onChange={fieldHandler} autoComplete='off' />
                            </div>
                            <div>
                              <input placeholder="Password" type="password" name="Password" value={showField.Password} onChange={fieldHandler} autoComplete='off' />
                            </div>
                            <button className='btn' onClick={dataT}>Log in</button>
                            </form>
                        </div>
                        <div className='login-img'>
                        <img src={login} alt="login.svg"/>
                        </div>
                </div>
            </div>
        </div>
        <ToastContainer/>
    </>
  )
}

export default Login