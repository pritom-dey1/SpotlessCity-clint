import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { useAuth } from "../context/AuthContext"
import axios from "axios"
import { toast } from "react-hot-toast"

export default function AddIssuePage() {
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    document.title = "Add New Issue | SpotlessCity"
  }, [])

  const [formData, setFormData] = useState({
    title: "",
    category: "Garbage",
    location: "",
    description: "",
    image: "",
    amount: "",
    status: "ongoing",
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) return toast.error("You must be logged in")

    const issueData = {
      ...formData,
      email: user.email,
      status: "ongoing",
      date: new Date(),
    }

    try {
      await axios.post("https://city-server-sigma.vercel.app/api/issues", issueData)
      toast.success("Issue added successfully")
      navigate("/issues")
    } catch (err) {
      console.error(err)
      toast.error("Failed to add issue")
    }
  }

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Card */}
        <div className="bg-base-100 rounded-xl shadow-lg p-6 sm:p-8 mt-15">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-base-content">
            Add New Issue
          </h2>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Title */}
            <div>
              <input
                type="text"
                name="title"
                placeholder="Issue Title"
                value={formData.title}
                onChange={handleChange}
                required
                className="input input-bordered w-full focus:ring-2 focus:ring-primary focus:border-primary transition"
              />
            </div>

            {/* Category */}
            <div>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="select select-bordered w-full focus:ring-2 focus:ring-primary"
              >
                <option value="Garbage">Garbage</option>
                <option value="Road">Road</option>
                <option value="Water">Water</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Location */}
            <div>
              <input
                type="text"
                name="location"
                placeholder="Location (e.g., Dhaka, Mirpur 10)"
                value={formData.location}
                onChange={handleChange}
                required
                className="input input-bordered w-full focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Description */}
            <div>
              <textarea
                name="description"
                placeholder="Describe the issue in detail..."
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="textarea textarea-bordered w-full focus:ring-2 focus:ring-primary resize-none"
              />
            </div>

            {/* Image URL */}
            <div>
              <input
                type="text"
                name="image"
                placeholder="Image URL (optional)"
                value={formData.image}
                onChange={handleChange}
                className="input input-bordered w-full focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <input
                type="number"
                name="amount"
                placeholder="Suggested Fix Budget (BDT)"
                value={formData.amount}
                onChange={handleChange}
                className="input input-bordered w-full focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="input input-bordered w-full bg-base-200 cursor-not-allowed text-base-content/70"
              />
            </div>

            <button
              type="submit"
              className="w-full btn btn-primary text-lg py-3 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5"
            >
              Submit Issue
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}