 import { useEffect, useState } from "react"
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { auth, googleProvider } from "../Config/firebase.config.js"
import Swal from "sweetalert2"
import { useNavigate, Link } from "react-router"
import { FcGoogle } from "react-icons/fc"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    document.title = "Login | SpotlessCity"
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please enter both email and password.",
        confirmButtonColor: "#16a34a"
      })
      return
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      const token = await user.getIdToken() 
      localStorage.setItem("accessToken", token)

      Swal.fire({
        icon: "success",
        title: "Welcome Back 🎉",
        text: "Login successful!",
        timer: 1500,
        showConfirmButton: false
      })

      navigate("/")
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text:
          err.message.includes("auth/invalid-credential") ||
          err.message.includes("auth/invalid-email")
            ? "Invalid email or password. Try again!"
            : "Something went wrong, please try later.",
        confirmButtonColor: "#dc2626"
      })
    }
  }

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const user = result.user
      const token = await user.getIdToken()
      localStorage.setItem("accessToken", token)

      Swal.fire({
        icon: "success",
        title: "Logged in with Google",
        timer: 1500,
        showConfirmButton: false
      })
      navigate("/")
    } catch {
      Swal.fire({
        icon: "error",
        title: "Google Login Failed",
        text: "Please try again later.",
        confirmButtonColor: "#dc2626"
      })
    }
  }

  return (
    <div className="min-h-auto py-[5%] pt-[7%] flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-[600px]">
        <h2 className="text-3xl font-bold text-center text-primary mb-6">
          LOGIN HERE
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email"
            />
          </div>

          <div className="relative">
            <label className="block text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your password"
            />
            <div
              className="absolute top-1/2 left-[93%] translate-y-[20%] cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center text-gray-600 dark:text-gray-300">
          <p>
            Don’t have an account?{" "}
            <Link to="/register" className="text-primary hover:underline">
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
