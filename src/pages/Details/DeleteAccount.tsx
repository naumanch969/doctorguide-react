import { Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@mui/material'

const DeleteModal = ({ open, setOpen }: any) => {

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
            onClose={handleClose}
            style={{ borderRadius: '1rem' }}
            className='rounded-[1rem]  '
        >

            <div className="flex flex-col gap-[8px] w-[33rem] bg-white rounded-[2rem] px-[3rem] py-[1rem] ">
                <DialogTitle id="alert-dialog-title" className='p-0 text-[24px] font-bold text-main-blue text-center ' >
                    Are You Sure You Want To Delete Your Account
                </DialogTitle>
                <DialogContent className='p-0 ' >
                    <DialogContentText id="alert-dialog-description" className='text-main-blue text-[16px] font-medium text-center capitalize ' >
                        All your documents in this chatbot will be deleted along with it. you will lose all the answers to your previous questions.
                    </DialogContentText>
                </DialogContent>
                <DialogActions className='p-0 flex justify-center ' >
                    <button onClick={handleClose} className='bg-main-blue text-white px-[4rem] py-[12px] rounded-full shadow-lg ' >No, Close</button>
                    <button onClick={handleDelete} className='text-red border-[1px] border-red font-semibold px-[4rem] py-[12px] rounded-full shadow-lg ' >Yes, Delete</button>
                </DialogActions>
            </div>
        </Dialog >
    )
}

export default DeleteModal