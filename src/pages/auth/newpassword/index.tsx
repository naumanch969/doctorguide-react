 ;

import { useState, useEffect } from "react";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import AuthPage from "../../../components/AuthPage";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../../utils/axios";
import { baseURL } from "../../../constants";

import passwordSchema from "../../../utils/passwordValidator";
import {Input,Submit,FormHeading,Error,} from "../../../components";

import SnackbarComponent from "../../../utils/components/Snackbar";
import { resetPassword } from "../../../redux/api";

export default function Login() {

  /////////////////////////////////////////////////////// VARIABLES /////////////////////////////////////////////////////////
  const { id, token } = useParams();
  const navigate = useNavigate();

  /////////////////////////////////////////////////////// STATES /////////////////////////////////////////////////////////
  const [error, setError] = useState("Validating token...");
  const [validToken, setValidToken] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loader, setLoader] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarText, setSnackbarText] = useState<string>('')

  /////////////////////////////////////////////////////// USE EFFECTS /////////////////////////////////////////////////////////
  useEffect(() => {
    if (!token) {
      setError("Your request link is invalid! Please request a new one");
      return;
    }
    setLoader(true);
    axios
      .post(`${baseURL}/auth/validate-token`, {
        id,
        token,
      })
      .then((res: any) => {
        setError("");
        setValidToken(true);
        setLoader(false);
      })
      .catch((err: any) => {
        console.log(err);
        setError(err?.response?.data?.message);
        setLoader(false);
      });
  }, [token]);

  /////////////////////////////////////////////////////// FUNCTIONS /////////////////////////////////////////////////////////
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!validToken) {
      setError("Your request link is expired! Please request a new one");
      navigate("/auth/reset");
      return;
    }
    const password = e.target.password?.value;
    const cpassword = e.target.cpassword?.value;
    const isPasswordInvalid: any = passwordSchema.validate(password, { details: true, });

    if (isPasswordInvalid.length > 0) {
      setPasswordError(isPasswordInvalid[0].message.replace("string", "password"));
      return;
    }

    if (password !== cpassword) {
      setPasswordError("Password and confirm password must be the same");
      return;
    }

    setLoader(true);
    try {
      const { data } = await resetPassword({ id, token, newPassword: password })
      navigate("/auth/login");
      setOpenSnackbar(true)
      setSnackbarText(data)
      setLoader(false)
    } catch (err: any) {
      setPasswordError(err?.response?.data?.message);
      setLoader(false);
    }

  };

  return (
    <AuthPage
      title="New Password"
      customPage="/auth/login"
      onSubmit={handleSubmit}
      className="pb-8"
    >

      <SnackbarComponent open={openSnackbar} setOpen={setOpenSnackbar} note={snackbarText} />

      {validToken ? (
        <>
          {passwordError && <Error>{passwordError}</Error>}
          <FormHeading>Password</FormHeading>

          <div className="w-full relative mb-8">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter you password"
              onChange={() => setPasswordError("")}
              name="password"
            />

            <div
              className="top-1/2 right-4 -translate-y-1/2 absolute p-1 hover:bg-slate-100 rounded-2xl cursor-pointer"
              onClick={handleShowPassword}
            >
              <HiOutlineEye
                className={`text-light-gray ${!showPassword ? "" : "hidden"
                  } `}
                size="1.4em"
              />
              <HiOutlineEyeOff
                className={`text-light-gray  ${showPassword ? "" : "hidden"
                  }`}
                size="1.4em"
              />
            </div>
          </div>
          <FormHeading>Confirm password</FormHeading>

          <div className="w-full relative mb-8">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter you password"
              onChange={() => setPasswordError("")}
              name="cpassword"
            />
            <div
              className="top-1/2 right-4 -translate-y-1/2 absolute p-1 hover:bg-slate-100 rounded-2xl cursor-pointer"
              onClick={handleShowPassword}
            >
              <HiOutlineEye
                className={`text-light-gray ${!showPassword ? "" : "hidden"
                  } `}
                size="1.4em"
              />
              <HiOutlineEyeOff
                className={`text-light-gray  ${showPassword ? "" : "hidden"
                  }`}
                size="1.4em"
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="text-sm mb-8">{error}</div>
        </>
      )}
      <Submit
        type="submit"
        placeholder={loader ? "Submitting..." : validToken ? "Request Password Change" : "Request Link"}
      />
    </AuthPage>
  );
}
