 

import { Menu } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useState } from 'react'
import { IoIosArrowForward } from 'react-icons/io';
import { PiCaretLeftBold } from 'react-icons/pi';
// import ReactPlayer from 'react-player';

const Navbar = ({ setShowSidebar }: any) => {

    ////////////////////////////////////////////// VARIABLES //////////////////////////////////////////////////

    ////////////////////////////////////////////// STATES //////////////////////////////////////////////////
    const [isWelcomeCollapsed, setIsWelcomeCollapsed] = useState(false);

    ////////////////////////////////////////////// USE EFFECTS ///////////////////////////////////////////////


    ////////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////////////
    const changeWelcomeCollapsed = () => {
        setIsWelcomeCollapsed(!isWelcomeCollapsed);
    };


    return (
        <div className=" bg-light-silver w-full md:px-16 px-4 md:py-12 py-3">

            <div className="md:hidden flex justify-center items-center relative mb-4">
                {/* Arrow Left */}
                {/* <button className='' >
                    <PiCaretLeftBold style={{ fontSize: '28px' }} className='' onClick={() => setShowSidebar(false)} />
                </button> */}
                {/* logo */}
                <div className="w-full px-4">
                    <img src={"/logo-mini.png"} alt="Doctor Guide" className="w-[10rem] mx-auto" />
                </div>
                {/* Hamburger */}
                <IconButton style={{ position: 'absolute' }} onClick={() => setShowSidebar(true)} className='absolute top-0 right-4 ' >
                    <Menu style={{ fontSize: '40px' }} className='' />
                </IconButton>
            </div>

            <div className="relative w-full flex md:flex-row flex-col-reverse ">
                {
                    <div className={`${isWelcomeCollapsed ? ' hidden ' : 'flex flex-col gap-[8px] '} md:w-fit w-full h-auto  `} >
                        <div className="w-full flex justify-end items-center">
                            <button onClick={() => setIsWelcomeCollapsed(pre => !pre)} className={`md:hidden text-red underline `}>
                                {isWelcomeCollapsed ? 'Expand' : 'Collapse'}
                            </button>
                        </div>
                        <div className="md:w-[356px] w-full h-[200px] bg-slate-900 rounded-[8px] ">
                            {/* <ReactPlayer
                            width={356}
                            height={200}
                            url="https://www.youtube.com/watch?v=TYoUS5gm1m8"
                        /> */}
                        </div>
                    </div>
                }
                <div className={`${isWelcomeCollapsed ? "" : "mx-auto px-8 md:flex hidden "} flex flex-col justify-center`}>
                    <div className="flex justify-between items-center">
                        <h3 className="font-poppins md:text-4xl sm:text-[24px] text-[20px] font-bold">
                            Welcome to Askexpert
                        </h3>
                        <button onClick={() => setIsWelcomeCollapsed(pre => !pre)} className={`md:hidden text-red underline `}>{isWelcomeCollapsed ? 'Expand' : 'Collapse'}</button>
                    </div>
                    <div className="font-poppins text-[16px] mt-1 ml-1 font-medium text-main-blue leading-[1.3]  ">
                        Watch video to learn how you can use our chatbots to level up
                        your life
                    </div>
                </div>
                <div onClick={changeWelcomeCollapsed} className="md:block hidden absolute -top-3 -right-4 p-4 hover:bg-[#E2E6F2] rounded-full cursor-pointer transition-all duration-75">
                    <IoIosArrowForward className={`text-2xl ${isWelcomeCollapsed ? "-rotate-90" : "rotate-90"} transition-all duration-75`} />
                </div>
            </div>
        </div>
    )
}

export default Navbar