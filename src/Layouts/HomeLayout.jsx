import React from "react"
import Navbar from "../Components/Global/Navbar"
import { Outlet } from "react-router"
import Footer from "../Components/Global/Footer"

const HomeLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default HomeLayout
