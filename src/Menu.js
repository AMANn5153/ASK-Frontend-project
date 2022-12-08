import React from 'react'   
import {BrowserRouter} from 'react-router-dom';
import { Route, Routes,} from 'react-router-dom';
import Ask from './Ask';
import Write from './Write'
import Read from './Read'
import NavBar from './Navbar';
import Welcome from './Welcome'
import Registration from './Registration';

const Menu=()=>{
    return(
        <>
                <NavBar/>
                <Routes>
                <Route exact path='/' element={<Welcome/>}/>
                <Route exact path='/Ask.js' element={<Ask/>}/>
                <Route exact path='/Write' element={<Write/>}/>
                <Route exact path='/Read' element={<Read/>}/>
                <Route exact path='/Registration' element={<Registration/>}/>
                </Routes>
        </>
    )
}
export default Menu;
