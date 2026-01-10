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
    },
    updatePost:(state,action)=>{
      const updatePost = action.payload;
      state.posts = state.posts.map((post)=> post._id === updatePost._id ? updatePost : post)
     
    },
  incrementCommentsCount:(state,action)=>{
      
    state.posts  = state.posts.map((post)=>
    post._id === action.payload ? {...post,commentsCount:post.commentsCount + 1}:post)
    },




  },
});



export const{fetchPosts,addPost,fetchError,startFetch,updatePost,incrementCommentsCount}= postsSlice.actions;

export default postsSlice.reducer;