import React from 'react'
import NavBar from '../Navbar/Navbar'
import { useLocation } from 'react-router'
import Questionpost from './Questionpost'
import "./Question.css"
import "./OpenQues.css"
import { createContext } from 'react'


export const locationCon=createContext()

const OpenQues = () => {
  const location=useLocation();

  return (
    <div className='OpenQues'>
      <div className='OpenQues-nav'>
        <NavBar/>
      </div>
      <div className='OpenQues-body'>
        <div className='OpenQues-body-display'>
        <locationCon.Provider value={location.state}> 
        <Questionpost
        /></locationCon.Provider>
        </div>
        <div className='OpenQues-body-news'>

        </div>
      </div>
      <div className=''></div>
    </div>
  )
}

export default OpenQues