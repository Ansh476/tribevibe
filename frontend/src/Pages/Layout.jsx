import React from 'react'
import {Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
// import Navbar from '../components/Header';
import { AuthContext } from '../components/authentication/Authcontext';
import { useContext } from 'react';


const Layout = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  return (
    <>
    <Header isLoggedIn={isLoggedIn} handleLogout={logout} />
    <Outlet/>
    <Footer/>
    </>
  )
}

export default Layout
