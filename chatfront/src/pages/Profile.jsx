import React, { useRef, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";

import dp from "../assets/dp.webp";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../main";
import { setUserData } from "../redux/userSlice";

const Profile = () => {
  let dispatch = useDispatch();
  let { userData } = useSelector((state) => state.user);
  let navigate = useNavigate();

  let [name, setName] = useState(userData.name || "");
  let [frontendImage, setFrontendImage] = useState(userData.image || dp);
  let [backendImage, setBackendImage] = useState(null);
  let [saving, setSaving] = useState(false);

  let image = useRef();

  const handleImage = (e) => {
    let file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const handleProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      let formData = new FormData();
      formData.append("name", name);
      if (backendImage) {
        formData.append("image", backendImage);
      }

      let result = await axios.put(`${serverUrl}/api/user/profile`, formData, {
        withCredentials: true,
      });
      setSaving(false);
      dispatch(setUserData(result.data));
      setName("");
      navigate("/");
    } catch (error) {
      setSaving(false);
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#eaf0f6] flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-3xl w-full  max-w-2xl  flex p-6">
        {/* Left Form + Profile Photo */}
        <div className="w-full flex flex-col items-center p-6">
          <div
            className="relative top-[-20px] cursor-pointer left-[-190px]"
            onClick={() => navigate("/")}
          >
            <IoIosArrowRoundBack className="w-[40px] h-[40px]" />
          </div>

          {/* Profile Image */}
          <div className="relative mb-6" onClick={() => image.current.click()}>
            <img
              src={frontendImage}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-2 border-[#20c7ff] shadow-md"
            />
            <span className="absolute bottom-2 right-2 bg-blue-500 rounded-full p-1 text-white text-sm cursor-pointer">
              📷
            </span>
          </div>
          {/* Form */}
          <form
            onSubmit={handleProfile}
            className="w-full flex flex-col gap-[30px] "
          >
            <input
              type="file"
              hidden
              accept="image/*"
              ref={image}
              onChange={handleImage}
            />

            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Enter Your Name"
              className="w-full h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-[white]
                rounded-lg shadow-gray-200 shadow-lg
                "
            />
            <input
              readOnly
              type="text"
              placeholder="Username"
              value={userData?.username}
              className="w-full h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-[white] text-gray-400
                rounded-lg shadow-gray-200 shadow-lg
                "
            />
            <input
              readOnly
              type="email"
              placeholder="Email"
              value={userData?.email}
              className="w-full h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-[white]
                rounded-lg shadow-gray-200 shadow-lg text-gray-400 
                "
            />
            <button
              className="m-auto w-[150px] bg-gradient-to-r from-blue-400 to-blue-600  px-6 py-2 rounded-xl shadow-md hover:scale-105 transition text-white"
              disabled={saving}
            >
              {saving ? "saving..." : "save profile"}
            </button>
          </form>
        </div>

        {/* Right Decorative Image Section */}
        {/* <div className="w-1/2 flex items-center justify-center">
          <img
            src="https://i.pinimg.com/736x/b2/10/29/b21029bd6ae32798514c04d19841d875.jpg"
            alt="Decorative"
            className="w-[400px] h-[550px] rounded-xl shadow-md object-cover"
          />
        </div> */}
      </div>
    </div>
  );
};

export default Profile;
