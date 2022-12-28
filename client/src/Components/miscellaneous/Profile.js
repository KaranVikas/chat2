import React from 'react'
import { ChatState } from '../../Context/ChatProvider';

const Profile = () => {

  const { user } = ChatState();
  
  return (
    <>
      <button
        className=""
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight"
        aria-controls="offcanvasRight"
      >
        <img
          src={user.pic}
          className=" rounded-circle m-1 me-3 ms-0"
          style={{ height: "50px", width: "50px" }}
          alt={user.name}
          loading="lazy"
        />
      </button>

      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h5 id="offcanvasRightLabel">{user.name}</h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body d-flex justify-content-center">
          <img
            src={user.pic}
            className="p-1"
            alt="..."
            style={{
              border: "6px solid #fff037",
              margin: "0x auto",
              cursor: "pointer",
              borderRadius: "50%",
              width: "300px",
              height: "300px",
            }}
          />
        </div>
      </div>
    </>
  );
}

export default Profile