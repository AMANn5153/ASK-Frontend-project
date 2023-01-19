import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";

const initialState={
    message:"",
    status:"idle",
}

export const sendNewPassword=createAsyncThunk("change/sendNewPassword",async(data,{rejectWithValue})=>{
    const {password,email}=data
    try{
        const res=await fetch("/changePass",{
            method:"Put",
            header:{
                "Accepts":"Application/Json",
                "Content-type":"Application/Json"
            },
            body:JSON.stringify({
                password,email
            })
        })
        const result=await res.json()
        if(res.status===200){
            return result
        }else{
            return rejectWithValue(result)
        }
    }
    catch(e){
        console.log(e)
    }
})


export const sendEmail=createAsyncThunk("change/sendEmail",async(data,{rejectWithValue})=>{
    try{
        const res=await fetch("/emailVerify",{
            method:"post",
            headers:{
                "Accepts":"Application/Json",
                "Content-type":"Application/Json"
            },
            body:JSON.stringify(
                {data}
            )
        })
        const result=await res.json()
        if(res?.status===200){
            return result
        }
        else{
            return rejectWithValue(result)
        }
    }
    catch(e){
        console.log(e)
    }

})


export const passChange=createSlice({
    name:"change",
    initialState,
    reducers:{
        setEmail(state,action){
            state.email=action.payload
        },
        resetState(state){
            state.message=""
            state.status=""
            state.value=false
    }},
    extraReducers(builder){
        builder.addCase(sendEmail.pending,(state,action)=>{
            state.status="pending"
        })
        .addCase(sendEmail.fulfilled,(state,action)=>{
            state.status="fulfilled"
            state.message=action.payload.message;
            state.value=action.payload.value;
        })
        .addCase(sendEmail.rejected,(state,action)=>{
            state.status="rejected"
            state.message=action.payload
        })
    }
})


export  const {resetState}=passChange.actions
export default passChange.reducer;