 

import { Category, Subcategory } from '../interfaces';
import { getBookCategory } from '../redux/action/category';
import { getBookSubcategory } from '../redux/action/subcategory';
import { RootState } from '../redux/store';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react'
import { BsStack } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { PiCaretLeftBold } from 'react-icons/pi';

const Navbar = ({ showRightbar, setShowRightbar }: { showRightbar: boolean, setShowRightbar: any }) => {

    ////////////////////////////////////////////// VARIABLES //////////////////////////////////////////////
    const dispatch = useDispatch()
    const searchParams = new URLSearchParams(window.location.search);
    const bookName = searchParams.get('book');
    const navigate = useNavigate()
    const { category: categoryId, subcategory: subcategoryId } = useParams()


    ////////////////////////////////////////////// STATES //////////////////////////////////////////////

    ////////////////////////////////////////////// USE EFFECTS //////////////////////////////////////////////
    useEffect(() => {
        categoryId && dispatch<any>(getBookCategory(categoryId))
        categoryId && subcategoryId && dispatch<any>(getBookSubcategory(categoryId, subcategoryId))
    }, [])

    ////////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////////

    return (
        <div className="bg-light-silver shadow-lg w-full py-6 flex justify-between items-center ">

            <div className="flex justify-between items-center gap-[2rem] w-full ">
                <button onClick={() => navigate('/dashboard')} className=' bg-red text-white flex justify-end items-center md:w-[5rem] w-[4rem] h-[48px] rounded-r-full ' >
                    <PiCaretLeftBold style={{ fontSize: '28px' }} className='relative right-[1rem]' />
                </button>
                <h2 className={`hidden md:block lg:text-[2rem] md:text-[32px] sm:text-[22px] text-[20px] font-bold capitalize `} >
                    {bookName?.replaceAll('%20', ' ')}
                </h2>

                <img src="/public/logo-mini.png" alt="Logo" className='w-[10rem] md:hidden ' />

                {
                    showRightbar
                        ?
                        <div className="w-[30%] min-w-[25rem] max-w-[25rem] px-[2rem] flex justify-between items-center ">
                            <div className="flex justify-start items-center gap-[12px] ">
                                <BsStack style={{ fontSize: '32px' }} />
                                <span className='text-[20px] font-medium '   >Sources</span>
                            </div>
                            <button onClick={() => setShowRightbar((pre: boolean) => !pre)} className='text-main-blue underline ' >Collapse</button>
                        </div>
                        :
                        <div className="flex justify-end items-center pr-8 ">
                            <button onClick={() => setShowRightbar((pre: boolean) => !pre)} className='' >
                                <BsStack style={{ fontSize: '32px' }} />
                            </button>
                        </div>
                }
            </div>

        </div>
    )
}

export default Navbar