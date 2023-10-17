import { Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@mui/material'

const DeleteMessageModal = ({ open, setOpen }: any) => {

    ////////////////////////////////////// VARIABLES ///////////////////////////////////////

    ////////////////////////////////////// FUNCTIONS ///////////////////////////////////////
    const handleClose = () => {
        setOpen(false)
    }
    const handleDelete = () => {
        setOpen(false)
    }


    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            style={{ borderRadius: '1rem' }}
            className='rounded-[1rem]  '
        >

            <div className="flex flex-col gap-[8px] md:w-[33rem] sm:w-[70vw] w-full bg-white rounded-lg md:px-[3rem] md:py-[1rem] sm:p-6 p-4 ">
                <DialogTitle id="alert-dialog-title" className='p-0 text-[24px] font-bold text-main-blue text-center ' >
                    Are you sure you want to delete This Book
                </DialogTitle>
                <DialogContent className='p-0 ' >
                    <DialogContentText id="alert-dialog-description" className='w-full text-main-blue text-[16px] font-medium text-center capitalize ' >
                        All your documents in this chatbot will be deleted along with it. you will lose all the answers to your previous questions.
                    </DialogContentText>
                </DialogContent>
                <DialogActions style={{display:'flex',justifyContent:'center'}} className='p-0 flex justify-center w-full ' >
                    <button onClick={handleClose} className='bg-main-blue text-white md:px-16 md:py-3 sm:px-6 px-4 py-2  rounded-full shadow-lg ' >No, Close</button>
                    <button onClick={handleDelete} className='text-red border-[1px] border-red font-semibold md:px-16 md:py-3 sm:px-6 px-4 py-2  rounded-full shadow-lg ' >Yes, Delete</button>
                </DialogActions>
            </div>
        </Dialog >
    )
}

export default DeleteMessageModal