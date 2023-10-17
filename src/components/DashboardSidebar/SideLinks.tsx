 ;
// import { Link } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
interface SideLinksProps {
  title?: string;
  subcategories?: { name: string, id: string }[];
  subTools?: { name: string, id: string }[];
  categoryId?: string;
  active?: boolean;
  onClick?: any;
}


export default function SideLinks({ title, subcategories, active, subTools, categoryId, onClick }: SideLinksProps) {
  //////////////////////////////////////////////// STATES ////////////////////////////////////////////////////
  const navigate = useNavigate()

  //////////////////////////////////////////////// STATES ////////////////////////////////////////////////////
  const [openMenu, setOpenMenu] = useState(active);

  return subTools ? (
    <div className="w-full px-4 mb-2 relative ">
      <div onClick={() => setOpenMenu(pre => !pre)} className="w-full relative group cursor-pointer" >
        <div className={`capitalize py-3 px-6 ${openMenu && "bg-[#E2E6F2]"} text-main-blue font-medium rounded-lg group-hover:bg-slate-300 transition-all duration-75`}>
          {title}
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 p-4">
          <IoIosArrowForward className={`${openMenu && "rotate-90"} transition-all`} />
        </div>
      </div>
      {openMenu && subTools?.length > 0 && (
        <div className="w-full flex flex-col pl-4 pt-3">
          {subTools.map((subTool, index) => (
            <Link
              to={`/tools/${categoryId}/${subTool.id}`}
              className="capitalize px-6 py-3 hover:bg-slate-200 transition-all duration-75 rounded-lg cursor-pointer"
              key={index}
            >
              {subTool.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  ) : (
    <div className="w-full px-4 mb-2 relative ">
      <div onClick={() => setOpenMenu(pre => !pre)} className="w-full relative group cursor-pointer">
        <div className={`capitalize py-3 px-6 ${openMenu && "bg-[#E2E6F2]"} text-main-blue font-medium rounded-lg group-hover:bg-slate-300 transition-all duration-75`}>
          {title}
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 p-4">
          <IoIosArrowForward className={`${openMenu && "rotate-90"} transition-all`} />
        </div>
      </div>
      {openMenu && subcategories && subcategories?.length > 0 && (
        <div className="w-full flex flex-col pl-4 pt-3">
          {subcategories.map((subcategory, index) => (
            <Link
              type="button"
              to={`/books/${categoryId}/${subcategory.id}`}
              key={index}
              className="capitalize text-start px-6 py-3 hover:bg-slate-200 transition-all duration-75 rounded-lg cursor-pointer"
            >
              {subcategory.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
