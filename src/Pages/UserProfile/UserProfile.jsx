
import { useSelector } from 'react-redux';
import { Loading } from '../../Components/Loading/Loading';
import{baseUrlHandler}from"../../utilis/baseUrlHandler";
import { Button } from 'react-bootstrap';
import{PublicNavbar}from'../../Components/Navbar/PublicNavbar/PublicNavbar';
//CSS Imports
import"./userProfile.css";
//Modal imports
import { EditProfileModal } from '../../Components/EditProfileModal/EditProfileModal';
import { useState } from 'react';


export const UserProfile = () => {


//Get user from Redux  
const { user } = useSelector(state => state.user);
const baseUrl = baseUrlHandler();
//Modal states
const[showEdit,setShowEdit]=useState(false);
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
             src={`${baseUrl}${user.avatar}`}
              alt="profile"
              style={{
                width:140,
                height:140,
                borderRadius:"50%",
                objectFit:"cover",
                marginTop:-70,
                border:"4px solid #fff",
                boxShadow:"0 8px 20px rgba(0,0,0,0.15)",
              
              }}
          />
      {/* Info */}

       <div className='profile-info'>
              <h1 className='profile-name'>{user.name}</h1>
              <p className='profile-email'>{user.email}</p>
            <p className='profile-bio'>{user.bio || "No bio yet"}</p>

          {/*stats  */}
          <div className='profile-stats'>
            <div>
              <strong>0</strong>
              <span>Posts</span>
            </div>

            <div>
              <strong>0</strong>
              <span>Followers</span>
            </div>

              <div>
              <strong>0</strong>
              <span>Following</span>
            </div>

          </div>

          <Button className='edit-profile-btn'
                  variant="outline-primary"
                  size="sm"
                  onClick={()=>setShowEdit(true)}
          >
            Edit Profile
          </Button>


       </div>
       <EditProfileModal 
        show={showEdit}
        onClose={()=>setShowEdit(false)}
       />
    </div>
  );
};
