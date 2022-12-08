import React from 'react'
import './NavBar.css'
const NavBar=()=>{
    return(
        <>
        <nav>
        <div className="nav-div-styl">
            <div className='nav-div-head-styl'>
            <a href=''>
            <h1>De<span className='base'>Bugger?</span></h1>
             </a>
            </div>
            <div className='nav-div-list-styl'>
                <ul className='ul-styl'>
                    <li><div className='div-link'><a className='nav-link' href="">Question</a></div></li>
                    <li><div className='div-link'><a className='nav-link' href="">Write</a></div></li>
                    <li><div className='div-link'><a className='nav-link' href="">Read</a></div></li>
                    <li><div className='div-link'><a className='nav-link' href="">Ask</a></div></li>
                </ul>
            </div>
            <div className='nav-div-sm-styl'>
            </div>
        </div>
        </nav>

        </>


    )
}

export default NavBar;