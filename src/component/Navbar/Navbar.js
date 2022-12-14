import React ,{useEffect} from 'react'
import {NavLink,Link} from 'react-router-dom'
import './NavBar.css'
import Animation from '../Extras/Animation'
import {ask} from '../Extras/Darray'
import { FaUserCircle} from 'react-icons/fa'
import {IoIosNotifications} from 'react-icons/io'
import {BiLogOutCircle,BiLogInCircle,BiRegistered} from "react-icons/bi"
import { useDispatch, useSelector } from 'react-redux'
import { out } from '../../feature/Log_in_out/Login_out'


const Iconsnav=()=>{
    return(
        <>
            <NavLink className="active_class " to="/"><IoIosNotifications size={25}/><span>Notification</span></NavLink> 
            <NavLink className="active_class " to="/UserInfo"><FaUserCircle size={25}/><span>Account</span></NavLink> 
            <NavLink className="active_class " to="/Logout"><BiLogOutCircle size={25}/><span>Logout</span></NavLink> 
        </>
    )
}
const Sign=()=>{
    return(
    <>
    <NavLink className="active_class " to="/Register"><BiRegistered size={25}/><span>Sign Up</span></NavLink> 
    <NavLink className="active_class " to="/Logout"><BiLogInCircle size={25}/><span>Sign In</span></NavLink> 
    
    </>
    )
}

const NavBar=()=>{
    const dispatch=useDispatch()
    useEffect(() => {
    if(localStorage.getItem("logged")){//checking whether the user is still Logged in or not from LocalStorage
        dispatch(out({loginOrOut:true,status:"fulfilled"}))//dispacthing "out" action 
       }
    }, [dispatch])
    
    const stateInOut=useSelector(state=>state.Login)//getting state of login reducer

    console.log(stateInOut)
    return(
        <>
        <nav className='nav-div-styl'>
        {/* <div className="nav-div-styl"> */}
            <div className='nav-div-head-styl'>
           <Link to='/'> {
                ask.map((val)=>{return(
                    <Animation name={val}/>)
                })}
            </Link>
            </div>
            <div className='nav-div-list-styl'>
                <ul className='ul-styl'>
                    <li><div className='div-link'><NavLink exact className="active_class "  to="/Question">Question</NavLink></div></li>
                    <li><div className='div-link'><NavLink exact className="active_class "  to="/Ask">Ask</NavLink></div></li>
                </ul>
            </div>
            <div className='nav-div-sm-styl'>
           {stateInOut.loginOrOut===true?<Iconsnav/>:<Sign/>} 
           {/* checking wether userlogged in or not */}
             </div>
        {/* </div> */}
        </nav>

        </>


    )
}

export default NavBar;