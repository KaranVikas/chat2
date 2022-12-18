import React from 'react'
import { ChatState } from '../../Context/ChatProvider'
import SingleChat from './SingleChat';


const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();
  return (
    
    <div className='container d-flex flex-column ps-4 ' >
      
      
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />  
    </div>
  )
}

export default ChatBox