import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
const initialState={
    postDetails:[],
    status:"idle",
    codeSnip:""
}

export const getCodeSnip=createAsyncThunk("Details/getCodeSnip",async(id)=>{
    try{
        const res=await fetch("/getCodeSnip",{
            method:"post",
            headers:{
                "Accepts":"Application/Json",
                "Content-Type":"Application/Json"
            },
            body:JSON.stringify({
                id
            })
        })
        const result=await res.blob()
        const codeSnip_URL=URL.createObjectURL(result)
        return codeSnip_URL
    }
    catch(e){
        console.log(e)
    }
})

export const fetchDetails=createAsyncThunk("Details/fetchDetails",async(id)=>{
    try{
        const res=await fetch("/QuestionInfo",{
            method:"Post",
            headers:{
                "Content-type":"Application/json"
            },
            body:JSON.stringify({
                id
            })
        })
        const result=await res.json()
        if(res.status===200){
            return result
        }     
    }
    catch(e){
        console.log(e)
    }
})

export const questionDetails=createSlice({
    name:"Details",
    initialState,
    reducers:{

    },
    extraReducers(builder){
        builder.addCase(fetchDetails.pending,(state,action)=>{
            state.status="pending"
        })
        .addCase(fetchDetails.fulfilled,(state,action)=>{
            state.status="fulfilled"
            state.postDetails=action.payload
        })
        .addCase(fetchDetails.rejected,(state,action)=>{
            state.status="rejected"
        })
        .addCase(getCodeSnip.fulfilled,(state,action)=>{
            state.codeSnip=action.payload
        })
    }
})

export default questionDetails.reducer