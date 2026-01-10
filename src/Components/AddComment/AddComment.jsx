 import React, { useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'
 import {handleError} from'../../utilis/errorHandler';
import { useDispatch } from 'react-redux';
import { api } from '../../API/apis';
import toast from 'react-hot-toast';
import { addComment } from '../../store/slices/commentSlice';
import { incrementCommentsCount } from '../../store/slices/postSlice';




 export const AddComment = ({postId}) => {
  //text state
const[text,setText] = useState("");
//disable send state
const[loading,setLoading]=useState(false);
//dispatch
const dispatch = useDispatch();

//Handler
async function handleSubmit(e){
  e.preventDefault();
  //check empty text
  if(!text.trim())return;

try {
  setLoading(true)
//Call EndPoint => /api/v1/comments
  const response = await api.post("/api/v1/comments",{text, postId})
  console.log(response.data);

  toast.success(response.data.message)
 
//Store IN Redux
dispatch(addComment({
  postId,
  comment:response.data.comment
}))

 //update commentsCount in post
  dispatch(incrementCommentsCount(postId))



//clear text
    setText("");
    e.target.reset();// clear input %100
} catch (error) {
  handleError(error);
}finally{
  setLoading(false)
}

}



   return (
     
     <Form onSubmit={handleSubmit} className='mb-2'>
      <InputGroup>
        <Form.Control placeholder="write a comment.."
                    value={text}
                    onChange={(e)=>setText(e.target.value)}
        />
        <Button type='submit'disabled={loading}>{loading? "Sending...":"send"}</Button>

      </InputGroup>
     </Form>
   )
 }
 