 

import { Category, Subcategory, Tool } from '../../../interfaces'
import { getAllToolCategories } from '../../../redux/action/category'
import { getAllToolSubcategories, getToolSubcategories } from '../../../redux/action/subcategory'
import { uploadImage } from '../../../redux/api'
import { RootState } from '../../../redux/store'
import { Add, Delete, DeleteOutlined, Edit } from '@mui/icons-material'
import { Modal, Switch } from '@mui/material'

import React, { useEffect, useRef, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { createTool } from '../../../redux/action/tool'
import DeleteBookModal from '../books/DeleteBookModal'

const CreateToolModal = ({ open, setOpen }: { open: boolean, setOpen: any }) => {

    //////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////
    const dispatch = useDispatch()
    const mobileImageRef = useRef<HTMLInputElement>(null)
    const webImageRef = useRef<HTMLInputElement>(null)
    const { isFetching }: { isFetching: boolean } = useSelector((state: RootState) => state.tool)
    const { toolCategories }: { toolCategories: Category[] } = useSelector((state: RootState) => state.category)
    const { toolSubcategories }: { toolSubcategories: Subcategory[] } = useSelector((state: RootState) => state.subcategory)
    const initialState: Tool = {
        _id: '',
        name: '',
        category: '',
        subcategory: '',
        webImage: '',
        mobileImage: '',
        inputFields: [{ fieldName: '', placeholder: '' }],
        systemRole: 'test',
        prompt: '',
        languageDropdown: 'true'
    }

    //////////////////////////////////////////// STATES ///////////////////////////////////////////////
    const [toolData, setToolData] = useState<Tool>(initialState)

    //////////////////////////////////////////// USE EFFECTS ///////////////////////////////////////////////
    useEffect(() => {
        dispatch<any>(getAllToolSubcategories())
        dispatch<any>(getAllToolCategories())
    }, [])
    useEffect(() => {
        if (toolData.category) {
            dispatch<any>(getToolSubcategories(toolData.category))
        }
        setToolData({ ...toolData, subcategory: '' })
    }, [toolData.category])


    //////////////////////////////////////////// FUNCTIONS ///////////////////////////////////////////////
    const handleSubmit = () => {
        const { name, category, subcategory, webImage, mobileImage, inputFields, systemRole, prompt, languageDropdown } = toolData
        if (
            !name ||
            !category ||
            !subcategory ||
            !webImage ||
            !mobileImage ||
            !inputFields ||
            !systemRole ||
            !prompt ||
            !languageDropdown
        ) return alert('Make sure to provide all fields')

        dispatch<any>(createTool(toolData))
        setOpen(false)
    }
    const handleChange = (field: string, value: string) => {
        setToolData({ ...toolData, [field]: value })
    }
    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
        if (e.target.files) {
            const selectedFile = e.target.files[0];
            if (selectedFile) {
                const formData = new FormData();
                formData.append('image', selectedFile);
                try {
                    const { data: { uri } }: { data: { uri: string } } = await uploadImage(formData)
                    console.log('data', uri)
                    setToolData({ ...toolData, [type]: uri })
                }
                catch (error) {
                    console.log('error in uploading...\n', error)
                }
            }
        }
    };

    const handleClose = () => { setOpen(false) }



    return (
        <Modal open={open} onClose={handleClose} className='w-full flex justify-center items-center ' >
            <div className='bg-white flex flex-col gap-[1.5rem] md:w-[70vw] sm:w-[80vw] w-[95vw] max-h-[80vh] overflow-y-scroll rounded-lg md:p-8 sm:p-6 p-4  ' >

                <div className="flex flex-col gap-[1rem] ">
                    {/* topbar */}
                    <div className="flex justify-between items-center">
                        <h1 className='text-main-blue font-bold text-[36px] ' >Create Tool</h1>
                    </div>

                    {/* category and subcategory */}
                    <div className="flex justify-between gap-[1rem] ">
                        <select onChange={(e) => handleChange('category', e.target.value)} className="w-[48%] bg-gray-50 border border-light-gray text-gray-900 text-sm rounded-full focus:ring-light-gray focus:border-light-gray outline-none block py-3 px-6 dark:focus:ring-blue-500">
                            <option value={''}>Select Category</option>
                            {
                                toolCategories.map((category, index) => (
                                    <option value={category._id} key={index} >{category.name}</option>
                                ))
                            }
                        </select>
                        <select onChange={(e) => handleChange('subcategory', e.target.value)} className="w-[48%] bg-gray-50 border border-light-gray text-gray-900 text-sm rounded-full focus:ring-light-gray focus:border-light-gray outline-none block py-3 px-6 dark:focus:ring-blue-500">
                            <option value={''}>Select Subcategory</option>
                            {
                                toolData.category && toolSubcategories.map((subcategory, index) => (
                                    <>
                                        <option value={subcategory._id || subcategory.id} key={index} >{subcategory.name}</option>
                                    </>
                                ))
                            }
                        </select>
                    </div>

                    {/* toolname */}
                    <div className="flex flex-col gap-[4px] ">
                        <label htmlFor="toolName" className='font-semibold text-main-blue text-[18px] ' >Tool Name</label>
                        <input
                            id='toolName'
                            value={toolData.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            placeholder='Lorem Ipsum'
                            className="px-6 w-full bg-gray-50 border border-light-gray text-gray-900 text-sm rounded-full focus:ring-light-gray focus:border-light-gray outline-none block p-3 dark:focus:ring-blue-500"
                        />
                    </div>

                    {/* images */}
                    <div className="flex justify-between md:flex-row flex-col gap-[1rem] ">
                        {/* Web Image */}
                        <div className="flex flex-col gap-[8px] md:w-[47%] w-full ">
                            <div className="flex flex-col gap-[8px] ">
                                <label htmlFor="" className='font-semibold text-main-blue text-[18px] ' >Change Image (Web)</label>
                                <div className="w-full relative">
                                    <input
                                        type="text"
                                        value={toolData.webImage}
                                        disabled
                                        placeholder="image source"
                                        className="py-3 px-6 w-full rounded-full border focus-visible:border-light-gray focus-visible:outline-none"
                                    />
                                    <input
                                        type="file"
                                        onChange={(e) => handleUpload(e, 'webImage')}
                                        className='hidden'
                                        ref={webImageRef}
                                    />
                                    <button onClick={() => { webImageRef?.current?.click() }} className="absolute right-[.4rem] top-1/2 -translate-y-1/2 bg-red text-white px-8 py-2 rounded-full cursor-pointer">
                                        Upload
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-col gap-[8px] ">
                                <label htmlFor="" className='font-semibold text-main-blue text-[18px] ' >Image Preview (Web)</label>
                                <div className="md:w-[260px] w-full h-[180px] rounded-md bg-main-blue text-white flex justify-center items-center ">
                                    {
                                        toolData.webImage &&
                                        <img
                                            src={toolData.webImage}
                                            alt='WebImage'
                                            className='max-w-full max-h-full object-cover w-full h-full rounded-md  '
                                        />
                                    }
                                </div>
                            </div>
                        </div>
                        <hr className='h-full w-[2px] bg-light-gray ' />

                        {/* Mobile Image */}
                        <div className="flex flex-col gap-[8px] md:w-[47%] w-full ">
                            <div className="flex flex-col gap-[8px] ">
                                <label htmlFor="" className='font-semibold text-main-blue text-[18px] ' >Change Image (Mobile)</label>
                                <div className="w-full relative">
                                    <input
                                        type="text"
                                        value={toolData.mobileImage}
                                        disabled
                                        placeholder="image source"
                                        className="py-3 px-6 w-full rounded-full border focus-visible:border-light-gray focus-visible:outline-none"
                                    />
                                    <input
                                        type="file"
                                        onChange={(e) => handleUpload(e, 'mobileImage')}
                                        className='hidden'
                                        ref={mobileImageRef}
                                    />
                                    <button onClick={() => { mobileImageRef?.current?.click() }} className="absolute right-[.4rem] top-1/2 -translate-y-1/2 bg-red text-white px-8 py-2 rounded-full cursor-pointer">
                                        Upload
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-col gap-[8px] ">
                                <label htmlFor="" className='font-semibold text-main-blue text-[18px] ' >Image Preview (Mobile)</label>
                                <div className="md:w-[260px] w-full h-[180px] rounded-md bg-main-blue text-white flex justify-center items-center ">
                                    {
                                        toolData.mobileImage &&
                                        <img
                                            src={toolData.mobileImage}
                                            alt='MobileImage'
                                            className='max-w-full max-h-full object-cover w-full h-full rounded-md  '
                                        />
                                    }
                                </div>
                            </div>
                        </div>

                    </div>
                </div >


                <div className="flex flex-col  ">
                    <div className="flex justify-between items-center">
                        <span className='font-semibold text-main-blue text-[18px] ' >Input Fields</span>
                        <button onClick={() => setToolData({ ...toolData, inputFields: [...toolData.inputFields, { fieldName: '', placeholder: '' }] })} className='bg-red text-white rounded-md px-4 py-3 font-medium ' >Add InputField</button>
                    </div>
                    {/* Inputs */}
                    <div className="flex flex-col gap-[12px] ">
                        {
                            toolData.inputFields.map((inputField, index) => {
                                return (
                                    <div key={index} className="flex justify-between items-center gap-[1rem] ">
                                        <button
                                            onClick={() => setToolData({ ...toolData, inputFields: toolData.inputFields.map((field, i) => ({ ...field, index: i })).filter((field) => field.index != index) })}
                                            className='border-[1px] border-red rounded-full p-1 hover:bg-red hover:text-white ' ><DeleteOutlined className='text-red hover:text-white bg-inherit ' /></button>
                                        <div className="flex flex-col flex-1 gap-[4px] ">
                                            <label htmlFor="" className='font-medium text-[16px] ' >Field Name</label>
                                            <input
                                                value={inputField.fieldName}
                                                onChange={(e) => setToolData({ ...toolData, inputFields: toolData.inputFields.map((field, i) => ({ ...field, fieldName: i == index ? e.target.value : field.fieldName })) })}
                                                placeholder='Lorem Ipsum'
                                                className="px-6 w-full bg-gray-50 border border-light-gray text-gray-900 text-sm rounded-full focus:ring-light-gray focus:border-light-gray outline-none block p-3 dark:focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="flex flex-col flex-1 gap-[4px] ">
                                            <label htmlFor="" className='font-medium text-[16px] ' >Placeholder</label>
                                            <input
                                                value={inputField.placeholder}
                                                onChange={(e) => setToolData({ ...toolData, inputFields: toolData.inputFields.map((field, i) => ({ ...field, placeholder: i == index ? e.target.value : field.placeholder })) })}
                                                placeholder='Lorem Ipsum'
                                                className="px-6 w-full bg-gray-50 border border-light-gray text-gray-900 text-sm rounded-full focus:ring-light-gray focus:border-light-gray outline-none block p-3 dark:focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>


                <div className="flex flex-col gap-[1rem] ">
                    {/* System Prompt and Language Dropdown */}
                    <div className="flex flex-col gap-[1rem] ">
                        <div className="flex flex-col flex-1 gap-[4px] ">
                            <label htmlFor="" className='font-medium text-[18px] ' >System Prompt</label>
                            <textarea
                                rows={6}
                                value={toolData.prompt}
                                onChange={(e) => handleChange('prompt', e.target.value)}
                                placeholder='Lorem Ipsum'
                                className="px-6 w-full bg-gray-50 border border-light-gray text-gray-900 text-sm rounded-[1rem] focus:ring-light-gray focus:border-light-gray outline-none block p-3 dark:focus:ring-blue-500"
                            />
                        </div>
                        <div className="">
                            <span className='text-main-blue font-semibold ' >Languages Dropdown</span>
                            <Switch defaultChecked onChange={(e) => handleChange('languageDropdown', e.target.checked ? 'true' : 'false')} />
                            <span>Show</span>
                        </div>
                    </div>
                    {/* save button */}
                    <div className="flex justify-end items-center">
                        <button onClick={handleSubmit} className='flex justify-center items-center text-[18px] px-[1rem] py-[10px] rounded-full w-[12rem] bg-main-blue text-white '>
                            {isFetching ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </div>



            </div >
        </Modal>
    )
}



export default CreateToolModal