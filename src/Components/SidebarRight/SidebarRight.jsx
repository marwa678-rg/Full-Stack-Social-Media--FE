import React from 'react'
import"./sidebarRight.css";
export const SidebarRight = () => {
const chats =[
  {id:1,name:"Ahmed", message:"hey👋",online:"true"},
{id:2,name:"mai", message:"how are you?",online:"true"},
{id:1,name:"sara", message:"lets work !",online:"false"},
{id:1,name:"Omar", message:"hey👋",online:"false"},

]

  return (
    <div className='right-sidebar'>
      <h6>Messages</h6>
    {chats.map((chat)=>(
      <div key={chat.id} className='chatitem'>
        <div className='avatar'>
          <span className={chat.online? "online":""}></span>
        </div>


        <div>
          <p className='name'>{chat.name}</p>
          <small>{chat.message}</small>
        </div>
      </div>
    ))}


    </div>
  )
}
