import { useEffect, useState } from "react"
import axios from "axios"
import IssueCard from "../components/Global/IssueCard"
import { toast } from "react-hot-toast"

export default function AllIssuesPage() {
  const [issues, setIssues] = useState([])
  const [filteredIssues, setFilteredIssues] = useState([])

  const [categoryFilter, setCategoryFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")
  const [loading, setLoading] = useState(true)
       useEffect(() => {
    document.title = "All Issue | SpotlessCity"; 
  }, []);
  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/issues")
        setIssues(res.data)
      } catch (err) {
        console.error(err)
        toast.error("Failed to fetch issues")
      } finally {
        setLoading(false)
      }
    }
    fetchIssues()
  }, [])

  // Filtering logic
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

  if (loading) return <div className="mt-24 text-center">Loading...</div>

  return (
    <div className="max-w-7xl mx-auto mt-24 mb-24 px-5">
      <h1 className="text-3xl font-bold mb-6">All Issues</h1>

      {/* Filter Controls */}
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

      {/* Issues Grid */}
      {filteredIssues.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">No issues found.</p>
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
