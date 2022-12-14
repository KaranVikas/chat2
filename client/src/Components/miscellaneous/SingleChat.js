import React, { useState, useEffect } from "react";
import { getSender, getSenderFull } from "../../config/ChatLogics";
import { ChatState } from "../../Context/ChatProvider";
import ProfileModal from "./ProfileModal";
import UpdateGroupChatModal from "./UpdateGroupChatModal";
import axios from "axios";
import "./SingleChat.css";
import ScrollableChat from "../ScrollableChat";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:5000";
var selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState();
  const [socket] = useState(io(ENDPOINT));
  const [socketConnected, setsocketConnected] = useState(false);

  const { user, selectedChat, setSelectedChat } = ChatState();
  //console.log("SELE", selectedChat);

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      // setloading(true)
      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );
      console.log("messages1", messages);
      setMessages(data);

      setLoading(false);

      // socket.emit("join chat", selectedChat._id);
    } catch (error) {
      // toast function -> Error Occurred
      console.log("Failed to load the Messages");
    }
  };

  useEffect(() => {
    if (!socket.connected) {
      socket.connect;
    }
    socket.on("connect", () => {
      // socket.on("message recieved", () => {
      //   console.log("MESSAGE RECIEVED");
      // });
    });

    // socket.on("connect", (client) => console.log("PLEASE CONNECT"));

    // socket.emit("setup", user);
    // socket.on("connection", () => {
    //   setsocketConnected(true);
    //   console.log("commectes");
    // });
  }, []);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  // useEffect(() => {
  //   if (socketConnected) {
  //     socket.on("message recieved", (newMessageRecieved) => {
  //       console.log("message recieved");
  //       if (
  //         !selectedChatCompare ||
  //         selectedChatCompare._id !== newMessageRecieved.chat._id
  //       ) {
  //         //give notification
  //       } else {
  //         // setMessages([...messages, newMessageRecieved]);
  //       }
  //     });
  //   }
  // }, [socketConnected]);

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      console.log("send");

      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );
        console.log(data);
        setNewMessage("");
        socket.emit("new message", data);
        // socket.emit("message recieved", data);
        // socket.emit("new message", data);
        // setNewMessage([...messages, data]);
        // setMessages(data);
      } catch (error) {
        console.log("OOPS", error);
      }
    }
    // if (event.key === "Enter" && newMessage) {
    //   try {
    //     const config = {
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${user.token}`,
    //       },
    //     };
    //     const { data } = await axios.post(
    //       "/api/message",
    //       {
    //         content: newMessage,
    //         chatId: selectedChat._id,
    //       },
    //       config
    //     );
    //     console.log(data);
    //     socket.emit("new message", data);
    //     setNewMessage([...messages, data]);
    //     setMessages(data);
    //   } catch (error) {}
    // }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    //typing Indicator Logic
  };
  return (
    <>
      {selectedChat != undefined ? (
        <>
          <h5 className="d-flex justify-content-between align-items-center">
            <button
              className="btn btn-light"
              onClick={() => setSelectedChat("")}
            >
              <i className="fa-solid fa-arrow-left"></i>
            </button>
            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                <ProfileModal user={getSenderFull(user, selectedChat.users)} />
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                {
                  <UpdateGroupChatModal
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                    fetchMessages={fetchMessages}
                  />
                }
              </>
            )}
          </h5>
          <div
            className=" container-fluid mt-2 h-100 d-flex flex-column justify-content-end"
            style={{ backgroundColor: "#f6f6f6" }}
          >
            Message Space
            {loading ? (
              <></>
            ) : (
              <div className="messages">
                Messages
                <ScrollableChat messages={messages} />
              </div>
            )}
            <div>
              <div className=" mb-3" onKeyDown={sendMessage}>
                <input
                  type="text"
                  className="form-control me-2"
                  placeholder="Enter a message..."
                  onChange={typingHandler}
                  value={newMessage}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div
          className="d-flex justify-content-center align-items-center h-100"
          style={{ border: "1px solid black" }}
        >
          <h5> Click on user to start Chatting</h5>
        </div>
      )}
    </>
  );
};

export default SingleChat;
