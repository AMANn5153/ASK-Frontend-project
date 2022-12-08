import React from 'react'
import NavBar from './Navbar'
import './Read.css';

const Read=()=>{
    return(
        <>
           <div className='read-div-styl'>
            <div className="read-div-nav-styl">
                <NavBar/>
            </div>
            <div className='read-div-bod-styl'>
                <div className='read-templ-styl'>
                    <div className='read-heading'>
                       <div className='underline-styl'> <h1>Top <span>Read</span></h1></div>
                    </div>
                </div>
                <div className='read-side-temp-styl'>
                    <div className="read-side-box">
                        <div className="read-side-head">
                            <h1>Ne<span>ws</span></h1>
                        </div>
                    </div>
                </div>
            </div>
           </div>
        </>


    )
}
export default Read;
