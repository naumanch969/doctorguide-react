 


const Rightbar = ({ sources, setShowRightbar }: { sources: { pageContent: string, metadata: { fileId: string } }[] | [], setShowRightbar: any }) => {

    return (
        <>
            <section style={{ height: 'calc(100vh - 6rem)' }} className="md:block hidden w-[30%] min-w-[25rem] p-[1rem] bg-light-silver " >
                <div className="chatbox overflow-y-scroll h-full p-[1rem] flex flex-col gap-[1rem] ">
                    {
                        sources.map((message, index) => (
                            <span key={index} className={`${'text-main-blue '}`} >
                                {message.pageContent}
                            </span>
                        ))
                    }
                </div>
            </section>



            {/* Mobile Rightbar */}
            <section className="md:hidden flex flex-col justify-between gap-4 px-8 py-3 shadow-box z-[1000] absolute top-0 right-0 w-[80%] h-full bg-light-silver main-blue-main transition-transform duration-500 ease-in-out transform translate-x-0">

                <div className="flex justify-between items-center ">
                    <h2 className='text-[2rem] font-bold text-main-blue ' >Source</h2>
                    <button className='text-red underline ' onClick={() => setShowRightbar(false)} >Collapse</button>
                </div>

                <div className="chatbox overflow-y-scroll h-full flex flex-col gap-[1rem] ">
                    {
                        sources.map((message, index) => (
                            <span key={index} className={`${'text-main-blue '}`} >
                                {message.pageContent}
                            </span>
                        ))
                    }
                </div>
            </section>
        </>
    )
}

export default Rightbar