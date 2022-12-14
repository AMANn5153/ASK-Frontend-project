import React from 'react'
import Animation from './Animation';
import { ask} from './Darray';
import './hum.css'

const Loading = () => {
  return (
    <>
        <div className='Hum-div-styl'>
            {ask.map((val)=>{
                return(
                    <Animation
                        name={val}
                    />
                )
            })}
        </div>
    </>
  )
}

export default Loading