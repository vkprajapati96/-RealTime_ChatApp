import React from 'react'
import SideBar from '../components/SideBar'
import MessageArea from '../components/MessageArea'
import GetMessages from '../customHooks/GetMessages'

function Home() {
  GetMessages()
  return (
    <div className='flex w-full h-[100vh] overflow-hidden'>
<SideBar/>
<MessageArea/>
    </div>
  )
}

export default Home
