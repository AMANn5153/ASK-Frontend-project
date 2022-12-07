import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

const initialState={
    loginOrOut:false,
    message:"",
    status:"idle"
}

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
            console.log(action)
            state.message=action.payload.message
        })
        .addCase(postLogin.rejected,(state,action)=>{
            state.status="rejected"
            state.message=action.payload.error
        })
    }
})


export const {Logged,out}=LoginOut.actions
export default LoginOut.reducer