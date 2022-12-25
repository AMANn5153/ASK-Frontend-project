import React,{useEffect, useMemo, useState}  from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cleanTheState } from '../../../feature/Reply/Reply'
import { fetchUser } from '../../../feature/UserInfo/UserInfo'
import "./comment.css"


const CommRep = (props) => {
  const replierName=useSelector(state=>state.UserInfo.userinfo)
  const dispatch=useDispatch()
  
  
  useMemo(() => {
    dispatch(fetchUser({id:props.data.replyId}))
  }, [dispatch,props.data.replyId])
  
  
 
  return (
    <div className='reply'>
        {props.data.map((val)=>{
          return(<>
            <p className='reply-content'>{val.message}</p>
            <p style={{color:"blue",margin:"3px"}} className='reply-user'>-{replierName}</p>
            </>
          )

        })}
        
    </div>
  )
}

export default CommRep