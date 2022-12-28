import React, { useEffect, useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import ChatLoading from "../miscellaneous/ChatLoading";
import axios from "axios";
import { getSender, getSenderPic } from "../../config/ChatLogics";
import GroupChatModal from "./GroupChatModal";
import "./MyChats.css"

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const fetchChats = async () => {
    //console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get("/api/chat", config);
      console.log("mychat ->", data);
      setChats(data);
    } catch (error) {
      // toasts function
      console.log("Failed to Load the chats");
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);
  useEffect(() => {
    console.log("SELECTED CHAT IS ", selectedChat);
  }, [selectedChat]);
  return (
    <>
      <div
        className={`col-12 col-lg-4 p-1 pe-2 ${
          selectedChat ? "d-none d-lg-block" : "d-block"
        }`}
        // style={{
        //   // to hide mychat button

        //   display: `${selectedChat ? "none" : "block"}`,
        // }}
      >
        <div className="d-flex justify-content-between align-items-center ">
          <h3 className="ms-3 p-1" style={{ fontSize: "24px" }}>
            My Chats
          </h3>
          <GroupChatModal>
            {/* <button className="btn btn-light">New Group Chat +</button> */}
          </GroupChatModal>
        </div>

        {/* chat */}

        {chats ? (
          // issue make it scrollable
          <div
            className="ms-3 mt-3 "
            style={{
              backgroundColor: "",

              overflow: "scroll",
              height: "80vh",
            }}
          >
            {chats.map((chat) => (
              <div
                className="m-2 m-sm-1 p-2 d-flex"
                onClick={() => {
                  setSelectedChat(chat);
                  console.log({ selectedChat });
                  console.log({ chat });
                }}
                style={{
                  border: " ",
                  cursor: "pointer",
                  borderRadius: "1rem",
                  backgroundColor: `${
                    selectedChat === chat ? "" : "#f3f5f9"
                  }`,
                  // default choosen #f3f5f9
                  color: `${selectedChat === chat ? "" : ""}`,
                  borderLeft: `${
                    selectedChat === chat ? "6px solid #fff037" : ""
                  }`,
                  borderWidth: `${
                    selectedChat === chat ? "2px 2px 2px 6px " : ""
                  }`,
                  borderColor: `${selectedChat === chat ? " #fff037" : ""}`,
                }}
                key={chat._id}
              >
                <div className="mx-2 p-1 me-4">
                  <img
                    src={
                      !chat.isGroupChat
                        ? getSenderPic(loggedUser, chat.users)
                        : "https://medix21.com.au/wp-content/themes/medix21%20AU/images/avatar.png"
                    }
                    style={{ width: "40px", height: "40px", objectFit: "fill" }}
                  />
                </div>
                <div className="d-flex flex-column align-items-start">
                  <div>
                    {!chat.isGroupChat
                      ? getSender(loggedUser, chat.users)
                      : chat.chatName}
                  </div>
                  <div>
                    {chat.latestMessage && (
                      <div>
                        <b>{chat.latestMessage.sender.name} : </b>
                        {chat.latestMessage.content.length > 50
                          ? chat.latestMessage.content.substring(0, 51) + "..."
                          : chat.latestMessage.content}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <ChatLoading />
        )}
      </div>
    </>
  );
};

export default MyChats;
