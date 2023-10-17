 

import { PiCaretRightBold } from 'react-icons/pi'

const Topbar = () => {


    return (
        <div className='flex flex-col gap-[8px]  ' >

            <h2 className='text-[36px] text-main-blue font-bold flex items-center gap-[6px] ' >
                <span>Dentistry </span>
                <PiCaretRightBold style={{ fontWeight: '800', fontSize: '32px' }} />
                <span>Oral Medicine & Othology</span>
            </h2>

            <div className='flex justify-between items-center ' >
                {/* <div className="w-[45%] relative">
                    <input
                        type="text"
                        placeholder="Search"
                        className="py-3 px-6 w-full rounded-full border focus-visible:border-light-gray focus-visible:outline-none"
                    />
                    <div className="absolute right-[1.3rem] top-1/2 -translate-y-1/2 hover:bg-[#E2E6F2] p-3 rounded-full cursor-pointer">
                        <BsSearch className="" />
                    </div>
                </div> */}
                 
            </div>

        </div>
    )
}

export default Topbar