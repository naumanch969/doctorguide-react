 

import { useEffect, useState } from 'react'
import { PiCaretLeftBold } from 'react-icons/pi'
import { Mail, } from '@mui/icons-material'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { queryTool } from '../../redux/action/tool'
import { useDispatch, useSelector } from 'react-redux'
import { Tool } from '../../interfaces'
import { RootState } from '../../redux/store'

const Sidebar = () => {

  ////////////////////////////////////////////// VARIABLES //////////////////////////////////////////////////
  const { currentTool }: { currentTool: Tool } = useSelector((state: RootState) => state.tool)
  const dispatch = useDispatch()
  const { toolId } = useParams()

  ////////////////////////////////////////////// STATES //////////////////////////////////////////////////
  const [inputs, setInputs] = useState<{ [key: string]: any }>({});

  ////////////////////////////////////////////// USE EFFECTS //////////////////////////////////////////////////

  ////////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////////////
  const handleQuery = () => {
    toolId && inputs && dispatch<any>(queryTool(toolId, inputs))
    setInputs({})
  }


  return (
    <div className="md:flex flex-col justify-between hidden pt-4 pb-6 h-screen sticky top-0 left-0 lg:w-[25vw] md:w-[33vw] bg-lighter-blue ">

      <div className="flex flex-col gap-[1rem] ">

        <div className="flex flex-col items-start mt-4 ">
          <Link to='/dashboard' className='bg-main-blue text-white flex justify-end items-center  w-[5rem] h-[46px] rounded-r-full ' >
            <PiCaretLeftBold style={{ fontSize: '28px' }} className='relative right-[1rem]' />
          </Link>
          <div className="w-full flex justify-center items-center md:hidden ">
            <img src="/public/logo-mini.png" alt="Logo" className='w-[10rem] ' />
          </div>
        </div>

        <div className="w-full px-4">
          <h2 className='flex justify-start items-center gap-[8px] font-bold ' >
            <Mail style={{ fontSize: '2rem' }} />
            <span className='lg:text-[32px] md:text-[28px] text-[24px] capitalize ' >{currentTool.name}</span>
          </h2>
        </div>

        <div className="flex flex-col gap-[8px] w-full px-4 ">
          {
            currentTool.name && currentTool.inputFields.map((inputField, index) => (
              <div key={index} className='flex flex-col gap-[4px] w-full ' >
                <span className='text-black font-medium capitalize ' >{inputField.placeholder}</span>
                <input
                  type="text"
                  value={inputs[inputField.fieldName] ?? ""}
                  placeholder={inputField.placeholder}
                  onChange={(e) => setInputs({ ...inputs, [inputField.fieldName]: e.target.value })}
                  className='bg-lighter-gray border-[1px] border-light-gray h-[40px] w-full px-[1.2rem] rounded-full '
                />
              </div>
            ))
          }
        </div>

      </div>

      <div className="flex flex-col gap-[1rem] px-4 w-full ">
        <div className='flex flex-col gap-[4px] w-full ' >
          <span className='text-xl text-black font-medium ' >Language</span>
          <select className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-light-gray focus:border-light-gray outline-none block p-3 dark:focus:ring-blue-500"          >
            <option value={'english'}>English</option>
            <option value={'urdu'}>Urdu</option>
            <option value={'greek'}>Greek</option>
          </select>
        </div>
        <div className="flex flex-col gap-[8px] ">
          <button onClick={handleQuery} className='py-[12px] w-full bg-main-blue text-white rounded-full ' >Generate</button>
          {/* <span>Email Generations 5/1500</span> */}
        </div>
      </div>

    </div>
  )
}

export default Sidebar