import { createSlice } from "@reduxjs/toolkit"
import { createAsyncThunk } from "@reduxjs/toolkit"

const initialState={
    message:""
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

    },
    extraReducers(builder){
        builder.addCase(postAddInfo.pending)
    }
})