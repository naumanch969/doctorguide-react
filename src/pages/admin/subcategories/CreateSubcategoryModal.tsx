 

import { createBookSubcategory, createToolSubcategory, } from "../../../redux/action/subcategory"
import { RootState } from "../../../redux/store"
import { Modal } from "@mui/material"
import { useState } from "react"
import { BsStack } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"


const CreateSubcategoryModal = ({ open, setOpen, type }: { open: boolean, setOpen: any, type: string }) => {

    ////////////////////////////////////////////////////// VARIABLES //////////////////////////////////////////////////
    const dispatch = useDispatch()
    const { bookCategories, toolCategories } = useSelector((state: RootState) => state.category)

    ////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////
    const [subcategoryName, setSubcategoryName] = useState<string>('')
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>('')

    ////////////////////////////////////////////////////// USE EFFECTS //////////////////////////////////////////////////


    ////////////////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////////////
    const handleSubmit = () => {
        if (type == 'book') {
            dispatch<any>(createBookSubcategory(selectedCategoryId, subcategoryName))
        }
        else {
            dispatch<any>(createToolSubcategory(selectedCategoryId, subcategoryName))
        }

        setSubcategoryName('')
        setSelectedCategoryId('')
        setOpen(false)
    }

    return (
        <Modal open={open} onClose={() => setOpen(false)} className='flex justify-center items-center' >
            <div className="sm:w-[30rem] w-[90%] flex flex-col gap-[1rem] bg-white py-[1rem] sm:px-[2rem] px-[1rem] rounded-md ">

                <div className="w-full flex justify-center items-center gap-[8px] ">
                    <BsStack style={{ fontSize: '28px' }} className='text-main-blue' />
                    <h3 className="text-[24px] text-main-blue font-bold " >Add  <span className='capitalize text-red ' >{type}</span> Subcategory</h3>
                </div>

                <div className="flex flex-col gap-[1rem] ">
                    <div className="flex flex-col gap-[4px] ">
                        <label htmlFor="category" className='font-semibold text-main-blue text-[18px] ' >Select Category</label>
                        <select value={selectedCategoryId} onChange={(e) => setSelectedCategoryId(e.target.value)} placeholder='Lorem Ipsum' className="w-full bg-gray-50 border border-light-gray text-gray-900 text-sm rounded-full focus:ring-light-gray focus:border-light-gray outline-none block py-3 px-6 dark:focus:ring-blue-500">
                            <option value={''}   >None</option>
                            {
                                (type == 'book' ? bookCategories : toolCategories).map((category, index) => (
                                    <option value={category._id} key={index} >{category.name}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="flex flex-col gap-[4px] ">
                        <label htmlFor="name" className='font-semibold text-main-blue text-[18px] ' >Subcategory Name</label>
                        <input
                            value={subcategoryName}
                            onChange={(e) => setSubcategoryName(e.target.value)}
                            id='name'
                            placeholder='Lorem Ipsum'
                            className="px-6 w-full bg-gray-50 border border-light-gray text-gray-900 text-sm rounded-full focus:ring-light-gray focus:border-light-gray outline-none block p-3 dark:focus:ring-blue-500"
                        />
                    </div>
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

export default CreateSubcategoryModal