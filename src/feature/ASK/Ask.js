import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

const initialState={
    status:"",
    title:"",
    questionDes:"",
    questionExpec:""
}


export const ask=createSlice({
    name:"Ask",
    initialState,
    reducers:{
        storeData:(state,action)=>{
            state.title=action.payload
            state.questionDes=action.payload
            state.questionExpec=action.paylaod
        }
    }

})

export const {storeData}=ask.actions
export default ask.reducer
