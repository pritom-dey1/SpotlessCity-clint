import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import axios from "axios"
import { toast } from "react-hot-toast"

export default function AddIssuePage() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: "",
    category: "Garbage",
    location: "",
    description: "",
    image: "",
    amount: "",
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
      await axios.post("/api/issues", issueData)
      toast.success("Issue added successfully")
      navigate("/issues")
    } catch (err) {
      console.error(err)
      toast.error("Failed to add issue")
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6 mt-24 bg-base-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add New Issue</h2>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Issue Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="input input-bordered w-full"
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="select select-bordered w-full"
        >
          <option value="Garbage">Garbage</option>
          <option value="Road">Road</option>
          <option value="Water">Water</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
          className="input input-bordered w-full"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="textarea textarea-bordered w-full"
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          className="input input-bordered w-full"
        />

        <input
          type="number"
          name="amount"
          placeholder="Suggested Fix Budget"
          value={formData.amount}
          onChange={handleChange}
          className="input input-bordered w-full"
        />

        <input
          type="email"
          value={user?.email || ""}
          readOnly
          className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
        />

        <button type="submit" className="btn btn-primary mt-4">
          Submit Issue
        </button>
      </form>
    </div>
  )
}
