import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Books, Tools, ToolUsage, Dashboard, ProfileDetails, Contact, Plans, Usage, Register, Login, Verify, SelectCategory, Reset, NewPassword, AdminBooks, AdminCategories, AdminSubcategories, AdminPlans, AdminTools, AdminMessages, } from "./pages";
import { ProfileWrapper, AdminWrapper, AiToolWrapper, DashboardWrapper, ChatbotWrapper } from './wrappers'
import { getUser } from "./redux/action/user";
import { useDispatch } from "react-redux";


const App = () => {

  ///////////////////////////////////// VARIABLES ////////////////////////////////////////
  const dispatch = useDispatch()

  ///////////////////////////////////// STATES ////////////////////////////////////////

  ///////////////////////////////////// USE EFFECTS ////////////////////////////////////////
  useEffect(() => {
    dispatch<any>(getUser())
  }, [])


  ///////////////////////////////////// Functions ////////////////////////////////////////

  return (
    <div className="flex w-full h-screen bg-[#f6f9fa]">

      <Routes>

        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/reset" element={<Reset />} />
        <Route path="/auth/newpassword" element={<NewPassword />} />
        <Route path="/auth/verify" element={<Verify />} />
        <Route path="/auth/category" element={<SelectCategory />} />

        <Route path="/" element={<Navigate to='/dashboard' />} />
        <Route path="/dashboard" element={<DashboardWrapper> <Dashboard /></DashboardWrapper>} />
        <Route path="/books" element={<DashboardWrapper> <Navigate to='/dashboard' /></DashboardWrapper>} />
        <Route path="/books/:categoryId/:subcategoryId" element={<DashboardWrapper> <Books /></DashboardWrapper>} />
        <Route path="/book-chat/:bookId" element={<ChatbotWrapper></ChatbotWrapper>} />
        <Route path="/tools/:categoryId/:subcategoryId" element={<DashboardWrapper> <Tools /></DashboardWrapper>} />
        <Route path="/tool-usage/:toolId" element={<AiToolWrapper> <ToolUsage /></AiToolWrapper>} />

        {/* profile */}
        <Route path="/profile" element={<Navigate to='/profile/details' />} />
        <Route path="/profile/details" element={<ProfileWrapper> <ProfileDetails /></ProfileWrapper>} />
        <Route path="/profile/usage" element={<ProfileWrapper> <Usage /></ProfileWrapper>} />
        <Route path="/profile/contact" element={<ProfileWrapper> <Contact /></ProfileWrapper>} />
        <Route path="/profile/plans" element={<ProfileWrapper> <Plans /></ProfileWrapper>} />

        {/* admin */}
        <Route path="/admin" element={<Navigate to='/admin/details' />} />
        <Route path="/admin/books" element={<AdminWrapper> <AdminBooks /></AdminWrapper>} />
        <Route path="/admin/categories" element={<AdminWrapper> <AdminCategories /></AdminWrapper>} />
        <Route path="/admin/subcategories" element={<AdminWrapper> <AdminSubcategories /></AdminWrapper>} />
        <Route path="/admin/tools" element={<AdminWrapper> <AdminTools /></AdminWrapper>} />
        <Route path="/admin/plans" element={<AdminWrapper> <AdminPlans /></AdminWrapper>} />
        <Route path="/admin/messages" element={<AdminWrapper> <AdminMessages /></AdminWrapper>} />

      </Routes>

    </div>
  );
};

export default App;
