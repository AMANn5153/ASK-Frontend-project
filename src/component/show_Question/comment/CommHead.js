import { useEffect,useContext } from 'react'
import "./comment.css"
import {AiOutlineLike} from "react-icons/ai"
import { useDispatch, useSelector } from 'react-redux'
import { Post,postedLike,reDeclareError,getLikes } from '../../../feature/Question/Question'
import { checkUser,sameUserError } from '../../../feature/UserInfo/UserInfo'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { locationCon } from '../OpenQues'




const CommHead = () => {
    const loc=useContext(locationCon)
    const dispatch=useDispatch()
    const questionState=useSelector((state)=>state.question.Like)
    const check=useSelector(state=>state.UserInfo)
    useEffect(() => {
        dispatch(checkUser({id:loc.id,Postid:loc.Postid}))
        dispatch(getLikes({id:loc.id,Postid:loc.Postid}))
        },[dispatch,loc.id,loc.Postid])
        

    const likeButton=check.error||questionState.error

    const likeSave=()=>{ 
        dispatch(Post({id:loc.id,Postid:loc.Postid})) 
     }


     const LikeButton=()=>{
        return(
            <button className='like-btn' onClick={likeSave} >{questionState.Likes.length}<AiOutlineLike size={25}/></button>  
        )
     }
     const DisableButton=()=>{
        return(
            <i style={{color:"orange"}}>{questionState.Likes.length} {questionState.Likes.length>1?"Likes":"Like"}</i>
        )
     }

    if(questionState.status==="fulfilled"){
     dispatch(postedLike({status:"idle"}))
    }
    else if(questionState.status==="rejected"){
        if(questionState.message!==""){
     toast(questionState.message,{
        position:"top-center",
        pauseOnHover:false,
        theme:"light",
      })}
     dispatch(reDeclareError({message:"",status:"idle", error:"false"}))
  }

  if(checkUser.status==="rejected"){
   dispatch(sameUserError({status:false}))
  }
 
  return (
    <div className='head-style-comm'>
        <div className='first-two-div'>
            <div className='head-comm'>
                <h1>
                    {loc.heading}
                </h1>
            </div>
            <div className='account-info'>
                <i>
                   posted by:- {loc.username}
                </i>
            </div>
        </div>
        <div className='two-two-style'>
            <div className='upload-time-display'>
                <p>

                </p>
            </div>
            <div className='like-button'>
                {likeButton===true?<DisableButton/>:<LikeButton/>}
            </div>
        </div>
        <ToastContainer/>

    </div>

  )
}

export default CommHead