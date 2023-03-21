const Message = require("../model/Message");

const getAllMessages = async () => {
  const messages = await Message.find();
  if (!messages) {
    return console.log("No messages found");
  }
  
  return messages;
};

const saveNewMessage = async (data) => {
  const {room, author, message, time} = data;

  try {
    const result = await Message.create({
        "room": room, 
        "author": author, 
        "message": message, 
        "time": time
    });
  } catch (err) {
    console.log(err.message)
  }
};


module.exports = {
  getAllMessages,
  saveNewMessage
};
