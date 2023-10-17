 

import { Book } from '../../../interfaces'
import { RootState } from '../../../redux/store'
import { Add, Delete, Edit } from '@mui/icons-material'
import { IconButton } from '@mui/material'

import { useEffect, useState } from 'react'
import { BsEye } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { getBooks } from '../../../redux/action/book'
import CreateBookModal from './CreateBookModal'
import ViewBookModal from './ViewBookModal'
import UpdateBookModal from './UpdateBookModal'
import DeleteBookModal from './DeleteBookModal'
import Loader from '../../../utils/components/Loader'

const Books = () => {

  //////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////
  const dispatch = useDispatch()
  const { books, isFetching }: { books: Book[], isFetching: boolean } = useSelector((state: RootState) => state.book)
  const initialState: Book = { _id: '', name: '', category: '', subcategory: '', webImage: '', mobileImage: '', files: [], indexName: '', initialMessage: '', suggestedQuestions: [] }


  //////////////////////////////////////////// STATES ///////////////////////////////////////////////
  const [selectedBook, setSelectedBook] = useState<Book>(initialState)
  const [openViewModal, setOpenViewModal] = useState<boolean>(false)
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false)
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false)
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)

  //////////////////////////////////////////// USE EFFECTS ///////////////////////////////////////////////
  useEffect(() => {
    dispatch<any>(getBooks(`?page=1&size=20`))
  }, [])


  //////////////////////////////////////////// FUNCTIONS ///////////////////////////////////////////////


  //////////////////////////////////////////// COMPONENTS ///////////////////////////////////////////////
  const BookCard = ({ book }: { book: Book }) => {
    return (
      <div className="bg-lighter-blue lg:w-[31.5%] sm:w-[47.5%] w-full  h-[20rem] flex flex-col justify-between items-start p-[1rem] rounded-[1rem]  ">

        <div className="w-full h-[13rem] bg-main-blue rounded-[1rem] relative overflow-hidden ">
          {
            book?.webImage &&
            <img
              src={book.webImage}
              alt="Doctor Guide"
              className='max-w-full max-h-full object-cover w-full h-full rounded-md  '
              />
          }
        </div>

        <div className="flex flex-col justify-around h-[5rem] ">
          <h3 className='text-main-blue text-lg font-semibold capitalize ' >{book.name}</h3>
          <div className="w-full flex justify-end items-center gap-2 ">
            <IconButton onClick={() => { setSelectedBook(book); setOpenViewModal(true) }} >
              <BsEye />
            </IconButton>
            <IconButton onClick={() => { setSelectedBook(book); setOpenUpdateModal(true) }} >
              <Edit />
            </IconButton>
            <IconButton onClick={() => { setSelectedBook(book); setOpenDeleteModal(true) }} >
              <Delete />
            </IconButton>
          </div>
        </div>

      </div>
    )
  }





  return (
    <div className='flex flex-col gap-[1.5rem] ' >

      <ViewBookModal open={openViewModal} setOpen={setOpenViewModal} book={selectedBook} />
      <CreateBookModal open={openCreateModal} setOpen={setOpenCreateModal} />
      <UpdateBookModal open={openUpdateModal} setOpen={setOpenUpdateModal} book={selectedBook} />
      <DeleteBookModal open={openDeleteModal} setOpen={setOpenDeleteModal} bookId={selectedBook._id} />

      <div className="flex flex-col gap-[1rem] ">
        {/* topbar */}
        <div className="flex justify-between items-center">
          <h1 className='text-main-blue font-bold text-[36px] ' >Books</h1>
          <button onClick={() => setOpenCreateModal(true)} className='flex justify-center items-center gap-4 text-[18px] md:px-[1rem] px-[12px] py-[12px] rounded-full md:w-[12rem] w-fit bg-white text-red border-[2px] border-red'>
            <span className='hidden md:block' >Create Book</span>  {/* for md devices */}
            <Add className='block md:hidden' />  {/* for xs devices */}
          </button>
        </div>
      </div>

      <div className="flex justify-start flex-wrap gap-4 ">
        {
          isFetching
            ?
            <div className="flex justify-center items-center w-full">
              <Loader />
            </div>
            :
            <>  
              {
                books.length > 0
                ?
                <>
                  {books.map((book, index) => (
                    <BookCard book={book} key={index} />
                  ))}
                </>
                :
                <div className='w-full h-full flex justify-center items-center ' >
                  <span className='text-[18px] font-semibold text-main-blue ' >No book To Show</span>
                </div>
              }
            </>
        }
      </div>


    </div >
  )
}



export default Books