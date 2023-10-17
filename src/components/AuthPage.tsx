 ;

;
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom";

export default function AuthPage({ children, title, onSubmit, className, customPage, }: { children: React.ReactNode; title: string; onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void; customPage?: string; className?: string; }) {
  const navigate = useNavigate();
  const prevPage = () => {
    if (customPage) {
      navigate(customPage);
      return;
    }
    navigate(-1);
  };
  return (
    <div className="md:py-20 w-screen min-h-screen grad-background font-poppins overflow-x-hidden">
      <form
        className={`bg-white md:px-12 px-4 md:rounded-3xl flex flex-col items-center relative pt-28 pb-28 md:w-[550px] w-full md:min-h-[auto] min-h-screen md:mt-14 mx-auto font-light text-sm ${className}`}
        onSubmit={onSubmit}
      >
        <div className="absolute md:-top-28 top-5 flex-col items-center justify-center flex">
          <Link to={"/"}>
            <img
              src={"/logo.svg"}
              width={100}
              height={100}
              alt="Logo"
              className="w-40 md:block hidden"
            />
            <img
              src={"/logo-mini.png"}
              width={517}
              height={196}
              alt="Logo"
              className="w-40 md:hidden block"
            />
          </Link>
          <h2 className="mt-2 text-lg font-semibold">{title}</h2>
        </div>
        <div
          className="self-start ml-2 mb-8 cursor-pointer transition-all rounded-full p-2 group relative z-1"
          onClick={prevPage}
        >
          <div className=" z-50 text-black  ">
            <BsArrowLeft size="1.2em" />
            <div
              className="absolute w-0 h-0 group-hover:w-full group-hover:h-full bg-gray-400 transition-all duration-150 
           top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full -z-7 opacity-10
          "
            ></div>
          </div>
        </div>
        {children}
      </form>
    </div>
  );
}
