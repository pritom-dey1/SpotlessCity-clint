import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"
import { useAuth } from "../context/AuthContext"

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

  if (loading) return <div className="mt-24 text-center">Loading...</div>
  if (!issues.length) return <div className="mt-24 text-center">No issues found</div>

  return (
    <div className="max-w-6xl mx-auto p-6 mt-24">
      <h2 className="text-3xl font-bold mb-6">My Issues</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {issues.map(issue => (
              <tr key={issue._id}>
                <td>{issue.title}</td>
                <td>{issue.category}</td>
                <td>{issue.amount}</td>
                <td>{issue.status}</td>
                <td className="flex gap-2">
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => openUpdateModal(issue)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-sm btn-error"
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

      {/* Update Modal */}
      {updateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-base-100 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Update Issue</h3>
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
              <div className="flex justify-end gap-2 mt-2">
                <button type="button" className="btn btn-ghost" onClick={() => setUpdateModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-base-100 p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h3 className="text-xl font-bold mb-4">Delete Issue?</h3>
            <p>Are you sure you want to delete <strong>{selectedIssue.title}</strong>?</p>
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
