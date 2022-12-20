import React from 'react'
import { ChatState } from '../../Context/ChatProvider'
import SingleChat from './SingleChat';


const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();
  return (
    
    <div className='col-12 col-lg-8 container-fluid d-flex flex-column ps-4 ' >
      
      
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />  
    </div>
  )
}

export default ChatBox