import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [name, setName] = useState("dd");
  const [email, setEmail] = useState();
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [pic, setPic] = useState();
  //const [loading, setLoading] = useState(false)

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const history = useHistory();

  const handleShow = () => setShow(!show);

  const postDetails = (pics) => {
    //setLoading(true)
    if (pics === undefined) {
      const notify = () => {
        toast.warn("Please add image! ");
      };
      notify();
      console.log("please add image");
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "project-chat");
      data.append("cloud_name", "djtvfrn75");
      fetch("https://api.cloudinary.com/v1_1/djtvfrn75/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          //setLoading(false);
        });
    } else {
      //toast function
    }
  };

  const submitHandler = async () => {
    console.log("clicked on submit");
    if (!name || !email || !password || !confirmpassword) {
      const notify = () => {
        toast.warn("Please fill all the fields! ");
      };
      notify();
      console.log("please fill all fields");
    }
    if (password !== confirmpassword) {
      // toast function
      const notify = () => {
        toast.warn("Password and Confirm Password Does n't match ");
      };
      notify();
      console.log("password and confirm does not match ");
    }
    if (!emailRegex.test(email)) {
      const notify = () => {
        toast.warn("Email invalid ");
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
        "/api/user",
        { name, email, password, pic },
        config
      );
      // toast function -> registration successful
      const notify = () => {
        toast("Registration Successful ");
      };
      notify();
      console.log("registration successful");

      localStorage.setItem("userInfo", JSON.stringify(data));
      // setload
     history.push("/chats");
     window.location.reload()
    } catch (error) {
      // toast function -> error occured
      console.log("no registration error occured");
    }
    // setloading false
  };

  return (
    <div>
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="floatingInput"
          placeholder="Enter your Name"
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="floatingInput">Name</label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="email"
          className="form-control"
          id="floatingInput"
          placeholder="name@example.com"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="floatingInput">Email address</label>
      </div>
      <div className="input-group mb-3">
        <div className="form-floating">
          <input
            type={show ? "text" : "password"}
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <button type="button" className="btn btn-link" onClick={handleShow}>
          {show ? (
            <i style={{ color: "black" }} className="fa-solid fa-eye" />
          ) : (
            <i style={{ color: "black" }} className="fa-solid fa-eye-slash" />
          )}
        </button>
      </div>
      <div className="input-group mb-3">
        <div className="form-floating">
          <input
            type={show ? "text" : "password"}
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <label htmlFor="floatingPassword">Confirm Password</label>
        </div>
        <button
          type="button"
          className="btn btn-link input-group-text"
          onClick={handleShow}
        >
          {show ? (
            <i style={{ color: "black" }} className="fa-solid fa-eye" />
          ) : (
            <i style={{ color: "black" }} className="fa-solid fa-eye-slash" />
          )}
        </button>
      </div>

      {/* <div
        className="form-floating mb-3"
        style={{ borderRadius: "0.35rem", border: "1px solid #d0d6dc" }}
      >
        <input
          type="file"
          className="form-control"
          id="floatingInput"
          placeholder=""
          onChange={(e) => postDetails(e.target.files[0])}
          style={{ opacity: "1" }}
        />

        <label htmlFor="floatingInput">Upload Picture</label>
      </div> */}

      <div>
        <div className="input-group mb-3">
          {/* <label class="input-group-text d-none d-sm-block" for="inputGroupFile01">
            Upload Picture
          </label> */}
          <input type="file" className="form-control" id="inputGroupFile01" onChange={(e) => postDetails(e.target.files[0])} />
        </div>
      </div>

      <div className="form-floating mb-3">
        <button
          type="button"
          className=" mt-3 btn btn-outline-warning w-100"
          onClick={submitHandler}
        >
          Sign Up
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
