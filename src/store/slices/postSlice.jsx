import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name:"posts",
  initialState:{
    posts:[],
    loading:false,
    error:null,
  },
  reducers:{  
    startFetch:(state)=>{
      state.loading=true;
    },
    fetchPosts:(state,action)=>{
      state.loading = false;
      state.posts = action.payload;
    },
    addPost:(state,action)=>{
      state.posts.unshift(action.payload);
    },
    fetchError:(state,action)=>{
      state.loading=false;
      state.error=action.payload;
    }
  },
});



export const{fetchPosts,addPost,fetchError,startFetch}= postsSlice.actions;

export default postsSlice.reducer;