import React, { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import axios from "axios";
import UserListItem from "../UserAvatar/UserListItem";
import UserBadgeItem from "../UserAvatar/UserBadgeItem";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GroupChatModal = () => {
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  

  const { user, chats, setChats } = ChatState();

  const handleSearch = async (query) => {
    setSearch(query);

    if (!query) {
      return;
    }
    try {
      //setLoading -> true
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search$=${search}`, config);
      //console.log(data);
      // setLoading -> false
      setSearchResult(data);
    } catch (error) {
      // toast
      console.log("Failed to load the searched Result ");
    }
  };

  const handleSubmit = async () => {
    

    if (!groupChatName || !selectedUsers) {
      // toast function Please fill all the fields
      console.log("Please fill all the fields");
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        "/api/chat/group",
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );
      setChats([data, ...chats]);
      console.log("GroupChats", chats);
      // close the modal
      const notify = () => {
        toast("New Group Chat Created ");
      };
      notify();
      console.log("New Group Chat Created");
      
    } catch (error) {
      // show toast function
      console.log("Failed to Create the Chat");
    }
  };

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      // toast  function
      console.log("User already added");
    }
    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  return (
    //
    <div>
      <div>
        <button
          type="button"
          className="btn btn-outline-warning me-1"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          style={{
            //border: "none",
            //backgroundColor: "#fff037",
          }}
        >
          Create Group Chat +
        </button>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Create Group
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <input
                  className="form-control me-2 mb-2"
                  type="text"
                  placeholder="Chat Name"
                  onChange={(e) => setGroupChatName(e.target.value)}
                />
                <input
                  className="form-control me-2 mb-2"
                  type="text"
                  placeholder="Add Users"
                  onChange={(e) => handleSearch(e.target.value)}
                />
                {/* selected users */}
                <div className="d-flex flex-wrap">
                  {selectedUsers.map((u) => (
                    <UserBadgeItem
                      key={user._id}
                      user={u}
                      handleFunction={() => handleDelete(u)}
                    />
                  ))}
                </div>
                {/* render Search User */}
                {loading ? (
                  <div>loading</div>
                ) : (
                  searchResult
                    ?.slice(0, 5)
                    .map((user) => (
                      <UserListItem
                        key={user._id}
                        user={user}
                        handleFunction={() => handleGroup(user)}
                      />
                    ))
                )}
              </div>
              <ToastContainer />
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
                  className="btn btn-warning"
                  onClick={handleSubmit}
                  data-bs-dismiss="modal"
                >
                  Create Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupChatModal;
