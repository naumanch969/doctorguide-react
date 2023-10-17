 
import CreateSubcategoryModal from './CreateSubcategoryModal'
import UpdateSubcategoryModal from './UpdateSubcategoryModal'
import DeleteSubcategoryModal from './DeleteSubcategory'
import { Category, Subcategory } from '../../../interfaces'
import { getAllBookCategories, getAllToolCategories } from '../../../redux/action/category'
import { getAllBookSubcategories, getAllToolSubcategories, getBookSubcategories, getToolSubcategories } from '../../../redux/action/subcategory'
import { RootState } from '../../../redux/store'
import { Add, Delete, Edit } from '@mui/icons-material'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../../utils/components/Loader'


const Subcategories = () => {

  ///////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////
  const dispatch = useDispatch()
  const { bookCategories, toolCategories }: { bookCategories: Category[], toolCategories: Category[] } = useSelector((state: RootState) => state.category)
  const { bookSubcategories, toolSubcategories, isFetching }: { bookSubcategories: Subcategory[], toolSubcategories: Subcategory[], isFetching: boolean } = useSelector((state: RootState) => state.subcategory)


  ///////////////////////////////////////////////// STATES ///////////////////////////////////////////////////////
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false)
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false)
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('')
  const [selectedSubcategory, setSelectedSubcategory] = useState<Subcategory>({ name: '', _id: '', bookCategory: { name: '', id: '' }, toolCategory: { name: '', id: '' } })
  const [selectedType, setSelectedType] = useState<string>('book')

  ///////////////////////////////////////////////// USE EFFECTS ///////////////////////////////////////////////////////
  useEffect(() => {   // on changing the filter of type --> fetch that type's categories
    if (selectedType == 'book') {
      dispatch<any>(getAllBookCategories())
      dispatch<any>(getAllBookSubcategories())
    }
    else {
      dispatch<any>(getAllToolCategories())
      dispatch<any>(getAllToolSubcategories())
    }
    setSelectedCategoryId('') // no category should be selected when we change the type
  }, [selectedType])

  useEffect(() => {           // on changing the category --> show subcategories of that category
    if (selectedType == 'book') {
      dispatch<any>(getBookSubcategories(selectedCategoryId))
    }
    else {
      dispatch<any>(getToolSubcategories(selectedCategoryId))
    }
  }, [selectedCategoryId])


  ///////////////////////////////////////////////// FUNCTIONS ///////////////////////////////////////////////////////
  const SubcategoryItem = ({ subcategory }: { subcategory: Subcategory }) => {
    return (
      <div className="md:w-[48%] w-full flex justify-between px-[2rem] py-[12px] bg-lighter-blue rounded-[8px] ">
        <span className='font-medium text-main-blue text-[18px] ' >{subcategory.name}</span>
        <div className="flex gap-[8px] ">
          <button onClick={() => { setSelectedSubcategory(subcategory); setOpenUpdateModal(true) }} className='' ><Edit className='text-main-blue ' /></button>
          <button onClick={() => { setSelectedSubcategory(subcategory); setOpenDeleteModal(true) }} className='' ><Delete className='text-main-blue ' /></button>
        </div>
      </div>
    )
  }



  return (
    <div className='flex flex-col gap-[1rem] ' >

      <CreateSubcategoryModal
        open={openCreateModal}
        setOpen={setOpenCreateModal}
        type={selectedType}
      />
      <UpdateSubcategoryModal
        open={openUpdateModal}
        setOpen={setOpenUpdateModal}
        type={selectedType}
        subcategory={selectedSubcategory}
      />
      <DeleteSubcategoryModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        subcategory={selectedSubcategory}
        type={selectedType}
      />


      <div className="flex justify-between items-center">
        <h1 className='text-main-blue font-bold sm:text-[36px] text-[32px] ' >Sub Categories</h1>
        <button
          onClick={() => setOpenCreateModal(true)}
          className='flex justify-between items-center md:px-[1rem] px-[12px] py-[12px]  md:w-[16rem] w-fit bg-red text-white md:rounded-[8px] rounded-full '
        >
          <span className='md:block hidden ' >Add Subcategory</span><Add />
        </button>
      </div>

      <div className="flex justify-between items-center gap-4 ">
        <select value={selectedCategoryId} onChange={(e) => setSelectedCategoryId(e.target.value)} placeholder='Select Category' className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-light-gray focus:border-light-gray outline-none block p-3 dark:focus:ring-blue-500">
          <option value={''} >None</option>
          {
            (
              selectedType == 'book' ? bookCategories : toolCategories
            ).map((category: Category, index: number) => (
              <option value={category._id} key={index} >{category.name}</option>
            ))
          }
        </select>
        <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} placeholder='Select Type' className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-light-gray focus:border-light-gray outline-none block p-3 dark:focus:ring-blue-500">
          <option value={'book'}>Books</option>
          <option value={'tool'}>Tools</option>
        </select>
      </div>

      <div className="flex flex-wrap justify-between gap-[1rem] ">
        {
          isFetching
            ?
            <div className="w-full flex justify-center items-center">
              <Loader />
            </div>
            :
            (selectedType == 'book' ? bookSubcategories : toolSubcategories)
              .map((subcategory, index) => (
                <SubcategoryItem subcategory={subcategory} key={index} />
              ))
        }
      </div>


    </div>
  )
}

export default Subcategories