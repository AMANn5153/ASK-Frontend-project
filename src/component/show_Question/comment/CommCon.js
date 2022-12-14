import {useContext} from 'react'
import "./comment.css"
import { locationCon } from '../OpenQues'

const CommCon = (props) => {
  const loc=useContext(locationCon)
  return (
    <div className='commCon-style'>
        <p>
            {loc.content}
        </p>
    </div>
  )
}

export default CommCon