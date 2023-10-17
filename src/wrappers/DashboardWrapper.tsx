 

import { DashboardSidebar as Sidebar } from '../components'
import { DashboardNavbar as Navbar } from '../components'
import { useState, useEffect } from 'react'


const ProfileWrapper = ({ children }: any) => {

  const [showSidebar, setShowSidebar] = useState(false)

  useEffect(() => {
    if (window.innerWidth > 768) {
      setShowSidebar(true)
    }
    else {
      setShowSidebar(false)
    }
  }, [window.innerWidth])


  return (
    <div style={{ overflow: 'hidden' }} className='w-screen h-screen overflow-hidden flex  ' >

      {showSidebar && <Sidebar setShowSidebar={setShowSidebar} />}
      <div className="lg:w-[75vw] md:w-[67vw] w-full h-full overflow-y-scroll flex flex-col">

        <Navbar setShowSidebar={setShowSidebar} />
        {children}
      </div>

    </div>
  )
}

export default ProfileWrapper