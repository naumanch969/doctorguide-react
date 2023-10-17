 

import { Tool, Category, Subcategory } from "../../../interfaces"
import { getToolCategory } from "../../../redux/action/category"
import { getToolSubcategory } from "../../../redux/action/subcategory"
import { RootState } from "../../../redux/store"
import Loader from "../../../utils/components/Loader"
import { Modal } from "@mui/material"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

const ViewToolModal = ({ open, setOpen, tool }: { open: boolean, setOpen: any, tool: Tool }) => {

    ////////////////////////////////////////////////////// VARIABLES //////////////////////////////////////////////////
    const { currentCategory, isFetching: categoriesFetching }: { currentCategory: Category, isFetching: boolean } = useSelector((state: RootState) => state.category)
    const { currentSubcategory, isFetching: subcategoriesFetching }: { currentSubcategory: Subcategory, isFetching: boolean } = useSelector((state: RootState) => state.subcategory)
    const dispatch = useDispatch()
    console.log('tool', tool)

    ////////////////////////////////////////////////////// STATES //////////////////////////////////////////////////

    ////////////////////////////////////////////////////// USE EFFECTS //////////////////////////////////////////////////
    useEffect(() => {
        tool.category && dispatch<any>(getToolCategory(tool.category))
    }, [tool.category])
    useEffect(() => {
        tool.category && tool.subcategory && dispatch<any>(getToolSubcategory(tool.category, tool.subcategory))
    }, [tool.subcategory])

    ////////////////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////////////

    ////////////////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////////////

    return (
        <Modal open={open} onClose={() => setOpen(false)} className='flex justify-center items-center' >
            {
                (categoriesFetching || subcategoriesFetching)
                    ?
                    <div className="flex justify-center items-center w-full">
                        <Loader />
                    </div>
                    :
                    <div className='bg-white flex flex-col gap-[1.5rem] md:w-[30rem] sm:w-[70vw] w-[95vw] max-h-[80vh] overflow-y-scroll rounded-lg md:p-8 sm:p-6 p-4  ' >

                        <div className="w-full h-[13rem] bg-main-blue rounded-[1rem] relative overflow-hidden ">
                            {
                                tool?.webImage &&
                                <img
                                    src={tool.webImage}
                                    alt="Doctor Guide"
                                    className='max-w-full max-h-full object-cover w-full h-full rounded-md  '
                                />
                            }
                        </div>

                        <div className="flex flex-col gap-2">
                            <h3 className="font-bold text-2xl capitalize ">{tool.name}</h3>
                            <div className="flex justify-start items-center gap-2 text-lg ">
                                <span className="font-medium">Category:</span>
                                <span className="font-light capitalize ">{currentCategory.name}</span>
                            </div>
                            <div className="flex justify-start items-center gap-2  text-lg">
                                <span className="font-medium">Subcategory:</span>
                                <span className="font-light capitalize ">{currentSubcategory.name}</span>
                            </div>
                        </div>

                    </div>
            }

        </Modal>
    )
}

export default ViewToolModal