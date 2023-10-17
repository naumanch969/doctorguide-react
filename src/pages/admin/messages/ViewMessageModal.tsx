 

import { Send } from "@mui/icons-material"
import { Modal } from "@mui/material"
import { useState, useEffect } from "react"
import { BsStack } from "react-icons/bs"
import ComposeReplyModal from "./ComposeReplyModal"
import { Message } from "../../../interfaces"

const ViewMessageModal = ({ open, setOpen, message }: { open: boolean, setOpen: any, message: Message }) => {

    ////////////////////////////////////////////////////// VARIABLES //////////////////////////////////////////////////

    ////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////
    const [openReplyModal, setOpenReplyModal] = useState<boolean>(false)

    ////////////////////////////////////////////////////// USE EFFECTS //////////////////////////////////////////////////
    useEffect(()=>{
        
    })

    ////////////////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////////////
    const handleSubmit = () => {
        setOpenReplyModal(true)
        setOpen(false)
    }

    return (
        <>
            <ComposeReplyModal open={openReplyModal} setOpen={setOpenReplyModal} message={message} />

            <Modal open={open} onClose={() => setOpen(false)} className='flex justify-center items-center' >

            <div className='bg-white flex flex-col gap-[1.5rem] md:w-[30rem] sm:w-[80vw] w-[95vw] max-h-[80vh] overflow-y-scroll rounded-lg md:p-8 sm:p-6 p-4  ' >

                    <div className="w-full flex justify-start items-center gap-[8px] ">
                        <h3 className="text-[24px] text-main-blue font-bold " >View Message</h3>
                    </div>

                    <div className="flex flex-col gap-[1rem] ">
                        <div className="flex flex-col gap-[4px] ">
                            <label htmlFor="fullName" className='font-semibold text-main-blue text-[18px] ' >Full Name</label>
                            <input
                                id='fullName'
                                value={message.user.email}
                                disabled={true}
                                placeholder='Lorem Ipsum'
                                className="px-6 w-full bg-gray-50 border border-light-gray text-gray-900 text-sm rounded-full focus:ring-light-gray focus:border-light-gray outline-none block p-3 dark:focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex flex-col gap-[4px] ">
                            <label htmlFor="email" className='font-semibold text-main-blue text-[18px] ' >Email</label>
                            <input
                                id='email'
                                value={message.message}
                                disabled={true}
                                placeholder='Lorem Ipsum'
                                className="px-6 w-full bg-gray-50 border border-light-gray text-gray-900 text-sm rounded-full focus:ring-light-gray focus:border-light-gray outline-none block p-3 dark:focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex flex-col gap-[4px] ">
                            <label htmlFor="message" className='font-semibold text-main-blue text-[18px] ' >Message</label>
                            <textarea
                                id='message'
                                rows={12}
                                value={message.user.name}
                                disabled={true}
                                placeholder='Lorem Ipsum'
                                className="px-6 w-full bg-gray-50 border border-light-gray text-gray-900 text-sm rounded-lg focus:ring-light-gray focus:border-light-gray outline-none block p-3 dark:focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="w-full flex justify-end items-center gap-[1rem] ">
                        <button onClick={() => setOpen(false)} className='flex justify-center items-center text-[18px] px-[1rem] py-[10px] rounded-full w-[8rem] bg-white text-main-blue border-[1px] border-main-blue '>
                            Cancel
                        </button>
                        <button onClick={handleSubmit} className='flex justify-center items-center gap-2 text-[18px] px-[1rem] py-[10px] rounded-full w-[14rem] bg-main-blue text-white '>
                            Compose Reply
                            <Send />
                        </button>
                    </div>

                </div>
            </Modal>
        </>
    )
}

export default ViewMessageModal