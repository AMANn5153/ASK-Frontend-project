import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

const initialState={
    Reply:[],
    status:"idle",
    error:"",
    message:""

}

export const postReply=createAsyncThunk("reply/postReply",async(data,{rejectWithValue})=>{
    const {commentId,message}=data
    console.log(message)
    try{
        const putReply=await fetch("/PostReply",{
            method:"put",
            headers:{
                "content-type":"application/json",
                "Accept":"application/json"
            },
            body:JSON.stringify({
                commentId,message
            })
        })
        const result=await putReply.json();
        if(putReply.status===202){
            return result
        }else{
            return rejectWithValue(result)
        }
    }
    catch(e){
        console.log(e)
    }
})

export const repliesData=createAsyncThunk("reply/repliesData",async(data)=>{
    const {commentId}=data
    try{
        const fetchReply=await fetch("/ShowReply",{
            method:"Post",
            headers:{
                "content-type":"application/json",
                "Accept":"Application/json"
            },
            body:JSON.stringify({
                commentId
            })
        })
        const result=await fetchReply.json()
        if(fetchReply.status===202){
            return result
        }
    }
    catch(e){
        console.log(e)
    }
})


export const Reply=createSlice({
    name:"reply",
    initialState,
    reducers:{
        cleanTheState:(state,action)=>{
            state.Reply=[];
            state.status=action.payload.status
        },
        cleanReplyState:(state,action)=>{
            state.status="idle"
            state.message=""
        }
    },
    extraReducers(builder){
        builder.addCase(postReply.pending,(state)=>{
            state.status="pending"
            state.message="saving"
        })
        .addCase(postReply.fulfilled,(state,action)=>{
            state.status="fulfilled"
            state.message=action.payload.message
        })
        .addCase(postReply.rejected,(state,action)=>{
            state.status="rejected"
            state.error=action.payload.message
        })
        .addCase(repliesData.fulfilled,(state,action)=>{
            console.log("repliesData",action)
            state.status="fulfilled"
            state.Reply=[]
            state.Reply=state.Reply.concat(action.payload.comment[0].reply[0].message)
            
        })
    }

})


export const {cleanTheState,cleanReplyState}=Reply.actions
export default Reply.reducer