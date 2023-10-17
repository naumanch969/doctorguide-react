 

import { Image, Person } from '@mui/icons-material'

import   { useEffect, useState } from 'react'
import EditAccount from './EditAccount'
import DeleteAccount from './DeleteAccount'
import { useDispatch, useSelector } from 'react-redux'
import { getUser as getUserProfile } from '../../redux/action/user'
import { RootState } from '../../redux/store'
import { User } from '../../interfaces'
import Loader from '../../utils/components/Loader'
import { Link } from 'react-router-dom'

const page = () => {

    ////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////
    const dispatch = useDispatch()
    const { loggedUser: user, isFetching }: { loggedUser: User | null, isFetching: boolean } = useSelector((state: RootState) => state.user)
    ////////////////////////////////////////////////// STATES ///////////////////////////////////////////////////
    const [openEditModal, setOpenEditModal] = useState<boolean>(false)
    const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)

    ////////////////////////////////////////////////// USE EFFECTS ///////////////////////////////////////////////////
    useEffect(() => {
        dispatch<any>(getUserProfile())
    }, [])

    ////////////////////////////////////////////////// FUNCTIONS ///////////////////////////////////////////////////



    return (
        <>

            <EditAccount open={openEditModal} setOpen={setOpenEditModal} setOpenDeleteModal={setOpenDeleteModal} />
            <DeleteAccount open={openDeleteModal} setOpen={setOpenDeleteModal} />

            <div className="flex flex-col gap-[2rem] md:px-[2.5rem] md:pt-[3rem] md:pb-[2rem] sm:p-6 p-4 bg-white ">
                <h2 className='flex items-center gap-[8px] font-bold text-[2rem] ' >
                    <Person />
                    <span>Account Details</span>
                </h2>
                {
                    isFetching
                        ?
                        <div className="w-full flex justify-center items-center">
                            <Loader />
                        </div>
                        :
                        <>
                            <div className="flex flex-col gap-[2rem] ">

                                <div className="flex justify-start items-center gap-[2rem] ">
                                    <div className="w-40 h-40 rounded-full relative  ">
                                        {
                                            user?.imageUrl
                                                ?
                                                <img
                                                    src={user?.imageUrl}
                                                    alt='User'
                                                    className='rounded-full'
                                                />
                                                :
                                                <Image className='w-full border-[1px] border-black rounded-full ' />
                                        }
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <h2 className='text-[2rem] font-bold ' >{user?.name || 'User'}</h2>
                                        <span className='text-[18px] text-black ' >{user?.email || 'user@gmail.com'}</span>
                                    </div>
                                </div>

                                <div className="flex justify-center">
                                    <hr className='bg-light-gray h-[2px] w-[80%] flex justify-center ' />
                                </div>

                                <div className="flex flex-wrap gap-[2rem] w-full ">
                                    <div className='flex flex-col gap-[4px] lg:w-[28rem] w-full' >
                                        <span className='text-black font-medium ' >Name</span>
                                        <input disabled value={user?.name} type="text" placeholder='Your Fullname' className='border-[1px] border-light-gray h-[40px] w-full px-[1.2rem] rounded-[4px] ' />
                                    </div>
                                    <div className='flex flex-col gap-[4px] lg:w-[28rem] w-full' >
                                        <span className='text-black font-medium ' >Email</span>
                                        <input disabled value={user?.email} type="text" placeholder='email@example.com' className='border-[1px] border-light-gray h-[40px] w-full px-[1.2rem] rounded-[4px] ' />
                                    </div>
                                    <div className='flex flex-col gap-[4px] lg:w-[28rem] w-full' >
                                        <span className='text-black font-medium ' >Password</span>
                                        <input disabled type="text" placeholder='Your Password' className='border-[1px] border-light-gray h-[40px] w-full px-[1.2rem] rounded-[4px] ' />
                                    </div>
                                </div>

                            </div>

                            <button onClick={() => setOpenEditModal(true)} className='py-[12px] w-[14rem] bg-red text-white rounded-full ' >Edit Account Info</button>

                            <div className="flex lg:flex-row flex-col justify-between lg:items-center items-start gap-3 lg:gap-4 border-[2px] border-light-gray rounded-[8px] lg:px-[3rem] lg:py-[2rem] sm:p-4 p-3 relative ">
                                <div className="flex flex-col justify-start md:gap-4 ">
                                    <div className="flex justify-start items-center gap-2 ">
                                        <span className='bg-main-blue rounded-full w-[4rem] h-[4rem] ' />
                                        <div className="flex flex-col gap-2 ">
                                            <div className="flex items-center h-full lg:gap-12 md:gap-8 sm:gap-6 gap-4 ">
                                                <h4 className='text-main-blue lg:text-[24px] md:text-[22px] text-[20px] font-bold ' >Premium Plan</h4>
                                                <span className='bg-green-300 border-[2px] border-green-700 text-green-700 h-fit w-fit rounded-full px-[10px] py-[2px] ' >Active</span>
                                            </div>
                                            <div style={{ display: 'flex' }} className="hidden md:flex gap-4 ">
                                                <h4>Billing  Month</h4>
                                                <span className='md:block hidden' >|</span>
                                                <span>Next Invoice on Jul 29 for $99.9</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="md:hidden flex md:flex-row flex-col md:gap-[1rem] text-light-gray md:mt-0 mt-1 ">
                                        <h4>Billing  Month</h4>
                                        <span className='md:block hidden' >|</span>
                                        <span>Next Invoice on Jul 29 for $99.9</span>
                                    </div>
                                </div>
                                <div className="flex lg:w-fit w-full ">
                                    <Link
                                        to={'/profile/plans'}
                                        className='bg-black text-white px-[2rem] py-[12px] rounded-full shadow-lg '
                                    >Upgrade Plan</Link>
                                </div>
                            </div>
                        </>
                }
            </div>

        </>
    )
}

export default page