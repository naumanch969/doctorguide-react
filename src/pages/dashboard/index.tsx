 

import { useState } from 'react'
import Topbar from "./ToolbarTopbar"
import BookCard from "./BookCard"
import { Book, Category, User } from "../../interfaces"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { useEffect } from "react"
import { getBookCategory, getBooks, getUser } from "../../redux/api"
import { getBooksReducer } from "../../redux/reducer/book"
import SnackbarComponent from "../../utils/components/Snackbar"
import { getBookCategoryReducer } from '../../redux/reducer/category'

const Books = () => {

  /////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { currentBookCategory }: { currentBookCategory: Category } = useSelector((state: RootState) => state.category)
  console.log('currentCategory',currentBookCategory)
  const { loggedUser: user }: { loggedUser: User } = useSelector((state: RootState) => state.user)
  const { books }: { books: Book[] } = useSelector((state: RootState) => state.book)

  /////////////////////////////////////////// STATES ///////////////////////////////////////////////
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false)
  const [snackbarText, setSnackbarText] = useState<string>('')

  /////////////////////////////////////////// USE EFFECTS ///////////////////////////////////////////////
  useEffect(() => {
    const call = async () => {
      try {

        const { data: user }: { data: { name: string, category: Category } } = await getUser()
        if (!user.name) return navigate('/auth/login')
        if (!Boolean(user?.category)) return navigate('/auth/category')

        const { data: catResult }: { data: Category } = await getBookCategory(user.category._id)
        dispatch(getBookCategoryReducer(catResult))

        const { data } = await getBooks(`?page=1&size=20&cat=${user?.category}`)
        dispatch(getBooksReducer(data.results))
      }
      catch (error) {
        console.log('error', error)
      }
    }
    call()
  }, [])
  /////////////////////////////////////////// FUNCTIONS ///////////////////////////////////////////////


  return (
    <div className="w-full overflow-x-hidden ">

      <SnackbarComponent open={openSnackbar} setOpen={setOpenSnackbar} note={snackbarText} />

      <div className="flex flex-col gap-[1.5rem] md:px-[3rem] md:py-[1.5rem] p-4 bg-white ">
        <Topbar
          title={currentBookCategory?.name}
          subTitle={''}
        />

        <div className="flex justify-start flex-wrap gap-4 ">
          {
            books.map((book, index) => (
              <BookCard book={book} key={index} />
            ))
          }
        </div>
      </div>

    </div>
  )
}

export default Books