import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
//Internal Imports
import{handleError}from'../../utilis/errorHandler';
import{api}from'../../API/apis';
import { Button, Modal ,Form} from 'react-bootstrap';
import { addPost } from '../../store/slices/postSlice';





export const CreatePostModal = ({show,onClose}) => {
//Get user Redux
const {user}= useSelector((state)=>state.user);
//POSt Redux
const dispatch = useDispatch();
 //Modal states
 const[content,setContent]=useState("");
 const[images,setImages]=useState([]);

 //Handle loading
 const[loading,setLoading]=useState(false);

//Handlers
 async function handleCreatePost(){
  if(!content)return ;
try {
  setLoading(true);

  //Prepare Data FormData
  const formData = new FormData();
  formData.append("content",content);

  images.forEach((img)=>{
    formData.append("images",img);
  });

  //CallEndpoint =>/api/v1/posts/create
  const response = await api.post("/api/v1/posts/create",formData,{
    headers:{
      Authorization:`Bearer ${localStorage.getItem("token")}`
    },
  });
  console.log(response.data)
  toast.success(response.data.message)
//save post in Post Redux
dispatch(addPost(response.data.post))

//clear 

setContent("");
setImages([]);
//Close modal
onClose();
} catch (error) {
  handleError(error);
}finally{
  setLoading(false);
}

 }
 

    return (
   <>
   <Modal show={show} onHide={onClose}  centered>
      <Modal.Header closeButton>
        <Modal.Title>
          Create Post
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className='mb-3'>
            <Form.Control 
              as="textarea"
              placeholder={`What 's in your mind , ${user?.name} ?`}
              value={content}
              onChange={(e)=>setContent(e.target.value)}
            />
          </Form.Group>



          <Form.Group className='mb-3'>
            <Form.Control 
              type='file'
              multiple
              onChange={(e)=>setImages((prev)=>[...prev,...Array.from(e.target.files)])}
            />
          </Form.Group>


        </Form>
      </Modal.Body>


      <Modal.Footer>
        <Button variant='secondary' onClick={onClose}>
          Cancel
        </Button>

        <Button variant='primary' onClick={handleCreatePost} disabled={loading}>
          {loading ? "posting...":"Post"}
        </Button>
      </Modal.Footer>

   </Modal>
   </>
  )
}
