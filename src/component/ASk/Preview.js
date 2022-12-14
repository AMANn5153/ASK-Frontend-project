import React,{useEffect} from 'react'
import { useDispatch } from 'react-redux'
import Popup from 'reactjs-popup'
import "./Preview.css"

const Preview = (props) => {
    const {data}=props
    const dispatch=useDispatch() 
       

  return (
    <>
        <Popup trigger={<button className="Ask-preview-btn" >Preview</button>} modal nested>
        {close=>(
            <div className='Ask-preview'>
            <button className="close-btn" onClick={close}>&times;</button>
                <div className="Ask-preview-title">
                    
                </div>
                <div className='Ask-preview-problem'>

                </div>
                <div className='Ask-preview-expec'>

                </div>
            </div>
        )}
        </Popup>
    </>
  )
}

export default Preview