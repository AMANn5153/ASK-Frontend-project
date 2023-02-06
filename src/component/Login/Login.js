import React, { useState } from 'react'
import NavBar from '../Navbar/Navbar'
import "./Login.css"
import login from "./login.svg"
import Heading from '../Extras/Heading'
import {useNavigate,NavLink} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux'
import { postLogin,Logged,out } from '../../feature/Log_in_out/Login_out'
import { useCookies } from 'react-cookie'

const Login = () => {
  const [showCookie,setCookie]=useCookies(['auth'])
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
    toast(state.message,{
          position:"top-center",
          pauseOnHover:false,
          theme:"light",
    })}
  if(state.status==="fulfilled"){
    setCookie('auth',state.token,{
    path:"/",
    expires:new Date(Date.now()+3600000),
  })
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
                        <NavLink to="/Login/PasswordChange">forget password ?</NavLink>
                      
                        </div>
                </div>
            </div>
        </div>
        <ToastContainer/>
    </>
  )
}

export default Login