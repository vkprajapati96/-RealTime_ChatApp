import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import GetCurrentUser from "./customHooks/GetCurrentUser";
import { useDispatch, useSelector } from "react-redux";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import GetOtherUsers from "./customHooks/GetOtherUsers";
import { io } from "socket.io-client";
import { useEffect } from "react";
import { serverUrl } from "./main";
import { setOnlineUser, setSocket } from "./redux/userSlice";

function App() {
  GetCurrentUser();
  GetOtherUsers();
  let { userData,socket,onlineUsers } = useSelector((state) => state.user);
    let dispatch = useDispatch();

  useEffect(() => {

    if (userData) {
        const socketio = io(`${serverUrl}`, {
      query: {
        userId: userData?._id,
      },
    });

dispatch(setSocket(socketio))    

socketio.on("getOnlineUsers",(users)=>{
  dispatch(setOnlineUser(users))

})
return ()=>socketio.close()
    

}else{
  if (socket) {
    socket.close();
    dispatch(setSocket(null))
  }
}

  
  }, [userData]);

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={!userData ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/"
          element={userData ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!userData ? <SignUp /> : <Navigate to="/profile" />}
        />
        <Route
          path="/profile"
          element={userData ? <Profile /> : <Navigate to="/signup" />}
        />
      </Routes>
    </>
  );
}

export default App;
