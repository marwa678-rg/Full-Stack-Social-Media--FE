
import React, { useEffect, useState } from 'react'
import { AddComment } from '../AddComment/AddComment'
import { useDispatch, useSelector } from 'react-redux';
import { api } from '../../API/apis';
import { handleError } from '../../utilis/errorHandler';
import { toast } from 'react-hot-toast';
import { deleteComment, setComments, updateComment } from '../../store/slices/commentSlice';
import { baseUrlHandler } from '../../utilis/baseUrlHandler';
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { EditCommentModal } from '../EditCommentModal/EditCommentModal';
//Css
import"./commentsSection.css";




export const CommentsSection = ({postId}) => {
//Dispatch
const dispatch = useDispatch();
//comment per post from redux
const comments = useSelector((state)=>
state.comment.byPostId[postId]) || [];
//user from redux
const{user}=useSelector((state)=>state.user);
//modal edit states
const[showEdit,setShowEdit]= useState(false);
const[selectedComment,setSelectedComment]= useState(null);

//baseURL
const baseUrl = baseUrlHandler();


//______________Handlers________________//
//get all comments
//fetch Comment when section mount
useEffect(()=>{

async function getAllComments(){
  try {
    //Call api => /api/v1/posts/:id/comments
    const response = await api.get(`/api/v1/posts/${postId}/comments`)
    console.log(response.data.comments)
    toast.success(response.data.message);
//save in redux
dispatch(setComments({postId , comments:response.data.comments}))


  } catch (error) {
    handleError(error);
  }

}
getAllComments();
},[postId,dispatch]) 
//______________EDIT Comment_______________________//
async function handleEditSave(text){
  try {

    //Call Endpoint => /api/v1/comments/:id
    const response = await api.put(`/api/v1/comments/${selectedComment._id}`,{text})

    toast.success(response.data.message)

//updatecomment in redux
dispatch(updateComment({postId,comment:response.data?.comment}))
//close Modal
setShowEdit(false);
setSelectedComment(null);


  } catch (error) {
    handleError(error);
  }

}


//_________________________Delete handler________________//
async function handleDelete(comment){
//warn user before delete
  const confirmDelete = window.confirm("Are you sure you want to delete this comment?");
  if (!confirmDelete) return;
  try {
    const response = await api.delete(`/api/v1/comments/${comment._id}`);
    console.log(response.data.message)
    toast.success(response.data.message)
    //delete in redux
    dispatch(deleteComment({postId,comment}))
  } catch (error) {
    handleError(error)
  }
}

return (
<div className='mt-2'>
  <h5>comments</h5>


  {/* Add comment */}
<AddComment  postId={postId}/>  

{/* comment list */}
{comments.length === 0 ? (
  <p className='text-muted mt-2'> No comments yet</p>
):(
  <div className='mt-2'>
    {comments.map((comment)=>{
        const avatar = `${baseUrl}${comment.userId?.avatar}`;
        const isDefaultAvatar = ! avatar || avatar.includes("default-avatar");

        return(
          <div key={comment._id} className='comment-row'>


            <div className='comment-left'>
            {isDefaultAvatar? (
              <div className='comment-avatar default-avatar'>
                {comment.userId?.name}
              </div>
            ): (
              <img 
                src={avatar}
                alt="avatar"
                width={32}
                height={32}
                style={{borderRadius:"50%",marginRight:8}}
                
              />
            )}

          <div className='comment-buble'>
            <strong className='comment-username'>
              {comment.userId?.name}
            </strong>
              <p className='comment-text'>{comment.text}</p>
          </div>


        </div>
            


            {/* Edit & Delete icons => per comment */}

            {comment.userId?._id === user._id &&   (
              <div className='comment-actions'>
                <CiEdit 
                  style={{cursor:"pointer",
                   color:"#0d6efd"}}
                   title='Edit'
                   onClick={()=>{
                    setSelectedComment(comment)
                    setShowEdit(true);
                   }}
                  
                />

                <MdDelete
                  style={{cursor:"pointer",color:"#dc3545"}}
                    title='Delete'
                    onClick={()=>handleDelete(comment)}
                /> 

              </div>
            )}

          </div>
        )



    })
  }


<EditCommentModal show={showEdit}
                 onHide={()=>setShowEdit(false)} 
                 onSave={handleEditSave}    //value from modal send to handleEditSave
      />


  </div>


)}
  
  
  
  
  
  
  
  
  
  
  
  
  
  </div>





)
}







