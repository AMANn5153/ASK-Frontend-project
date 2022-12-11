import React, { useState } from 'react'
import Popup from "reactjs-popup"
import './UserInfo.css'
import "./Edit.css"
import { TabContent, TabNav } from './UserInfo'
import { useDispatch, useSelector } from 'react-redux'
import { postAddInfo,cleanState } from './feature/UserInfo/EditProfile'
import { ToastContainer, toast } from 'react-toastify';



const AddInfo=()=>{
  const dispatch=useDispatch()
  const stateAddInfo=useSelector(state=>state.editProfile)
  console.log(stateAddInfo)
  const [newInfo,setNewInfo]=useState({
    mobile:"",profession:"",college:"",company:""
  })

  let name,value

  const handleEditChanges=(e)=>{
    name=e.target.name
    value=e.target.value
    setNewInfo({...newInfo,[name]:value})
  }
  const addInfoSub=(e)=>{
    e.preventDefault();
    dispatch(postAddInfo(newInfo))
    setNewInfo({...newInfo,mobile:"",profession:"",college:"",company:""})
  }
  if(stateAddInfo.status==="pending"){
    toast(stateAddInfo.message,{
      position:'top-center',
      pauseOnHover:false,
      theme:"light"
    })
  }
  else if(stateAddInfo.status==="fulfilled"){
    toast(stateAddInfo.message,{
      position:'top-center',
      pauseOnHover:false,
      theme:"light"
    })
    dispatch(cleanState())
  }
  else if(stateAddInfo.status==="rejected"){
    toast(stateAddInfo.message,{
      position:'top-center',
      pauseOnHover:false,
      theme:"light"
    })
  }

  return(
    <>
        <form>
          <input autoComplete='off' placeholder="Mobile Number" name="mobile" value={newInfo.mobile} onChange={handleEditChanges}/>
          <input autoComplete='off' placeholder="profession" name="profession" value={newInfo.profession} onChange={handleEditChanges}/>
          <input autoComplete='off' placeholder="college" name="college" value={newInfo.college} onChange={handleEditChanges}/>
          <input autoComplete='off' placeholder="company" name="company" value={newInfo.company} onChange={handleEditChanges}/>
          <div className='editingProfile-btn'>
          <button className="btn" onClick={addInfoSub}>submit </button>
          </div>
        </form>    
      <ToastContainer/>
    </>
  )
}

const EditingProfile=()=>{
  
  return(
    <>
      <input placeholder='UserName'/>
      <input placeholder='Email'/>
      <input placeholder='Password'/>
      <input placeholder="Mobile No"/>
      <input placeholder="Profession"/>
      <input placeholder="College"/>
      <input placeholder="Company"/>
      <div className='editingProfile-btn'>
      <button className="btn">submit </button>
      </div>
    </>
  )
}

const Edit = (props) => {
  const {info}=props
  const [showActive,setActive]=useState("Edit")
  console.log(info)
  const tabsBool=info.mobile===undefined||info.profession===undefined||info.college===undefined||info.comapny===undefined
  console.log("tabBool",tabsBool)
  return (
    <>
    <div>
        <Popup trigger={<button className='userInfo-btn'>Edit Profile</button>}
        modal
        nested
        >
        {close=>(        
          <div className='modal'>
          <button className="close-btn" onClick={close}>&times;</button>
            <ul className='nav'>
              <TabNav title="Edit" showActive={showActive} setActive={setActive}/>
             {tabsBool?"":<TabNav title="Add Info" showActive={showActive} setActive={setActive}/>}
            </ul>
              <div style={{display:"flex",flexDirection:"column"}}>
              <TabContent title="Edit" showActive={showActive}><EditingProfile/></TabContent>
              <TabContent title="Add Info" showActive={showActive}><AddInfo/></TabContent>
              </div>            
          </div>)}
        </Popup>
    </div>
    </>
  )
}

export default Edit