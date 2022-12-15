import React from 'react'
import { ChatState } from '../../Context/ChatProvider'

const UserListItem = ({user, handleFunction }) => {

  return (
    <div className='m-2' style={{backgroundColor:"gray", cursor:"pointer"}} onClick={handleFunction} >
      <button
        onClick={handleFunction}
        className="d-flex align-content-center p-1"
        style={{ width: "4rem"}}
      >
        <img src={user.pic} className="p-1" alt="..." style={{cursor:"pointer"}}/>
        <div className="d-flex flex-column justify-content-center flex-wrap p-1">
          <h4 className="">{user.name}</h4>
          <h6 className="">
            <b>Email: </b>
            {user.email}
          </h6>
        </div>
      </button>
    </div>
  );
}

export default UserListItem