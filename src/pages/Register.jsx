import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router"
import Swal from "sweetalert2"
import { auth, googleProvider } from "../Config/firebase.config.js"
import { FcGoogle } from "react-icons/fc"

import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  signOut
} from "firebase/auth"

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    photoURL: ""
  })
  const navigate = useNavigate()

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const validatePassword = password => {
    if (password.length < 6)
      return "Password must be at least 6 characters long"
    if (!/[A-Z]/.test(password))
      return "Password must contain at least one uppercase letter"
    if (!/[a-z]/.test(password))
      return "Password must contain at least one lowercase letter"
    return null
  }

  const handleRegister = async e => {
    e.preventDefault()
    const { name, email, password, photoURL } = form

    const errorMsg = validatePassword(password)
    if (errorMsg)
      return Swal.fire({
        icon: "error",
        title: "Invalid Password",
        text: errorMsg
      })

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL
      })

await signOut(auth)
await Swal.fire({
  icon: "success",
  title: "Registration Successful!",
  text: "Please login to continue.",
  timer: 2000,
  showConfirmButton: false
})
navigate("/login")
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: err.message
      })
    }
  }
         useEffect(() => {
        document.title = "Register | SpotlessCity"; 
      }, []);
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
      Swal.fire({
        icon: "success",
        title: "Logged in with Google!",
        timer: 2000,
        showConfirmButton: false
      })
      navigate("/")
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Google Login Failed",
        text: err.message
      })
    }
  }

  return (
    <div className="min-h-auto pt-[7%] pb-[5%] flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-[600px]">
        <h2 className="text-2xl font-bold text-center mb-6 text-primary uppercase">
          Create an Account
        </h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-white"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-white"
          />
          <input
            type="text"
            name="photoURL"
            placeholder="Photo URL"
            value={form.photoURL}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-white"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-white"
          />
          <button
            type="submit"
            className="w-full btn btn-primary">
            Register
          </button>
        </form>

        <div className="flex items-center justify-between mt-4">
          <span className="text-gray-600 dark:text-gray-300 text-sm">
            Already have an account?
          </span>
          <Link
            to="/login"
            className="text-primary dark:text-green-400 text-sm font-semibold"
          >
            Login
          </Link>
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
