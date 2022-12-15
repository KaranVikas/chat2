const express = require('express')
const { protect } = require('../middlewares/authMiddleware');
const { sendMessage, allMessage } = require('../controllers/messageControllers')

const router = express.Router()

//2routes for sending 
// to fetch in a particular chat

router.route('/').post(protect, sendMessage)

// fetch all message for one single chat 
router.route('/:chatId').get(protect,allMessage)

module.exports = router 