import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import Login from './Authentication/Login';
import Signup from './Authentication/Signup';



const Homepage = () => {

  const history = useHistory();
  
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if(user) history.push("/chats");
  }, [history]);
  return (
    <div>
      <div className="container" style={{ border: "2px solid red" }}>
        Homepage
        <ul
          className="nav nav-pills mb-3 justify-content-center"
          id="pills-tab"
          role="tablist"
        >
          <li className="nav-item" role="presentation">
            <button
              //style={{ backgroundColor: "#3339cd" }}
              className="nav-link active"
              id="pills-home-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-home"
              type="button"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true"
            >
              Login
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="pills-profile-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-profile"
              type="button"
              role="tab"
              aria-controls="pills-profile"
              aria-selected="false"
            >
              signup
            </button>
          </li>
        </ul>
        <div className="tab-content" id="pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
            tabIndex="0"
          >
            <Login />
          </div>
          <div
            className="tab-pane fade"
            id="pills-profile"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
            tabIndex="0"
          >
            <Signup />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage