 

import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { FaCircleUser } from 'react-icons/fa6'
import { HiHome } from 'react-icons/hi'
import SideLinks from './SideLinks'
import { IoLogOut } from 'react-icons/io5'
import { PiCaretLeftBold, PiHamburger } from 'react-icons/pi'
import { categoriesResponse, toolsResponse } from '../../constants'
import { useNavigate } from 'react-router-dom'
import { Menu } from '@mui/icons-material'
import { getAllBookCategories, getAllToolCategories } from '../../redux/action/category'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { Category } from '../../interfaces'
import Loader from '../../utils/components/Loader'
import { searchBook } from '../../redux/action/book'
import { logout } from '../../redux/action/auth'
import { IconButton } from '@mui/material'

const Sidebar = ({ setShowSidebar }: any) => {

  ////////////////////////////////////////////// VARIABLES //////////////////////////////////////////////////
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { bookCategories, isFetching: booksCategoriesFetching }: { bookCategories: Category[], isFetching: boolean } = useSelector((state: RootState) => state.category)
  const { toolCategories, isFetching: toolsCategoriesFetching }: { toolCategories: Category[], isFetching: boolean } = useSelector((state: RootState) => state.category)
  const toolLinks = [];
  const map = new Map();
  for (const obj of toolsResponse.results) {
    if (!map.has(obj.category)) {
      map.set(obj.category, true);
      toolLinks.push({
        category: obj.category,
        subcategories: [obj.subcategory]
      });
    } else {
      for (const res of toolLinks) {
        if (res.category === obj.category) {
          if (!res.subcategories.includes(obj.subcategory)) {
            res.subcategories.push(obj.subcategory);
          }
        }
      }
    }
  }

  ////////////////////////////////////////////// STATES //////////////////////////////////////////////////
  const [searchValue, setSearchValue] = useState<string>('')

  ////////////////////////////////////////////// USE EFFECTS //////////////////////////////////////////////////
  useEffect(() => {
    dispatch<any>(getAllBookCategories())
    dispatch<any>(getAllToolCategories())
  }, [])
  useEffect(() => {
    searchValue && dispatch<any>(searchBook(searchValue))
  }, [searchValue])

  ////////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////////////
  const handleLogout = () => {
    dispatch<any>(logout(navigate))
  }



  return (
    <>

      {/* Desktop Sidebar */}
      <div className="md:flex flex-col hidden h-screen sticky top-0 left-0 lg:w-[25vw] md:w-[33vw] bg-lighter-blue ">

        <div style={{ height: 'calc(100vh - 3rem)' }} className="flex flex-col w-full ">

          <div className="flex flex-col w-full">

            <div className="flex flex-col items-start mb-3 mt-6 ">
            <Link to='/dashboard' className='bg-main-blue text-white flex justify-end items-center  w-[5rem] h-[46px] rounded-r-full ' >
                <PiCaretLeftBold style={{ fontSize: '28px' }} className='relative right-[1rem]' onClick={() => setShowSidebar(false)} />
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
              {/* Search bar */}
              <div className="w-full px-4 relative mb-10">
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Search"
                  className="py-3 px-6 w-full rounded-full border focus-visible:border-light-gray focus-visible:outline-none"
                />
                <div className="absolute right-[1.3rem] top-1/2 -translate-y-1/2 hover:bg-[#E2E6F2] p-3 rounded-full cursor-pointer">
                  <BsSearch className="" />
                </div>
              </div>
              {/* Links */}
                    <SideLinks
                      title={bookCategories[0]?.name || ""}
                      categoryId={bookCategories[0]?._id}
                      subcategories={bookCategories?.[0]?.bookSubcategories || []}
                      active={false}
                    />
                    {
                      toolCategories.map((category: Category, index: number) => (
                        <React.Fragment key={index} >
                          <SideLinks
                            title={category?.name || ""}
                            // subTools={category.toolSubcategories?.map(((subcategory: { name: string, id: string }) => subcategory.name))}
                            categoryId={category._id}
                            subTools={category.toolSubcategories}
                            active={false}
                          />
                        </React.Fragment>
                      ))
                    }
          


            </div>
          </div>
        </div>

        {/* below links */}
        <div style={{ position: 'sticky' }} className="bg-light-silver flex items-center justify-center sticky left-0 bottom-0 z-[100] mx-auto w-full h-[3rem] sidebar-tabs-shadow rounded-t-3xl  ">
          <div className="flex justify-between items-center lg:px-16 md:px-10 sm:px-8 px-4 w-full">
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





      <div className="md:hidden flex flex-col justify-between shadow-box z-[1000] fixed top-0 w-[80%] h-screen bg-light-silver main-blue-main transition-transform duration-500 ease-in-out transform translate-x-0">

        <div className="flex flex-col gap-4 w-full  ">

          <div className="flex flex-col items-start mb-2 mt-8 ">
            {/* logo */}
            <div className="w-full px-4">
              <img
                src={"/logo-mini.png"}
                alt="Doctor Guide"
                className="w-[10rem] mx-auto"
              />
            </div>
            <IconButton onClick={() => setShowSidebar(false)} style={{ position: 'absolute' }} className="absolute right-4 top-8 ">
              <Menu style={{ fontSize: '40px' }} className='text-main-blue' />
            </IconButton>
          </div>

          {/* Searchbar and Links */}
          <div className="flex flex-col">
            {/* Search bar */}
            <div className="w-full px-4 relative mb-10">
              <input
                type="text"
                placeholder="Search"
                className="py-3 px-6 w-full rounded-full border focus-visible:border-light-gray focus-visible:outline-none"
              />
              <div className="absolute right-[1.3rem] top-1/2 -translate-y-1/2 hover:bg-[#E2E6F2] p-3 rounded-full cursor-pointer">
                <BsSearch className="" />
              </div>
            </div>
            {/* Links */}
            {
                <>
                  <SideLinks
                    title={bookCategories[0]?.name || ""}
                    categoryId={bookCategories[0]?._id}
                    subcategories={bookCategories?.[0]?.bookSubcategories || []}
                    active={false}
                  />
                  {
                    toolCategories.map((category: Category, index: number) => (
                      <React.Fragment key={index} >
                        <SideLinks
                          onClick={() => setShowSidebar(false)}
                          title={category?.name || ""}
                          categoryId={category._id}
                          subTools={category.toolSubcategories}
                          active={false}
                        />
                      </React.Fragment>
                    ))
                  }
                </>
            }
          </div>

        </div>

        {/* below links */}
        <div style={{ position: 'sticky' }} className="bg-light-silver flex items-center justify-center sticky left-0 bottom-0 z-[100] mx-auto w-full h-[3rem] sidebar-tabs-shadow rounded-t-3xl">
          <div className="max-w-[14rem] flex justify-between items-center w-full">
            <Link onClick={() => setShowSidebar(false)} to={`/`} >
              <HiHome className="text-3xl text-main-blue hover:text-main-blue cursor-pointer  " />
            </Link>
            <Link onClick={() => setShowSidebar(false)} to={`/profile/speciality`} >
              <FaCircleUser className="text-[1.8rem] text-gray-400 hover:text-main-blue cursor-pointer " />
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