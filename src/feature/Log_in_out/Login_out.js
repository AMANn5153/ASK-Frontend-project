import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";


const initialState={
    loginOrOut:false,
    message:"",
    status:"idle",
    token:""
}

// export const checkLogin=createAsyncThunk("LoginOut/checkLogin",async()=>{
   
//     try{
//     const res=await fetch("https://askbackend-ek02.onrender.com/CheckLogin",{
    
//         method:"get",
//         headers:{
//             "Accepts":"Application/json",
//             "Content-Type":"Application/json"
//         },
//     })
//     const result=await res.json()
//         return result
//     }
//     catch(e){
//         console.log(e)
//     }
// })

export const postLogin=createAsyncThunk("LoginOut/postLogin",async(data,{rejectWithValue})=>{
    const {email,Password}=data
    const res= await fetch("https://askbackend-ek02.onrender.com/Login",{
    
      method:"post",
      headers:{
        "Content-type":"application/json",
        'Accept': 'application/json'
      },withCredentials:true,
      credentials:"include",
      body:JSON.stringify({
        email,Password
      })
    })
    const result=await res.json()
    if(res.status===403||res.status===401||res.status===500){
        return rejectWithValue(result)
    }
    else{
     return result
    }
})


export const LoginOut=createSlice({
    name:"LoginOut",
    initialState,
    reducers:{
        Logged:(state,action)=>{
            state.loginOrOut=action.payload.loginOrOut
            state.status="idle"
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
            state.loginOrOut=true
            state.token=action.payload.token
    
        })
        .addCase(postLogin.rejected,(state,action)=>{
            state.status="rejected"
            state.message=action.payload.error
        })
        // .addCase(checkLogin.pending,(state,action)=>{
        //     state.status="pending"
        // })
        // .addCase(checkLogin.fulfilled,(state,action)=>{
        //     state.status="fulfilled"
        //     state.loginOrOut=action.payload.message
        //     if(action.payload.error){
        //         state.status=false
        //     }
        // })
        // .addCase(checkLogin.rejected,(state,action)=>{
        //     state.status="rejected"
        //     state.loginOrOut=false
        //     state.message=action.payload
        // })
    }
})


export const {Logged,out}=LoginOut.actions
export default LoginOut.reducer