import axios from "axios";
//import { config } from 'dotenv';
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";
const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState();
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState();
  const history = useHistory();
  const { setUser } = ChatState();
  const handleShow = () => setShow(!show);

  const submitHandler = async () => {
    //setLoading
    if (!email || !password) {
      // toast function
      console.log("Please fill all the fields");
      const notify = () => {
        toast("Please fill all the fields! ");
      };
      notify();
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );
      console.log(JSON.stringify(data));
      // const notify = () => {
      //   toast("Login Successful! ");
      // };
      // notify();

      console.log("Login Successful");

      localStorage.setItem("userInfo", JSON.stringify(data));
      //setloading false
      // if successful login push to chat page
      //  use hi
      setUser(data);
      // window.location.reload();

      // history.push("/chats");
    } catch (error) {
      // toast and setloading -> false
      const notify = () => {
        toast("Error Occured! ");
      };
      notify();
      console.log("Error Occured");
    }
  };

  const submitHandler2 = () => {
    setEmail("Guest@gmail.com");
    setPassword("Guest12");
  };

  return (
    <div>
      <div className="form-floating mb-3">
        <input
          type="email"
          className="form-control"
          id="floatingInput"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label hmtlFor="floatingInput">Email address</label>
      </div>
      <div className="input-group mb-3">
        <div className="form-floating">
          <input
            type={show ? "text" : "password"}
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label hmtlFor="floatingPassword">Password</label>
        </div>
        <button type="button" className="btn " onClick={handleShow}>
          {show ? (
            <i className="fa-solid fa-eye" />
          ) : (
            <i className="fa-solid fa-eye-slash " />
          )}
        </button>
      </div>

      <div className="form-floating mb-3">
        <button
          type="button "
          className="btn btn-warning btn-block"
          onClick={submitHandler}
        >
          Login
        </button>
      </div>

      <div className="form-floating mb-3">
        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={submitHandler2}
        >
          Get Guest User Credentials
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
