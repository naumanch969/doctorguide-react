 
import { useState } from "react";
import { Chatbot } from '../pages'
import { ChatbotNavbar as Navbar } from '../components'

const ChatbotLayout = () => {

    const [showRightbar, setShowRightbar] = useState<boolean>(false);


    return (
        <div style={{ overflow: 'hidden' }} className='w-screen h-screen overflow-hidden flex'>
            <div className="w-full h-full overflow-y-scroll flex flex-col">
                <Navbar setShowRightbar={setShowRightbar} showRightbar={showRightbar} />
                <Chatbot showRightbar={showRightbar} setShowRightbar={setShowRightbar} />
            </div>
        </div>
    );
};

export default ChatbotLayout;
