import React from 'react'
import { ChatState } from '../../Context/ChatProvider'

const UserListItem = ({user, handleFunction }) => {

  return (
    <div className='m-1' style={{backgroundColor:"#f6f6f6", cursor:"pointer"}} onClick={handleFunction} >
      <button
        //onClick={handleFunction}
        className="d-flex  p-1"
        style={{ width: "4rem"}}
      >
        <img src={user.pic} className="p-1" alt="..." style={{cursor:"pointer", borderRadius:"50%", width:"70px", height:"70px"}}/>
        <div className="d-flex flex-column  flex-wrap ps-2">
          <span className="d-flex "><b>{user.name}</b></span>
          <div className="d-flex  ">
            <b className='pe-1'>Email: </b>
            {user.email}
          </div>
        </div>
      </button>
    </div>
  );
}

export default UserListItem