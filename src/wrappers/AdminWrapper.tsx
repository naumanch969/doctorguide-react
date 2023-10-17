 

import { AdminSidebar as Sidebar } from "../components";
import { Menu } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";


const AdminWrapper = ({ children }: any) => {

    ///////////////////////////////////////////////// VARIABLES /////////////////////////////////////////////////

    ///////////////////////////////////////////////// STATES /////////////////////////////////////////////////
    const [showSidebar, setShowSidebar] = useState<boolean>(true)

    ///////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////
    useEffect(() => {
        if (window.innerWidth > 768) {
            setShowSidebar(true)
        }
        else {
            setShowSidebar(false)
        }
    }, [window.innerWidth])




    ///////////////////////////////////////////////// FUNCTIONS /////////////////////////////////////////////////



    const MobileNavbar = () => (
        <div className="flex items-center mb-4 mt-2 md:hidden relative ">
            {/* Arrow Left */}
            {/* <button className='' >
                <PiCaretLeftBold style={{ fontSize: '28px' }} className='' onClick={() => setShowSidebar(false)} />
            </button> */}
            {/* logo */}
            <div className="w-full px-4">
                <img
                    src={"/logo-mini.png"}
                    alt="Doctor Guide"
                    className="w-[10rem] mx-auto"
                />
            </div>
            {/* Hamburger */}
            <IconButton style={{position:'absolute'}} className='right-4 top-0 ' >
                <Menu style={{ fontSize: '40px' }} className='' onClick={() => setShowSidebar(true)} />
            </IconButton>
        </div>
    )

    return (
        <div style={{ overflow: 'hidden' }} className='w-screen h-screen overflow-hidden flex mb-4 ' >

            {showSidebar && <Sidebar setShowSidebar={setShowSidebar} />}
            <div style={{ padding: window.innerWidth > 768 ? '3rem' : '1rem' }} className="bg-white h-full overflow-y-scroll flex flex-col md:p-12 p-6 md:w-[75vw] w-full ">
                <MobileNavbar />
                {children}
            </div>

        </div>
    )
}

export default AdminWrapper