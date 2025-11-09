import { useState } from "react"
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { auth, googleProvider } from "../../firebase/config"
import { toast } from "react-hot-toast"
import { useNavigate, Link } from "react-router-dom"
import { FcGoogle } from "react-icons/fc"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!email || !password) return toast.error("All fields are required")

    try {
      await signInWithEmailAndPassword(auth, email, password)
      toast.success("Login successful 🎉")
      navigate("/")
    } catch (err) {
      toast.error(err.message.includes("auth/invalid-credential") ? "Invalid credentials" : "Login failed")
    }
  }

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
      toast.success("Logged in with Google")
      navigate("/")
    } catch (err) {
      toast.error("Google login failed")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-green-600 mb-6">
          Welcome Back 👋
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center text-gray-600 dark:text-gray-300">
          <p>
            Don’t have an account?{" "}
            <Link to="/register" className="text-green-600 hover:underline">
              Register here
            </Link>
          </p>
        </div>

        <div className="mt-6">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-3 w-full border py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <FcGoogle size={22} />
            <span>Continue with Google</span>
          </button>
        </div>
      </div>
    </div>
  )
}
