import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

const initialState={
    loginOrOut:false,
    message:"",
    status:"idle"
}

export const checkLogin=createAsyncThunk("LoginOut/checkLogin",async()=>{
    console.log("hi")
    try{
    const res=await fetch("/CheckLogin",{
        method:"get",
        headers:{
            "Accepts":"Application/json",
            "Content-Type":"Application/json"
        },withCredentials:true,
        credentials:"include"
    })
    const result=await res.json()
        return result
    }
    catch(e){
        console.log(e)
    }
})

export const postLogin=createAsyncThunk("LoginOut/postLogin",async(data,{rejectWithValue})=>{
    const {email,Password}=data
    const res= await fetch("/Login",{
      method:"post",
      headers:{
        "Content-type":"application/json",
        'Accept': 'application/json'
      },
      body:JSON.stringify({
        email,Password
      })
    })
    const result=await res.json()
    if(res.status===403||res.status===401||res.status===500){
        return rejectWithValue(result)
    }
    else{
        console.log(result)

     return result
    }
})


export const LoginOut=createSlice({
    name:"LoginOut",
    initialState,
    reducers:{
        Logged:(state,action)=>{
            console.log(action)
            state.loginOrOut=action.payload.loginOrOut
        },
        out:(state,action)=>{
            state.loginOrOut=action.payload.loginOrOut
            state.status=action.payload.status
        }
        
    },
    extraReducers(builder){
        builder.addCase(postLogin.pending,(state,action)=>{
            state.status="pending"
        })
        .addCase(postLogin.fulfilled,(state,action)=>{
            state.status="fulfilled"
            state.message=action.payload.message
        })
        .addCase(postLogin.rejected,(state,action)=>{
            state.status="rejected"
            state.message=action.payload.error
        })
        .addCase(checkLogin.pending,(state,action)=>{
            state.status="pending"
        })
        .addCase(checkLogin.fulfilled,(state,action)=>{
            state.status="fulfilled"
            state.loginOrOut=action.payload.message
            if(action.payload.error){
                state.status=false
            }
        })
        .addCase(checkLogin.rejected,(state,action)=>{
            console.log(action)
            state.status="rejected"
            state.loginOrOut=false
            state.message=action.payload
        })
    }
})


export const {Logged,out}=LoginOut.actions
export default LoginOut.reducer