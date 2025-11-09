import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"
import { useAuth } from "../context/AuthContext"
import { AiOutlineClose } from "react-icons/ai"

export default function MyIssuesPage() {
  const { user } = useAuth()
  const [issues, setIssues] = useState([])
  const [loading, setLoading] = useState(true)

  const [updateModal, setUpdateModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [selectedIssue, setSelectedIssue] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    amount: "",
    description: "",
    status: "ongoing",
  })
         useEffect(() => {
        document.title = "My Issues | SpotlessCity"; 
      }, []);
  useEffect(() => {
    if (!user) return
    const fetchIssues = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/issues`)
        const userIssues = res.data.filter(issue => issue.email === user.email)
        setIssues(userIssues)
      } catch (err) {
        console.error(err)
        toast.error("Failed to fetch issues")
      } finally {
        setLoading(false)
      }
    }
    fetchIssues()
  }, [user])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const openUpdateModal = (issue) => {
    setSelectedIssue(issue)
    setFormData({
      title: issue.title,
      category: issue.category,
      amount: issue.amount,
      description: issue.description,
      status: issue.status,
    })
    setUpdateModal(true)
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      await axios.patch(`http://localhost:5000/api/issues/${selectedIssue._id}`, formData)
      toast.success("Issue updated successfully")
      setIssues(prev =>
        prev.map(i => (i._id === selectedIssue._id ? { ...i, ...formData } : i))
      )
      setUpdateModal(false)
    } catch (err) {
      console.error(err)
      toast.error("Failed to update issue")
    }
  }

  const openDeleteModal = (issue) => {
    setSelectedIssue(issue)
    setDeleteModal(true)
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/issues/${selectedIssue._id}`)
      toast.success("Issue deleted successfully")
      setIssues(prev => prev.filter(i => i._id !== selectedIssue._id))
      setDeleteModal(false)
    } catch (err) {
      console.error(err)
      toast.error("Failed to delete issue")
    }
  }

  if (loading) return <div className="mt-24 text-center text-gray-600">Loading...</div>
  if (!issues.length) return <div className="mt-24 text-center text-gray-600">No issues found</div>

  const statusColor = (status) => {
    switch(status) {
      case "ongoing": return "bg-green-100 text-green-800"
      case "ended": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6 mt-24 shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 uppercase text-center">My Issues</h2>

      <div className="overflow-x-auto hidden md:block">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {issues.map(issue => (
              <tr key={issue._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <td className="px-6 py-4 whitespace-nowrap">{issue.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{issue.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">${issue.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-sm font-medium ${statusColor(issue.status)}`}>{issue.status}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                  <button
                    className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                    onClick={() => openUpdateModal(issue)}
                  >
                    Update
                  </button>
                  <button
                    className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                    onClick={() => openDeleteModal(issue)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 space-y-4 md:hidden">
        {issues.map(issue => (
          <div key={issue._id} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 flex flex-col gap-2">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">{issue.title}</h3>
            <p className="text-gray-500 text-sm">{issue.description}</p>
            <div className="flex flex-wrap gap-2 text-sm mt-1">
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">{issue.category}</span>
              <span className={`px-2 py-1 rounded-full ${statusColor(issue.status)}`}>{issue.status}</span>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">Budget: ${issue.amount}</span>
            </div>
            <div className="flex gap-2 mt-2">
              <button
                className="flex-1 px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                onClick={() => openUpdateModal(issue)}
              >
                Update
              </button>
              <button
                className="flex-1 px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                onClick={() => openDeleteModal(issue)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {updateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setUpdateModal(false)}
            >
              <AiOutlineClose size={20} />
            </button>
            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Update Issue</h3>
            <form className="flex flex-col gap-3" onSubmit={handleUpdate}>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Title"
                className="input input-bordered w-full"
                required
              />
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="select select-bordered w-full"
                required
              >
                <option value="">Select Category</option>
                <option value="Cleanliness">Cleanliness</option>
                <option value="Public Space">Public Space</option>
                <option value="Garbage">Garbage</option>
                <option value="Other">Other</option>
              </select>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Suggested Budget"
                className="input input-bordered w-full"
                required
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                className="textarea textarea-bordered w-full"
                required
              />
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="select select-bordered w-full"
              >
                <option value="ongoing">Ongoing</option>
                <option value="ended">Ended</option>
              </select>
              <div className="flex justify-end gap-2 mt-4">
                <button type="button" className="btn btn-ghost" onClick={() => setUpdateModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-sm relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setDeleteModal(false)}
            >
              <AiOutlineClose size={20} />
            </button>
            <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">Delete Issue?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Are you sure you want to delete <strong>{selectedIssue?.title}</strong>?
            </p>
            <div className="flex justify-end gap-2 mt-4">
              <button className="btn btn-ghost" onClick={() => setDeleteModal(false)}>Cancel</button>
              <button className="btn btn-error" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
