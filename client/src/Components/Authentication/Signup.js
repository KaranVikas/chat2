import React, { useState } from 'react'
import axios from 'axios';
import { useHistory } from "react-router-dom"

const Signup = () => {
    const [name, setName] = useState("dd");
    const [email, setEmail] = useState();
    const [show, setShow] = useState(false);
    const [password, setPassword] = useState();
    const [confirmpassword, setConfirmpassword] = useState();
    const [pic, setPic] = useState();
    //const [loading, setLoading] = useState(false)
    const history = useHistory();
    

    const handleShow = () => setShow(!show);

    const postDetails = (pics) => { 
        //setLoading(true)
        if(pics === undefined){
            // run toast please add image
            console.log("please add image")
        }
        if(pics.type === "image/jpeg" || pics.type === "image/png"){
          const data = new FormData();
          data.append("file", pics);
          data.append("upload_preset", "project-chat");
          data.append("cloud_name", "djtvfrn75");
          fetch("https://api.cloudinary.com/v1_1/djtvfrn75/image/upload",{
            method:"post",
            body: data,
          }).then((res) => res.json())
            .then(data => {
              setPic(data.url.toString());
              console.log(data.url.toString());
              //setLoading(false);
            })
        } else {
          //toast function
        }
        }
    

    const submitHandler = async() => {
        console.log("clicked on submit")
        if(!name || !email || !password || !confirmpassword){
          // toast  please fill all fields
          console.log("please fill all fields")
        }
        if(password !== confirmpassword){
          // toast function
          console.log("password and confirm does not match ")
        }

        try {
          const config = {
            headers: {
              "Content-type": "application/json",
            },
          };

          const { data } = await axios.post("/api/user",
          {name, email, password, pic},
          config
           );
           // toast function -> registration successful
           console.log("registration successful")

           localStorage.setItem('userInfo',JSON.stringify(data));
           // setload
           history.push('/chats')
        } catch (error) {
            // toast function -> error occured
            console.log("no registration error occured")
        }
          // setloading false
    }

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

        <label for="floatingInput">Name</label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="email"
          className="form-control"
          id="floatingInput"
          placeholder="name@example.com"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label for="floatingInput">Email address</label>
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
          <label for="floatingPassword">Password</label>
        </div>
        <button type="button" className="btn btn-link" onClick={handleShow}>
          {show ? "Hide" : "Show"}
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
          <label for="floatingPassword">Confirm Password</label>
        </div>
        <button
          type="button"
          className="btn btn-link input-group-text"
          onClick={handleShow}
        >
          {show ? "Hide" : "Show"}
        </button>
      </div>

      <div className="form-floating mb-3">
        <input
          type="file"
          className="form-control"
          id="floatingInput"
          placeholder="name@example.com"
          onChange={(e) => postDetails(e.target.files[0])}
        />

        <label for="floatingInput">Upload Your Picture</label>
      </div>

      <div className="form-floating mb-3">
        <button type="button" className="btn btn-primary" onClick={submitHandler}>
          Sign Up
        </button>
      </div>
      {console.log(name)}
      {console.log("hi")}
    </div>
  );
}

export default Signup