import React from "react";

const ProfileModal = ({ user, children, show }) => {
  return (
    <div>
      {show && (
        <>
          <h1>hello</h1>
          <div
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Modal title
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">...</div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="button" className="btn btn-primary">
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {children ? (
        <span>{children}</span>
      ) : (
        <span>
          <i className="fas fa-eye"></i>
        </span>
      )}

      <div>{/* <!-- Button trigger modal --> */}</div>
    </div>
  );
};

export default ProfileModal;
