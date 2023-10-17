 ;

import AuthPage from "../../../components/AuthPage";
import { useState, useEffect } from "react";
import OTPInput from "react-otp-input";

import { useNavigate } from 'react-router-dom'

import { routeHandler } from "../../../utils/routeHandler";
import { Submit, Error } from "../../../components";
import { resendOTP, verifyOTP } from "../../../redux/api";
import SnackbarComponent from "../../../utils/components/Snackbar";
// import { setUser } from "../../../redux/slices/userSlice";

export default function Login() {

  //////////////////////////////////////////////// VARIABLES ////////////////////////////////////////////////////
  const navigate = useNavigate();
  const dispatch = useDispatch()

  //////////////////////////////////////////////// STATES ////////////////////////////////////////////////////
  const [otp, setOtp] = useState<string>("");
  const [resendTime, setResendTime] = useState<number>(30);
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');

  //////////////////////////////////////////////// USE EFFECTS ////////////////////////////////////////////////////
  useEffect(() => {
    async function startInterval() {
      const user = await routeHandler(router);

      if (user) setLoader(false);
      const interval = setInterval(() => {
        setResendTime((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
    startInterval();
  }, []);

  //////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // check if otp is valid
    if (!/^[0-9]{5}$/.test(otp) || otp.length !== 5 || otp === "") return setError("OTP is not valid");

    try {
      setLoader(true)
      const { data } = await verifyOTP(otp)
      navigate('/auth/category')
      setOpenSnackbar(true)
      setSnackbarText(data.message)
      setLoader(false)
    }
    catch (err: any) {
      setOpenSnackbar(true)
      setSnackbarText(err?.response?.data?.message)
      setLoader(false)
    }
  };

  const handleResend = async () => {
    if (resendTime > 0) return;
    setOtp('');
    try {
      setLoader(true)
      const { data } = await resendOTP()
      setOpenSnackbar(true)
      setSnackbarText(data.message)
      setLoader(false)
    }
    catch (err: any) {
      setOpenSnackbar(true)
      setSnackbarText(err?.response?.data?.messsage)
      setLoader(false)
    }
    setResendTime(30);
  };



  return (
    <AuthPage title="Enter OTP" className=" pb-48" onSubmit={handleSubmit}>

      <SnackbarComponent open={openSnackbar} setOpen={setOpenSnackbar} note={snackbarText} />

      <div className="md:mt-4 mt-16 mb-10 text-light-gray font-sm max-w-sm text-center md:text-base text-sm ">
        We have send you a 5 digits verification code, Please check on your
        email.
      </div>
      {error && <Error>{error}</Error>}
      <OTPInput
        value={otp}
        onChange={setOtp}
        numInputs={5}
        inputType="number"
        renderSeparator={<span className="mx-1"> </span>}
        renderInput={(props) => (
          <div className="md:w-16 md:h-16 w-12 h-12">
            <input
              {...props}
              style={{}}
              className="w-full h-full flex flex-col items-center justify-center text-center outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
              type="text"
            />
          </div>
        )}
      />
      <div className="absolute bottom-5 w-full px-12">
        <Submit type="submit" placeholder={loader ? 'Submitting....' : "Done!"} />

        <div className="mt-5 mb-10 w-full flex items-center justify-center">
          <div
            className={`${resendTime > 0
              ? "text-light-gray  mr-2"
              : " main-blue-main cursor-pointer"
              }  font-sm  text-center md:text-base text-sm`}
            onClick={handleResend}
          >
            Resend
          </div>
          {resendTime > 0 && <span> in {resendTime} seconds</span>}
        </div>
      </div>
    </AuthPage>
  );
}
