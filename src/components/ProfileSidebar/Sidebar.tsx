 

import { Link } from 'react-router-dom'
import { FaCircleUser } from 'react-icons/fa6'
import { HiDocument, HiHome } from 'react-icons/hi'
import SideLinks from './SideLinks'
import { IoLogOut } from 'react-icons/io5'
import { PiCaretLeftBold } from 'react-icons/pi'
import { Logout, Person, QuestionMark, Rocket } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/action/auth'

const Sidebar = ({ setShowSidebar }: { setShowSidebar: any }) => {

  ////////////////////////////////////////////// VARIABLES //////////////////////////////////////////////////
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const links = [
    {
      name: 'Account Details',
      route: '/profile/details',
      icon: <Person />
    },
    {
      name: 'Usage',
      route: '/profile/usage',
      icon: <Rocket />
    },
    {
      name: 'Plans & Pricing',
      route: '/profile/plans',
      icon: <HiDocument />
    },
    {
      name: 'Contact Us',
      route: '/profile/contact',
      icon: <QuestionMark />
    },
  ]

  ////////////////////////////////////////////// STATES //////////////////////////////////////////////////

  ////////////////////////////////////////////// USE EFFECTS //////////////////////////////////////////////////

  ////////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////////////
  const handleLogout = () => {
    dispatch<any>(logout(navigate))
  }


  return (
    <>
      <div className="md:flex flex-col hidden h-screen sticky top-0 left-0 lg:w-[25vw] md:w-[33vw] bg-lighter-blue ">

        <div style={{ height: 'calc(100vh - 3rem)' }} className="flex flex-col w-full ">

          <div className="flex flex-col items-start mb-3 mt-6 ">
            <Link to='/dashboard' className='bg-main-blue text-white flex justify-end items-center  w-[5rem] h-[46px] rounded-r-full ' >
              <PiCaretLeftBold style={{ fontSize: '28px' }} className='relative right-[1rem]' />
            </Link>
            {/* logo */}
            <div className="w-full px-4">
              <img
                src={"/logo-mini.png"}
                alt="Doctor Guide"
                className="w-[10rem] mx-auto"
              />
            </div>
          </div>

          {/* Searchbar and Links */}
          <div className="flex flex-col">
            {/* Links */}
            <SideLinks links={links} />
            <div className="mt-[2rem] w-full flex justify-center  ">
              <button onClick={handleLogout} className='flex gap-[8px] border-[1px] border-light-gray py-[6px] px-[1.2rem] rounded-full ' >
                <Logout />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* below links */}
        <div style={{ position: 'sticky' }} className="bg-light-silver flex items-center justify-center sticky left-0 bottom-0 z-[100] mx-auto w-full h-[3rem] sidebar-tabs-shadow rounded-t-3xl  ">
          <div className="flex justify-between items-center lg:px-16 md:px-12 sm:px-8 px-4 w-full">
            <Link to={`/`} >
              <HiHome className="text-3xl text-gray-400 hover:text-main-blue cursor-pointer  " />
            </Link>
            <Link to={`/profile/speciality`} >
              <FaCircleUser className="text-[1.8rem] text-main-blue hover:text-main-blue cursor-pointer " />
            </Link>
            <button onClick={handleLogout}>
              <IoLogOut className="text-[2rem] text-gray-400 hover:text-main-blue cursor-pointer " />
            </button>
          </div>
        </div>
      </div>


      {/* Mobile Sidebar */}
      <div className="md:hidden flex flex-col justify-between shadow-box z-[1000] absolute top-0 w-[80%] h-full bg-light-silver main-blue-main transition-transform duration-500 ease-in-out transform translate-x-0">
        <div className="flex flex-col w-full">

          <div className="flex flex-col items-start mb-3 mt-6 ">
            {/* logo */}
            <div className="w-full px-4">
              <img
                src={"/logo-mini.png"}
                alt="Doctor Guide"
                className="w-[10rem] mx-auto"
              />
            </div>
          </div>

          {/* Searchbar and Links */}
          <div className="flex flex-col">
            {/* Links */}
            <SideLinks links={links} setShowSidebar={setShowSidebar} />
            <div className="mt-[2rem] w-full flex justify-center  ">
              <button onClick={handleLogout} className='flex gap-[8px] border-[1px] border-light-gray py-[6px] px-[1.2rem] rounded-full ' >
                <Logout />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* below links */}
        <div style={{ position: 'sticky' }} className="bg-light-silver flex items-center justify-center sticky left-0 bottom-0 z-[100] mx-auto w-full h-[3rem] sidebar-tabs-shadow rounded-t-3xl">
          <div className="max-w-[14rem] flex justify-between items-center w-full">
            <Link onClick={() => setShowSidebar(false)} to={`/`} >
              <HiHome className="text-3xl text-gray-400 hover:text-main-blue cursor-pointer  " />
            </Link>
            <Link onClick={() => setShowSidebar(false)} to={`/profile/speciality`} >
              <FaCircleUser className="text-[1.8rem] text-main-blue hover:text-main-blue cursor-pointer " />
            </Link>
            <button onClick={handleLogout}>
              <IoLogOut className="text-[2rem] text-gray-400 hover:text-main-blue cursor-pointer " />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar