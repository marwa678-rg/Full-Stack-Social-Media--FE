import React from 'react'
import { baseUrlHandler } from '../../utilis/baseUrlHandler'
import { useDispatch, useSelector } from 'react-redux';
import { Link,useNavigate } from 'react-router-dom';
import { Nav}  from 'react-bootstrap';
//react-icons
import { TbHomeFilled } from "react-icons/tb";
import { IoLogOut } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
//CSS
import"./sidebarLeft.css";
import { clearUser } from '../../store/slices/userSlice';






export const SidebarLeft = () => {
//base URL
const baseUrl = baseUrlHandler();
//user-REDUX
const {user}= useSelector((state)=>state.user);
const dispatch = useDispatch();
const navigate = useNavigate();


//handleLogout
function handleLogout(){
  localStorage.removeItem("token");
  dispatch(clearUser());
  navigate("/login");
}


  return (
    <div className='sidebar-left'>
      {/* user box  */}
      <div className='sidebar-user'>
        <Link to={`/profile`}>
        <img  src={`${baseUrl}${user?.avatar}`}  alt="avatar"/>
        </Link>
        

        <p>{user?.name}</p>
      </div>
      {/* Menu */}
      <Nav className='sidebar-menu flex-column'>
        <Link to='/feed'><TbHomeFilled /></Link>
        <Link to='/profile'><CgProfile /></Link>
        <Link onClick={handleLogout} className='sidebar-link logout'>
          <IoLogOut />
        </Link>
        {/* extra-menu */}
        <div className='sidebar-extra'>
        <h6 className='sidebar-title'>Shortcuts</h6>

        <div className="sidebar-item"></div>
            <a href="#"className="sidebar-item" onClick={(e)=>e.preventDefault()}>🔖 Saved</a>
            <a href="#" className="sidebar-item" onClick={(e)=>e.preventDefault()}   >👥 Groups</a>
            <a href="#" className="sidebar-item" onClick={(e)=>e.preventDefault()}   >📅 Events</a>
            <a href="#" className="sidebar-item" onClick={(e)=>e.preventDefault()} >🎬 Reels</a>
            <a href="#" className="sidebar-item"  onClick={(e)=>e.preventDefault()} >See more</a>
        </div>

      </Nav>
    </div>
  )
}
