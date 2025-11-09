import { Link } from "react-router"

export default function Footer() {
  return (
    <footer className="bg-base-100 text-base-content border-t border-base-300">
      <div className="max-w-7xl mx-auto px-5 py-10 grid md:grid-cols-3 gap-8">
        {/* Brand Section */}
        <div>
          <h1 className="text-2xl font-bold">
            <span className="text-primary">SPOTLESS</span>
            <span className="text-base-content">CITY</span>
          </h1>
          <p className="mt-3 text-base-content/70">
            Making your community cleaner and greener, one report at a time.
          </p>
        </div>

        {/* Useful Links */}
        <div>
          <h2 className="text-lg font-semibold mb-3 text-base-content">Useful Links</h2>
          <ul className="flex flex-col gap-2">
            <li>
              <Link to="/" className="hover:text-primary transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/issues" className="hover:text-primary transition">
                All Issues
              </Link>
            </li>
            <li>
              <Link to="/add-issue" className="hover:text-primary transition">
                Add Issue
              </Link>
            </li>
            <li>
              <Link to="/my-issues" className="hover:text-primary transition">
                My Issues
              </Link>
            </li>
            <li>
              <Link to="/my-contributions" className="hover:text-primary transition">
                My Contributions
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-lg font-semibold mb-3 text-base-content">Contact</h2>
          <p className="text-base-content/70">
            Email: support@spotlesscity.com
          </p>
          <p className="mt-5 text-sm text-base-content/60">
            &copy; {new Date().getFullYear()} SPOTLESSCITY. All rights reserved.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-base-300 mt-4">
        <p className="text-center text-base-content/60 py-3 text-sm">
          Built with by Pritom Dey
        </p>
      </div>
    </footer>
  )
}