import { Link } from 'react-router-dom'
import { baseURL } from "../../constants";

export default function GoogleSignIn({ className }: { className?: string }) {


  return (
    <Link
      to={`${baseURL}/auth/google`}
      replace
      className="w-full border border-[rgba(0, 0, 0, 0.17)] focus:outline-none focus:border-blue-500 py-4 rounded-2xl px-4 flex justify-center items-center font-medium cursor-pointer hover:bg-gray-100 duration-75 transition-all"
    >
      <img
        src={"/google-icon.svg"}
        alt="google"
        width={50}
        height={50}
        className={`w-6 mr-5 ${className}`}
      />
      Sign In With Google
    </Link>
  );
}
