import React, { useRef } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

export const EditCommentModal = ({show,onHide,onSave}) => {
//Refs
const textRef = useRef();
//handle save
function handleSave(){
  const value = textRef.current.value;
  if(!value.trim())return;
  //send value to parent
  onSave(value);
}


  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Comment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control 
          as="textarea"
          ref={textRef}
        
        ></Form.Control>

      </Modal.Body>
      
       <Modal.Footer>
          <Button variant='secondary' onClick={onHide}>Cancel</Button>
          <Button variant='primary' onClick={handleSave}>Save</Button>
        </Modal.Footer>
      
      
      
    </Modal>
  )
}
