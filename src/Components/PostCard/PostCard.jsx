import React from 'react'
import { Button, Card, Carousel } from 'react-bootstrap'
import { baseUrlHandler } from '../../utilis/baseUrlHandler'
import moment from'moment';
import { GrLike } from "react-icons/gr";
import { FaRegComment } from "react-icons/fa";
//CSS
import'./postCard.css';

export const PostCard = ({post}) => {
//baseUrl
const baseUrl = baseUrlHandler();


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
              <Button variant='light'>  
                <GrLike />{post.likes.length}
              </Button>
              <Button variant='light'>
                <FaRegComment />{post.commentsCount}
              </Button>
    </Card.Footer>




    </Card>
  )
}
