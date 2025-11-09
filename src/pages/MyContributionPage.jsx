import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"
import { useAuth } from "../context/AuthContext"
import jsPDF from "jspdf"
import Spinner from "../Components/Global/Spinner"

export default function MyContributionPage() {
  const { user } = useAuth()
  const [contributions, setContributions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = "My Contributions | SpotlessCity"
  }, [])

  useEffect(() => {
    if (!user) {
      setLoading(false)
      return
    }

    const fetchContributions = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/contributions/user/${user.email}`)
        const contribs = Array.isArray(res.data) ? res.data : res.data ? [res.data] : []

        const issuesRes = await axios.get(`http://localhost:5000/api/issues`)
        const issues = issuesRes.data

        const contributionsWithCategory = contribs.map(c => {
          const issue = issues.find(i => i._id === c.issueId)
          return { ...c, category: issue?.category || "N/A" }
        })

        console.log("Fetched Contributions:", contributionsWithCategory) // ডিবাগ
        setContributions(contributionsWithCategory)
      } catch (err) {
        console.error("Error fetching contributions:", err)
        toast.error("Failed to fetch contributions")
      } finally {
        setLoading(false)
      }
    }

    fetchContributions()
  }, [user])

  const handleDownload = (contribution) => {
    const doc = new jsPDF()
    doc.setFontSize(16)
    doc.text("Clean-Up Contribution Report", 20, 20)
    doc.setFontSize(12)
    doc.text(`Contributor Name: ${contribution.contributorName}`, 20, 40)
    doc.text(`Email: ${contribution.email}`, 20, 50)
    doc.text(`Issue Title: ${contribution.issueTitle}`, 20, 60)
    doc.text(`Category: ${contribution.category || "N/A"}`, 20, 70)
    doc.text(`Amount Paid: ${contribution.amount}`, 20, 80)
    doc.text(`Date: ${new Date(contribution.date).toLocaleDateString()}`, 20, 90)
    if (contribution.additionalInfo)
      doc.text(`Additional Info: ${contribution.additionalInfo}`, 20, 100)

    doc.save(`Contribution_${contribution._id || Date.now()}.pdf`)
  }

  // Loading
  if (loading) {
    return (
      <div className="mt-24 text-center">
        <Spinner />
        <p className="mt-4 text-base-content/70">Loading your contributions...</p>
      </div>
    )
  }

  // No user
  if (!user) {
    return (
      <div className="mt-24 text-center">
        <p className="text-error">Please log in to view your contributions.</p>
      </div>
    )
  }

  // No contributions
  if (!contributions.length) {
    return (
      <div className="max-w-6xl mx-auto p-6 mt-34 mb-12 text-center">
        <h2 className="text-3xl font-bold mb-6 text-base-content uppercase">My Contributions</h2>
        <div className="bg-base-200 rounded-lg p-10">
          <p className="text-base-content/70 text-lg">You haven't made any contributions yet.</p>
          <p className="text-sm text-base-content/60 mt-2">
            Start by contributing to a clean-up drive!
          </p>
        </div>
      </div>
    )
  }

  // Main UI
  return (
    <div className="max-w-6xl mx-auto p-6 mt-34 mb-12 bg-base-100 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-base-content uppercase text-center">My Contributions</h2>

      {/* Desktop Table */}
      <div className="overflow-x-auto hidden md:block">
        <table className="min-w-full divide-y divide-base-300">
          <thead className="bg-base-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-base-content/70 uppercase tracking-wider">Issue Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-base-content/70 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-base-content/70 uppercase tracking-wider">Paid Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-base-content/70 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-base-content/70 uppercase tracking-wider">Download</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-base-300">
            {contributions.map(c => (
              <tr key={c._id} className="hover:bg-base-200 transition">
                <td className="px-6 py-4 whitespace-nowrap text-base-content">{c.issueTitle}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 bg-info/10 text-info rounded-full text-sm">
                    {c.category || "N/A"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-base-content">${c.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap text-base-content">
                  {new Date(c.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="btn btn-success btn-sm" onClick={() => handleDownload(c)}>
                    Download PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="mt-4 space-y-4 md:hidden">
        {contributions.map(c => (
          <div key={c._id} className="bg-base-100 shadow-md rounded-lg p-4 border border-base-300">
            <h3 className="text-lg font-semibold text-base-content">{c.issueTitle}</h3>
            <p className="text-sm text-base-content/70"><strong>Category:</strong> {c.category || "N/A"}</p>
            <p className="text-sm text-base-content/70"><strong>Paid:</strong> ${c.amount}</p>
            <p className="text-sm text-base-content/70"><strong>Date:</strong> {new Date(c.date).toLocaleDateString()}</p>
            <button className="btn btn-success btn-sm w-full mt-3" onClick={() => handleDownload(c)}>
              Download PDF
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}