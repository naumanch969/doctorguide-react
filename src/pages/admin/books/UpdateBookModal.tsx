import { useState, useRef, useEffect } from 'react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from '@mui/material'
import { Book, Category, Subcategory } from '../../../interfaces'

import { RootState } from '../../../redux/store'
import { updateBook } from '../../../redux/action/book'
import { uploadImage } from '../../../redux/api'
import { getAllBookSubcategories, getBookSubcategories } from '../../../redux/action/subcategory'
import { getAllBookCategories } from '../../../redux/action/category'

const UpdateBookModal = ({ open, setOpen, book }: { open: boolean, setOpen: any, book: Book }) => {

    //////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////
    const dispatch = useDispatch()
    const mobileImageRef = useRef<HTMLInputElement>(null)
    const webImageRef = useRef<HTMLInputElement>(null)
    const { isFetching }: { isFetching: boolean } = useSelector((state: RootState) => state.book)
    const { bookCategories }: { bookCategories: Category[] } = useSelector((state: RootState) => state.category)
    const { bookSubcategories }: { bookSubcategories: Subcategory[] } = useSelector((state: RootState) => state.subcategory)
    const initialState: Book = {
        _id: '',
        name: '',
        category: '',
        subcategory: '',
        webImage: '',
        mobileImage: '',
        files: [],
        indexName: '',
        initialMessage: '',
        suggestedQuestions: []
    }

    //////////////////////////////////////////// STATES ///////////////////////////////////////////////
    const [bookData, setBookData] = useState<Book>(book)


    //////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////
    useEffect(() => {
        open && setBookData(book)
    }, [book, open])
    useEffect(() => {
        dispatch<any>(getAllBookSubcategories())
        dispatch<any>(getAllBookCategories())
    }, [])
    useEffect(() => {
        if (bookData.category) {
            dispatch<any>(getBookSubcategories(bookData.category))
        }
        setBookData({ ...bookData, subcategory: '' })
    }, [bookData.category])



    //////////////////////////////////////////////// FUNCTIONS /////////////////////////////////////////////////////
    const handleSubmit = () => {
        let { name, category, subcategory, webImage, mobileImage, } = bookData
        if (!name || !category || !subcategory || !webImage || !mobileImage) return alert('Make sure to provide all fields')


        dispatch<any>(updateBook(book._id, { name, category, subcategory, webImage, mobileImage }))
        setBookData(initialState)
        setOpen(false)
    }
    const handleChange = (field: string, value: string) => {
        setBookData({ ...bookData, [field]: value })
    }
    const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
        if (e.target.files) {
            const selectedFile = e.target.files[0];
            if (selectedFile) {
                const formData = new FormData();
                formData.append('image', selectedFile);
                try {
                    const { data: { uri } }: { data: { uri: string } } = await uploadImage(formData)
                    setBookData({ ...bookData, [type]: uri })
                }
                catch (error) {
                    console.log('error in uploading...\n', error)
                }
            }
        }
    };


    //////////////////////////////////////////////// COMPONENTS /////////////////////////////////////////////////////

    return (
        <Modal open={open} onClose={() => setOpen(false)} className='w-full flex justify-center items-center' >
            <div className='bg-white flex flex-col gap-[1.5rem] md:w-[70vw] sm:w-[80vw] w-[95vw] max-h-[80vh] overflow-y-scroll rounded-lg md:p-8 sm:p-6 p-4  ' >

                <div className="flex flex-col gap-[1rem] ">
                    {/* topbar */}
                    <div className="flex justify-between items-center">
                        <h1 className='text-main-blue font-bold text-[36px] ' >Update Book</h1>
                    </div>

                    {/* category and subcategory */}
                    <div className="flex justify-between gap-[1rem] ">
                        <select onChange={(e) => handleChange('category', e.target.value)} className="w-[48%] bg-gray-50 border border-light-gray text-gray-900 text-sm rounded-full focus:ring-light-gray focus:border-light-gray outline-none block py-3 px-6 dark:focus:ring-blue-500">
                            <option value={''}>Select Category</option>
                            {
                                bookCategories.map((category, index) => (
                                    <option value={category._id} key={index} >{category.name}</option>
                                ))
                            }
                        </select>
                        <select onChange={(e) => handleChange('subcategory', e.target.value)} className="w-[48%] bg-gray-50 border border-light-gray text-gray-900 text-sm rounded-full focus:ring-light-gray focus:border-light-gray outline-none block py-3 px-6 dark:focus:ring-blue-500">
                            <option value={''}>Select Subcategory</option>
                            {
                                bookData.category && bookSubcategories.map((subcategory, index) => (
                                    <>
                                        <option value={subcategory._id || subcategory.id} key={index} >{subcategory.name}</option>
                                    </>
                                ))
                            }
                        </select>
                    </div>

                    {/* bookname */}
                    <div className="flex flex-col gap-[4px] ">
                        <label htmlFor="bookName" className='font-semibold text-main-blue text-[18px] ' >Book Name</label>
                        <input
                            id='bookName'
                            value={bookData.name}
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
                                        value={bookData.webImage}
                                        disabled
                                        placeholder="image source"
                                        className="py-3 px-6 w-full rounded-full border focus-visible:border-light-gray focus-visible:outline-none"
                                    />
                                    <input
                                        type="file"
                                        onChange={(e) => handleUploadImage(e, 'webImage')}
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
                                        bookData.webImage &&
                                        <img
                                            src={bookData.webImage}
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
                                        value={bookData.mobileImage}
                                        disabled
                                        placeholder="image source"
                                        className="py-3 px-6 w-full rounded-full border focus-visible:border-light-gray focus-visible:outline-none"
                                    />
                                    <input
                                        type="file"
                                        onChange={(e) => handleUploadImage(e, 'mobileImage')}
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
                                        bookData.mobileImage &&
                                        <img
                                            src={bookData.mobileImage}
                                            alt='MobileImage'
                                            className='max-w-full max-h-full object-cover w-full h-full rounded-md  '
                                        />
                                    }
                                </div>
                            </div>
                        </div>

                    </div>
                </div>





                <div className="flex justify-end items-center w-full ">
                    <button onClick={handleSubmit} className='flex justify-center items-center text-[18px] px-[1rem] py-[10px] rounded-full w-[12rem] bg-main-blue text-white '>
                        {isFetching ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>


            </div>
        </Modal>
    )
}

export default UpdateBookModal