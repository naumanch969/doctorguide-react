 

import { sendMessage } from '../../redux/action/message'
import { RootState } from '../../redux/store'
import { QuestionMark, Send } from '@mui/icons-material'

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

interface ContactForm {
    email: string,
    title: string,
    message: string
}

const page = () => {

    //////////////////////////////////////////////// VARIABLES ////////////////////////////////////////////////
    const dispatch = useDispatch()
    const { isFetching }: { isFetching: boolean } = useSelector((state: RootState) => state.message)
    const initialState = { email: '', title: '', message: '' }

    //////////////////////////////////////////////// STATES ////////////////////////////////////////////////
    const [formData, setFormData] = useState<ContactForm>(initialState)

    //////////////////////////////////////////////// FUNCTION ////////////////////////////////////////////////
    const handleSubmit = () => {
        if (!formData.message) return alert('Please provide message')
        dispatch<any>(sendMessage(formData.message))
        setFormData(initialState)
    }

    return (
        <div className="flex flex-col gap-[2rem] md:px-[2.5rem] md:pt-[3rem] md:pb-[2rem] sm:p-6 p-4 bg-white ">

            <h2 className='flex items-center gap-[8px] font-bold text-[2rem] ' >
                <QuestionMark />
                <span>Contact Us</span>
            </h2>

            <div className="flex flex-col gap-[1.5rem] ">
                <div className='flex flex-col gap-[10px] ' >
                    <span className='text-black font-medium text-[18px] ' >Title</span>
                    <input
                        type="text"
                        placeholder='What are you having trouble with?'
                        value={formData.title}
                        onChange={(e) => setFormData((pre: ContactForm) => ({ ...pre, title: e.target.value }))}
                        className='bg-lighter-gray border-[1px] placeholder:text-light-gray text-black focus:border-light-gray border-lighter-gray h-[48px] w-full px-[2rem] rounded-full '
                    />
                </div>
                <div className='flex flex-col gap-[10px] ' >
                    <span className='text-black font-medium text-[18px] ' >Message <span className='text-red' >*</span></span>
                    <textarea
                        rows={12}
                        placeholder='Describe your problem'
                        value={formData.message}
                        onChange={(e) => setFormData((pre: ContactForm) => ({ ...pre, message: e.target.value }))}
                        className='bg-lighter-gray border-[1px] placeholder:text-light-gray text-black focus:border-light-gray border-lighter-gray w-full px-[2rem] py-[12px] rounded-[18px] '
                    />
                </div>
                <div className="flex justify-end items-end text-white ">
                    <button onClick={handleSubmit} className='py-[12px] w-[8rem] bg-red text-white rounded-full ' >
                        {isFetching ? 'Sending...' : <>Send <Send /></>}
                    </button>
                </div>
            </div>

        </div>
    )
}

export default page