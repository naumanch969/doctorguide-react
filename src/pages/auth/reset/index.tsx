 ;

import AuthPage from "../../../components/AuthPage";

import axios from "../../../utils/axios";
import { baseURL } from "../../../constants";

import { Input, Submit, FormHeading, Error, } from "../../../components";

import { useState } from "react";
import SnackbarComponent from "../../../utils/components/Snackbar";

export default function Reset() {

  ///////////////////////////////////////////////// VARIABLES ////////////////////////////////////////////////////////

  ///////////////////////////////////////////////// STATES ////////////////////////////////////////////////////////
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loader, setLoader] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarText, setSnackbarText] = useState<string>('');

  ///////////////////////////////////////////////// USE EFFECTS ////////////////////////////////////////////////////////

  ///////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////////////
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!e.target.email.value) {
      setError("Please enter your email");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.email.value)) {
      setError("Email is not valid");
      return;
    }
    setLoader(true);
    axios
      .post(`${baseURL}/auth/request-reset-password`, {
        email: e.target.email.value,
      })
      .then(() => {
        setSuccess("Please check your email for the reset link");
        setLoader(false);
      })
      .catch((err) => {
        setOpenSnackbar(true)
        setSnackbarText(err?.response?.data?.message);
        setLoader(false);
      });
  };
  return (
    <AuthPage title="Reset Password" onSubmit={handleSubmit} className="">

      <SnackbarComponent open={openSnackbar} setOpen={setOpenSnackbar} note={snackbarText} />
      {error && <Error>{error}</Error>}

      {success ? (
        <FormHeading>{success}</FormHeading>
      ) : (
        <>
          <FormHeading>Email</FormHeading>
          <Input type="email" placeholder="Enter your email" />
        </>
      )}
      <div className="absolute bottom-8 w-full px-12">
        <Submit type="submit" placeholder={loader ? 'Submitting...' : "Request Link"} />
      </div>
    </AuthPage>
  );
}
