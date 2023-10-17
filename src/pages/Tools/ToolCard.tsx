 

import { Tool } from '../../interfaces';

import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux'
 
export default function ToolCard({ tool }: { tool: Tool }) {

    const dispatch = useDispatch()
  const navigate = useNavigate()

    return (
        <div className="bg-lighter-blue lg:w-[32%] sm:w-[48%] w-full  h-[20rem] flex flex-col justify-between items-start p-[1rem] rounded-[1rem]  ">

            <div className="w-full h-[13rem] bg-main-blue rounded-[1rem] relative overflow-hidden ">
                {
                    tool?.webImage &&
                    <img
                        src={tool.webImage}
                        alt="Doctor Guide"
                        className="object-cover w-full h-full "
                    />
                }
            </div>

            <div className="flex flex-col justify-around h-[5rem] ">
                <h3 className='text-main-blue text-[18px] font-semibold ' >{tool.name}</h3>
                <Link
                    to={`/tool-usage/${tool._id}`}
                    className='bg-red text-white w-fit px-[2rem] py-[4px] rounded-[1rem] text-[18px] '
                >Use</Link>
            </div>

        </div>
    )
}
