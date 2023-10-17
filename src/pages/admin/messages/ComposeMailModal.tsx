 

import { Message } from "../../../interfaces"
import { replyMessage, sendBulkEmails, sendEmailsToEveryone, sendEmailsToSubscribers } from "../../../redux/action/message"
import { RootState } from "../../../redux/store"
import { Clear, Send } from "@mui/icons-material"
import { Modal } from "@mui/material"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

interface Reply {
    subject: string,
    message: string,
    html: string,
    emailUsername: string,
}

const ComposeReplyModal = ({ open, setOpen }: { open: boolean, setOpen: any }) => {

    ////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////
    const { isFetching }: { isFetching: boolean } = useSelector((state: RootState) => state.message)
    const dispatch = useDispatch()
    const initialState = { subject: '', message: '', html: '', emailUsername: '' }

    ////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////
    const [mailData, setMailData] = useState<Reply>(initialState)
    const [type, setType] = useState<string>('everyone')
    const [billing, setBilling] = useState<string>('')  // for type subscription
    const [planName, setPlanName] = useState<string>('')    // for type subscription
    const [emails, setEmails] = useState<string[]>([]);   // for type bulk
    const [emailValue, setEmailValue] = useState<string>('')   // for type bulk

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
            <h1>${mailData.subject}</h1>
            <p>${mailData.message}</p>
        </div>
    </body>
    </html>
    `

    ////////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////


    ////////////////////////////////////////////////////// FUNCTIONS ///////////////////////////////////////////////
    const handleSubmit = () => {
        if (type == 'everyone') {
            dispatch<any>(sendEmailsToEveryone({ ...mailData, html }))
        }
        else if (type == 'bulk') {
            dispatch<any>(sendBulkEmails({ ...mailData, html, emails }))
            setEmails([])
        }
        else {
            dispatch<any>(sendEmailsToSubscribers({ ...mailData, html, billing, planName }))
            setBilling('')
            setPlanName('')
        }
        setOpen(false)
        setMailData(initialState)
    }
    const hanldeFilterEmail = (emailToFilter: string) => {
        setEmails(emails.filter((email) => email !== emailToFilter))
    }
    const handleAddEmail = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Enter') return;
        const inputElement = e.target as HTMLInputElement; // Cast e.target to HTMLInputElement
        const value = inputElement.value;

        if (!value.trim()) return;
        setEmails(emails.concat(value));
        inputElement.value = '';
        setEmailValue('');
    }

    ////////////////////////////////////////////////////// COMPONENTS ///////////////////////////////////////////////
    const Email = ({ email }: { email: string }) => (
        <div className="flex gap-[8px] items-center justify-between border-[1px] border-main-blue rounded-[16px] py-[2px] px-[6px] bg-lightGray w-auto " >
            <p className="text-black font-medium w-max text-[14px] " >{email}</p>
            <Clear style={{ fontSize: '1rem' }} onClick={() => hanldeFilterEmail(email)} className={`cursor-pointer text-black text-[1rem] bg-lightGray rounded-full `} />
        </div>
    )


    return (
        <Modal open={open} onClose={() => setOpen(false)} className='flex justify-center items-center' >
            <div className='bg-white flex flex-col gap-[1.5rem] md:w-[30rem] sm:w-[80vw] w-[95vw] max-h-[80vh] overflow-y-scroll rounded-lg md:p-8 sm:p-6 p-4  ' >

                <div className="w-full flex justify-between items-center gap-[8px] ">
                    <h3 className="text-[24px] text-main-blue font-bold " >Compose Reply</h3>
                    <select value={type} onChange={e => setType(e.target.value)} placeholder='Select books or tools' className="w-fit bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-light-gray focus:border-light-gray outline-none block p-3 dark:focus:ring-blue-500">
                        <option value={'everyone'}>Everyone</option>
                        <option value={'bulk'}>Bulk</option>
                        <option value={'subscription'}>Subscription</option>
                    </select>
                </div>

                <div className="flex flex-col gap-[1rem] ">

                    {
                        type == 'bulk' &&
                        <div className="flex flex-col gap-[4px] ">
                            <label htmlFor="subject" className='font-semibold text-main-blue text-[18px] ' >Emails</label>
                            <div className={`${emails.length && 'p-2 border-[1px]'} border-gray-500 rounded-md flex flex-wrap gap-[8px] w-full min-h-[40px] `} >
                                {
                                    emails.map((email, index) => (
                                        <Email email={email} key={index} />
                                    ))
                                }
                                <input
                                    className="px-6 w-full bg-gray-50 border border-light-gray text-gray-900 text-sm rounded-full focus:ring-light-gray focus:border-light-gray outline-none block p-3 dark:focus:ring-blue-500"
                                    placeholder="Emails - separated by enter"
                                    value={emailValue}
                                    onChange={(e) => setEmailValue(e.target.value)}
                                    onKeyDown={(e) => handleAddEmail(e)}
                                />
                            </div>
                        </div>
                    }

                    {
                        type == 'subscription' &&
                        <div className="flex justify-between gap-[4px] ">
                            <div className="flex flex-col gap-1 flex-1 ">
                                <label htmlFor="subject" className='font-semibold text-main-blue text-[18px] ' >Biling</label>
                                <select value={billing} onChange={e => setBilling(e.target.value)} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-light-gray focus:border-light-gray outline-none block p-3 dark:focus:ring-blue-500">
                                    <option value={'MONTHLY'}>Monthly</option>
                                    <option value={'YEARLY'}>Yearly</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-1 flex-1 ">
                                <label htmlFor="subject" className='font-semibold text-main-blue text-[18px] ' >Plan Name</label>
                                <select value={planName} onChange={e => setPlanName(e.target.value)} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-light-gray focus:border-light-gray outline-none block p-3 dark:focus:ring-blue-500">
                                    <option value={'FREE'}>Free</option>
                                    <option value={'BASIC'}>Basic</option>
                                    <option value={'PRO'}>Pro</option>
                                </select>
                            </div>
                        </div>
                    }
                    <div className="flex flex-col gap-[4px] ">
                        <label htmlFor="subject" className='font-semibold text-main-blue text-[18px] ' >Subject</label>
                        <input
                            value={mailData.subject}
                            onChange={(e) => setMailData({ ...mailData, subject: e.target.value })}
                            id='subject'
                            placeholder='emailusername'
                            className="px-6 w-full bg-gray-50 border border-light-gray text-gray-900 text-sm rounded-full focus:ring-light-gray focus:border-light-gray outline-none block p-3 dark:focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex flex-col gap-[4px] ">
                        <label htmlFor="emailUsername" className='font-semibold text-main-blue text-[18px] ' >Email Username</label>
                        <input
                            value={mailData.emailUsername}
                            onChange={(e) => setMailData({ ...mailData, emailUsername: e.target.value })}
                            id='emailUsername'
                            placeholder='emailusername'
                            className="px-6 w-full bg-gray-50 border border-light-gray text-gray-900 text-sm rounded-full focus:ring-light-gray focus:border-light-gray outline-none block p-3 dark:focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex flex-col gap-[4px] ">
                        <label htmlFor="message" className='font-semibold text-main-blue text-[18px] ' >Message</label>
                        <textarea
                            value={mailData.message}
                            onChange={(e) => setMailData({ ...mailData, message: e.target.value })}
                            id='message'
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
                        {isFetching ? 'Sending...' : <>Send <Send /></>}
                    </button>
                </div>

            </div>
        </Modal>
    )
}

export default ComposeReplyModal