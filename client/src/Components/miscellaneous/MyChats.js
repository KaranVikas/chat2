import React, { useEffect, useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import ChatLoading from "../miscellaneous/ChatLoading";
import axios from "axios";
import { getSender, getSenderPic } from "../../config/ChatLogics";
import GroupChatModal from "./GroupChatModal";

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
      <div className="col-12 col-sm-4 p-1 pe-2" style={{ 
      // to hide chat button
      display:`${selectedChat ? "none" : "block" }`
      }}>
        <div className="d-flex justify-content-between align-items-center ">
          <h3 style={{fontSize:"24px"}}>My Chats</h3>
          <GroupChatModal>
            {/* <button className="btn btn-light">New Group Chat +</button> */}
          </GroupChatModal>
        </div>

        {/* chat */}

        {chats ? (
          // issue make it scrollable
          <div className="m-1 mt-3 p-2 " style={{ backgroundColor: "#f6f6f6", overflow:"scroll", height:"80vh" }}>
            {chats.map((chat) => (
              <div
                className="m-1 p-2 d-flex"
                onClick={() => {
                  setSelectedChat(chat);
                  console.log({ selectedChat });
                  console.log({ chat });
                }}
                style={{
                  border:" ",
                  cursor: "pointer",
                  backgroundColor: `${selectedChat === chat ? "#f3f5f9" : "#E8E8E8"}`,
                  color: `${selectedChat === chat ? "" : ""}`,
                  borderLeft:`${selectedChat === chat ? "6px solid #3439cd" : ""}`,
                  
                }}
                key={chat._id}
              >
                <div className="mx-2 p-1 me-4">
                  <img src={!chat.isGroupChat
                    ? getSenderPic(loggedUser, chat.users)
                    : "https://medix21.com.au/wp-content/themes/medix21%20AU/images/avatar.png"
                    } style={{width:"40px", height:"40px", objectFit:"fill"}}/>
                </div>
                <div children="flex-column">
                  <div>
                    {!chat.isGroupChat
                      ? getSender(loggedUser, chat.users)
                      : chat.chatName}
                  </div>
                  <div>
                    {
                      chat.latestMessage && (
                        <div>
                          <b>{chat.latestMessage.sender.name} : </b>
                            {chat.latestMessage.content.length > 50
                              ? chat.latestMessage.content.substring(0, 51) + "..."
                              : chat.latestMessage.content
                            }
                        </div>
                      )
                    }
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
