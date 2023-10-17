 ;

import { useState } from "react";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import AuthPage from "../../../components/AuthPage";
import { useNavigate } from "react-router-dom";

import { Input, Submit, HyperLink, Google as GoogleSignIn, FormHeading, Error } from "../../../components";
import { getUser, login } from "../../../redux/api";
import SnackbarComponent from "../../../utils/components/Snackbar";

interface ErrorType {
  message?: string;
  location?: "email" | "password" | "top";
}

export default function Login() {

  ////////////////////////////////////////////////////// VARIABLES ////////////////////////////////////////////////////////
  const navigate = useNavigate();

  ////////////////////////////////////////////////////// STATES ////////////////////////////////////////////////////////
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarText, setSnackbarText] = useState<string>('');
  const [error, setError] = useState<ErrorType>({});
  const [loader, setLoader] = useState<boolean>(false);

  ////////////////////////////////////////////////////// USE EFFECTS //////////////////////////////////////////////////////

  ////////////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const password = e.target.password?.value;
    const email = e.target.email?.value;

    if (!email) return setError({ message: "Please enter your email", location: "email" });
    if (!password) setError({ message: "Please enter your password", location: "password" });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError({ message: "Email is not valid", location: "email" });

    try {
      setLoader(true)
      await login({ email, password })
      const { data } = await getUser()
      console.log('data', data)
      navigate("/auth/category");
      setError({})
      setOpenSnackbar(true)
      setSnackbarText('Logged In Successfully')
      setLoader(false)
    }
    catch (err: any) {
      setError({ message: err?.response?.data?.message, location: err?.response?.data?.message == "Invalid password." ? "password" : "email" });
      setOpenSnackbar(true)
      if (err?.response?.data?.includes('User not found.')) {
        setSnackbarText('Please register first')
      }
      else {
        setSnackbarText(err?.response?.data?.message)
      }
      setLoader(false)
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <AuthPage title="Login" onSubmit={handleSubmit}>

      <SnackbarComponent open={openSnackbar} setOpen={setOpenSnackbar} note={snackbarText} />

      {error.location === "top" && <Error>{error.message}</Error>}
      <FormHeading>Email</FormHeading>
      {error.location === "email" && <Error>{error.message}</Error>}
      <Input
        type="email"
        placeholder="Enter your email"
        onChange={() => setError({})}
        invalid={error.location === "email" && error.message !== ""}
      />

      <FormHeading>Password</FormHeading>
      {error.location === "password" && <Error>{error.message}</Error>}
      <div className="w-full relative">
        <Input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Enter your password"
          isPassword={true}
          onChange={() => setError({})}
          invalid={error.location === "password" && error.message !== ""}
        />
        <div onClick={handleShowPassword} className="top-1/2 right-2 -translate-y-1/2 absolute p-2 hover:bg-slate-100 rounded-2xl cursor-pointer transition-all duration-75">
          <HiOutlineEye className={`text-light-gray ${!showPassword ? "" : "hidden"} `} size="1.4em" />
          <HiOutlineEyeOff className={`text-light-gray  ${showPassword ? "" : "hidden"}`} size="1.4em" />
        </div>
      </div>

      <HyperLink to={"/auth/reset"} uLClassName="bg-slate-400" className="self-end mt-2 mb-7 text-gray-400">
        Forgotten Password?
      </HyperLink>
      <Submit placeholder={loader ? "Loading..." : "Submit"} type="submit" />

      <div className="mt-4 mb-3 text-slate-400 font-light text-sm">
        Or using other method
      </div>

      <GoogleSignIn />

      <div className="mt-4 mb-3 text-slate-400 font-light text-sm absolute bottom-3">
        <span>Don&apos;t have an account?{" "}</span>
        <HyperLink to="/auth/register" bold={true}>Register</HyperLink>
      </div>
    </AuthPage>
  );
}
