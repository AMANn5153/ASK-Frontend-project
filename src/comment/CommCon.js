import React from 'react'
import "./comment.css"

const CommCon = (props) => {
  return (
    <div className='commCon-style'>
        <p>
            {props.content}
        </p>
    </div>
  )
}

export default CommCon