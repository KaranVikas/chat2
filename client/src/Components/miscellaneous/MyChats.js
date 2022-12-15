import React, { useEffect, useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import ChatLoading from '../miscellaneous/ChatLoading'
import axios from 'axios'
import { getSender } from "../../config/ChatLogics";
import GroupChatModal from "./GroupChatModal";


const MyChats = ( { fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState()
  const {selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const fetchChats = async() => {
    //console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get("/api/chat", config);
      console.log("mychat ->",data)
      setChats(data);
      
    } catch (error) {
      // toasts function
      console.log("Failed to Load the chats")
    }
  }

  useEffect(()=> {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")))
    fetchChats();
  }, [fetchAgain])
  return (
      <>
      <div className='container p-1 ' style={{border:"2px solid red"}}>
        <div className="d-flex justify-content-between ">
          My Chats
          <GroupChatModal>
            <button className="btn btn-primary">New Group Chat +</button>
          </GroupChatModal>
        </div>

        {/* chat */}

        { chats ? (
          // issue make it scrollable
          <div className="m-1 p-2 h-100" style={{backgroundColor:"#f6f6f6"}}>
            {chats.map((chat) => (
              <div className="m-1 p-2" 
                onClick={()=> 
                  {
                    setSelectedChat(chat);
                    console.log({selectedChat});
                    console.log({chat});
                }}
                style={{border:"1px solid black", cursor:"pointer",backgroundColor:"#bbbbbb",borderRadius:"2rem"}}
                key={chat._id}
              >
              <div>
                
                {!chat.isGroupChat
                  ? getSender(loggedUser, chat.users)
                  : chat.chatName
                }
              </div>
              </div>
            ))}
          </div>

        ) : (
        <ChatLoading />)}

      </div>
      </>
    
    
  );
};

export default MyChats;
