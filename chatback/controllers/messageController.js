import uploadONCloudinary from "../config/cloudinary.js";
import Conversation from "../model/ConversationModel.js";
import Message from "../model/MessageModel.js"
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async(req,res)=>{
    try {
        let sender = req.userId
        let {receiver} = req.params;
        let {message} = req.body

        let image;
        if (req.file) {
            image = await uploadONCloudinary(req.file.path)
        }

        let conversation = await Conversation.findOne({
            participants:{$all:[sender,receiver]}

        })


    let newMessage =await Message.create({
        sender,
        receiver,
        message,
        image

    })

    if (!conversation) {
        conversation =await Conversation.create({
            participants:[sender,receiver],
            messages:[newMessage._id]
        })
    }else{
        conversation.messages.push(newMessage._id)
        await conversation.save()

    }
    const receiverSocketId = getReceiverSocketId(receiver)
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage",newMessage)
    }


    return res.status(201).json(newMessage)
    
    } catch (error) {
        return res.status(500).json({message:`send message Error: ${error} `})
    }
}


export const getMessage = async (req, res) => {
  try {
    const sender = req.userId;
    const { receiver } = req.params;

    const conversation = await Conversation.findOne({
      participants: { $all: [sender, receiver] }
    }).populate("messages");

    if (!conversation) {
      return res.status(400).json({ message: "Conversation not found" });
    }

    return res.status(200).json(conversation.messages);
  } catch (error) {
    return res.status(500).json({ message: `get message Error: ${error}` });
  }
};
