 

import { createBookCategory, createToolCategory } from "../../../redux/api"
import SnackbarComponent from "../../../utils/components/Snackbar"
import { createBookCategoryReducer, createToolCategoryReducer } from "../../../redux/reducer/category"
import { Modal } from "@mui/material"
import { useState } from "react"
import { BsStack } from "react-icons/bs"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from "../../../redux/store"

const CreateCategoryModal = ({ open, setOpen, type }: { open: boolean, setOpen: any, type: string }) => {

    ////////////////////////////////////////////////////// VARIABLES //////////////////////////////////////////////////
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isFetching }: { isFetching: boolean } = useSelector((state: RootState) => state.category)

    ////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////
    const [categoryName, setCategoryName] = useState<string>('')
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false)
    const [snackbarText, setSnackbarText] = useState<string>('')

    ////////////////////////////////////////////////////// USE EFFECTS //////////////////////////////////////////////////

    ////////////////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////////////
    const handleSubmit = async () => {
        try {
            if (type == 'book') {   // for book categories
                const { data } = await createBookCategory(categoryName)
                dispatch(createBookCategoryReducer(data))
            }
            else {  // for tool categories
                const { data } = await createToolCategory(categoryName)
                dispatch(createToolCategoryReducer(data))
            }
            setOpenSnackbar(true)
            setSnackbarText('Category Created Successfully')
            setCategoryName('')
            setOpen(false)
        } catch (err: any) {
            setOpenSnackbar(true)
            if (err?.response?.data?.includes('User not found.')) {
                navigate('/auth/login')
                setSnackbarText('Please login first')
            }
            else {
                setSnackbarText(err?.response?.data?.message)
            }
        }
    }

    return (
        <>
            <SnackbarComponent open={openSnackbar} setOpen={setOpenSnackbar} note={snackbarText} />
            <Modal open={open} onClose={() => setOpen(false)} className='flex justify-center items-center' >
                <div className="sm:w-[30rem] w-[90%] flex flex-col gap-[1rem] bg-white py-[1rem] sm:px-[2rem] px-[1rem] rounded-md ">

                    <div className="w-full flex justify-center items-center gap-[8px] ">
                        <BsStack style={{ fontSize: '28px' }} className='text-main-blue' />
                        <h3 className="text-[24px] text-main-blue font-bold " >Add Category</h3>
                    </div>

                    <div className="flex flex-col gap-[4px] ">
                        <label htmlFor="name" className='font-semibold text-main-blue text-[18px] ' >Category Name</label>
                        <input
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            id='name'
                            placeholder='Lorem Ipsum'
                            className="px-6 w-full bg-gray-50 border border-light-gray text-gray-900 text-sm rounded-full focus:ring-light-gray focus:border-light-gray outline-none block p-3 dark:focus:ring-blue-500"
                        />
                    </div>

                    <div className="w-full flex justify-center items-center gap-[1rem] ">
                        <button onClick={() => setOpen(false)} className='flex justify-center items-center text-[18px] px-[1rem] py-[10px] rounded-full w-[8rem] bg-white text-main-blue border-[1px] border-main-blue '>
                            Cancel
                        </button>
                        <button onClick={handleSubmit} className='flex justify-center items-center text-[18px] px-[1rem] py-[10px] rounded-full w-[8rem] bg-main-blue text-white '>
                            {isFetching ? 'Saving...' : 'Save'}
                        </button>
                    </div>

                </div>
            </Modal>
        </>
    )
}

export default CreateCategoryModal