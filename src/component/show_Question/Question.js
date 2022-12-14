import './Question.css'
import Navbar from '../Navbar/Navbar';
import QuesPage from './QuesPage';
import { useSelector,useDispatch } from 'react-redux'
import { dataFetch } from '../../feature/Question/Question';
import { useEffect } from 'react';
import Loading from '../Extras/Loading';


const FulFilledQuestion=(props)=>{
  return(
    <>
       <div className='Question'>
            <div className='question-nav'>
            <Navbar/>
            </div>
            <div className='question-body'>
            <div className='heading-ques'><h1>Question</h1></div>
            {props.data.post.map((val)=>{
              const id=val._id
              const username=val.username
              console.log(props)
               return(
                 val.Post.map((postVal,index)=>{
                    return(
                      <QuesPage 
                        key={index}
                        username={username}
                        id={id}
                       Postid={postVal._id} 
                       heading={postVal.title}
                      content={postVal.ques}
                      />
                )
              }))    
        })}
            </div>

        </div>
    </>

  )
}

export const PendingQuestion=()=>{
  return(
   <Loading/>
  )
}


const Question = () => {
   const dispatch=useDispatch()
   const stateData = useSelector(state=>state.question)
   
   useEffect(() => {
    if(stateData.post.length===0){
    dispatch(dataFetch())
  }
 },[dispatch,stateData.post.length])
   console.log(stateData.console)

  return (
    <>
       {stateData.Status==="pending"?<PendingQuestion/>:<FulFilledQuestion data={stateData}/>}
    </>
  )
}

export default Question