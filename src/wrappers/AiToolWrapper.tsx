 

import { Mail } from '@mui/icons-material';
import { AiToolSidebar as Sidebar } from '../components'
import { useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Tool } from '../interfaces';


const ProfileWrapper = ({ children }: any) => {

  const { currentTool }: { currentTool: Tool } = useSelector((state: RootState) => state.tool)
  const [inputs, setInputs] = useState<{ [key: string]: any }>({});


  return (
    <div style={{ overflow: 'hidden' }} className='w-screen h-screen overflow-hidden flex  ' >

      <Sidebar />
      <div className="lg:w-[75vw] md:w-[67vw] w-full h-full overflow-y-scroll flex flex-col">

        <div className="flex flex-col p-4 md:hidden ">

          <div className="flex flex-col items-start mt-5 ">
            {/* title text */}
            <div className="w-full px-[2rem]">
              <h2 className='flex items-center gap-[8px] font-bold text-[2rem] ' >
                <Mail />
                <span>Generate Email</span>
              </h2>
            </div>
            {/* input fields */}
            <div className="flex flex-col gap-[8px] w-full px-[2rem] ">
              {
                currentTool.name && currentTool.inputFields.map((inputField, index) => (
                  <div key={index} className='flex flex-col gap-[4px] w-full ' >
                    <span className='text-black font-medium capitalize ' >{inputField.placeholder}</span>
                    <input
                      type="text"
                      value={inputs[inputField.fieldName] ?? ""}
                      placeholder={inputField.placeholder}
                      onChange={(e) => setInputs({ ...inputs, [inputField.fieldName]: e.target.value })}
                      className='bg-lighter-gray border-[1px] border-light-gray h-[40px] w-full px-[1.2rem] rounded-[4px] '
                    />
                  </div>
                ))
              }
            </div>
            {/* languages */}
            <div className="flex">
              <div className='flex flex-col gap-[4px] w-full ' >
                <span className='text-black font-medium ' >Language</span>
                <select className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-light-gray focus:border-light-gray outline-none block p-3 dark:focus:ring-blue-500">
                  <option value={'english'}>English</option>
                  <option value={'urdu'}>Urdu</option>
                  <option value={'greek'}>Greek</option>
                </select>
              </div>
            </div>
          </div>

        </div>


        {children}
      </div>

    </div>
  )
}

export default ProfileWrapper