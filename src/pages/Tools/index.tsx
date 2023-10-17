 

import Topbar from "./ToolsTopbar"
import ToolCard from "./ToolCard"
import Loader from '../../utils/components/Loader'
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Category, Subcategory, Tool } from "../../interfaces"
import { RootState } from "../../redux/store"
import { getTools } from "../../redux/action/tool"
import { useEffect } from "react"
import { getToolCategory } from "../../redux/action/category"
import { getToolSubcategory } from "../../redux/action/subcategory"

const Tools = () => {

  const { categoryId, subcategoryId } = useParams()

  ////////////////////////////////////////////// VARIABLES //////////////////////////////////////////////////
  const dispatch = useDispatch()
  const { currentCategory }: { currentCategory: Category } = useSelector((state: RootState) => state.category)
  const { currentSubcategory }: { currentSubcategory: Subcategory } = useSelector((state: RootState) => state.subcategory)
  const { tools, isFetching }: { tools: Tool[], isFetching: boolean } = useSelector((state: RootState) => state.tool)

  ////////////////////////////////////////////// STATES //////////////////////////////////////////////////

  ////////////////////////////////////////////// USE EFFECTS //////////////////////////////////////////////////
  useEffect(() => {
    dispatch<any>(getTools(`?page=1&size=20&cat=${categoryId}&sub=${subcategoryId}`))
  }, [categoryId, subcategoryId])
  useEffect(() => {
    dispatch<any>(getToolCategory(categoryId as string))
  }, [categoryId])
  useEffect(() => {
    dispatch<any>(getToolSubcategory(categoryId as string, subcategoryId as string))
  }, [subcategoryId])

  ////////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////////////


  return (

    <div className="w-full overflow-x-hidden ">

      <div className="flex flex-col gap-[1.5rem] px-[3rem] py-[1.5rem] bg-white ">
        <Topbar
          title={currentCategory.name}
          subTitle={currentSubcategory.name}
        />

        <div className="flex justify-between flex-wrap gap-[1.3rem] ">
          {
            isFetching
              ?
              <div className='flex justify-center items-center w-full ' >
                <Loader />
              </div>
              :
              <>
                {
                  tools.length == 0 &&
                  <span className='text-center w-full ' >No Tool Found</span>
                }
                {
                  tools.map((tool, index) => (
                    <ToolCard tool={tool} key={index} />
                  ))
                }
              </>
          }
        </div>
      </div>

    </div>
  )
}

export default Tools