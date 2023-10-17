 

import { Edit, Image as ImageIcon } from '@mui/icons-material'
import { Modal } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { PiCameraLight } from 'react-icons/pi'
import { person1 } from '../../../../public'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../..//redux/action/user'
import { RootState } from '../..//redux/store'
import { User } from '../..//interfaces'
import { uploadImage } from '../..//redux/api'

interface UserData { name: string, imageUrl: string, newPassword: string, oldPassword: string }

const EditAccount = ({ open, setOpen, setOpenDeleteModal }: any) => {

    //////////////////////////////////////////////// VARIABLES //////////////////////////////////////////////////////
    const dispatch = useDispatch()
    const imageRef = useRef(null)
    const { loggedUser: user, isFetching }: { loggedUser: User | null, isFetching: boolean } = useSelector((state: RootState) => state.user)

    //////////////////////////////////////////////// STATES //////////////////////////////////////////////////////
    const [userData, setUserData] = useState<UserData>({ name: user.name || '', imageUrl: user.imageUrl || '', newPassword: '', oldPassword: '' })

    //////////////////////////////////////////////// USE EFFECTS //////////////////////////////////////////////////////
    useEffect(() => {
        console.log('userData', userData)
    }, [userData])
    useEffect(() => {
        setUserData({ name: user.name || '', imageUrl: user.imageUrl || '', newPassword: '', oldPassword: '' })
    }, [user])

    //////////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////////////////
    const handleSubmit = () => {
        dispatch<any>(updateUser(userData))
        setOpen(false)
    }
    const handleChange = (field: string, value: string) => {
        setUserData({ ...userData, [field]: value })
    }
    const handleClose = () => {
        setOpen(false)
    }
    const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFile = e.target.files[0];
            if (selectedFile) {
                const formData = new FormData();
                formData.append('image', selectedFile);
                try {
                    const { data: { uri } }: { data: { uri: string } } = await uploadImage(formData)
                    setUserData({ ...userData, imageUrl: uri })
                }
                catch (error) {
                    console.log('error in uploading...\n', error)
                }
            }
        }
    };

    return (
        <Modal open={open} onClose={handleClose} className='w-full flex justify-center items-center ' >

            <div className="w-[60vw] bg-white flex flex-col gap-[1rem] p-[2rem] rounded-[8px]  ">

                <h2 className='text-main-blue font-bold text-[1.5rem] ' ><Edit /> Edit Account</h2>

                <div className="flex flex-col gap-[8px] ">
                    <h4 className='text-main-blue font-bold text-[1.1rem]' >Upload Photo</h4>

                    <div className="flex justify-between gap-[12px] w-full h-[12rem] ">
                        <div className="w-[70%] border-[1px] border-dashed border-main-blue h-full bg-gray-200 rounded-[8px] flex justify-center items-center" >
                            <input
                                type="file"
                                onChange={(e) => handleUploadImage(e)}
                                className='hidden'
                                ref={imageRef}
                            />
                            <button className="flex flex-col justify-center items-center text-textGray " >
                                Drag and drop your files, or <span onClick={() => { imageRef?.current?.click() }} className='underline ' >Browse</span>
                            </button>
                        </div>
                        <div className="w-[30%] h-full flex justify-center items-center ">
                            {
                                userData.imageUrl
                                    ?
                                    <img
                                        src={userData.imageUrl}
                                        alt='User'
                                        className='rounded-full w-[10rem] h-[10rem] '
                                    />
                                    :
                                    <ImageIcon className='w-full border-[1px] border-black rounded-full ' />
                            }
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-[8px] ">
                    <h4 className='text-main-blue font-bold text-[1.1rem]' >Changing Info</h4>

                    <div className="flex flex-wrap gap-[1.5rem] ">
                        <div className='flex flex-col gap-[4px] w-[48%] ' >
                            <span className='text-black font-medium ' >Name</span>
                            <input value={userData.name} onChange={(e) => handleChange('name', e.target.value)} type="text" placeholder='Sara Ahmad' className='border-[1px] border-light-gray h-[40px] w-full px-[1.2rem] rounded-[4px] ' />
                        </div>
                        <div className='flex flex-col gap-[4px] w-[48%] ' >
                            <span className='text-black font-medium ' >Old Password</span>
                            <input value={userData.oldPassword} onChange={(e) => handleChange('oldPassword', e.target.value)} type="text" placeholder='Old Password' className='border-[1px] border-light-gray h-[40px] w-full px-[1.2rem] rounded-[4px] ' />
                        </div>
                        <div className='flex flex-col gap-[4px] w-[48%] ' >
                            <span className='text-black font-medium ' >New Password</span>
                            <input value={userData.newPassword} onChange={(e) => handleChange('newPassword', e.target.value)} type="text" placeholder='New Password' className='border-[1px] border-light-gray h-[40px] w-full px-[1.2rem] rounded-[4px] ' />
                        </div>
                    </div>
                </div>

                <div className='cursor-pointer flex justify-between items-center py-[1.4rem] px-[2rem] bg-pink hover:font-bold font-medium rounded-[8px] ' >
                    <span className='text-red Capitalize ' >Delete your account</span>
                    <button onClick={() => { setOpenDeleteModal(true); setOpen(false) }} className='bg-red text-white px-[2rem] py-[12px] rounded-full shadow-lg ' >Delete Account</button>
                </div>

                <div className='flex justify-center gap-[1rem] ' >
                    <button onClick={handleClose} className='text-main-blue border-[1px] border-main-blue font-semibold px-[4rem] py-[12px] rounded-full shadow-lg ' >Cancel</button>
                    <button onClick={handleSubmit} className='bg-main-blue text-white px-[4rem] py-[12px] rounded-full shadow-lg ' >
                        {isFetching ? 'Saving' : 'Save'}
                    </button>
                </div>

            </div>

        </Modal>
    )
}

export default EditAccount