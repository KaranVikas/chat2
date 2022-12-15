import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { ChatState } from '../../Context/ChatProvider';
import ChatLoading from './ChatLoading';
import Modal from './Modal';
import ProfileModal from './ProfileModal';
import UserListItem from '../UserAvatar/UserListItem'
import axios from 'axios';



const SideDrawer = () => {
  const [search, setSearch] = useState("")
	const [searchResult, setSearchResult] = useState([])
	const [loading, setLoading] = useState(true)
	const [loadingChat, setLoadingChat] = useState(false)
	const [show, setShow] = useState(false)

	const showModal = () => {
		setShow(show => !show)
		console.log("clicked on show")
	}

	const { user, setSelectedChat, chats, setChats } = ChatState();
  const history = useHistory()

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    console.log("userinfo deleted")
    history.push("/");
  };

  const handleSearch = async() => {
    console.log(search)
    if(!search){
      // toast function to throw error
      console.log("please Enter something ")
    }

    try{
      //setLoading(true)
      console.log(loading)

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        }
      };
      const {data} = await axios.get(`/api/user?search=${search}`, config)
      setLoading(false)
      console.log({loading})
      setSearchResult(data);
      console.log({data})
    } catch (error){
      // toast function -> Failed to load the search results
      console.log("Failed to load the Search Results")
    }
  }

  const accessChat = async(userId) => {
    try{
      setLoadingChat(true)

        const config = {
          headers: {
            "Content-type":"application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }

        const {data} = await axios.post("/api/chat", {userId }, config);
        // if chat is already in chat state
        if(!chats.find((c) => c._id === data._id)) setChats([data, ...chats])
          setSelectedChat(data);
          setLoadingChat(false);
          // close modal 
    } catch (error){
      // toast function
      console.log("Error fetching the chat")
    }

  }
  return (
    <>
      <div className="d-flex container-fluid justify-content-between align-items-center">
        <div>
          <button
            className="btn btn-primary"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasExample"
            aria-controls="offcanvasExample"
          >
            <i className="fa-solid fa-search p-1" />
            Search User
          </button>

          <div
            className="offcanvas offcanvas-start d-flex justify-content-between"
            tabIndex="-1"
            id="offcanvasExample"
            aria-labelledby="offcanvasExampleLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasExampleLabel">
                Search Users
              </h5>
              <button
                type="button"
                className="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <hr />
            <div className="offcanvas-body">
              <div>
                {/* <form className="d-flex" role="search"> */}
                <div className='d-flex mb-1'>
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search by name or email"
                    aria-label="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <button
                    className="btn btn-outline-success"
                    type="submit"
                    onClick={handleSearch}
                    onChange={(e) => e.preventDefault()}
                  >
                    Go
                  </button>
                </div>
                {/* </form> */}
                {/* if  loading show component else show results */}
                {loading ? (
                  <ChatLoading />
                ) : (
                  searchResult?.map((user) => (
                    <UserListItem
                      key={user._id}
                      user={user}
                      handleFunction={() => accessChat(user._id)}
                    />
                  ))
                )}
                {/* {(searchResult?.map(user =>(
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={()=>accessChat(user._id)}/>
              )))} */}
                Some text as placeholder. In real life you can have the elements
                you have chosen. Like, text, images, lists, etc.
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-between px-5">
          
          <h4 style={{ fontSize: "x-large" }}>Chat Application</h4>
          <Modal show={show} />
        </div>
        <div className="">
          <i className="fa-solid fa-bell" style={{fontSize:"larger"}} />
        </div>
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle d-flex align-items-center "
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src={user.pic}
              className="rounded-circle m-1 me-3 ms-0"
              style={{ height: "30px" }}
              alt={user.name}
              loading="lazy"
            />
            {user.name}
          </button>
          <ul
            className="dropdown-menu dropdown-menu-dark"
            style={{ backgroundColor: "#f8f9fa", minWidth: "8rem" }}
          >
            <li className="mb-1">
              <ProfileModal user={user} show={show}>
                <button
                  onClick={showModal}
                  type="button"
                  className="btn btn-light"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                >
                  My Profile 2
                </button>
              </ProfileModal>
            </li>
            <hr style={{ border: "1px solid black" }} />
            <li>
              <button
                onClick={logoutHandler}
                type="button"
                className="btn btn-light"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default SideDrawer