import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"
import IssueCard from "../Components/Global/IssueCard"

export default function AllIssuesPage() {
  const [issues, setIssues] = useState([])
  const [loading, setLoading] = useState(true)

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

  if (loading) {
    return <div className="text-center mt-24 text-xl">Loading issues...</div>
  }

  if (!issues.length) {
    return <div className="text-center mt-24 text-xl">No issues found</div>
  }

  return (
    <div className="max-w-7xl mx-auto p-6 mt-24">
      <h2 className="text-3xl font-bold mb-6">All Issues</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {issues.map((issue) => (
          <IssueCard key={issue._id} issue={issue} />
        ))}
      </div>
    </div>
  )
}
