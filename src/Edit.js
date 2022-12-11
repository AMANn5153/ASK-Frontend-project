import React, { useState } from 'react'
import Popup from "reactjs-popup"
import './UserInfo.css'
import "./Edit.css"
import { TabContent, TabNav } from './UserInfo'
import { useDispatch, useSelector } from 'react-redux'
import { postAddInfo } from './feature/UserInfo/EditProfile'
import { ToastContainer, toast } from 'react-toastify';



const AddInfo=()=>{
  const dispatch=useDispatch()
  const stateAddInfo=useSelector(state=>state.editingProfile)

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
  if(state.status==="pending"){
    toast(state.message,{
      position:'top-center',
      pauseOnHover:false,
      theme:"light"
    })
  }
  else if(state.status==="fulfilled"){
    toast(state.message,{
      position:'top-center',
      pauseOnHover:false,
      theme:"light"
    })
  }
  else if(state.status==="rejected"){
    toast(state.message,{
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

const Edit = () => {
  const [showActive,setActive]=useState("Edit")
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
              <TabNav title="Add Info" showActive={showActive} setActive={setActive}/>
            </ul>
              <div >
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