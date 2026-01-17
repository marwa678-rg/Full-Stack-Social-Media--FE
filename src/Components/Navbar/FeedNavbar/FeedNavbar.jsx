
//Imports
import React, { useEffect, useState } from 'react'
import { Badge, Container, Dropdown, Form, InputGroup, Nav, Navbar } from 'react-bootstrap';
import { FaBell } from "react-icons/fa";
import { RiContactsFill } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import { FaMoon } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../../../store/slices/userSlice';
import { baseUrlHandler } from '../../../utilis/baseUrlHandler';
import { NotificationDropdown } from '../../Notification/NotificationDropdown';
import {api}from"../../../API/apis";
import toast from 'react-hot-toast';
//Internal Imports



export const FeedNavbar = () => {
  const{user} = useSelector((state)=>state.user)
const dispatch =useDispatch();
const navigate=useNavigate();
const baseUrl = baseUrlHandler();


//notification state
const[notifications,setNotifications]=useState([]);
const[unreadCount,setUnreadCount]=useState(0);

//search users state
const[search,setSearch] = useState("");
const[users,setUsers]= useState([]);



//__________________________________Handlers________________________________//


//handle logout
function handleLogout (){
  if(!window.confirm("Are you sure you want to logout?"))return;
  localStorage.removeItem("token");
  dispatch(clearUser());
  navigate("/login");
} 
//handle  get notifications
async function getNotifications(){
  try {
    //called get notifications
    const notificatRes= await api.get("/api/v1/notification")
    setNotifications(notificatRes.data.notifications);

//called unreadCount
const unreadCountRes = await api.get("/api/v1/notification/count-unread")
setUnreadCount(unreadCountRes.data.unReadCount);
    
  } catch (error) {
    console.log(error)
  }
}


useEffect(()=>{
  getNotifications();
},[])

//handle users search
async function handleSearch(value){

  //handle input in UI 
    setSearch(value);
    if(!value.trim()){  //value -> empty -> clear search
      setUsers([]);
      return;
    }


  try {
  //call get serach users
    const response = await api.get(`/api/v1/users/search?search=${value}&pageSize=5`)
    
    console.log(response.data.users)
      setUsers(response.data.users)
  } catch (error) {
    console.log(error)
  }
}



  return (
    <Navbar bg="light" expand="lg" fixed="top" className='border-bottom'>
      <Container>
        {/* Logo */}
        <Navbar.Brand as={Link} to="/feed" className='fw-bold'>
          connecta.
        </Navbar.Brand>
{/* Toggle for mobile */}
<Navbar.Toggle aria-controls="feed-navbar" />

<Navbar.Collapse id="feed-navbar">



      {/* search  -desktop*/}
    <InputGroup className='mx-lg-auto d-none d-lg-flex'
    style={{width:"40%"}}>
      <Form.Control
        placeholder="search people ..."
        type="search"
        value={search}
        onChange={(e)=>handleSearch(e.target.value)}
        
      />
      <InputGroup.Text>
            <RiContactsFill className='me-2 text-muted'/>
      </InputGroup.Text>
    
  </InputGroup>

{/* Dropdown of users */}
{users.length > 0 && (
  <div className='position-absolute bg-white shadow rounded w-100 mt-1'>
    {users.map((u)=>(
      <div key={u._id}
            className='d-flex align-items-center gap-2 p-2 search-item'
            style={{cursor:"pointer"}}
            onClick={()=>{
              navigate(`/users/${u._id}`);
              setSearch("")
              setUsers([]);
            }}

      >
          <img 
            src={`${baseUrl}${u.avatar}`}
            alt="avatar"
            width={30}
            height={30}
            className='rounded-circle'
          />

          <span>{u.name}</span>



      </div>
    ))}
  </div>
)}




  {/* Right actions */}
  <Nav className="align-items-center gap-4 ms-auto">
    {/* notification */}
  <Dropdown align="end">
    <Dropdown.Toggle as="div" className='position-relative d-flex align-items-center justify-content-center 'style={{width:36,height:36,marginTop:5,cursor:"pointer"}}>

      <FaBell  size={18}/>
      <Badge bg="danger"className='position-absolute top-0 start-100 translate-middle'>
       {unreadCount}
      </Badge>
    </Dropdown.Toggle>

<NotificationDropdown
 notifications={notifications}
 getNotifications={getNotifications}
 />

  </Dropdown>

    {/* profile dropdown */}
    <Dropdown align="end">
      <Dropdown.Toggle variant="light" className='border-0 p-0 d-flex align-items-center  justify-content-center'style={{width:36,height:36}}>
        <img src={`${baseUrl}${user.avatar}`}
              alt="avatat"
              width={36}
              height={36}
              className='rounded-circle'
        />
      </Dropdown.Toggle>

      <Dropdown.Menu>
          <Dropdown.Item as={Link} to="/profile">
            profile
          </Dropdown.Item>

        <Dropdown.Item as={Link} to="/profile">
           <FaMoon className='me-2'/> Dark Mode
          </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={handleLogout}>
          Logout
        </Dropdown.Item>


      </Dropdown.Menu>

    </Dropdown>
    
    </Nav> 


</Navbar.Collapse>
     

      </Container>
     
      
    </Navbar>
  )
}
