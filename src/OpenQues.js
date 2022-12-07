import React from 'react'
import NavBar from './Navbar'
import { useLocation } from 'react-router'
import Questionpost from './Questionpost'
import "./Question.css"
import "./OpenQues.css"
import Question from './Question'

const OpenQues = () => {
  const location=useLocation();
  console.log(location)

  return (
    <div className='OpenQues'>
      <div className='OpenQues-nav'>
        <NavBar/>
      </div>
      <div className='OpenQues-body'>
        <div className='OpenQues-body-display'>
        <Questionpost
          username={location.state.username}
          title={location.state.heading}
          content={location.state.content}
          Postid={location.state.Postid}
          id={location.state.id}
        />
        </div>
        <div className='OpenQues-body-news'>

        </div>
      </div>
      <div className=''></div>
    </div>
  )
}

export default OpenQues