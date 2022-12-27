const asyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");

const accessChat = asyncHandler(async (req, res) => {
  // check chat exist with userid exist return it if not create it
  const { userId } = req.body;

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      // match with user._id -> id through through with we logged in
      // userId which we are finding
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  //populate sender field
  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatNmae: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      const createdChat = await Chat.create(chatData);

      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );

      res.status(200).send(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});

const fetchChats = asyncHandler(async (req, res) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updateAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name pic email",
        });

        res.status(200).send(results);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const createGroupChat = asyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "Please fill all the fields" });
  }

  var users = JSON.parse(req.body.users);

  if (users.length < 2) {
    return res
      .status(400)
      .send("More than 2 users are reqiured to form a group chat");
  }

  users.push(req.user);

  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const renameGroup = asyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName,
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    res.status(404);
    throw new Error("Chat not found");
  } else {
    res.json(updatedChat);
  }
});

const addToGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;
  console.log("userID", userId);
  console.log("chatID", chatId);
  // console.log("Display chat", res.Chat)
  var chatReq = await Chat.findOne({ _id: chatId });
 
    const check = await chatReq.users.find((u) => `${u._id}` === `${userId}`);
    if (check){
      console.log("CHECK", check);
    } else{
      console.log("not found");
      
      const added = await Chat.findByIdAndUpdate(
        chatId,
        {
          $push: {users:userId}
        },
        {
          new: true,
        }
      )
      .populate("users","-password")
      .populate("groupAdmin","-password");

      // will not work as it will check condition first
      if (!added) {
        console.log("not added")
        res.status(404);
        throw new Error("Users not added");
        
      } else {
        res.json(added);
        console.log("added", added)
      }
    
    }

  res.send(" already added ");
 

  // if (chatReq.users.find((u) => u._id !== `new ObjectId("${userId}")` )) {
  //   console.log("not find see" , userId )
  //   console.log(`new1 ObjectId("${userId}")`)
  //   // console.log("U_id", u)
  // }
  // const Chatting = Chat.find({
  //   users: { $elemMatch: { _id: "638ef29d002b84f8498dde64" } },
  // });

  // var userReq = chatReq.users.findOne({ _id: userId });
  // console.log("check", value);
  // var inGroup = await Chat.find({
  //   isGroupChat: true,
  //   $expr : [
  //     {users: {elemMatch: {$eq: userId}}}
  //   ]
  // })
  // console.log("in Group", inGroup)
  // if(!isUserExist){
  //     res.json("User not exist")
  //     res.json(added)
  // }

  //    const added = await Chat.findByIdAndUpdate(
  //      chatId,
  //      {
  //        $push: { users: userId },
  //      },
  //      {
  //        new: true,
  //      }
  //    )
  //      .populate("users", "-password")
  //      .populate("groupAdmin", "-password");

  // if (isUserExist) {
  // res.status(404);
  // throw new Error("Chat Not Found");
  // } else {
  //   res.json("bye");
  // }
});

const removeFromGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  const removed = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removed) {
    res.status(404);
    throw new Error("Chat Not Found");
  } else {
    res.json(removed);
  }
});

module.exports = {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
};
