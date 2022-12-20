import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState={
    userinfo:"",
    status:"idle",
    error:false,
    accountUserInfo:[{
        status:"idle",
        proPicURL:"",
        about:""
    }],
    stats:{
            Likes:0,
            answer:0,
            question:0
        }

}

 export const checkUser=createAsyncThunk("user/checkUser",async(data,{rejectWithValue})=>{//checking the user exist in the Likesarrayof the question
    const {id,Postid}=data
    try{
        const fetchCheckUser=await fetch("/checkUser",{
            method:"post",
            headers:{
                "content-type":"application/json",
                "Accept":"application/json"
            },
            body:JSON.stringify({
                id,Postid
            })
        })
        const result=await fetchCheckUser.json()
        if(fetchCheckUser.status===499){
            return rejectWithValue(result)
        }
    }
    catch(e){
        console.log(e)
    }
 })

 
 export const fetchUser=createAsyncThunk("user/fetchUser",async(data,{rejectWithValue})=>{
    const {id}=data
    try{
        const fetchInfo=await fetch("/UserInfo",{
            method:"Post",
            headers:{
                "content-type":"application/json",           
                 "Accept":"application/json"
            },
            body:JSON.stringify({
                id
            })
        })
        const res=await fetchInfo.json();
        if(fetchInfo.status===200){
            return res
        }
        else{
            rejectWithValue(res)
        }
    }
    catch(e){
        console.log(e)
    }
})

export const postAddInfo=createAsyncThunk("user/postAddInfo",async(data,{rejectWithValue})=>{
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
 export const accountFetchUser=createAsyncThunk("user/accountFetchUser",async()=>{//getting the infomation of the account user
    console.log("   hi")
    try{
        const user=await fetch("/Account",{
            method:"Get",
            headers:{
                "Accepts":"Application/json",
                "content-type":"Application/json"
            },
            credentials:"include"
        })
        const result=await user.json()
        if(user.status===202){
            return result
        }
    }
    catch(e){
        console.log(e)
    }

})

export const accountUpdates=createAsyncThunk("user/accountUpdates",async(data)=>{
    const about=data
    try{
        const accountDetails=await fetch("/updateAbout",{
            method:"put",
            headers:{
            "Accepts":"application/json",
            "Content-Type":"application/json"
            },
            body:JSON.stringify({
                about
            })            
        })
        console.log(accountDetails)
        const res=await accountDetails.json()
        if(res.status===201){
            console.log(res)
            return res
        }
    }
    catch(e){
        console.log(e)
    }
})

export const getProfilePic=createAsyncThunk("user/getProfilePic",async()=>{// getting the profile picture of the user
    try{
        const getPic=await fetch("/getPic",{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            },  
        })
        if(getPic.status===202){
            const resPic=await getPic.blob()
            const picURL=URL.createObjectURL(resPic)
            return picURL
        }
    }
    catch(e){
        console.log(e)
    }

})

export const getStats=createAsyncThunk("user/getStats",async()=>{
    console.log("getstats")
    try{
        const aggregate=await fetch("/stats",{
            method:"GET",
            headers:{
                "content-type":"application/json",
                "Accept":"application/json"
            }
        })
        const res=await aggregate.json()
        if(aggregate.status===200){
            console.log(res)
            return res
        }
    }
    catch(e){
        console.log(e)
    }
})

export const profilePic=createAsyncThunk("user/profilePic",async(pic)=>{
    
    // updating the profile pic in the database
   
    try{
        const uploadPic=await fetch("/upload",{
            method:"put",
            headers:{
                Accept:"application/json"
            },
            body:pic
        })
        const res=await uploadPic.blob()
        const resURL=URL.createObjectURL(res)
        if(uploadPic?.status===202){
            console.log(resURL)
            return resURL
        }
    }
    catch(e){
        console.log(e)
    }

})

// the deleting of the question
export const delQues=createAsyncThunk("user/delQues",async (idQues)=>{
    const res=await fetch("/delQuestion",{
        method:"put",
        headers:{
        "content-type":"Application/json",
        "Accept":"Application/json"
        },
        body:JSON.stringify({
            idQues
        })
    })
    const result=await res.json()
    if(res?.status===200){
        console.log(result)
    }

})


export const UserInfo=createSlice(
    {
     name:"user",
     initialState,
     reducers:{
        sameUserError:(state,action)=>{
            state.error=action.payload.error
        },
        clearTheInfo:(state,action)=>{
            if(state.accountUserInfo[0]!=="idle"){
             state.accountUserInfo[0].status="idle";
             state.accountUserInfo[0].proPicURL="";
             state.accountUserInfo.pop()
            }
        }
     },
     extraReducers(builder){
        builder.addCase(fetchUser.pending,(state,action)=>{
               state.status="pending"
        })
        .addCase(fetchUser.fulfilled,(state,action)=>{
            state.status="fullfilled"
            console.log(action)
            state.userinfo=action.payload.username
        })
        .addCase(fetchUser.rejected,(state,action)=>{
            state.status="rejected"
        })
        .addCase(checkUser.pending,(state,action)=>{
            state.status="pending"
        })
        .addCase(checkUser.rejected,(state,action)=>{
            state.status="rejected"
            state.error=action.payload.val
        })
        .addCase(checkUser.fulfilled,(state,action)=>{
            console.log(action.payload)
        })
        .addCase(accountFetchUser.fulfilled,(state,action)=>{
            state.accountUserInfo[0].status="fulfilled"
            state.accountUserInfo=state.accountUserInfo.concat(action.payload)
        })
        .addCase(profilePic.fulfilled,(state,action)=>{
            state.accountUserInfo[0].proPicURL=action.payload
        })
        .addCase(getProfilePic.fulfilled,(state,action)=>{
            state.accountUserInfo[0].proPicURL=action.payload    
        })
        .addCase(accountUpdates.fulfilled,(state,action)=>{
            state.accountUserInfo[0].about=action.payload
        })
        .addCase(getStats.fulfilled,(state,action)=>{
             const {getStatsLikes,getStatsComments,getStatsPosts}=action.payload
             getStatsComments.map((val)=>{
                return(
                state.stats.answer+=val.total
                )
             })//stats of comments

            state.stats.Likes=getStatsLikes.length//stats.Likes
            state.stats.question=getStatsPosts[0].total

        })
     } 
    }
)

export const {sameUserError,clearTheInfo}=UserInfo.actions
export default UserInfo.reducer;