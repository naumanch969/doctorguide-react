 

import { PiCaretRightBold } from 'react-icons/pi'
import { useDispatch } from 'react-redux'

const Topbar = ({ title, subTitle }: { title: string, subTitle: string }) => {

    const dispatch = useDispatch()

    return (
        <div className='flex flex-col gap-[8px]  ' >

            <h2 className='text-[36px] text-main-blue font-bold flex items-center gap-[6px] capitalize ' >
                <span>{title?.replaceAll('%20', ' ')} </span>
                {subTitle && <PiCaretRightBold style={{ fontWeight: '800', fontSize: '32px' }} />}
                <span>{subTitle?.replaceAll('%20', ' ')}</span>
            </h2>

            {/* <div className='flex justify-between items-center gap-[1rem] ' >
                <div className="flex-1 relative md:w-[48%] w-full ">
                    <input
                        type="text"
                        onChange={(e) => dispatch<any>(searchBook(e.target.value))}
                        placeholder="Search"
                        className="py-3 px-6 w-full rounded-full border focus-visible:border-light-gray focus-visible:outline-none"
                    />
                    <div className="absolute right-[.5rem] top-1/2 -translate-y-1/2 hover:bg-[#E2E6F2] p-3 rounded-full cursor-pointer">
                        <BsSearch className="" />
                    </div>
                </div>
            </div> */}

        </div>
    )
}

export default Topbar