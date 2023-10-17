 

import { Book } from '../../interfaces'

import { Link } from 'react-router-dom'
import { setBookReducer } from '../../redux/reducer/book'
import { useDispatch } from 'react-redux'


export default function CategoryCard({ book }: { book: Book }) {

    const dispatch = useDispatch()

    return (
        <div className="bg-lighter-blue lg:w-[32%] sm:w-[48%] w-full h-[20rem] flex flex-col justify-between items-start p-[1rem] rounded-[1rem]  ">

            <div className="w-full h-[13rem] bg-main-blue rounded-[1rem] relative overflow-hidden ">
                {
                    book?.webImage &&
                    <img
                        src={book.webImage}
                        alt="Doctor Guide"
                        className='max-w-full max-h-full object-cover w-full h-full rounded-md  '
                    />
                }
            </div>

            <div className="flex flex-col justify-around h-[5rem] ">
                <h3 className='text-main-blue text-[18px] font-semibold ' >{book.name}</h3>
                <Link
                    to={`/book-chat/${book._id}?book=${book.name}`}
                    onClick={() => dispatch<any>(setBookReducer(book))}
                    className='bg-red text-white w-fit px-[2rem] py-[4px] rounded-[1rem] text-[18px] '
                >Chat</Link>
            </div>


        </div>
    )
}
