import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState:{
        userData:null,
        otherUser:null,
    },
    reducers:{
        setUserData:(state,action)=>{
            state.userData=action.payload
        },
        setOtherUser:(state,action)=>{
            state.otherUser=action.payload
        }
    }
})

export const {setUserData,setOtherUser}=userSlice.actions

export default userSlice.reducer