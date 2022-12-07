import React from 'react';
import Ask from './Ask';
import './Dash.css';
import Drop from './Drop';
import NavBar from './Navbar';
import Footer from './Footer';
import { footer } from './Welcome/Darray';
import './Dash.css'
const Dash=()=>{
    return(
        <>
        <div className='dash'>
            <div className="Nav"><NavBar/></div>
            <div className='main-dash-div' >
            <div className='ques-div-styl'>
                <Ask></Ask>
            </div>
            <div className='card-guidline'>
                <Drop></Drop>
            </div>
            </div>
            <div className='footer'>
                <div className='footer-content'>
                    {footer.map((val)=>{
                        return(
                            <Footer head={val.head}
                                li1={val.li1}
                                li2={val.li2}
                                li3={val.li3}
                            />
                        )
                    })}
                </div>
                    <div className='copy'>
                    <p> @2022AmanNegi</p>
                    </div>
                </div>
            
        </div>
        </>


    )
}
export default Dash;