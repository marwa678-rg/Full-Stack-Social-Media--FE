
import React, { useState } from 'react'

//CSS Imports
import './feed.css'
//Internal Imports
import{SidebarLeft}from'../../Components/SidebarLeft/SidebarLeft';
import{SidebarRight}from'../../Components/SidebarRight/SidebarRight';
import { CreatePostModal } from '../../Components/CreatePostModal/CreatePostModal';
import { CreatePostBox } from '../../Components/CreatePostBox/CreatePostBox';
import { PostList } from '../../Components/PostList/PostList';

export const Feed = () => {

//Modal state
const[showCreatePost,setShowCreatePost]=useState(false);





  return (
<div className='feed-page'>


  <div className='feed-left'>

    <SidebarLeft />
  </div>


<main className='feed-main'>
   
      {/* create post */}
<CreatePostBox onOpen={()=>setShowCreatePost(true)}/>
    <CreatePostModal show={showCreatePost}
                      onClose={()=>setShowCreatePost(false)}
    />


<PostList />

</main>

  <div className='feed-right'>

    <SidebarRight />
  </div>

</div>
  );
}
