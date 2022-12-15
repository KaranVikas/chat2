import axios from 'axios';
//import { config } from 'dotenv';
import React, {useState} from 'react'

import { useHistory } from 'react-router-dom';
const Login = () => {

  const [name, setName] = useState("dd");
  const [email, setEmail] = useState();
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState();
  const history = useHistory();
  
  

  const handleShow = () => setShow(!show);

  
  const submitHandler = async() => {
    //setLoading
    if(!email || !password){
      // toast function
      console.log("Please fill all the fields");
    }
    try{
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
      // toast
      console.log("Login Successful")
      localStorage.setItem("userInfo",JSON.stringify(data));
      //setloading false
      // if successful login push to chat page
      //  use hi
      history.push("/chats")
    } catch(error){
      // toast and setloading -> false
      console.log("Error Occured")
    }
    
  };

  const submitHandler2 = () => {
    setEmail("Guest@gmail.com");
    setPassword("Guest12");
  }

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

        <label for="floatingInput">Email address</label>
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
          <label for="floatingPassword">Password</label>
        </div>
        <button type="button" className="btn btn-link" onClick={handleShow}>
          {show ? "Hide" : "Show"}
        </button>
      </div>

      <div className="form-floating mb-3">
        <button type="button" className="btn btn-primary" onClick={submitHandler}>
          Login
        </button>
      </div>

      <div className="form-floating mb-3">
        <button type="button" className="btn btn-danger" onClick={submitHandler2}>
          Get Guest User Credentials
        </button>
      </div>

      {console.log(name)}
      {console.log("hi")}
    </div>
  );
}

export default Login