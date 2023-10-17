 ;

import { useNavigate } from 'react-router-dom'
import AuthPage from "../../../components/AuthPage";
import { useEffect } from "react";
import { useState } from "react";
import { Submit, Error } from "../../../components";
import { getAllBookCategories } from "../../../redux/action/category";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Category } from "../../../interfaces";
import { getUser, setUserCategory } from "../../../redux/api";
// import { routeHandler } from "../../../utils/routeHandler";
// import { getUserReducer, setUserCategoryReducer } from "../../../redux/reducer/user";
import SnackbarComponent from "../../../utils/components/Snackbar";

export default function SelectCategory() {

  ////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { bookCategories }: { bookCategories: Category[] } = useSelector((state: RootState) => state.category)

  ////////////////////////////////////////////////////// STATES ///////////////////////////////////////////////////
  const [error, setError] = useState<string>("");
  const [loader, setLoader] = useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarText, setSnackbarText] = useState<string>("");

  ////////////////////////////////////////////////////// USE EFFECTS ///////////////////////////////////////////////////
  useEffect(() => {
    dispatch<any>(getAllBookCategories())
  }, []);


  ////////////////////////////////////////////////////// FUNCTIONS ///////////////////////////////////////////////////
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (bookCategories.length === 0) return setError("Please wait while we fetch the bookCategories");
    const category = e.target.bookCategories.value;
    if (category.length == 0) return setError("Please select a category")
    try {
      setLoader(true)
      const { data }: { data: string } = await setUserCategory(category)
      navigate('/dashboard')
      setOpenSnackbar(false)
      setSnackbarText(data)
      setLoader(false)
    }
    catch (err: any) {
      setOpenSnackbar(true)
      setSnackbarText(err?.response?.data?.message)
      if (err?.response?.data?.message == 'Unauthorized.') return navigate('/auth/login')
      setOpenSnackbar(true)
      setSnackbarText('Please Login First')
      setLoader(false)
    }
  };





  return (
    <AuthPage onSubmit={handleSubmit} title="Choose Field" customPage="/auth/register" className="pb-28">

      {error && <Error>{error}</Error>}
      <SnackbarComponent open={openSnackbar} setOpen={setOpenSnackbar} note={snackbarText} />

      <div className="flex flex-col gap-4 w-full ">
        <label htmlFor="bookCategories" className="block text-sm font-medium text-gray-900 self-start mb-3">
          Choose Your Field
        </label>
        <select
          id="bookCategories"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:focus:ring-blue-500"
          defaultValue={bookCategories[0]?.name}
        >
          <option value={''} >Select Category</option>
          {bookCategories &&
            bookCategories.map((category: any, index: number) => {
              return (
                <option value={category._id} key={index}>
                  {category.name}
                </option>
              );
            })}
        </select>
        <div className="absolut bottom-5 w-full px-12">
          <Submit placeholder={loader ? 'Processing...' : "Done!"} type="submit" />
        </div>
      </div>
    </AuthPage>
  );
}
