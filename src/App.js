import React, { createContext, useReducer }  from 'react';
import Dash from './Dash';
import Write from './Write'
import Read from './Read'
import Login from "./Login"
import Registration from "./Registration"
import Question from './Question';
import OpenQues from './OpenQues';
// import NavBar from './Navbar'
import UserInfo from "./UserInfo"
import Welcome from './Welcome';
import {BrowserRouter} from 'react-router-dom';
import { Route, Routes,} from 'react-router-dom';
import Logout from './Logout';

const Rout=()=>{
    return(
        <>
           <BrowserRouter>
      <Routes>
                <Route path="/" element={<Welcome/>}/>
                <Route path="/Question" element={<Question/>}/>
                <Route path='/Dash' element={<Dash/>}/>
                <Route  path='/Write' element={<Write/>}/>
                <Route  path='/Read' element={<Read/>}/>
                <Route  path='/Login' element={<Login/>}/>
                <Route  path='/Register' element={<Registration/>}/>
                <Route  path='/UserInfo' element={<UserInfo/>}/>
                <Route  path='/Logout' element={<Logout/>}/>
                <Route  path='/OpenQues' element={<OpenQues/>}/>

                
      </Routes>

</BrowserRouter>
        </>
    )
}


const App=()=>{

    return(
        <>
        <Rout></Rout>
        </>
    )
}
export default App;