import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
  name:"comment",
  initialState:{
    byPostId:{},//comments per post
    loading:false,
    error:null,
  },
  reducers:{
    setComments:(state,action)=>{
      const{postId,comments}= action.payload;
      state.byPostId[postId] = comments || []; 
    },
    addComment:(state,action)=>{
      const{postId,comment} = action.payload;
      //empty
      if(!state.byPostId[postId]){
        state.byPostId[postId]=[];
      }
      state.byPostId[postId]?.unshift(comment);
    },
    updateComment:(state,action)=>{
      const{postId,comment}=action.payload;
      state.byPostId[postId]= state.byPostId[postId].map(c=>c._id === comment._id ? comment: c )
    },
    deleteComment:(state,action)=>{
      const{postId,comment}=action.payload;
      state.byPostId[postId] = state.byPostId[postId].filter(c => c._id !== comment._id)
    },
  
  }
});

export const {setComments , addComment,updateComment,deleteComment} = commentSlice.actions;
export default commentSlice.reducer;