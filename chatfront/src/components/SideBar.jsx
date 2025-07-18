import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoSearch } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { BiLogOutCircle } from "react-icons/bi";

import dp from "../assets/dp.webp";
import { Form, useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../main";
import {
  setOtherUsers,
  setSearchData,
  setSelectedUser,
  setUserData,
} from "../redux/userSlice";
function SideBar() {
  const { userData, otherUsers, selectedUser, onlineUsers, searchData } =
    useSelector((state) => state.user);
  const [search, setSearch] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let [input, setInput] = useState("");

  const handleLogout = async () => {
    try {
      let result = await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      dispatch(setOtherUsers(null));
      navigate("login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async () => {
    try {
      let result = await axios.get(
        `${serverUrl}/api/user/search?query=${input}`,
        { withCredentials: true }
      );
      dispatch(setSearchData(result.data));
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (input) {
      handleSearch();
    }
  }, [input]);

  return (
    <>
      <div
        className={`lg:w-[30%] relative w-full lg:block ${
          !selectedUser ? " block" : " hidden"
        }  h-full bg-slate-200`}
      >

        {
          input.length > 0 &&
            <div className="  top-[200px] flex w-full h-[500px] bg-white overflow-y-auto flex-col gap-[10px] absolute z-[150] items-center pt-[20px] ">
                  {searchData?.map((user) => (
                    <div
                      className="w-[95%] px-[10px] border-b-2 border-gray-300 h-[70px] flex justify-start items-center gap-[20px] bg-white  hover:bg-[#20c7ff] cursor-pointer transition-all duration-300 ease-in-out"
                      onClick={() => {
                        dispatch(setSelectedUser(user));
                        setInput("")
                        setSearch(false)
                      }
                      }
                    >
                      <div className="relative rounded-full shadow-gray-500 bg-white shadow-lg  flex justify-center items-center ">
                        <div className="w-[50px] h-[50px] rounded-full object-cover border-2  border-[#20c7ff] shadow-lg overflow-hidden flex justify-center  items-center shadow-gray-500">
                          <img
                            src={user.image || dp}
                            alt="Profile"
                            className="h-[100%]"
                          />
                        </div>
                        {onlineUsers?.includes(user._id) && (
                          <span className="w-[12px] h-[12px] rounded-full absolute bottom-[6px] right-[-1px] bg-[#4ef51b] shadow-gray-500 shadow-md">
                            {" "}
                          </span>
                        )}
                      </div>

                      <h1 className="text-gray-800 font-semibold text-[20px] text-pretty">
                        {user.name || user.username}
                      </h1>
                    </div>
                  ))}
                </div>  

        }

     



        <div className="w-full h-[250px] bg-[#20c7ff] rounded-b-[30%] shadow-gray-400 shadow-lg flex flex-col  justify-center px-[20px] ">
          <h1 className="text-white font-bold text-[25pxb]">TΛLKZΞN</h1>
          <div className="flex w-full justify-between items-center ">
            <h1 className="text-gray-800 font-bold text-pretty">
              hey ,{userData.name || "user"}
            </h1>
            {/*  */}
            <div
              onClick={() => navigate("/profile")}
              className="cursor-pointer w-[60px] h-[60px] rounded-full object-cover border-2 border-[#20c7ff] shadow-lg overflow-hidden flex justify-center items-center shadow-gray-500"
            >
              <img
                src={userData.image || dp}
                alt="Profile"
                className="h-[100%]"
              />
            </div>
          </div>
          {/* search section */}

          <div className="w-full flex items-center gap-[20px] overflow-y-auto py-[15px] ">
            {!search && (
              <div
                onClick={() => setSearch(true)}
                className="w-[60px] bg-white h-[60px] rounded-full object-cover border-2 border-[#20c7ff] shadow-lg overflow-hidden flex justify-center items-center shadow-gray-500 cursor-pointer"
              >
                <IoSearch className="w-[25px] h-[25px]" />
              </div>
            )}
            {search && (
              <form
                action=""
                className="w-full h-[40px] bg-white flex items-center gap-[10px] mt-[10px] rounded-full overflow-hidden px-[20px] "
              >
                <IoSearch className="w-[25px] h-[25px]" />
                <input
                  type="text"
                  placeholder="search Users.."
                  className=" w-full h-full p-[10px] outline-0 border-0 "
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />

                <RxCross2
                  onClick={() => setSearch(false)}
                  className="text-[25px] cursor-pointer"
                />

               
              </form>
            )}
            {!search &&
              otherUsers?.map(
                (user) =>
                  onlineUsers?.includes(user._id) && (
                    <div
                      className="relative rounded-full shadow-gray-500 bg-white shadow-lg flex justify-center items-center mt-[10px] cursor-pointer "
                      onClick={() => dispatch(setSelectedUser(user))}
                    >
                      <div className="w-[60px] h-[60px] rounded-full object-cover border-2 border-[#20c7ff] shadow-lg overflow-hidden flex justify-center items-center shadow-gray-500">
                        <img
                          src={user.image || dp}
                          alt="Profile"
                          className="h-[100%]"
                        />
                      </div>
                      <span className="w-[12px] h-[12px] rounded-full absolute bottom-[6px] right-[-1px] bg-[#4ef51b] shadow-gray-500 shadow-md">
                        {" "}
                      </span>
                    </div>
                  )
              )}
          </div>
        </div>
        {/* logout */}
        <div
          onClick={handleLogout}
          className="w-[50px] fixed bottom-[10px] left-[20px] h-[50px] rounded-full object-cover bg-[#20c7ff] border-2 border-[#20c7ff] shadow-lg overflow-hidden flex justify-center items-center shadow-gray-500 cursor-pointer"
        >
          <BiLogOutCircle className="w-[25px] h-[25px]" />
        </div>
        {/* other User data */}

        <div className="w-full h-[45%]  overflow-auto flex flex-col gap-[15px] items-center mt-[10px] ">
          {otherUsers?.map((user) => (
            <div
              className="w-[95%] h-[50px] flex justify-start items-center gap-[20px] bg-white shadow-gray-500 shadow-lg  rounded-full hover:bg-[#20c7ff] cursor-pointer transition-all duration-300 ease-in-out"
              onClick={() => dispatch(setSelectedUser(user))}
            >
              <div className="relative rounded-full shadow-gray-500 bg-white shadow-lg  flex justify-center items-center ">
                <div className="w-[50px] h-[50px] rounded-full object-cover border-2  border-[#20c7ff] shadow-lg overflow-hidden flex justify-center  items-center shadow-gray-500">
                  <img
                    src={user.image || dp}
                    alt="Profile"
                    className="h-[100%]"
                  />
                </div>
                {onlineUsers?.includes(user._id) && (
                  <span className="w-[12px] h-[12px] rounded-full absolute bottom-[6px] right-[-1px] bg-[#4ef51b] shadow-gray-500 shadow-md">
                    {" "}
                  </span>
                )}
              </div>

              <h1 className="text-gray-800 font-semibold text-[20px] text-pretty">
                {user.name || user.username}
              </h1>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default SideBar;
