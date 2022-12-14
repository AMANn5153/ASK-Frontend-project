import React,{useEffect,useContext} from 'react'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Popup from 'reactjs-popup'
import { storeData,storeCodeSnip } from '../../feature/ASK/Ask'
import "./Preview.css"
import { previewCon } from './Ask'

const Preview = () => {
    const data=useContext(previewCon)
    const {text,askText,input}=data
    const dispatch=useDispatch()
    const handleChange=useCallback(()=>{dispatch(storeData({text,askText,input}))})
    if(data.triggerSubmit.current===true)
    {
        console.log(data.image)
        const imageUrl=window.URL.createObjectURL(data.image)
        dispatch(storeCodeSnip(imageUrl))
        data.triggerSubmit.current=false
    }
    const stateAsk=useSelector(state=>state.ask)
    console.log(stateAsk)
  return (
    <>
        <Popup trigger={<button className="Ask-preview-btn" disabled={data?.disablingButton?false:true}>Preview</button>} onOpen={()=>{handleChange()}}  modal nested>
        {close=>(
            <div className='Ask-preview'>
            <button className="close-btn" onClick={close}>&times;</button>
                <div className="Ask-preview-title">
                    <h1>{stateAsk.title}</h1>
                </div>
                <div className='Ask-preview-problem'>
                    <p>{stateAsk.questionDes}</p>
                    <img src={stateAsk.askImages} width="300px" height="300px"></img>
                </div>
                <div className='Ask-preview-expec'>
                    <p>{stateAsk.questionExpec}</p>
                </div>
            </div>
        )}
        </Popup>
    </>
  )
}

export default Preview