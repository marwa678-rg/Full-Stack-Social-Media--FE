import React from 'react'
import { baseUrlHandler } from '../../utilis/baseUrlHandler'
import { Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';

//Css Imports
import'./createPostBox.css';

export const CreatePostBox = ({onOpen}) => {

  const {user}= useSelector((state)=>state.user)
  if(!user)return null;
//BaseUrl
const baseUrl = baseUrlHandler();


  return (
    <div className='create-post-box' onClick={onOpen}>
      <img 
      src={`${baseUrl}${user.avatar}`}
       alt='avatar'
       className='create-post-avatar'
       />

    <Form.Control 
      placeholder="what's on your mind?"
      disabled 
    ></Form.Control>
  <Button size="sm">Post</Button>

    </div>
  )
}
