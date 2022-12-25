import React from 'react'
import { NavLink } from 'react-router-dom'
import "./QuesPage.css"

const QuesPage = (props) => {

  return (
    <>
        <div className='quespage'>
          <div className='quespage-head'>
           <div className='quespage-link'>
             <NavLink className="active" to={"/OpenQues"} state={
                 { 
                  id:props.id,
                  userId:props.userId,
                  }
                  }><h1 style={{fontWeight:"normal"}}>{props.heading}</h1></NavLink>
            </div>
              <div className='quespage-info'>
                    <i>posted by :-{props.username}</i>
              </div>
          </div>
              <div className='quespage-body'>
               <p style={{padding:"10px",fontSize:"large"}}>{props.content}</p>
               </div>
          </div>
    </>
  )
}

export default QuesPage