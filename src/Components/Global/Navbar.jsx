import { useState, useEffect } from "react"
import { Link, NavLink } from "react-router" 
import { Menu, X, Sun, Moon } from "lucide-react"
import { useAuth } from "../../context/AuthContext"

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { user, logout } = useAuth()

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  )

  useEffect(() => {
    const html = document.documentElement
    if (darkMode) {
      html.setAttribute("data-theme", "dark")
      localStorage.setItem("theme", "dark")
    } else {
      html.setAttribute("data-theme", "light")
      localStorage.setItem("theme", "light")
    }
  }, [darkMode])

  const navLinksBeforeLogin = [
    { name: "Home", path: "/" },
    { name: "Issues", path: "/issues" },
    { name: "Login", path: "/login" },
    { name: "Register", path: "/register" }
  ]

  const navLinksAfterLogin = [
    { name: "Home", path: "/" },
    { name: "All Issues", path: "/issues" },
    { name: "Add Issues", path: "/add-issue" },
    { name: "My Issues", path: "/my-issues" },
    { name: "My Contribution", path: "/my-contributions" }
  ]

  // DaisyUI থিম-ভিত্তিক লিঙ্ক ক্লাস
  const getLinkClass = (isActive) => {
    return isActive
      ? "text-primary font-semibold"
      : "text-base-content hover:text-primary transition"
  }

  return (
    <nav className="bg-base-100 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-5 py-5">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          <span className="text-primary">SPOTLESS</span>
          <span className="text-base-content">CITY</span>
        </Link>

        {/* Mobile Menu Toggle */}
        <div
          className="md:hidden cursor-pointer text-base-content"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 items-center uppercase">
          {(user ? navLinksAfterLogin : navLinksBeforeLogin).map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) => getLinkClass(isActive)}
              >
                {link.name}
              </NavLink>
            </li>
          ))}

          {/* User Avatar & Dropdown */}
          {user && (
            <div className="relative">
              <img
                src={user.photoURL || "https://i.ibb.co/2YjR3FJ/user.png"}
                alt="avatar"
                className="w-10 h-10 rounded-full border-2 border-primary cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 bg-base-200 shadow-lg rounded-md p-3 w-44 flex flex-col gap-2 border border-base-300">
                  {/* Dark Mode Toggle */}
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-base-content hover:bg-base-300 rounded-md w-full text-left transition"
                  >
                    {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                    {darkMode ? "Light Mode" : "Dark Mode"}
                  </button>

                  {/* Logout */}
                  <button
                    onClick={logout}
                    className="px-4 py-2 text-sm text-error hover:bg-base-300 rounded-md w-full text-left transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </ul>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="md:hidden bg-base-200 flex flex-col gap-4 p-5 shadow-lg border-t border-base-300">
          {(user ? navLinksAfterLogin : navLinksBeforeLogin).map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) => getLinkClass(isActive)}
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </NavLink>
            </li>
          ))}

          {user && (
            <div className="flex flex-col gap-2 pt-2 border-t border-base-300">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="flex items-center gap-2 px-4 py-2 text-base-content hover:bg-base-300 rounded-md w-full text-left transition"
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                {darkMode ? "Light Mode" : "Dark Mode"}
              </button>
              <button
                onClick={() => {
                  logout()
                  setMenuOpen(false)
                }}
                className="px-4 py-2 text-error hover:bg-base-300 rounded-md w-full text-left transition"
              >
                Logout
              </button>
            </div>
          )}
        </ul>
      )}
    </nav>
  )
}