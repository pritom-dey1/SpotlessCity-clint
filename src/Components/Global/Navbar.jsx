import { useState, useEffect } from "react"
import { Link, NavLink } from "react-router"
import { Menu, X, User, Sun, Moon } from "lucide-react"

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false) 

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
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

  const activeLink = "text-green-600 font-semibold"
  const normalLink = "hover:text-green-500 transition"

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-5 py-5">
        <Link
          to="/"
          className="text-2xl font-bold text-green-600 dark:text-green-400"
        >
          SPOTLESS<span className="text-gray-800 dark:text-gray-200">CITY</span>
        </Link>

        <div className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </div>

        <ul className="hidden md:flex gap-6 items-center uppercase">
          {(loggedIn ? navLinksAfterLogin : navLinksBeforeLogin).map(link => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}

          {loggedIn && (
            <div className="relative">
              <User
                className="w-9 h-9 border-2 border-green-500 rounded-full p-1 cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 shadow-lg rounded-md p-3 w-40 flex flex-col gap-2">
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md w-full"
                  >
                    {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                    {darkMode ? "Light Mode" : "Dark Mode"}
                  </button>
                  <button
                    onClick={() => alert("Logout clicked")} 
                    className="px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md w-full text-left"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </ul>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <ul className="md:hidden bg-white dark:bg-gray-900 flex flex-col gap-4 p-5 shadow-lg border-t">
          {(loggedIn ? navLinksAfterLogin : navLinksBeforeLogin).map(link => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </NavLink>
            </li>
          ))}

          {loggedIn && (
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="flex items-center gap-2 px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md w-full"
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                {darkMode ? "Light Mode" : "Dark Mode"}
              </button>
              <button
                onClick={() => alert("Logout clicked")}
                className="px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md w-full text-left"
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
