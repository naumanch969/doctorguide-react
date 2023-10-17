 

import { Category } from "../../../interfaces"
import { udpateBookCategory, updateToolCategory } from "../../../redux/action/category"
import { Modal } from "@mui/material"
import { useState, useEffect } from "react"
import { BsStack } from "react-icons/bs"
import { useDispatch } from 'react-redux'



const UpdateCategoryModal = ({ open, setOpen, category, type }: { open: boolean, setOpen: any, category: Category, type: string }) => {

    ////////////////////////////////////////////////////// VARIABLES //////////////////////////////////////////////////
    const initialState = { name: '', _id: '', subcategories: [] }
    const dispatch = useDispatch()

    ////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////
    const [categoryData, setCategoryData] = useState<Category>(initialState)

    ////////////////////////////////////////////////////// USE EFFECTS //////////////////////////////////////////////////
    useEffect(() => {
        setCategoryData(category)
    }, [category])

    ////////////////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////////////
    const handleSubmit = () => {
        if (type == 'book') {   // for book categories
            dispatch<any>(udpateBookCategory(category._id, categoryData.name))
        }
        else {                  // for tool categories
            dispatch<any>(updateToolCategory(category._id, categoryData.name))
        }
        setCategoryData(initialState)
        setOpen(false)
    }
    const handleClose = () => {
        setCategoryData(initialState)
        setOpen(false)
    }

    return (
        <Modal open={open} onClose={handleClose} className='flex justify-center items-center' >
            <div className="sm:w-[30rem] w-[90%] flex flex-col gap-[1rem] bg-white py-[1rem] sm:px-[2rem] px-[1rem] rounded-md ">

                <div className="w-full flex justify-center items-center gap-[8px] ">
                    <BsStack style={{ fontSize: '28px' }} className='text-main-blue' />
                    <h3 className="text-[24px] text-main-blue font-bold " >Update Category</h3>
                </div>

                <div className="flex flex-col gap-[4px] ">
                    <label htmlFor="name" className='font-semibold text-main-blue text-[18px] ' >Category Name</label>
                    <input
                        value={categoryData.name}
                        onChange={(e) => setCategoryData({ ...categoryData, name: e.target.value })}
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
                        Save
                    </button>
                </div>

            </div>
        </Modal>
    )
}

export default UpdateCategoryModal