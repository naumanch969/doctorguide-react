import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Books, Tools, ToolUsage, Dashboard, ProfileDetails, Contact, Plans, Usage, Register, Login, Verify, SelectCategory, Reset, NewPassword, AdminBooks, AdminCategories, AdminSubcategories, AdminPlans, AdminTools, AdminMessages, } from "./pages";
import { ProfileWrapper, AdminWrapper, AiToolWrapper, DashboardWrapper, ChatbotWrapper } from './wrappers'
import { getUser } from "./redux/action/user";
import { useDispatch, useSelector } from "react-redux";
import Cookie from 'js-cookie'


const App = () => {

  ///////////////////////////////////// VARIABLES ////////////////////////////////////////
  const dispatch = useDispatch()
  
  ///////////////////////////////////// STATES ////////////////////////////////////////

  ///////////////////////////////////// USE EFFECTS ////////////////////////////////////////
  useEffect(() => {
  dispatch(getUser())
  }, [])


  ///////////////////////////////////// Functions ////////////////////////////////////////

  return (
    <div className="flex w-full h-screen bg-[#f6f9fa]">

      <Routes>

        <Route exact path="/auth/register" element={<Register />} />
        <Route exact path="/auth/login" element={<Login />} />
        <Route exact path="/auth/reset" element={<Reset />} />
        <Route exact path="/auth/newpassword" element={<NewPassword />} />
        <Route exact path="/auth/verify" element={<Verify />} />
        <Route exact path="/auth/category" element={<SelectCategory />} />

        <Route exact path="/" element={<Navigate to='/dashboard' />} />
        <Route exact path="/dashboard" element={<DashboardWrapper> <Dashboard /></DashboardWrapper>} />
        <Route exact path="/books" element={<DashboardWrapper> <Navigate to='/dashboard' /></DashboardWrapper>} />
        <Route exact path="/books/:categoryId/:subcategoryId" element={<DashboardWrapper> <Books /></DashboardWrapper>} />
        <Route exact path="/book-chat/:bookId" element={<ChatbotWrapper></ChatbotWrapper>} />
        <Route exact path="/tools/:categoryId/:subcategoryId" element={<DashboardWrapper> <Tools /></DashboardWrapper>} />
        <Route exact path="/tool-usage/:toolId" element={<AiToolWrapper> <ToolUsage /></AiToolWrapper>} />

        {/* profile */}
        <Route exact path="/profile" element={<Navigate to='/profile/details' />} />
        <Route exact path="/profile/details" element={<ProfileWrapper> <ProfileDetails /></ProfileWrapper>} />
        <Route exact path="/profile/usage" element={<ProfileWrapper> <Usage /></ProfileWrapper>} />
        <Route exact path="/profile/contact" element={<ProfileWrapper> <Contact /></ProfileWrapper>} />
        <Route exact path="/profile/plans" element={<ProfileWrapper> <Plans /></ProfileWrapper>} />

        {/* admin */}
        <Route exact path="/admin" element={<Navigate to='/admin/details' />} />
        <Route exact path="/admin/books" element={<AdminWrapper> <AdminBooks /></AdminWrapper>} />
        <Route exact path="/admin/categories" element={<AdminWrapper> <AdminCategories /></AdminWrapper>} />
        <Route exact path="/admin/subcategories" element={<AdminWrapper> <AdminSubcategories /></AdminWrapper>} rapper />
        <Route exact path="/admin/tools" element={<AdminWrapper> <AdminTools /></AdminWrapper>} />
        <Route exact path="/admin/plans" element={<AdminWrapper> <AdminPlans /></AdminWrapper>} />
        <Route exact path="/admin/messages" element={<AdminWrapper> <AdminMessages /></AdminWrapper>} />

      </Routes>

    </div>
  );
};

export default App;
