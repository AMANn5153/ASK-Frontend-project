import React, { useState } from 'react';
import NavBar from './Navbar';
import Heading from './Welcome/Heading';
import regisimg from './regisimg.svg'
import {ImUser} from "react-icons/im"
import {AiOutlineMail} from "react-icons/ai"
import { MdPassword} from "react-icons/md"
import {FaHouseUser} from "react-icons/fa"
import "./Registration.css"
import { NavLink } from 'react-router-dom';




const Registration=()=>{
    const[showField,setField]=useState({
        username:"",email:"",Password:""
    })
    
    let name,value
    const changeHandler=(e)=>{
        name=e.target.name;
        value=e.target.value;
        setField({...showField,[name]:value})
    }

    const dataT= async (e)=>{
        e.preventDefault();
        
        const {username,email,Password}=showField
        const res = await fetch("/register",{
            method:"post",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                username,email,Password
            })
        })
        const data= await res.json();
        if(res.status===409||!data){
            window.alert(data.error)
        }
        else{
            window.alert(data.message)
        }
    }
    

    

    return(
        <>
            <div className='regis-page'>
                <div className='nav-regis'>
                    <NavBar/>
                </div>
                <div className="regis-page-box">
                <div className='regis-box'>
                    <div className='form-group'>
                        <div className='form-grouhead'><Heading name="Sign Up"/></div>
                    
                        <div className='fields'>
                        <form method="post">
                            <div className='fields-div'>
                              <p className="fields-p">UserName</p>
                                <ImUser/>
                                <input placeholder="UserName" name="username" autoComplete='off' value={showField.username} onChange={changeHandler}/ >
                            </div>
                        
                            <div className='fields-div'>
                             <p className="fields-p">E-MAIL</p>
                                <AiOutlineMail/>
                                <input placeholder="E-MAIL" name="email" autoComplete='off'  value={showField.email} onChange={changeHandler}/ >
                            </div>  
                        
                            <div className='fields-div'>
                              <p className="fields-p">Password</p>
                                <MdPassword/>
                                <input placeholder="Password" name="Password" autoComplete='off'  value={showField.Password} onChange={changeHandler}/ >
                            </div>
                            <div className='fields-div'>
                           <button className='btn-regis' onClick={dataT}>Sign Up</button>
                            </div>
                           </form>
                         </div>
                    </div>
                    <div className='img-svg'>
                        <img src={regisimg} alt="regisimg"/>
                        <NavLink exact className="img-regis-hover"  to="/Login"><FaHouseUser style={{position:"absolute",
                        bottom:"20%",
                        right:"40%",
                        color:"red",
                        boxShadow:"1px 1px 1px  rgb(197, 196, 196)",
                        border:"none"
                        }} size={25} /><span>already a user</span></NavLink>
                    </div>
                </div>
                
                </div>
            </div>
        </>
    )
}
export default Registration