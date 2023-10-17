 ;

import { useLocation, Link } from "react-router-dom";

export default function SideLinks({ links, setShowSidebar }: any) {

  //////////////////////////////////////////////// STATES ////////////////////////////////////////////////////
  const { pathname } = useLocation()

  //////////////////////////////////////////////// STATES ////////////////////////////////////////////////////

  return (
    <div className="w-full flex flex-col gap-[12px] pl-4 pt-3">
      {links.map((link: any, index: number) => {
        const isActive = (pathname.includes(link.route.toLowerCase()) && link.route.length > 1) || pathname == link.route

        return (
          <Link
            to={link.route}
            onClick={() => setShowSidebar(false)}
            className={`${isActive ? 'bg-pink hover:bg-pink-300 ' : 'hover:bg-pink'} px-6 py-3 flex gap-[1rem] text-main-blue font-bold transition-all duration-75 rounded-lg cursor-pointer`}
            key={index}
          >
            {link.icon}
            {link.name}
          </Link>
        )
      })}
    </div>
  )
}
