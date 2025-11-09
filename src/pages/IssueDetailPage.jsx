import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { useAuth } from "../context/AuthContext"
import axios from "axios"
import { toast } from "react-hot-toast"

export default function IssueDetailPage() {
  const { id } = useParams()
  const { user } = useAuth()

  const [issue, setIssue] = useState(null)
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [contribution, setContribution] = useState({
    contributorName: "",
    phone: "",
    address: "",
    additionalInfo: "",
    amount: "",
  })
  const [contributors, setContributors] = useState([])

  useEffect(() => {
    const fetchIssue = async () => {
      try {
       const res = await axios.get(`http://localhost:5000/api/issues/${id}`)
        setIssue(res.data)
      } catch (err) {
        console.error(err)
        toast.error("Failed to fetch issue")
      } finally {
        setLoading(false)
      }
    }

    const fetchContributors = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/contributions/issue/${id}`)
        setContributors(res.data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchIssue()
    fetchContributors()
  }, [id])

  if (loading) return <div className="mt-24 text-center">Loading...</div>
  if (!issue) return <div className="mt-24 text-center">Issue not found</div>

  const handleChange = (e) => {
    setContribution({ ...contribution, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) return toast.error("You must be logged in to contribute")

    const contributionData = {
      ...contribution,
      issueId: id,
      issueTitle: issue.title,
      email: user.email,
      date: new Date(),
    }

    try {
     axios.post("http://localhost:5000/api/contributions", contributionData)
      toast.success("Contribution added successfully")
      setModalOpen(false)
      setContributors((prev) => [...prev, contributionData])
      setContribution({ contributorName: "", phone: "", address: "", additionalInfo: "", amount: "" })
    } catch (err) {
      console.error(err)
      toast.error("Failed to add contribution")
    }
  }

  const totalCollected = contributors.reduce((sum, c) => sum + Number(c.amount || 0), 0)
  const progressPercent = issue.amount ? Math.min((totalCollected / issue.amount) * 100, 100) : 0

  return (
    <div className="max-w-4xl mx-auto p-6 mt-24">
      <div className="bg-base-100 p-6 rounded-lg shadow-md">
        <img
          src={issue.image || "https://via.placeholder.com/600x300"}
          alt={issue.title}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
        <h2 className="text-3xl font-bold mb-2">{issue.title}</h2>
        <p className="text-sm text-gray-500 mb-1">
          <strong>Category:</strong> {issue.category}
        </p>
        <p className="text-sm text-gray-500 mb-1">
          <strong>Location:</strong> {issue.location}
        </p>
        <p className="text-sm text-gray-500 mb-1">
          <strong>Date:</strong> {new Date(issue.date).toLocaleDateString()}
        </p>
        <p className="text-sm text-gray-500 mb-1">
          <strong>Suggested Budget:</strong> {issue.amount || 0}
        </p>
        <p className="mt-4">{issue.description}</p>

        <div className="mt-4">
          <label className="text-sm font-medium">Collected: {totalCollected} / {issue.amount}</label>
          <progress className="progress w-full" value={progressPercent} max="100"></progress>
        </div>

        <button
          className="btn btn-primary mt-4"
          onClick={() => setModalOpen(true)}
        >
          Pay Clean-Up Contribution
        </button>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-base-100 p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <h3 className="text-xl font-bold mb-4">Contribute to {issue.title}</h3>
            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
              <input
                type="text"
                name="contributorName"
                placeholder="Your Name"
                value={contribution.contributorName}
                onChange={handleChange}
                required
                className="input input-bordered w-full"
              />
              <input
                type="email"
                value={user.email}
                readOnly
                className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={contribution.phone}
                onChange={handleChange}
                required
                className="input input-bordered w-full"
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={contribution.address}
                onChange={handleChange}
                required
                className="input input-bordered w-full"
              />
              <input
                type="number"
                name="amount"
                placeholder="Contribution Amount"
                value={contribution.amount}
                onChange={handleChange}
                required
                className="input input-bordered w-full"
              />
              <textarea
                name="additionalInfo"
                placeholder="Additional Info (optional)"
                value={contribution.additionalInfo}
                onChange={handleChange}
                className="textarea textarea-bordered w-full"
              />
              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4">Contributors</h3>
        {contributors.length === 0 ? (
          <p className="text-gray-500">No contributions yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Avatar</th>
                  <th>Name</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {contributors.map((c, idx) => (
                  <tr key={idx}>
                    <td>
                      <img
                        src={c.image || "https://via.placeholder.com/40"}
                        alt={c.contributorName}
                        className="w-10 h-10 rounded-full"
                      />
                    </td>
                    <td>{c.contributorName}</td>
                    <td>{c.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
