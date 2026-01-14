import React, { useState } from 'react'
import { Button, Card, Carousel, Form, Modal } from 'react-bootstrap'
import { baseUrlHandler } from '../../utilis/baseUrlHandler'
import moment from'moment';
import { GrLike } from "react-icons/gr";
import { FaRegComment } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { handleError } from '../../utilis/errorHandler';
import { api } from '../../API/apis';
import { removePost, updatePost} from '../../store/slices/postSlice';
import { FaShare } from "react-icons/fa";
import { CommentsSection } from '../CommentsSection/CommentsSection';
import { AiTwotoneDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';


//CSS
import'./postCard.css';




export const PostCard = ({postId}) => {
//post rom Redux
const post = useSelector((state)=>state.posts.posts?.find((p)=> p._id === postId));

if(!post)return null;
//baseUrl
const baseUrl = baseUrlHandler();
//UserRedux
const{user}= useSelector((state)=>state.user)

//isLike check
const isLike = post.likes?.includes(user._id);
const dispatch = useDispatch();
//state Comment
const[showComments,setShowComments] = useState(false);
if(!post) return null;
//state delete-post / edit-post
const[showEditModal,setShowEditModal]=useState(false);
const[updatedContent,setUpdatedContent]=useState(post.content);
//___________________________Handlers_______________________________//
//------Handle Like
async function handleLike(){
try {

  //call EndPoint => /api/v1/posts/:id/like
  const response = await api.put(`/api/v1/posts/${postId}/like`)
   console.log(response.data);

  //Redux
 dispatch(updatePost(response.data.post))
  
} catch (error) {
  handleError(error);
}
}


//Handle delete-post
async function handleDeletePost(){
  try {
    //Warnnning
    if(!window.confirm("Are you sure you want to delete this post?"))return;
    //call END point => /api/v1/posts/:id/delete
   const response =  await api.delete(`/api/v1/posts/${postId}/delete`)
   console.log(response.data)
    toast.success(response.data.message);
    //remove from UI (Redux)
    dispatch(removePost(postId));

  } catch (error) {
    console.log(error);
  }
}
//----------------------------------------------//
//handle Edit post
async function handleUpdatePost(){
try {
  const formData = new FormData();
  formData.append("content",updatedContent)



//call Endpoint =>/api/v1/posts/:id/update
  const response = await api.patch(`/api/v1/posts/${postId}/update`,formData)
  console.log(response.data.message);
  //update Redux
  dispatch(updatePost(response.data.post))
toast.success(response.data.message)
//Close modal
setShowEditModal(false);

} catch (error) {
  handleError(error);
}
}



//---------------------------------------------------------------------------------//
  return (
    <Card className='post-card mb-3'>
      <Card.Header className=' post-header d-flex align-items-center gap-2 bg-white'>
        {/* check my profile and others */}
        <Link to={post.userId?._id === user?._id ? 
          "/profile":
          `/users/${post.userId?._id}`
        }>
        <img   
          src={`${baseUrl}${post.userId?.avatar}`}
          alt="avatar"
          className='post-avatar'
        />
        </Link>
        

        <div className='ms-2'>

          <strong>
            {post.userId?.name}
          </strong> 

            <div className='text-muted small'>
              {moment(post.createdAt).fromNow()}
            </div>
         
        </div>

      {/* owner actions */}
      {post.userId?._id === user?._id && (
        <div className='ms-auto post-owner-actions'>
            <CiEdit 
              className='post-icon'
              onClick={()=>setShowEditModal(true)}
              title='Edit post'
            />

            <AiTwotoneDelete 
              className='post-icon-delete'
              onClick={handleDeletePost}
              title='Delete post'
            />
        </div>
      )}


      </Card.Header>

    <Card.Body>
                    {/* post -text */}
      <Card.Text>{post.content}</Card.Text>



              {/* Handle images */}
   {post.images?.length > 0 && (

      //single image
      post.images.length === 1?(
        <img   
          src={`${baseUrl}${post.images[0]}`}
          alt="post"
          className='post-single-image'
        
        />
      ):(
        <Carousel indicators={false}>
          {post.images.map((img,index)=>(
            <Carousel.Item key={index}>
              <img 
                className='d-block w-100 post-carousel-image'
                src={`${baseUrl}${img}`}
                alt={`slide-${index}`}
              
              
              />
            </Carousel.Item>
          ))}
        </Carousel>
      )


   )}
      
    </Card.Body>

    <Card.Footer className='bg-white d-flex justify-content-between'>
                    {/* likes */}

              <Button variant={isLike? "danger" :"light"} onClick={handleLike}>  
                <GrLike />{post.likes.length}
              </Button>


              {/* commments */}

              <Button variant='link'
                className='comment-btn'
                //Toggle
                onClick={()=>setShowComments((prev)=> !prev)}
              >
                <FaRegComment />
              <span>{post.commentsCount}</span>
              </Button>

                {/* share */}

              <Button variant='light'>
              <FaShare />
              <span>share</span>
              </Button>

    </Card.Footer>

{showComments && (
  <div className="px-3 pb-2">
    <CommentsSection postId={postId} />
  </div>



)}

                            {/* Edit post modal */}


<Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
  <Modal.Header closeButton>
    <Modal.Title>Edit Post</Modal.Title>
  </Modal.Header>

  <Modal.Body>
    <Form.Control
      as="textarea"
      rows={4}
      value={updatedContent}
      onChange={(e) => setUpdatedContent(e.target.value)}
    />
  </Modal.Body>

  <Modal.Footer>
    <Button
      variant="secondary"
      onClick={() => {
        setShowEditModal(false);
        setUpdatedContent(post.content);
      }}
    >
      Cancel
    </Button>

    <Button variant="primary" onClick={handleUpdatePost}>
      Save changes
    </Button>
  </Modal.Footer>
</Modal>


    </Card>
  )
}
