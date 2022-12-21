import React from 'react'

const CheckProfile = ({user}) => {
  return (
    <div>
      <button
        class="fa-solid fa-eye"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasExample2"
        aria-controls="offcanvasExample2"
      ></button>

      <div
        class="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasExample2"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasExampleLabel">
            Profile Info
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          <div className="">
            <div
              className="d-flex justify-content-center
            "
            >
              <img
                src={user.pic}
                className="p-1 border border-2"
                alt="..."
                style={{
                  margin: "0x auto",
                  cursor: "pointer",
                  borderRadius: "50%",
                  width: "300px",
                  height: "300px",
                }}
              />
            </div>
            <div className="d-flex flex-column  flex-wrap ps-2 mt-3">
              <span className="d-flex ">
                <b style={{ fontSize: "25px" }}>{user.name}</b>
              </span>
              <div className="d-flex  ">
                <b className="pe-1">@ </b>
                {user.email}
              </div>
              <span className="d-flex mt-3 ">
                <b style={{ fontSize: "20px" }}>About</b>
              </span>
              <div className="d-flex  ">
                <span className="pe-1 m-2">I'm  a Product designer based in Malbourne</span>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckProfile