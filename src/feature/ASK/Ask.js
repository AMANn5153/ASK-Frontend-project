import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

const initialState={
    status:"",
    title:"",
    questionDes:"",
    questionExpec:"",
    askImages:""
}


export const ask=createSlice({
    name:"Ask",
    initialState,
    reducers:{
        storeData:(state,action)=>{
            state.title=action.payload.input.askInput
            state.questionDes=action.payload.text.text
            state.questionExpec=action.payload.askText.askText
        },
        storeCodeSnip:(state,action)=>{
            console.log(action)
            state.askImages=action.payload
        }
    }

})

export const {storeData,storeCodeSnip}=ask.actions
export default ask.reducer
