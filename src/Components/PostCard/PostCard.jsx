import React, { useState } from 'react'
import { Button, Card, Carousel } from 'react-bootstrap'
import { baseUrlHandler } from '../../utilis/baseUrlHandler'
import moment from'moment';
import { GrLike } from "react-icons/gr";
import { FaRegComment } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { handleError } from '../../utilis/errorHandler';
import { api } from '../../API/apis';
import { updatePost} from '../../store/slices/postSlice';
import { FaShare } from "react-icons/fa";
import { CommentsSection } from '../CommentsSection/CommentsSection';
//CSS
import'./postCard.css';



export const PostCard = ({postId}) => {
//post rom Redux
const post = useSelector((state)=>state.posts.posts?.find((p)=> p._id === postId));


//baseUrl
const baseUrl = baseUrlHandler();
//UserRedux
const{user}= useSelector((state)=>state.user)
//isLike check
const isLike = post.likes.includes(user._id);
const dispatch = useDispatch();
//state Comment
const[showComments,setShowComments] = useState(false);
if(!post) return null;
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







  return (
    <Card className='post-card mb-3'>
      <Card.Header className='d-flex align-items-center gap-2 bg-white'>
        <img   
          src={`${baseUrl}${post.userId.avatar}`}
          alt="avatar"
          className='post-avatar'
        />

        <div>

          <strong>
            {post.userId?.name}
          </strong> 

            <div className='text-muted small'>
              {moment(post.createdAt).fromNow()}
            </div>
         
        </div>
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



    </Card>
  )
}
