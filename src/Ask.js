import React, {useState} from 'react'
import './Ask.css'
import {FaBold,FaItalic,FaUndoAlt,FaRedoAlt} from 'react-icons/fa'
import {ImListNumbered} from 'react-icons/im'
import {MdFormatListBulleted} from 'react-icons/md'
import {AiOutlineFontColors} from 'react-icons/ai'

const Ask= () => {
  const [askFields, setAskFields] = useState({
    title:"",ques:""
  })
  let name,value
  const changeAskFileds=(e)=>{
    name=e.target.name;
    value=e.target.value;
  
    setAskFields({...askFields,[name]:value})
  }
  
  const postAskFields=async (event)=>{
    const {title,ques}=askFields
    event.preventDefault()
    const res=await fetch("/Ask",{
      method:"post",
      headers:{
          "content-type":"application/json"
      },
      body:JSON.stringify({
          title,ques
      })
    })
    const result= await res.json();
    if(res.status===404||!result){
      window.alert(result.error)
    }
    else{
      window.alert(result.message)
    }

  }

  return (
    <>
        <div className='Ask-div'>
          <label >Title</label>
          <input name="title" value={askFields.title} onChange={changeAskFileds} placeholder="enter the title"></input>
           <label>Question</label>
           <div className='write-div'>
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
                    <textarea className='write-text' placeholder="Start writing the stuff from here" name="ques" value={askFields.ques} onChange={changeAskFileds} >

                    </textarea>
                </div>
            </div>
                <button className='post-btn' onClick={postAskFields}>POST</button>
            </div>
    </>
  )
}

export default Ask