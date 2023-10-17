 

import { Tool } from '../../../interfaces'
import { RootState } from '../../../redux/store'
import { Add, Delete, Edit } from '@mui/icons-material'
import { IconButton } from '@mui/material'

import { useEffect, useState } from 'react'
import { BsEye } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { getTools } from '../../../redux/action/tool'
import CreateToolModal from './CreateToolModal'
import ViewToolModal from './ViewToolModal'
import UpdateToolModal from './UpdateToolModal'
import DeleteToolModal from './DeleteToolModal'
import Loader from '../../../utils/components/Loader'

const Tools = () => {

  //////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////
  const dispatch = useDispatch()
  const { tools, isFetching }: { tools: Tool[], isFetching: boolean } = useSelector((state: RootState) => state.tool)
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
  const [selectedTool, setSelectedTool] = useState<Tool>(initialState)
  const [openViewModal, setOpenViewModal] = useState<boolean>(false)
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false)
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false)
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)

  //////////////////////////////////////////// USE EFFECTS ///////////////////////////////////////////////
  useEffect(() => {
    dispatch<any>(getTools(`?page=1&size=20`))
  }, [])


  //////////////////////////////////////////// FUNCTIONS ///////////////////////////////////////////////


  //////////////////////////////////////////// COMPONENTS ///////////////////////////////////////////////
  const ToolCard = ({ tool }: { tool: Tool }) => {
    return (
      <div className="bg-lighter-blue lg:w-[31.5%] sm:w-[47.5%] w-full  h-[20rem] flex flex-col justify-between items-start p-[1rem] rounded-[1rem]  ">

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

        <div className="flex flex-col justify-around h-[5rem] ">
          <h3 className='text-main-blue text-lg font-semibold capitalize ' >{tool.name}</h3>
          <div className="w-full flex justify-end items-center gap-2 ">
            <IconButton onClick={() => { setSelectedTool(tool); setOpenViewModal(true) }} >
              <BsEye />
            </IconButton>
            <IconButton onClick={() => { setSelectedTool(tool); setOpenUpdateModal(true) }} >
              <Edit />
            </IconButton>
            <IconButton onClick={() => { setSelectedTool(tool); setOpenDeleteModal(true) }} >
              <Delete />
            </IconButton>
          </div>
        </div>

      </div>
    )
  }





  return (
    <div className='flex flex-col gap-[1.5rem] ' >

      <ViewToolModal open={openViewModal} setOpen={setOpenViewModal} tool={selectedTool} />
      <CreateToolModal open={openCreateModal} setOpen={setOpenCreateModal} />
      <UpdateToolModal open={openUpdateModal} setOpen={setOpenUpdateModal} tool={selectedTool} />
      <DeleteToolModal open={openDeleteModal} setOpen={setOpenDeleteModal} toolId={selectedTool._id} />

      <div className="flex flex-col gap-[1rem] ">
        {/* topbar */}
        <div className="flex justify-between items-center">
          <h1 className='text-main-blue font-bold text-[36px] ' >Tools</h1>
          <button onClick={() => setOpenCreateModal(true)} className='flex justify-center items-center gap-4 text-[18px] md:px-[1rem] px-[12px] py-[12px] rounded-full md:w-[12rem] w-fit bg-white text-red border-[2px] border-red'>
            <span className='hidden md:block' >Create Tool</span>  {/* for md devices */}
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
                tools.length > 0
                  ?
                  <>
                    {tools.map((tool, index) => (
                      <ToolCard tool={tool} key={index} />
                    ))}
                  </>
                  :
                  <div className='w-full h-full flex justify-center items-center ' >
                    <span className='text-[18px] font-semibold text-main-blue ' >No tool To Show</span>
                  </div>
              }
            </>
        }
      </div>


    </div >
  )
}



export default Tools