import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
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

  // Fetch issue data
  useEffect(() => {
    const fetchIssue = async () => {
      try {
        const res = await axios.get(`/api/issues/${id}`)
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
        const res = await axios.get(`/api/contributions/issue/${id}`)
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
      await axios.post("/api/contributions", contributionData)
      toast.success("Contribution added successfully")
      setModalOpen(false)
      setContributors((prev) => [...prev, contributionData])
      setContribution({ contributorName: "", phone: "", address: "", additionalInfo: "", amount: "" })
    } catch (err) {
      console.error(err)
      toast.error("Failed to add contribution")
    }
  }

  // Calculate total contribution
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

        {/* Progress Bar */}
        <div className="mt-4">
          <label className="text-sm font-medium">Collected: {totalCollected} / {issue.amount}</label>
          <progress className="prog
