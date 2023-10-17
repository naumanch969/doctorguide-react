 

import Topbar from "./BooksTopbar"
import BookCard from "./BookCard"
import Loader from '../../utils/components/Loader'
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redux/store"
import { Book, Category, Subcategory } from '../../interfaces'
import { useEffect } from "react"
import { getBooks } from "../../redux/action/book"
import { getBookCategory } from "../../redux/action/category"
import { getBookSubcategory } from "../../redux/action/subcategory"

const Books = () => {

  ////////////////////////////////////////////// VARIABLES //////////////////////////////////////////////////
  const { categoryId, subcategoryId } = useParams()
  const { currentCategory }: { currentCategory: Category } = useSelector((state: RootState) => state.category)
  const { currentSubcategory }: { currentSubcategory: Subcategory } = useSelector((state: RootState) => state.subcategory)
  const dispatch = useDispatch()

  ////////////////////////////////////////////// STATES //////////////////////////////////////////////////
  const { books, isFetching }: { books: Book[], isFetching: boolean } = useSelector((state: RootState) => state.book)

  ////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////
  useEffect(() => {
    dispatch<any>(getBooks(`?page=1&size=20&cat=${categoryId}&sub=${subcategoryId}`))
  }, [categoryId, subcategoryId])
  useEffect(() => {
    dispatch<any>(getBookCategory(categoryId as string))
  }, [categoryId])
  useEffect(() => {
    dispatch<any>(getBookSubcategory(categoryId as string, subcategoryId as string))
  }, [subcategoryId])

  ////////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////////////

  return (
    <div className="w-full overflow-x-hidden ">

      <div className="flex flex-col gap-[1.5rem] px-[3rem] py-[1.5rem] bg-white ">
        <Topbar
          title={currentCategory.name}
          subTitle={currentSubcategory.name}
        />

        <div className="grid gap-[1.3rem]">
          {
            isFetching
              ?
              <div className='flex justify-center items-center w-full ' >
                <Loader />
              </div>
              :
              <>
                {
                  books.length == 0 &&
                  <span className='text-center' >No Book Found</span>
                }
                {
                  books.map((book, index) => (
                    <BookCard book={book} key={index} />
                  ))
                }
              </>
          }
        </div>

      </div>

    </div>
  )
}

export default Books