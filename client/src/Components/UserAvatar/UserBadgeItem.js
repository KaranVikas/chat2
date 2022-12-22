import React from 'react'

const UserBadgeItem = ({user, handleFunction }) => {
    return (
      <div>
        <div
          className="mb-2 m-1 p-2 "
          style={{ cursor: "pointer" }}
          onClick={handleFunction}
        >
          <button className="btn btn-warning">
            {user.name} <i className="fas fa-xmark"></i>
          </button>
        </div>
      </div>
    );
}

export default UserBadgeItem