interface InputType {
  type: string;
  placeholder: string;
  className?: string;
  onChange?: () => void;
  isPassword?: boolean;
  name?: string;
  invalid?: boolean;
}

export default function Input({
  type,
  placeholder,
  className,
  onChange,
  isPassword,
  name,
  invalid,
}: InputType) {
  return (
    <input
      type={type}
      name={name || type}
      id={name || type}
      placeholder={placeholder}
      className={`w-full border border-[rgba(0, 0, 0, 0.17)] focus:outline-none ${
        invalid ? "border-red-600" : "hover:border-blue-500 focus:border-black"
      }   py-4 rounded-2xl px-4 text-sm ${
        isPassword ? "" : "mb-4"
      }  ${className} `}
      onChange={onChange}
    />
  );
}
