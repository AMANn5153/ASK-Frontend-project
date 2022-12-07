import React, { useState } from 'react'
import Popup from "reactjs-popup"
import './UserInfo.css'
import "./Edit.css"
import { TabContent, TabNav } from './UserInfo'


const AddInfo=()=>{
  const [newInfo,setNewInfo]=useState({
    Mobile:"",profession:"",college:"",company:""
  })

  let name,value

  const handleEditChanges=(e)=>{
    name=e.target.name
    value=e.target.value
    setNewInfo({...newInfo,[name]:value})
  }

  return(
    <>
        <form>
          <input placeholder="Mobile Number" name="Mobile" value={newInfo.Mobile} onChange={handleEditChanges}/>
          <input placeholder="profession" name="profession" value={newInfo.profession} onChange={handleEditChanges}/>
          <input placeholder="college" name="college" value={newInfo.college} onChange={handleEditChanges}/>
          <input placeholder="company" name="company" value={newInfo.company} onChange={handleEditChanges}/>
          <div className='editingProfile-btn'>
          <button className="btn">submit </button>
          </div>
        </form>    
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