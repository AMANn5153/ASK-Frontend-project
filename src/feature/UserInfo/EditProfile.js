import { createSlice } from "@reduxjs/toolkit"
import { createAsyncThunk } from "@reduxjs/toolkit"

const initialState={
    message:"",
    status:"idle"
}



export const postAddInfo=createAsyncThunk("userEdit/postAddInfo",async(data,{rejectWithValue})=>{
    console.log(data)
    try{
        const addInfo= await fetch("/AddInfo",{
            method:"put",
            headers:{
                "Content-type":"Application/json",
                "Accept":"Application/json"
            },
            body:JSON.stringify({
                data
            })
        })
        const res= await addInfo.json()
        if(addInfo?.status===200){
            return res
        }
        else{
            return rejectWithValue(res)
        }
    }
    catch(e){
        console.log(e)
    }
})


export const editProfile=createSlice({
    name:"userEdit",
    initialState,
    reducers:{
      cleanState:(state,action)=>{
        state.message=""
        state.status="idle"
      }
    },
    extraReducers(builder){
        builder.addCase(postAddInfo.pending,(state,action)=>{
            state.status="pending"
            state.message="sending user data"
        })
        .addCase(postAddInfo.fulfilled,(state,action)=>{
            state.status="fulfilled"
            state.message=action.payload.message
        })
        .addCase(postAddInfo.rejected,(state,action)=>{
            state.status="rejected"
            state.message="some error occured"
        })
    }
})

export const {cleanState}=editProfile.actions

export default editProfile.reducer