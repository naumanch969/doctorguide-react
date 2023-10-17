 

import { Subcategory } from "../../../interfaces"
import { updateBookSubcategory, updateToolSubcategory } from "../../../redux/action/subcategory"
import { Modal } from "@mui/material"
import { useState, useEffect } from "react"
import { BsStack } from "react-icons/bs"
import { useDispatch } from "react-redux"


const UpdateSubcategoryModal = ({ open, setOpen, subcategory, type }: { open: boolean, setOpen: any, subcategory: Subcategory, type: string }) => {

    ////////////////////////////////////////////////////// VARIABLES //////////////////////////////////////////////////
    const dispatch = useDispatch()

    ////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////
    const [subcategoryName, setSubcategoryName] = useState<string>(subcategory.name)

    ////////////////////////////////////////////////////// USE EFFECTS //////////////////////////////////////////////////
    useEffect(() => {
        setSubcategoryName(subcategory.name)
    }, [subcategory._id])

    ////////////////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////////////
    const handleSubmit = () => {
        console.log(subcategory)
        if (type == 'book') {
            (subcategory.bookCategory && dispatch<any>(updateBookSubcategory(subcategory?.bookCategory?.id, subcategory._id, subcategoryName)))
        }
        else {
            (subcategory.toolCategory && dispatch<any>(updateToolSubcategory(subcategory?.toolCategory?.id, subcategory._id, subcategoryName)))
        }

        setSubcategoryName('')
        setOpen(false)
    }
    const handleClose = () => {
        setOpen(false)
        setSubcategoryName('')
    }

    return (
        <Modal open={open} onClose={handleClose} className='flex justify-center items-center' >
            <div className="sm:w-[30rem] w-[90%] flex flex-col gap-[1rem] bg-white py-[1rem] sm:px-[2rem] px-[1rem] rounded-md ">

                <div className="w-full flex justify-center items-center gap-[8px] ">
                    <BsStack style={{ fontSize: '28px' }} className='text-main-blue' />
                    <h3 className="text-[24px] text-main-blue font-bold " >Update <span className='text-red capitalize'>{type}</span> Subcategory</h3>
                </div>

                <div className="flex flex-col gap-[1rem] ">
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

export default UpdateSubcategoryModal