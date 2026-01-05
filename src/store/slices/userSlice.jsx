import { createSlice } from "@reduxjs/toolkit";


const userSlice= createSlice({
  name:"user",
  initialState:{
  isLoggedIn:false,
  user: null,
  },
  reducers:{
    setUser:(state,action)=>{
     state.user = action.payload;
     state.isLoggedIn = true;
    },
    clearUser:(state)=>{
        state.isLoggedIn=false;
        state.user = null;
    },
    },
  });



export const {setUser,clearUser}= userSlice.actions;
export default userSlice.reducer;