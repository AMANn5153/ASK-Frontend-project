import React,{useState} from 'react'
import Animation from '../Extras/Animation';
import { ask } from '../Extras/Darray';
import { sendEmail,resetState } from '../../feature/Log_in_out/passwordChange';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate} from 'react-router';
import { useFormik } from 'formik';


const NewPassword = () => {
    const dispatch=useDispatch()
    const passChangeState=useSelector(state=>state.passChange)
    const navigate =useNavigate;
    
    const query=new URLSearchParams(window.location.search)
 
    const token=query.get("token")
    const email=query.get("email")

    const initialValues={password:"",confirmPassword:""}    
    const {values,handleSubmit,error,touched,handleChange,handleBlur}=useFormik(
        {
            initialValues,

        }
    )
    
    const submit=()=>{
        // dispatch(sendEmail(email)) 
        // setEmail("")
        // navigate("/Login")
    }

    // if(passChangeState.status==="fulfilled"){
    //     toast(passChangeState.message,{
    //         position:"top-center",
    //         pauseOnHover:false,
    //         theme:"light", 
    //     }) 
    //     dispatch(resetState())
    // }
    // else if(passChangeState.status==="rejected"){
    //     toast(passChangeState.message,{
    //     position:"top-center",
    //     pauseOnHover:false,
    //     theme:"light",
    //     })
    //     dispatch(resetState())
    // }

    return(
        <>
            <div style={{
                width:"40rem",
                height:"45%",
                display:"flex",
                flexDirection:"column",
                justifyContent:"center",
                alignItems:"center",
                boxShadow:"5px 0px 3px orange",
                borderRadius:"10px"
            }}>
            <form onSubmit={handleSubmit}>
                <div>
                    <input className='input' placeholder='Password' value={value.password} 
                    onChange={handleChange} onBlur={handleBlur} name="pass" autoComplete="off"></input>
                </div>
                <div>
                    <input className='input' placeholder='Confirm Password' value={password.passConfirm}
                    onChange={change} name="passConfirm" autoComplete="off"></input>
                </div>
                <div>
                    <button className='btn' type="submit">click me!</button>
                </div>
            </form>
            </div>
            <ToastContainer/>
        </>
    )
}

const EnterPassChange = () => {
    return (
      <div style={{
          width:"!00%",
          height:"100vh",
          display:"flex",
          flexDirection:"column",
          justifyContent:"center",
          alignItems:"center",
      }}>
      <div style={{display:"flex",
          flexDirection:"row",
          justifyContent:"center",
          alignItems:"center",
          margin:"15px"
          
          ,}}>  
        {ask.map((val)=>{
          return (
              <Animation name={val}/>
          )
        })}
      </div>
      <NewPassword/>
      </div>
    )
  }

export default EnterPassChange
