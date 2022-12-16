
import React from 'react'
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from '../config/ChatLogics'
import { ChatState } from '../Context/ChatProvider'

const ScrollableChat = ({messages}) => {

    const { user } = ChatState();
  return (
    <div>{messages && messages.map((m,i) => (
        <div style={{display:"flex"}} key={m._id}>
            {
                (isSameSender(messages, m, i, user._id)
                || isLastMessage(messages, i, user._id)
                ) && (
                    <img src={m.sender.pic} alt={m.sender.name} style={{width:"30px", height:"30px", borderRadius:"25px"}} />
                )}
                <span 
                    style = {{
                        backgroundColor: `${
                            m.sender._id === user._id ? "#BEE3F8" : "B9F5D0"
                            
                        }`,
                        borderRadius:"20px",
                        padding: "5px 15px",
                        maxWidth:"75%",
                        marginLeft: isSameSenderMargin(messages, m, i, user._id),
                        marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10
                    }}>
                    {m.content}
                </span>
        </div>
    ))}</div>
  )
}

export default ScrollableChat