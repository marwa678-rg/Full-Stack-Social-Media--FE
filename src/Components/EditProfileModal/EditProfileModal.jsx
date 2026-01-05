
//Imports
import React, { useState } from 'react'

//CSS
import"./editProfileModal.css";
import { Button, Form, Modal } from 'react-bootstrap';
import { handleError } from '../../utilis/errorHandler';
import { useDispatch, useSelector } from 'react-redux';
import {api}from'../../API/apis';
import { setUser } from '../../store/slices/userSlice';


export const EditProfileModal = ({show,onClose}) => {
//Global Dispatch  
const dispatch =useDispatch();
//get User from Redux
const{user}= useSelector((state)=>state.user)
//states of user before update
const [name,setName]=useState(user?.name ||"");
const[bio,setBio]=useState(user?.bio || "");
const [avatar,setAvatar]= useState(null);
//loading state
const [loading,setLoading]= useState(false);





//Handle Modal
async function handleUpdateProfile(){
  try {
    setLoading(true);
    //Prepare FormData
    const formData = new FormData();
    formData.append("name",name);
    formData.append("bio",bio);
    if(avatar)formData.append("avatar",avatar);
//Call ENDpoint => /api/v1/users/profile/update
//send formData + token
const response = await api.put("/api/v1/users/profile/update",formData,
  {headers:{
    Authorization:`Bearer ${localStorage.getItem("token")}`,
  },
}
)
   
//save data in Redux
dispatch(setUser(response.data.user))
onClose();

  } catch (error) {
    handleError();
  }finally{
    setLoading(false)
  }
}




  return (
   <Modal show={show} onHide={onClose}  centered>

    <Modal.Header closeButton>
      <Modal.Title>
        Edit Profile
      </Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <Form >
        <Form.Group className='mb-3'>
          <Form.Label htmlFor='name'>Name</Form.Label>
          <Form.Control 
          type='text'
          id='name'
          value={name}
          onChange={(e)=>setName(e.target.value)}
          />
        </Form.Group>


         <Form.Group className='mb-3'>
          <Form.Label htmlFor='bio'>Bio</Form.Label>
          <Form.Control 
          as='textarea'
          id='bio'
          value={bio}
          onChange={(e)=>setBio(e.target.value)}

          />
        </Form.Group>




      <Form.Group className='mb-3'>
          <Form.Label htmlFor='avatar'>profile-pic</Form.Label>
          <Form.Control 
          type='file'
          id='avatar'
          onChange={(e)=>setAvatar(e.target.files[0])}
          />
        </Form.Group>
      </Form>
    </Modal.Body>

   <Modal.Footer>
    <Button variant='primary'
            onClick={onClose}
    >
      Cancel
    </Button>

    <Button variant='primary'
            onClick={handleUpdateProfile}
            disabled={loading}
    >
      {loading ? "Saving..." : "save"}
    </Button>
   </Modal.Footer>
   
   
   </Modal>
  )
}
