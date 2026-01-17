
import { Dropdown } from 'react-bootstrap'
import React from 'react'
import { api } from '../../API/apis'
import { useNavigate } from 'react-router-dom';
import { baseUrlHandler } from '../../utilis/baseUrlHandler';
import moment from "moment"





export const NotificationDropdown = ({notifications=[],getNotifications}) => {
const baseUrl = baseUrlHandler();




//Handler
async function handleClick(notification){
  try {
    if(!notification.isRead){
      await api.patch(`/api/v1/notification/${notification._id}/read`)
    }

    getNotifications();


  } catch (error) {
    console.log(error)
  }
}






  return (
    <Dropdown.Menu>
      {notifications.length === 0 &&(
        <Dropdown.Item className='text-center text-muted'>
          No notification
        </Dropdown.Item>
      )}
{notifications.map((n)=>(
  <Dropdown.Item
   key={n._id}
   className={!n.isRead? "fw-bold":""}
   style={{whiteSpace:"normal",cursor:"pointer"}}
   onClick={()=>handleClick(n)}
   >
      <div className='d-flex gap-2 align-items-start'>
        {/* image */}
        <img 
            src={`${baseUrl}${n.sender.avatar}`}
            alt="avatar"
            width={35}
            height={35}
            className='rounded-circle'
        />
        {/* text */}
      <div>
        <div>
          <strong>{n.sender.name}</strong>
          {n.type ==="like"&&"likes your post"}
          {n.type ==="comment"&& "commented on your post"}
        </div>

        <small className='text-muted'>{moment(n.createdAt).fromNow()}</small>

      </div>





      </div>

  </Dropdown.Item>
))}



    </Dropdown.Menu>
  )
}
