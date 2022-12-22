
import React from 'react'
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from '../config/ChatLogics'
import { ChatState } from '../Context/ChatProvider'
import ScrollableFeed from "react-scrollable-feed";

const ScrollableChat = ({messages}) => {

    const { user } = ChatState();
  return (
    <ScrollableFeed>
      <div>
        {messages &&
          messages.map((m, i) => (
            <div style={{ display: "flex" }} key={m._id}>
              {(isSameSender(messages, m, i, user._id) ||
                isLastMessage(messages, i, user._id)) && (
                <img
                  src={m.sender.pic}
                  alt={m.sender.name}
                  style={{
                    width: "35px",
                    height: "35px",
                    borderRadius: "25px",
                    marginRight:"7px"
                  }}
                />
              )}
              <span
                style={{
                  backgroundColor: `${
                    m.sender._id === user._id ? "#fff037" : "#222222"
                  }`,
                  color: `${m.sender._id === user._id ? "" : "#ffffff"}`,
                  borderRadius: "20px",
                  padding: "5px 15px",
                  maxWidth: "75%",
                  marginLeft: isSameSenderMargin(messages, m, i, user._id),
                  marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                }}
              >
                {m.content}
              </span>
            </div>
          ))}
      </div>
    </ScrollableFeed>
  );
}

export default ScrollableChat