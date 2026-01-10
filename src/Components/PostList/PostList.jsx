
import React from 'react'
import { PostCard } from '../PostCard/PostCard'
import { useDispatch, useSelector } from 'react-redux';
import { Loading } from '../Loading/Loading';
import { handleError } from '../../utilis/errorHandler';
import { fetchPosts, startFetch } from '../../store/slices/postSlice';
import { api } from '../../API/apis';
import { useEffect } from 'react';




export const PostList = ({search}) => {
// redux
const {posts,loading,error}=useSelector((state)=>state.posts)
//Global 
const dispatch = useDispatch();

useEffect(()=>{

async function getPosts(){
try {
  //starting
  dispatch(startFetch());
//Call Endpoint => /api/v1/posts
const response = await api.get("/api/v1/posts",{params:{search}});
console.log(response.data.posts);
dispatch(fetchPosts(response.data.posts))


} catch (error) {
  handleError(error);
}

}



getPosts();



},[dispatch,search])

if(loading)return <Loading />
if(error)return<p className='text-danger text-center mt-3'>{error}</p>
if(!posts.length)return <p className='text-center'>No posts yet</p>

  return (
    <>
    {posts.map((post)=>(
      <PostCard key={post._id}  postId={post._id}/>
    ))}
    
    
    </>
  )
}
