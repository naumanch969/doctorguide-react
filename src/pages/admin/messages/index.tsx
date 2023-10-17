 

import DeleteMessageModal from './DeleteMessageModal'
import ViewMessageModal from './ViewMessageModal'
import ComposeMailModal from './ComposeMailModal'
import { Message } from '../../../interfaces'
import { getMessages } from '../../../redux/action/message'
import { RootState } from '../../../redux/store'
import Loader from '../../../utils/components/Loader'
import { Create, } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Messages = () => {

  //////////////////////////////////////////////// VARIABLES /////////////////////////////////////////////////
  const dispatch = useDispatch()
  const { messages, isFetching }: { messages: Message[], isFetching: boolean } = useSelector((state: RootState) => state.message)
  const initialState = { createdAt: '', updatedAt: '', message: '', user: { name: '', email: '', _id: '' }, _v: '', _id: '' }

  //////////////////////////////////////////////// STATES /////////////////////////////////////////////////
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const [openViewModal, setOpenViewModal] = useState<boolean>(false)
  const [selectedMessage, setSelectedMessage] = useState<Message>(initialState)
  const [openComposeMail, setOpenComposeMail] = useState<boolean>(false)

  //////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////
  useEffect(() => {
    dispatch<any>(getMessages())
  }, [])

  //////////////////////////////////////////////// FUNCTIONS /////////////////////////////////////////////////


  //////////////////////////////////////////////// COMPONENTS /////////////////////////////////////////////////
  const MessageItem = ({ message, index }: { message: Message, index: number }) => {
    // const [showConfirmButtons, setShowConfirmButtons] = useState<boolean>(false)
    return (
      <div className={`${index % 2 == 0 ? 'bg-lighter-blue' : 'bg-white'} w-full flex justify-between px-[2rem] py-[12px] rounded-[8px] `}>
        <div className="flex gap-[1rem] ">
          <input type="checkbox" className='w-[1rem] ' />
          <span onClick={() => { setOpenViewModal(true); setSelectedMessage(message) }} className='font-semibold text-main-blue text-[20px] hover:underline cursor-pointer ' >{message.user.name}</span>
        </div>
        {/* <div className="flex gap-[8px] ">
          {
            showConfirmButtons
              ?
              <>
                <Tooltip placement='top' title='Delete' ><IconButton onClick={() => handleDelete(message)} ><Check /></IconButton></Tooltip>
                <Tooltip placement='top' title='Cancel' ><IconButton onClick={() => setShowConfirmButtons(false)} ><Clear /></IconButton></Tooltip>
              </>
              :
              <IconButton className='' onClick={() => { setShowConfirmButtons(true); setSelectedMessage(message) }} ><Delete className='text-main-blue ' /></IconButton>
          }
        </div> */}
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-[1rem] ' >

      <DeleteMessageModal open={openDeleteModal} setOpen={setOpenDeleteModal} message={selectedMessage} />
      <ViewMessageModal open={openViewModal} setOpen={setOpenViewModal} message={selectedMessage} />
      <ComposeMailModal open={openComposeMail} setOpen={setOpenComposeMail} />

      <div className="flex justify-between items-center">
        <h1 className='text-main-blue font-bold text-[36px] ' >Messages</h1>
        <button onClick={() => setOpenComposeMail(true)} className='flex justify-center items-center gap-2 text-[18px] p-3 md:px-4 md:py-2 rounded-full md:w-[14rem] w-fit bg-main-blue text-white '>
          <span className='md:hidden block' ><Create /></span><span className='md:block hidden' >Compose Mail</span>
        </button>
      </div>

      <div className="flex justify-between gap-[1rem] ">
        {/* <div className="md:w-[45%] w-full relative">
          <input
            type="text"
            placeholder="Search"
            className="py-3 px-6 w-full rounded-full border focus-visible:border-light-gray focus-visible:outline-none"
          />
          <div className="absolute right-[1.3rem] top-1/2 -translate-y-1/2 hover:bg-[#E2E6F2] p-3 rounded-full cursor-pointer">
            <BsSearch className="" />
          </div>
        </div> */}
        {/* <div className="flex items-center md:gap-[12px] gap-1 ">
          <input type="checkbox" id='selectAll' className='w-[1rem] ' />
          <label htmlFor="selectAll" className='text-[20px] text-main-blue font-semibold w-max ' >Select All</label>
        </div> */}
      </div>


      <div className="flex flex-col justify-between gap-[4px] ">
        {
          isFetching
            ?
            <div className="w-full flex justify-center items-center">
              <Loader />
            </div>
            :
            messages.map((message: Message, index: number) => (
              <MessageItem message={message} index={index} key={index} />
            ))
        }
      </div>


    </div>
  )
}

export default Messages