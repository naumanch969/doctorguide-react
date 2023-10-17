 

import { IconButton } from "@mui/material";
import { ProfileSidebar as Sidebar } from "../components";
import { useState, useEffect } from 'react'
import { Menu } from "@mui/icons-material";


const ProfileWrapper = ({ children }: any) => {

  const [showSidebar, setShowSidebar] = useState<boolean>(false)

  useEffect(() => {
    if (window.innerWidth > 768) {
      setShowSidebar(true)
    }
    else {
      setShowSidebar(false)
    }
  }, [window.innerWidth])
  useEffect(() => {
    console.log('showSidebar', showSidebar)
  }, [showSidebar])


  return (
    <div style={{ overflow: 'hidden' }} className='w-screen h-screen overflow-hidden flex  ' >

      {showSidebar && <Sidebar setShowSidebar={setShowSidebar} />}
      <div className="lg:w-[75vw] md:w-[67vw] w-full h-full overflow-y-scroll flex flex-col">

        <div className="md:hidden flex justify-center items-center p-4 relative ">
          <span></span>
          <img src="/public/logo-mini.png" alt="Logo" className='w-[10rem] ' />
          <IconButton onClick={() => setShowSidebar(pre => !pre)} style={{ position: 'absolute' }} className='absolute top-[50%] right-4 ' ><Menu style={{ fontSize: '2rem' }} /></IconButton>
        </div>

        {children}
      </div>

    </div>
  )
}

export default ProfileWrapper