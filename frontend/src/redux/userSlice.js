import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState:{
        userData:null,
        otherUsers:null,
    },
    reducers:{
        setUserData:(state,action)=>{
            state.userData=action.payload
        },
        setOtherUsers:(state,action)=>{
            state.otherUsers=action.payload
        },
        getOtherUsers:(state)=>{
            return state.otherUsers;
        }
    }
})

export const {setUserData,setOtherUsers,getOtherUsers}=userSlice.actions

export default userSlice.reducer