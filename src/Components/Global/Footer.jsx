import { Link } from "react-router"

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 text-gray-800 border-t-1 border-gray-200 dark:text-gray-200 mt-10">
      <div className="max-w-7xl mx-auto px-5 py-10 grid md:grid-cols-3 gap-8">
        <div>
          <h1 className="text-2xl font-bold text-green-600 dark:text-green-400">
            SPOTLESS<span className="text-gray-800 dark:text-gray-200">CITY</span>
          </h1>
          <p className="mt-3 text-gray-600 dark:text-gray-400">
            Making your community cleaner and greener, one report at a time.
          </p>
        </div>

        {/* Useful Links */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Useful Links</h2>
          <ul className="flex flex-col gap-2">
            <li>
              <Link to="/" className="hover:text-green-500 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/issues" className="hover:text-green-500 transition">
                All Issues
              </Link>
            </li>
            <li>
              <Link to="/add-issue" className="hover:text-green-500 transition">
                Add Issue
              </Link>
            </li>
            <li>
              <Link to="/my-issues" className="hover:text-green-500 transition">
                My Issues
              </Link>
            </li>
            <li>
              <Link to="/my-contributions" className="hover:text-green-500 transition">
                My Contributions
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">Contact</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Email: support@spotlesscity.com
          </p>
          <p className="mt-5 text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} SPOTLESSCITY. All rights reserved.
          </p>
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 mt-4">
        <p className="text-center text-gray-500 dark:text-gray-400 py-3 text-sm">
          Built with ❤️ by Pritom Dey </p>
      </div>
    </footer>
  )
}
