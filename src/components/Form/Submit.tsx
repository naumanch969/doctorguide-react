import {Link} from "react-router-dom";

interface InputType {
  type: string;
  placeholder: string;
  className?: string;
  link?: string;
}

export default function Submit({
  type,
  placeholder,
  className,
  link,
}: InputType) {
  return link ? (
    <Link
      to={link}
      className={`w-full block text-center bg-blue-main rounded-2xl text-white p-4 font-medium cursor-pointer hover:bg-dark-blue-main transition-all duration-75 ${className}`}
    >
      {placeholder}
    </Link>
  ) : (
    <input
      type={type}
      value={placeholder}
      className={`w-full bg-blue-main rounded-2xl text-white p-4 font-medium cursor-pointer hover:bg-dark-blue-main transition-all duration-75 ${className}`}
      onSubmit={() => {}}
    />
  );
}
