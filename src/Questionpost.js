import React, { useState,useEffect } from 'react'
import { ToastContainer, toast,Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Write from './Write'
import CommHead from './comment/CommHead'
import CommCon from './comment/CommCon'
import CommAns from './comment/CommAns'
import CommRep from './comment/CommRep'
import Humfirst from "./Welcome/Humfirst"
import {FaBold,FaItalic,FaUndoAlt,FaRedoAlt, FaWindows} from 'react-icons/fa'
import {ImListNumbered} from 'react-icons/im'
import {MdFormatListBulleted} from 'react-icons/md'
import {AiOutlineFontColors} from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { commentPosted,sendComment,fetchingComments} from './feature/Comments/comments'
import { useNavigate } from 'react-router'




const Questionpost = (props) => {
  const {id,Postid}=props
  const dispatch=useDispatch()
  const state=useSelector((state)=>state.comment)
  const comment=state.comment
  console.log(comment)
  const len=comment.length
  const navigate=useNavigate()
  const [showComment,setComment]=useState({comment:""})
  
  
  useEffect(() => {//getting all the comments for the question
    dispatch(fetchingComments({id,Postid}))
  }, [dispatch,fetchingComments,id,Postid])
 


  let name,value;
  const commentChange=(e)=>{
      name=e.target.name;
      value=e.target.value;
    setComment({...showComment,[name]:value})
  }

  const submitComment=(e)=>{// dispatch  to posting comment thunk
      e.preventDefault();
      if(state.status==="idle"){
      dispatch(sendComment({comment:showComment.comment,userId:id,Postid:Postid}))
      }
      setComment({comment:""});  
  }

  if(state.status==="fullfilled"){
//handling the messages wether its failed or success ;
    toast(state.message,{
      position:"top-center",
      autoClose:3000,
      transition:Flip
    })
      dispatch(commentPosted("idle"))
      if(state.message==="Please loggin first"){
      setTimeout(() => {
        navigate("/Login")
      }, 2000);}
  }

  


  return (
  <>
    <div style={{
      margin:"10px",
    }}>
      <CommHead
        head={props.title}
        username={props.username}
        id={id}
        Postid={Postid}
      />
      <CommCon
        content={props.content}
      />
      <h1 style={{fontWeight:"normal"}}>{len} {len>1?"Answers":"Answer"}</h1>
      {comment.map((val)=>{
        return(
        <CommAns
          content={val.comment}
          id={val.commenterid}
          commentId={val._id}
          reply={val.reply}
        />)
      })}
    
    </div>
   
    <h1 style={{
      margin:"10px",
      fontWeight:"normal"
    }}>Your Answer :</h1>
    <div style={{padding:"15px"}}>
    <div  style={{width:"500px",
                    height:"250px",
                    display:"grid",
                    gridTemplateRows: "1fr 5fr",
                    border: "3px solid orange"}} >
                <div className="write-div-head">
                    <div className='btn-div'>
                    <button className='btn-write' title="bold"><FaBold/></button>
                    <button className='btn-write' title='italic'><FaItalic/></button>
                    <button className='btn-write' title='numbered list'><ImListNumbered/></button>
                    <button className='btn-write' title='bullet points'><MdFormatListBulleted/></button>
                    </div>
                    <div className='btn-div'>
                    <button className='btn-write' title='undo'><FaUndoAlt/></button>
                    <button className='btn-write' title='redo' data-toggle="tooltip" ><FaRedoAlt/></button>
                    </div>
                    <div className='btn-div'>
                    <button className='btn-write' title="outline"><AiOutlineFontColors/></button>
                    </div>
                </div>
                <div className='write-div-bod'>
                    <textarea className='write-text' placeholder="Start writing the stuff from here"  name="comment" value={showComment.comment} 
                    onChange={commentChange} >

                    </textarea>
                </div>
            </div>
            <div className='btn-div-post'>
                <button className='post-btn' onClick={submitComment}>POST</button>
                <ToastContainer />

            </div>

    </div>
 </>
  )
}

export default Questionpost






















































