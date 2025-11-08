import React from 'react'
import Navbar from '../Components/Global/Navbar'
import { Outlet } from 'react-router'
import Footer from '../Components/Global/Footer'

const HomeLayout = () => {
  return (
    <div>
        <Navbar></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>
    </div>
  )
}

export default HomeLayout