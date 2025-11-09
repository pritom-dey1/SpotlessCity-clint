import { useEffect, useState } from "react"
import axios from "axios"
import IssueCard from "../Components/Global/IssueCard"
import { toast } from "react-hot-toast"
import Spinner from "../Components/Global/Spinner"
import { useParams } from "react-router"

export default function AllIssuesPage() {
  const [issues, setIssues] = useState([])
  const [filteredIssues, setFilteredIssues] = useState([])
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const { id } = useParams() 

  useEffect(() => {
    document.title = "All Issues | SpotlessCity"
  }, [])

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const url = id
          ? `https://city-server-sigma.vercel.app/api/issues/${id}`
          : `https://city-server-sigma.vercel.app/api/issues`

        const res = await axios.get(url)

        // Handle single or multiple issue responses
        const data = Array.isArray(res.data) ? res.data : res.data ? [res.data] : []

        if (data.length === 0) {
          setNotFound(true)
        } else {
          setIssues(data)
          setNotFound(false)
        }
      } catch (err) {
        console.error(err)
        toast.error("Failed to fetch issues")
        setNotFound(true)
      } finally {
        setLoading(false)
      }
    }

    fetchIssues()
  }, [id])

  useEffect(() => {
    let temp = issues
    if (categoryFilter !== "All") {
      temp = temp.filter(issue => issue.category === categoryFilter)
    }
    if (statusFilter !== "All") {
      temp = temp.filter(issue => issue.status === statusFilter)
    }
    setFilteredIssues(temp)
  }, [categoryFilter, statusFilter, issues])

  if (loading)
    return (
      <div className="mt-24 text-center">
        <Spinner />
        <p className="mt-4 text-base-content/70">Loading issues...</p>
      </div>
    )

  if (notFound)
    return (
      <div className="max-w-7xl mx-auto mt-24 mb-24 px-5 text-center">
        <h1 className="text-3xl font-bold mb-4">No Issues Found</h1>
        {id ? (
          <p className="text-base-content/70">No issues found for this ID: <strong>{id}</strong></p>
        ) : (
          <p className="text-base-content/70">No issues found in the system.</p>
        )}
      </div>
    )

  return (
    <div className="max-w-7xl mx-auto mt-24 mb-24 px-5">
      <h1 className="text-3xl font-bold mb-6">All Issues</h1>

      <div className="flex gap-4 mb-6 flex-wrap">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="select select-bordered w-48"
        >
          <option value="All">All Categories</option>
          <option value="Garbage">Garbage</option>
          <option value="Road">Road</option>
          <option value="Water">Water</option>
          <option value="Public Space">Public Space</option>
          <option value="Other">Other</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="select select-bordered w-48"
        >
          <option value="All">All Status</option>
          <option value="ongoing">Ongoing</option>
          <option value="ended">Ended</option>
        </select>
      </div>

      {filteredIssues.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">No issues found with current filters.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {filteredIssues.map(issue => (
            <IssueCard key={issue._id} issue={issue} />
          ))}
        </div>
      )}
    </div>
  )
}
