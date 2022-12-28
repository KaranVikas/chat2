import axios from "axios";
import React, { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import UserBadgeItem from "../UserAvatar/UserBadgeItem";
import UserListItem from "../UserAvatar/UserListItem";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain, fetchMessages  }) => {
  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const { selectedChat, setSelectedChat, user } = ChatState();
  const [renameloading, setRenameloading] = useState(false);
  


  const handleAddUser = async (user1) => {
    if (selectedChat.users.find((u) => u._id === user1._id)) {
      //toast User Already in group
      const notify = () => {
        toast("User already in group! ");
      };
      notify();
      console.log("user already in group!");
      return;
    }
    if (selectedChat.groupAdmin._id !== user._id) {
      //toast only admins can add someone
      console.log("Only admins can add someone");
    }

    // if (selectedChat.users.find((u) => u._id !== user1._id)) {
    //   //toast not in group
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };

        const { data } = await axios.put(
          "/api/chat/groupadd",
          {
            chatId: selectedChat._id,
            userId: user1._id,
          },
          config
        );
        setSelectedChat(data);
        console.log("User data to be added to group", data);
        setFetchAgain(!fetchAgain);
        setLoading(false);
      } catch (error) {
        // toast Error Occured
        console.log("Error Occured");
        //setLoading(false)
      }
    // }
    
  };

  const handleRemove = async (user1) => {
    if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
      // toast only admins can remove someone
      const notify = () => {
        toast("Only admins can remove someone! ");
      };
      notify();
      console.log("only admins can remove someone! ");
    }
    try {
      //setLoading(true)
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/chat/groupremove`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );

      //if userhimself left the chat then chat will not show
      user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      // to refresh all the messages
      fetchMessages();
      //setLoading(false)
    } catch (error) {
      //toast -> "Error Occured"
      console.log("Error Occured! ");
    }
    //setLoading(false)
  };

  const handleRename = async () => {
    if (!groupChatName) {
      const notify = () => {
        toast.warn("Please Enter something ");
      };
      notify();
    };
    try {
      //setRenameloading(true)

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        "/api/chat/rename",
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );
      setSelectedChat(data);
      console.log("Selected Chat",selectedChat)
      // list of the chat updated with the user
      setFetchAgain(!fetchAgain);
      setLoading(false)
    } catch (error) {
      // toast -> Error Occured
      //setRenameloading(false)
    }
    setGroupChatName("");
  };
  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      //setLoading(true)
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      console.log(data);
      //setLoading(false)
      setSearchResult(data);
    } catch (error) {
      // toast error occured
      console.log("Failed to load the search Results");
    }
    //setLoading(false)
  };

  return (
    <div>
      <i
        type="button"
        className="fa-solid fa-eye pe-2"
        data-bs-toggle="modal"
        data-bs-target="#demoModal"
      >
      </i>

      <div
        className="modal fade"
        id="demoModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {selectedChat.chatName}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body d-flex flex-wrap">
              {selectedChat.users.map((u) => (
                <UserBadgeItem
                  key={user._id}
                  user={u}
                  handleFunction={() => handleRemove(u)}
                />
              ))}
            </div>
            <div className="d-flex m-2">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Chat Name"
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <button className="btn btn-outline-success" onClick={handleRename}>
                Update
              </button>
            </div>
            <div className="d-flex m-2">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Add User to group"
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            {loading ? (
              <></>
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => handleAddUser(user)}
                />
              ))
            )}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-dark"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={() => handleRemove(user)}
              >
                Leave Group
              </button>
            </div>
          </div>
        </div>
      </div>
        
      <ToastContainer />
    </div>
  );
};

export default UpdateGroupChatModal;
