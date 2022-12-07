import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState={
    id:"",
    comment:[],
    message:"",
    Like:0,
    status:"idle"
}
console.log(initialState)


export const sendComment=createAsyncThunk("comments/sendComment",async(a)=>{// posting the data to database
    const{comment,userId,Postid}=a
    console.log(comment)
    try{
        const res=await fetch("/Comment",{
            method:"put",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(
                {
                    comment,userId,Postid
                }
            )
        })
        const result=await res.json();
        if(result){
            console.log(result);
            return result
        }
    }
    catch(e){
        throw new Error(e)
    }
})

export const fetchingComments=createAsyncThunk("comments/fetchingComments",async(QuesData)=>{
    const {id,Postid}=QuesData
    try{
    const fetchComm=await fetch("/ShowComment",{
        method:"post",
        headers:{
            "content-type":"application/json",
            "Accept":"application/json"
        },
        body:JSON.stringify({
            id, Postid
        })
    })
    const result=await fetchComm.json()
    if(result ){
        return result;
    }
    }
    catch(e){
        console.log(e)
        return e;
    }

})


export const comments=createSlice({
    name:"comments",
    initialState,
    reducers:{
        commentPosted:(state,action)=>{
            state.status=action.payload;
        },   
        postLike:(state,action)=>{
            state.Like=action.payload
        } 
    },
    extraReducers(builder){
        builder.addCase(sendComment.pending,(state)=>{// loading status
            state.status="loading"
        })
        .addCase(sendComment.fulfilled,(state,action)=>{// fulfilled status 
           state.message=action.payload.message
           state.status="fullfilled"
        })
        .addCase(fetchingComments.fulfilled,(state,action)=>{
            state.comment=action.payload.comment
            state.id=action.payload._id
        })
    }
})

export const {commentPosted,postLike}=comments.actions;
export default comments.reducer;