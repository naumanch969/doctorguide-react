 

import { Send } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { ChatbotRightbar } from '../../components'
import { useParams } from 'react-router-dom'
import { ConversationMessage, User } from '../../interfaces'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { getBookDetailsAndStartConversation, queryBook } from '../../redux/action/conversation'
import { getUser as getUserProfile } from '../../redux/action/user'

const page = ({ showRightbar, setShowRightbar }: { showRightbar: boolean, setShowRightbar: any }) => {

    ////////////////////////////////////////////////// VARIABLES //////////////////////////////////////////////////
    const dispatch = useDispatch()
    const { bookId } = useParams();
    const { currentConversation, initialMessage, isFetching }: { isFetching: boolean, currentConversation: ConversationMessage[], initialMessage: { conversationId: string, initialMessage: string, suggestedQuestions: string[] | [] } } = useSelector((state: RootState) => state.conversation)
    const { loggedUser: user }: { loggedUser: User | null } = useSelector((state: RootState) => state.user)

    ////////////////////////////////////////////////// STATES //////////////////////////////////////////////////
    const [message, setMessage] = useState<string>('')
    const [sources, setSources] = useState<{ pageContent: string, metadata: { fileId: string } }[] | []>([])

    ////////////////////////////////////////////////// USE EFFECTS //////////////////////////////////////////////////
    useEffect(() => {
        bookId && dispatch<any>(getBookDetailsAndStartConversation(bookId))
    }, [bookId])
    useEffect(() => {
        dispatch<any>(getUserProfile())
    }, [])

    ////////////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////////////
    const handleQuery = async (query: string) => {
        dispatch<any>(queryBook({ conversationId: initialMessage.conversationId, query }, setSources))
        setMessage('')
    };


    const Message = ({ message }: { message: ConversationMessage }) => {
        const isReply = message.role == 'AI'
        return (
            <div className={`flex items-start gap-[1rem] w-full ${isReply ? 'flex-row-reverse justify-end ' : 'flex-row justify-end '} `}>
                <div className={`${isReply ? 'bg-lighter-blue text-main-blue' : 'bg-main-blue text-white'} w-fit rounded-[1rem] px-[2rem] py-[1rem] flex flex-col`}>
                    <span className={` `}>
                        {message.text}
                    </span>
                    {
                        isReply
                            ?
                            <div className="flex justify-start flex-wrap gap-2 mt-[6px] ">
                                {
                                    message.questions.map((question: string, index: number) => (
                                        <button onClick={() => handleQuery(question)} key={index} className='px-[1.5rem] py-[4px] rounded-full border-[1px] border-light-gray ' >{question}</button>
                                    ))
                                }
                            </div>
                            :
                            ''
                    }
                </div>
                <div className={`w-[3rem] h-[3rem] relative rounded-full overflow-hidden `}>
                    <img
                        src={user?.imageUrl ? user?.imageUrl : '/public/ai.jpg'}
                        alt='Image'
                        className={`w-[3rem] h-[3rem] object-cover border-[1px] border-black `}
                    />
                </div>
            </div>
        )
    }


    return (
        <div className="bg-white flex justify-between">

            <section style={{ height: 'calc(100vh - 6rem)' }} className="lg:px-[2rem] md:px-[1.5rem] sm:px-4 px-2 md:py-[2rem] py-4 bg-white w-full ">
                <div className="chatbox h-full lg:px-[3rem] sm:px-[1rem] px-1 overflow-y-scroll flex flex-col justify-between gap-[1rem]  ">
                    <div className="flex flex-col gap-[1.5rem] w-full ">
                        {
                            currentConversation.map((message, index) => (
                                <Message key={index} message={message} />
                            ))
                        }
                        {
                            isFetching &&
                            <div className="flex justify-center items-center w-full text-center text-main-blue font-medium text-[20px] ">
                                Fetching Response...
                            </div>
                        }
                    </div>

                    <div className="flex flex-col gap-[8px] ">
                        <div className="w-full relative">
                            <input
                                type="text"
                                maxLength={1500}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Search"
                                className="py-3 px-6 pr-12 w-full rounded-full border-[2px] border-main-blue focus-visible:border-light-gray focus-visible:outline-none"
                            />
                            <button onClick={() => handleQuery(message)} className="flex justify-center items-center w-[44px] h-[44px] absolute right-[4px] top-1/2 -translate-y-1/2 bg-main-blue p-3 rounded-full cursor-pointer">
                                <Send className="bg-main-blue text-white " />
                            </button>
                        </div>
                    </div>
                </div>
                <span className="text-red text-[14px] ">Word Count {message.length}/1500</span>
            </section>

            {showRightbar && <ChatbotRightbar sources={sources} setShowRightbar={setShowRightbar} />}

        </div>
    )
}

export default page