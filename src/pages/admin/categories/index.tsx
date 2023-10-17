 
import { Add, Delete, Edit } from '@mui/icons-material'
import CreateCategoryModal from './CreateCategoryModal'
import { useEffect, useState } from 'react'
import DeleteCategoryModal from './DeleteCategoryModal'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBookCategories, getAllToolCategories } from '../../../redux/action/category'
import { RootState } from '../../../redux/store'
import { Category } from '../../../interfaces'
import UpdateCategoryModal from './UpdateCategoryModal'
import Loader from '../../../utils/components/Loader'

const Categories = () => {

  ///////////////////////////////////////////// VARIABLE ////////////////////////////////////////////////////
  const dispatch = useDispatch()
  const { bookCategories, toolCategories, isFetching }: { bookCategories: Category[], toolCategories: Category[], isFetching: boolean } = useSelector((state: RootState) => state.category)

  ///////////////////////////////////////////// STATE ////////////////////////////////////////////////////
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false)
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false)
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const [selectedCategory, setSelectedCategory] = useState<Category>({ name: '', _id: '', subcategories: [] })
  const [selectedType, setSelectedType] = useState<string>('book')

  ///////////////////////////////////////////// USE EFFECTS ////////////////////////////////////////////////////
  useEffect(() => {
    selectedType == 'book'
      ?
      dispatch<any>(getAllBookCategories())
      :
      dispatch<any>(getAllToolCategories())
  }, [selectedType])

  ///////////////////////////////////////////// COMPONENTS ////////////////////////////////////////////////////
  const CategoryItem = ({ category }: { category: Category }) => {
    return (
      <div className="md:w-[48%] w-full flex justify-between px-[2rem] py-[12px] bg-lighter-blue rounded-[8px] ">
        <span className='font-medium text-main-blue text-[18px] ' >{category.name}</span>
        <div className="flex gap-[8px] ">
          <button onClick={() => { setOpenUpdateModal(true); setSelectedCategory(category) }} className='' ><Edit className='text-main-blue ' /></button>
          <button onClick={() => { setOpenDeleteModal(true); setSelectedCategory(category) }} className='' ><Delete className='text-main-blue ' /></button>
        </div>
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-[1rem] ' >

      <CreateCategoryModal
       open={openCreateModal} 
       setOpen={setOpenCreateModal}
        type={selectedType}
         />
      <UpdateCategoryModal
       open={openUpdateModal} 
       setOpen={setOpenUpdateModal}
        category={selectedCategory}
         type={selectedType} 
         />
      <DeleteCategoryModal
       open={openDeleteModal} 
       setOpen={setOpenDeleteModal}
        categoryId={selectedCategory._id }
         type={selectedType} 
        />

      <div className="flex justify-between items-center">
        <h1 className='text-main-blue font-bold sm:text-[36px] text-[32px] ' >Categories</h1>
        <button
          onClick={() => setOpenCreateModal(true)}
          className='flex justify-between items-center md:px-[1rem] px-[12px] py-[12px]  md:w-[16rem] w-fit bg-red text-white md:rounded-[8px] rounded-full '
        >
          <span className='md:block hidden ' >Add Category</span><Add />
        </button>
      </div>
<div className="flex justify-start">
      <select value={selectedType} onChange={e => setSelectedType(e.target.value)}  className="md:w-[48%] w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-light-gray focus:border-light-gray outline-none block p-3 dark:focus:ring-blue-500">
        <option value={'book'}>Books</option>
        <option value={'tool'}>Tools</option>
      </select>
</div>

      <div className="flex flex-wrap justify-between gap-[1rem] ">
        {
          isFetching
            ?
            <div className="flex justify-center items-center w-full ">
              <Loader />
            </div>
            :
            (selectedType == 'book' ? bookCategories : toolCategories).map((category, index) => (
              <CategoryItem category={category} key={index} />
            ))
        }
      </div>


    </div>
  )
}

export default Categories