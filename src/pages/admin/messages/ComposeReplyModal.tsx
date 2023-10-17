 

import { Message } from "../../../interfaces"
import { replyMessage } from "../../../redux/action/message"
import { RootState } from "../../../redux/store"
import { Send } from "@mui/icons-material"
import { Modal } from "@mui/material"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

interface Reply {
    subject: string,
    reply: string,
    html: string,
    emailUsername: string,
}

const ComposeReplyModal = ({ open, setOpen, message }: { open: boolean, setOpen: any, message: Message }) => {

    ////////////////////////////////////////////////////// VARIABLES //////////////////////////////////////////////////
    const { isFetching }: { isFetching: boolean } = useSelector((state: RootState) => state.message)
    const dispatch = useDispatch()
    const initialState = { subject: '', reply: '', html: '', emailUsername: '' }

    ////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////
    const [replyData, setReplyData] = useState<Reply>(initialState)

    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Template</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #ffffff;
                border-radius: 5px;
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
            }
            h1 {
                color: #140d46;
            }
            p {
                color: #333;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>${replyData.subject}</h1>
            <p>${replyData.reply}</p>
        </div>
    </body>
    </html>
    `

    ////////////////////////////////////////////////////// USE EFFECTS //////////////////////////////////////////////////

    ////////////////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////////////
    const handleSubmit = () => {
        dispatch<any>(replyMessage(message._id, { ...replyData, reply: replyData.reply, html, sendTo: message.user.email }))
        setOpen(false)
    }

    return (
        <Modal open={open} onClose={() => setOpen(false)} className='flex justify-center items-center' >
            <div className='bg-white flex flex-col gap-[1.5rem] md:w-[30rem] sm:w-[80vw] w-[95vw] max-h-[80vh] overflow-y-scroll rounded-lg md:p-8 sm:p-6 p-4  ' >

                <div className="w-full flex justify-start items-center gap-[8px] ">
                    <h3 className="text-[24px] text-main-blue font-bold " >Compose Reply</h3>
                </div>

                <div className="flex flex-col gap-[1rem] ">
                    <div className="flex flex-col gap-[4px] ">
                        <label htmlFor="subject" className='font-semibold text-main-blue text-[18px] ' >Subject</label>
                        <input
                            value={replyData.subject}
                            onChange={(e) => setReplyData({ ...replyData, subject: e.target.value })}
                            id='subject'
                            placeholder='emailusername'
                            className="px-6 w-full bg-gray-50 border border-light-gray text-gray-900 text-sm rounded-full focus:ring-light-gray focus:border-light-gray outline-none block p-3 dark:focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex flex-col gap-[4px] ">
                        <label htmlFor="emailUsername" className='font-semibold text-main-blue text-[18px] ' >Email Username</label>
                        <input
                            value={replyData.emailUsername}
                            onChange={(e) => setReplyData({ ...replyData, emailUsername: e.target.value })}
                            id='emailUsername'
                            placeholder='emailusername'
                            className="px-6 w-full bg-gray-50 border border-light-gray text-gray-900 text-sm rounded-full focus:ring-light-gray focus:border-light-gray outline-none block p-3 dark:focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex flex-col gap-[4px] ">
                        <label htmlFor="sendTo" className='font-semibold text-main-blue text-[18px] ' >Send To</label>
                        <input
                            value={message.user.email}
                            disabled
                            id='sendTo'
                            placeholder='email@example.com'
                            className="px-6 w-full bg-gray-50 border border-light-gray text-gray-900 text-sm rounded-full focus:ring-light-gray focus:border-light-gray outline-none block p-3 dark:focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex flex-col gap-[4px] ">
                        <label htmlFor="reply" className='font-semibold text-main-blue text-[18px] ' >Reply</label>
                        <textarea
                            value={replyData.reply}
                            onChange={(e) => setReplyData({ ...replyData, reply: e.target.value })}
                            id='reply'
                            rows={12}
                            placeholder='Lorem Ipsum'
                            className="px-6 w-full bg-gray-50 border border-light-gray text-gray-900 text-sm rounded-lg focus:ring-light-gray focus:border-light-gray outline-none block p-3 dark:focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div className="w-full flex justify-end items-center gap-[1rem] ">
                    <button onClick={() => setOpen(false)} className='flex justify-center items-center text-[18px] px-[1rem] py-[10px] rounded-full w-[8rem] bg-white text-main-blue border-[1px] border-main-blue '>
                        Cancel
                    </button>
                    <button onClick={handleSubmit} className='flex justify-center items-center gap-2 text-[18px] px-[1rem] py-[10px] rounded-full w-[12rem] bg-main-blue text-white '>
                        {isFetching ? 'Sending...' : <>Send Reply<Send /></>}
                    </button>
                </div>

            </div>
        </Modal>
    )
}

export default ComposeReplyModal