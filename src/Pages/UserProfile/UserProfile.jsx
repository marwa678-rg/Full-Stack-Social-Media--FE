
import { useSelector } from 'react-redux';
import { Loading } from '../../Components/Loading/Loading';
import{baseUrlHandler}from"../../utilis/baseUrlHandler";
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import{PostCard}from"../../Components/PostCard/PostCard";
//CSS Imports
import"./userProfile.css";
//Modal imports
import { EditProfileModal } from '../../Components/EditProfileModal/EditProfileModal';
import{Modal}from"react-bootstrap";


export const UserProfile = () => {
  //baseUrl
const baseUrl = baseUrlHandler();

//Get user from Redux  
const { user} = useSelector(state => state.user);
//Get my posts
const {posts} = useSelector((state)=>state.posts);
const myPosts = posts?.filter((post)=>post.userId?._id === user._id);
//media tab images
const mediaImages = myPosts
  ?.filter(post => post.images?.length > 0)
  .flatMap(post => post.images);
//media modal state
const [showMediaModal, setShowMediaModal] = useState(false);
const [selectedImage, setSelectedImage] = useState(null);
//Modal states
const[showEdit,setShowEdit]=useState(false);
//state of userStats
const[activeTab,setActiveTab]=useState("posts")



  if (!user) {
    return <Loading />
  }
console.log("USER FROM REDUX:", user);
  return (
    <div className='profile-page'>
      

      {/* Cover */}
      <div className='profile-cover'></div>

      {/* Avatatr from DB*/}
          <img  
             src={`${baseUrl}${user.avatar}`} className='profile-avatar' alt="profile"/>
      {/* Info */}

       <div className='profile-info'>
              <h1 className='profile-name'>{user.name}</h1>
              <p className='profile-email'>{user.email}</p>
            <p className='profile-bio'>{user.bio || "No bio yet"}</p>

          {/*stats  */}
          <div className='profile-stats'>
            <div className={activeTab === "posts"? "active":""}
              onClick={()=>{setActiveTab("posts")}}>
              <strong>{myPosts?.length}</strong>
              <span>Posts</span>                
               </div>

            <div className={activeTab === "followers"? "active":""}
              onClick={()=>{setActiveTab("followers")}}>
              <strong>0</strong>
              <span>Followers</span>                
               </div>


               <div className={activeTab === "following"? "active":""}
              onClick={()=>{setActiveTab("following")}}>
              <strong>0</strong>
              <span>Following</span>                
               </div>



             <div
              className={activeTab === "media" ? "active" : ""}
              onClick={() => setActiveTab("media")}>
              <strong>{mediaImages?.length || 0}</strong>
              <span>Media</span>
            </div>

          </div>

          <Button className='edit-profile-btn'
                  variant="outline-primary"
                  size="sm"
                  onClick={()=>setShowEdit(true)}
          >
            Edit Profile
          </Button>
            {/* separation-line  */}
        <hr className="profile-divider" />
  
                            {/* Get My Posts */}
            {activeTab === "posts" && (
              <div className='profile-posts'>
                {myPosts?.length >0 ?(myPosts.map(post=>(<PostCard key={post._id} postId={post._id}/>))):
                (<p className="text-center text-muted">You have not posts yet ✨</p>)}
              </div>
            ) }

        

            {/* media tab */}
{activeTab === "media" && (
  <div className="media-grid">
    {mediaImages.length > 0 ? (
      mediaImages.map((img, index) => (
        <img
          key={index}
          src={`${baseUrl}${img}`}
          alt="media"
          className="media-item"
          onClick={()=>{
            setSelectedImage(`${baseUrl}${img}`);
            setShowMediaModal(true);
          }}
        />
      ))
    ) : (
      <p className="text-center text-muted">
        No media to show 📷
      </p>
    )}
  </div>
)}


       </div>
       <EditProfileModal 
        show={showEdit}
        onClose={()=>setShowEdit(false)}
       />


{/* media modal */}
<Modal
  show={showMediaModal}
  onHide={() => setShowMediaModal(false)}
  centered
  size="lg"
>
  <Modal.Body className="p-0">
    <img
      src={selectedImage}
      alt="preview"
      style={{
        width: "100%",
        height: "auto",
        borderRadius: "8px",
      }}
    />
  </Modal.Body>
</Modal>


    </div>
  );
};
