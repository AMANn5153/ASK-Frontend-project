import React, {useState,useEffect,useRef } from 'react'
import "./UserInfo.css"
import NavBar from "./Navbar"
import Profile from "./Profile"
import Activity from "./Activity"
import Saves from "./Saves"
import { useSelector, useDispatch } from 'react-redux'
import { accountFetchUser,clearTheInfo,profilePic,getProfilePic} from './feature/UserInfo/UserInfo'
import Edit from './Edit'

const style={
  imagediv:{
    width:"150px",
    height:"150px",
    borderRadius:"10px",
    color:"orange"
  },
 
  heading:{
    fontWeight:"normal",
    fontSize:"larger"
    
  }
}

export const TabNav=(props)=>{
 
  const onActiveHandle=()=>{
    props.setActive(props.title)
  }
  return(
    <li onClick={onActiveHandle} className={props.showActive===props.title?"userInfo-active":" "}>{props.title}</li>
  )
}

export const TabContent=(props)=>{
  return(
    props.showActive===props.title?props.children:null
  )
}


const UserInfo = () => {

  const dispatch=useDispatch()
  const [Active,setActive]=useState("profile");
  const [pic,setPic]=useState()
  const [info,setInfo]=useState({
    username:"",email:"",profilePic:"" ,about:"",post:[]
  })
  const stateInfo =useSelector(state=>state.UserInfo.accountUserInfo)

  

  useEffect(() => {// fethcing all the information of user 
    dispatch(accountFetchUser())
    dispatch(getProfilePic())                                        
    
  }, [dispatch])
  
  useEffect(() => {
    if(stateInfo[0].status==="fulfilled"){
      setInfo({...info,username:stateInfo[1].username,email:stateInfo[1].email,profilePic:stateInfo[0].proPicURL,about:stateInfo[1]?.About,post:stateInfo[1].Post})
      dispatch(clearTheInfo())
    }
  }, [dispatch,info,stateInfo])
  
   
  const triggerSubmit = useRef(false)//it is a refernce to trigger the submiation of profile picture that is uploaded

  const handleTheChange=(e)=>{/// hadeling the the pic by turning the triggersubmit to true 
    triggerSubmit.current=true;
    setPic(e.target.files[0])   
  }

 // checking if triggersubmit  is true,then dispatching the action with payload as formdata object 
    if(triggerSubmit.current===true){
      const formData=new FormData()// creating a object of FormData object 
      formData.append("pic",pic)
      dispatch(profilePic(formData))
      triggerSubmit.current=false
    }
  
  

  return (
    <>
    <div className='account-page'>
        <div className='account-navbar'>
          <NavBar/>
        </div>
        <div className='account-body-layout'>
        <div className='account-body-header'>
        <div className='account-body-image'>
          <div style={style.imagediv} >
              <img src={info.profilePic} width="150px" height="150px" alt="pic"/>
          </div>
          <div ><button className='userInfo-btn'>upload<input type="file" onChange={handleTheChange} ></input></button></div>
        </div>
            <div className='account-body-info'>
              <h1 style={style.heading}>{info.username}</h1>
              <h2 style={style.heading}>{info.email}</h2>
              <h3 style={style.heading}>this is test</h3>
              <p></p>
            </div>
            <div className='account-body-button'>
            <Edit/>
            </div>
        </div>
        <div className='account-body'>
        <div className='account-body-tabs '>
        <ul className='nav'>
          <TabNav title="profile" showActive={Active} setActive={setActive}/>
          <TabNav title="activity" showActive={Active} setActive={setActive}/>
          <TabNav title="saves" showActive={Active} setActive={setActive}/>
        </ul>
          <div>
            <TabContent title="profile" showActive={Active}><Profile info={info}/></TabContent>
            <TabContent title="activity" showActive={Active}><Activity/></TabContent>            
            <TabContent title="saves" showActive={Active}><Saves/></TabContent>            
          </div>
        </div>
        </div>
        </div>
        <div className="account-footer">
          <h1>footer</h1>
        </div>
    </div>
        
    </>
  )
}

export default UserInfo