 

import { Link } from 'react-router-dom'
import { PiCaretLeftBold } from 'react-icons/pi'
import { Menu } from '@mui/icons-material'
import { useLocation } from 'react-router-dom'
import { IconButton } from '@mui/material'

const Sidebar = ({ setShowSidebar }: any) => {

    ////////////////////////////////////////////// VARIABLES //////////////////////////////////////////////////
    const { pathname } = useLocation()
    const sidebarLinks = [
        {
            name: 'Categories',
            route: '/admin/categories',
        },
        {
            name: 'Subcategories',
            route: '/admin/subcategories',
        },
        {
            name: 'Books',
            route: '/admin/books',
        },
        {
            name: 'Messages',
            route: '/admin/messages',
        },
        {
            name: 'Tools',
            route: '/admin/tools',
        },
        {
            name: 'Plans',
            route: '/admin/plans',
        },
    ]

    ////////////////////////////////////////////// STATES //////////////////////////////////////////////////


    ////////////////////////////////////////////// USE EFFECTS //////////////////////////////////////////////////

    ////////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////////////


    return (
        <>
            {/* Desktop Sidebar */}
            <div className="md:flex flex-col hidden h-screen sticky top-0 left-0 lg:w-[25vw] md:w-[33vw] bg-lighter-blue ">

                <div className="flex flex-col w-full">

                    <div className="flex flex-col items-start mb-3 mt-6 ">
                        <Link to='/dashboard' className='bg-red text-white flex justify-end items-center  w-[5rem] h-[46px] rounded-r-full ' >
                            <PiCaretLeftBold style={{ fontSize: '28px' }} className='relative right-[1rem]' />
                        </Link>
                        {/* logo */}
                        <div className="w-full px-4">
                            <img
                                src={"/public/logo-mini.png"}
                                alt="Doctor Guide"
                                className="w-[10rem] mx-auto"
                            />
                        </div>
                    </div>

                    {/* Searchbar and Links */}
                    <div className="flex flex-col">

                        {/* Search bar */}
                        <div className="w-full px-4 relative">
                            <h2 className='text-[32px] font-bold text-main-blue w-full text-center ' >Admin Panel</h2>
                        </div>

                        {/* Links */}
                        <div className="w-full px-4 mb-2 relative ">
                            <div className="w-full flex flex-col gap-[12px] pl-4 pt-3">
                                {sidebarLinks.map((link, index) => {
                                    const isActive = pathname.includes(link.name) || pathname == link.route
                                    return (
                                        <Link
                                            to={link.route}
                                            className={`${isActive ? 'bg-red text-white ' : 'bg-slate-200 text-main-blue '} capitalize px-6 py-3 hover:bg-red hover:text-white transition-all duration-75 rounded-lg cursor-pointer`}
                                            key={index}
                                        >
                                            {link.name}
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>

                    </div>
                </div>

            </div>


            {/* Mobile Sidebar */}
            <div className="md:hidden flex flex-col justify-between pt-4 shadow-box z-[1000] absolute top-0 w-[80%] h-full bg-light-silver main-blue-main transition-transform duration-500 ease-in-out transform translate-x-0">

                <div className="flex flex-col gap-3 w-full">

                    <div className="flex flex-col items-start mb-2 mt-2 ">
                        {/* logo */}
                        <div className="w-full px-4">
                            <img
                                src={"/public/logo-mini.png"}
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
                        <div className="w-full px-4 relative">
                            <h2 className='text-[32px] font-bold text-main-blue w-full text-center ' >Admin Panel</h2>
                        </div>

                        {/* Links */}
                        <div className="w-full px-4 mb-2 relative ">
                            <div className="w-full flex flex-col gap-[12px] pt-3">
                                {sidebarLinks.map((link, index) => {
                                    const isActive = pathname.includes(link.name) || pathname == link.route
                                    return (
                                        <Link
                                            to={link.route}
                                            onClick={() => setShowSidebar(false)}
                                            className={`${isActive ? 'bg-red text-white ' : 'bg-slate-200 text-main-blue '} capitalize px-6 py-3 hover:bg-red hover:text-white transition-all duration-75 rounded-lg cursor-pointer`}
                                            key={index}
                                        >
                                            {link.name}
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </>
    )
}

export default Sidebar