
import React, { useState } from 'react'

//CSS Imports
import './feed.css'
//Internal Imports
import{SidebarLeft}from'../../Components/SidebarLeft/SidebarLeft';
import{SidebarRight}from'../../Components/SidebarRight/SidebarRight';
import { CreatePostModal } from '../../Components/CreatePostModal/CreatePostModal';
import { CreatePostBox } from '../../Components/CreatePostBox/CreatePostBox';
import { PostList } from '../../Components/PostList/PostList';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { FcSearch } from "react-icons/fc";



export const Feed = () => {

//Modal state
const[showCreatePost,setShowCreatePost]=useState(false);
//Search State
const [search,setSearch]=useState("");




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

{/* SEARCH  */}
      <InputGroup className="mb-3">
        
        <Form.Control
         placeholder='Search posts...'
         className='text-muted'
         value={search}
         onChange={(e)=>setSearch(e.target.value)}
        />
      <InputGroup.Text variant="outline-secondary">
          <FcSearch  className='text-align-center '/>
        </InputGroup.Text>


      </InputGroup>

      




<PostList search={search}/>

</main>

  <div className='feed-right'>

    <SidebarRight />
  </div>

</div>
  );
}
