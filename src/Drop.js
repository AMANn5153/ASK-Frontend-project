import React from 'react'
import './Drop.css'
const Drop=()=>{
    return(
        <>
            <div className="card-guide">
                <div className="card-guide-heading">
                   <div className='card-logo'><h1>ASK</h1></div>
                   <div className='card-head'><h3>Guidlines</h3></div> 
                </div>
                <div className='card-guide-guidelines'>
                        <ul>
                        <div className='guide'><li>ask releveant Question</li></div>
                        <div className='guide'><li>write the code in appropriate form</li></div>
                        <div className='guide'><li>Dont ask opinion Based Question</li></div>
                        </ul>
                </div>
            </div>
        </>
    )
}
export default Drop;