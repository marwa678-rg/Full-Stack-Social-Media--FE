import React, { useEffect, useState } from 'react'
import { baseUrlHandler } from '../../utilis/baseUrlHandler'
import { useParams } from 'react-router-dom';
import { Loading } from '../../Components/Loading/Loading';
import { api } from '../../API/apis';

//CSS IMPORTS
import"./otherUserProfile.css";
import { Button } from 'react-bootstrap';


export const OtherUserProfile = () => {

const baseUrl = baseUrlHandler();
const {userId} =useParams();
//user state
const[user,setUser]=useState(null);
//Follow/Unfollow state
const[isFollowing ,setIsFollowing]= useState(false);

//useEffect
useEffect(()=>{
  async function getUser(){
    //call endPoint => /api/v1/users/:id

    const response = await api.get(`/api/v1/users/${userId}`);
    console.log(response.data.user);
    setUser(response.data.user)
    
  }

getUser();

},[userId])

//check user
if(!user){
  return <Loading />;
}



  return (
    
  <div className="profile-page">
    {/* Cover */}
    <div className="profile-cover"></div>

    {/* Avatar */}
    <img
      src={`${baseUrl}${user.avatar}`}
      alt="avatar"
      className="profile-avatar"
    />

    {/* Info */}
    <div className="profile-info">
      <h1 className="profile-name">{user.name}</h1>
      <p className="profile-bio">{user.bio || "No bio yet"}</p>

      {/* Action */}
      <Button
        variant={isFollowing ? "outline-primary" : "primary"}
        size="sm"
        onClick={() => setIsFollowing(prev => !prev)}
      >
        {isFollowing ? "Following" : "Follow"}
      </Button>

  <Button
    variant="outline-secondary"
    size="sm"
    onClick={() => console.log("Open chat with user")}
  >
    Message
  </Button>


    </div>
  </div>
  )
}
