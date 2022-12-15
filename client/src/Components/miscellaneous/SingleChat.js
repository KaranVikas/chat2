import React from 'react'
import { getSender, getSenderFull } from '../../config/ChatLogics';
import { ChatState } from '../../Context/ChatProvider'
import ProfileModal from './ProfileModal';

const SingleChat = ({fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat} = ChatState();
    return (
    <>
		{	selectedChat ? (
			<>
				<h5 className='d-flex justify-content-between align-items-center'>
					<button className='btn btn-light' onClick={setSelectedChat("")}>
						<i className="fa-solid fa-arrow-left"></i>
					</button>
					{!selectedChat.isGroupChat ? (
						<>
							{getSender(user, selectedChat.users)}
							<ProfileModal user={getSenderFull(user, selectedChat.users)} />
						</>
					) : (
						<></>
					)}
				</h5>
			</>
		) : (
			<div className='d-flex justify-content-center align-items-center h-100' style={{border:"1px solid black"}}> 
				<h5> Click on user to start Chatting</h5>
			</div>
		)}
		</>    
	)
};

export default SingleChat