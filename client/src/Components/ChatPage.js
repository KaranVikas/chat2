import { ChatState } from "../Context/ChatProvider";
import React, { useState } from "react";
import SideDrawer from "./miscellaneous/SideDrawer";
import MyChats from "./miscellaneous/MyChats";
import ChatBox from "./miscellaneous/ChatBox";
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";

const ChatPage = () => {
  const { user, selectedChat } = ChatState();
  const [fetchAgain, setfetchAgain] = useState(false);

  return (
    <div className="container-fluid p-0" style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <div
        className="row"
        style={{
          display: "flex",
          width: "100%",
          height: "90vh",
          justifyContent: "space-between",
          padding: "20px"
        
        }}
      >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setfetchAgain={setfetchAgain} />
        )}
        {/* {selectedChat != undefined && <UpdateGroupChatModal />} */}
      </div>
    </div>
  );
};

export default ChatPage;
