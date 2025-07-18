import axios from "axios"
import { useEffect } from "react"
import { serverUrl } from "../main"
import { useDispatch, useSelector,} from "react-redux"
// import { setOtherUsers,} from "../redux/userSlice"
import { setMessages } from "../redux/messageSlice"


function GetMessages() {
   let dispatch = useDispatch()
   const {userData,selectedUser} = useSelector(state=>state.user)

   useEffect(()=>{
    const fetchMessage = async ()=>{
        
        try {
            let result =await axios.get(`${serverUrl}/api/message/get/${selectedUser._id}`,{withCredentials:true})

            dispatch(setMessages(result.data))
            
        } catch (error) {
            console.log(" Current User Error ",error)
            
        }

    }

    fetchMessage();
},[selectedUser,userData])

}

export default GetMessages