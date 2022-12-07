import React,{useEffect, useState} from 'react'
import "./comment.css"
import CommRep from './CommRep'
import  { fetchUser } from '../feature/UserInfo/UserInfo'
import {AiOutlineLike} from "react-icons/ai"
import { useDispatch, useSelector } from 'react-redux'
import { postLike } from '../feature/Comments/comments'
import { postReply,} from '../feature/Reply/Reply'


const CommAns = (props) => {
  const {id,commentId}=props
  const [showReply,setReply]=useState("")
  const [showLike,setLike]=useState(0)
  const dispatch=useDispatch()
  const user=useSelector((state)=>state.UserInfo)
  console.log("user",user)

  const submitReply=(e)=>{
    e.preventDefault()
    dispatch(postReply({commentId,message:showReply}))
    setReply("")
  }


  useEffect(() => {
    dispatch(fetchUser({id:id}))
  }, [dispatch,fetchUser])

  
  
  const replyHandler=(e)=>{
    let value=e.target.value
    setReply(value)
  }

  const postLike=()=>{
    setLike(setLike+1)
    dispatch(postLike(showLike))
  }

  
  return (<>
    <div className='CommAns-styl'>
      <div className="Answer">
        <h1></h1>
      </div>
      <div className='commans-content-styl'>
        <p>
        {props.content}
        </p>
      </div>
      <div className='footer-commans'>
        <div className='timing'>
          <p></p>
        </div>
        <div  className="ans-like">
          <button className='like-btn' onClick={postLike}><AiOutlineLike size={20}/></button>
        </div>
        <div className='comment-profile'>
          <i>posted by:-{user.userinfo}</i>
        </div>
      </div>
      <CommRep data={props.reply}/>
      <input className='comment-input' placeholder='comment' name="reply" value={showReply} onChange={replyHandler}/>
      <button className="reply-btn" onClick={submitReply} disabled={showLike?true:false}>reply</button>
    </div>
   
    </>
  )
}

export default CommAns