import { IoIosArrowRoundBack } from "react-icons/io";
import { RiEmojiStickerLine } from "react-icons/ri";
import { FaRegImages } from "react-icons/fa6";
import { LuSendHorizontal } from "react-icons/lu";
import EmojiPicker from "emoji-picker-react";

import dp from "../assets/dp.webp";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";
import { useState } from "react";
import axios from "axios";
import { serverUrl } from "../main";
import { useRef } from "react";
import { setMessages } from "../redux/messageSlice";
import SenderMessage from "./SenderMessage";
import ReceiverMessage from "./ReceiverMessage";
// import SenderMessage from "./SenderMessage";
// import ReceiverMessage from "./ReceiverMessage";

function MessageArea() {
  let [showPicker, setShowPicker] = useState(false);
  const dispatch = useDispatch();
  let image = useRef();

  let { selectedUser, userData, socket } = useSelector((state) => state.user);
  let [input, setInput] = useState("");
  let [frontendImage, setFrontendImage] = useState(null);
  let [backendImage, setBackendImage] = useState(null);

  let { messages } = useSelector((state) => state.message);

  function handleImage(e) {
    let file = e.target.files[0];
    // console.log(file)
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  }

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() && !backendImage) return;

    try {
      let formData = new FormData();
      formData.append("message", input);
      if (backendImage) {
        formData.append("image", backendImage);
      }

      let result = await axios.post(
        `${serverUrl}/api/message/send/${selectedUser._id} `,
        formData,
        { withCredentials: true }
      );
      console.log(result.data);
      dispatch(setMessages([...messages, result.data]));
      setInput("");
      setFrontendImage(null);
      setBackendImage(null);
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    }
  };

  const handleEmojiClick = (emojiData) => {
    setInput((prevInput) => prevInput + emojiData.emoji);
    setShowPicker(false);
  };

  useEffect(() => {
    socket.on("newMessage", (mess) => {
      dispatch(setMessages([...messages, mess]));
    });

    return () => socket.off("newMessage");
  }, [messages, setMessages]);

  return (
    <div
      className={`lg:w-[70%] relative  ${
        selectedUser ? " flex" : " hidden"
      } lg:block w-full h-full bg-slate-200 border-l-2 border-gray-300`}
    >
      {selectedUser && (
        <div className="w-full h-[100vh] flex flex-col">
          <div className="w-full h-[100px] bg-[#1797c2] rounded-b-[30px] shadow-gray-400 shadow-lg flex items-center gap-[10px] px-[20px] ">
            <div
              onClick={() => dispatch(setSelectedUser(null))}
              className=" cursor-pointer"
            >
              <IoIosArrowRoundBack className="w-[40px] h-[40px] text-white" />
            </div>
            <div className="cursor-pointer w-[50px] h-[50px] rounded-full object-cover border-2 border-[#20c7ff] shadow-lg overflow-hidden flex justify-center items-center shadow-gray-500">
              <img
                src={selectedUser?.image || dp}
                alt="Profile"
                className="h-[100%]"
              />
            </div>
            <h1 className="text-white font-semibold text-[20px] ">
              {selectedUser?.name || selectedUser?.username}
            </h1>
          </div>

          <div className="w-full h-[70%] flex flex-col py-[50px] px-[20px] overflow-auto gap-[20px] ">
            {showPicker && (
              <div className="absolute bottom-[90px] left-[20px]">
                <EmojiPicker
                  onEmojiClick={handleEmojiClick}
                  width={250}
                  height={350}
                />{" "}
              </div>
            )}
            {messages &&
              messages.map((mess) =>
                mess.sender == userData._id ? (
                  <SenderMessage image={mess.image} message={mess.message} />
                ) : (
                  <ReceiverMessage image={mess.image} message={mess.message} />
                )
              )}
          </div>
        </div>
      )}

      {!selectedUser && (
        <div className="w-full h-full flex flex-col justify-center items-center">
          <h1 className="text-gray-700 font-bold text-[50px]">
            Welcome to TalkZen
          </h1>
          <span className="text-gray-700 font-semibold text-[20px]">
            let's chat with someone Special
          </span>
        </div>
      )}

      {/* form input */}
      {selectedUser && (
        <div className="w-full lg:w-[70%] h-[100px] fixed bottom-0 flex items-center justify-center marker: ">
          <img
            src={frontendImage}
            alt=""
            className="w-[80px] absolute bottom-[100px] right-[10%]"
          />

          <form
            onSubmit={handleSendMessage}
            className="w-[95%] lg:-w-[70%] h-[60px]  bg-[rgb(23,151,194)] shadow-lg rounded-full flex items-center gap-[20px] px-[20px]  "
          >
            <input
              type="file"
              accept="image/*"
              ref={image}
              hidden
              onChange={handleImage}
            />
            <div onClick={() => setShowPicker(!showPicker)}>
              <RiEmojiStickerLine className="w-[25px] h-[25xpx] text-white  cursor-pointer" />
            </div>
            <input
              placeholder="message..."
              type="text"
              onChange={(e) => setInput(e.target.value)}
              value={input}
              className=" placeholder-white w-full h-full px-[10px] outline-none text-[15px] text-white bg-transparent"
            />
            <div onClick={() => image.current.click()}>
              <FaRegImages className="w-[25px] h-[25xpx] text-white cursor-pointer " />
            </div>
            <button>
              <LuSendHorizontal className="w-[25px] h-[25xpx] text-white cursor-pointer " />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default MessageArea;
