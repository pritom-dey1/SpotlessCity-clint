import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"
import { useAuth } from "../context/AuthContext"
import jsPDF from "jspdf"

export default function MyContributionPage() {
  const { user } = useAuth()
  const [contributions, setContributions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    const fetchContributions = async () => {
      try {
        const res = await axios.get(`/api/contributions/user/${user.email}`)
        setContributions(res.data)
      } catch (err) {
        console.error(err)
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

  if (loading) return <div className="mt-24 text-center">Loading...</div>
  if (!contributions.length) return <div className="mt-24 text-center">No contributions yet</div>

  return (
    <div className="max-w-6xl mx-auto p-6 mt-24">
      <h2 className="text-3xl font-bold mb-6">My Contributions</h2>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Issue Title</th>
              <th>Category</th>
              <th>Paid Amount</th>
              <th>Date</th>
              <th>Download Report</th>
            </tr>
          </thead>
          <tbody>
            {contributions.map((c) => (
              <tr key={c._id}>
                <td>{c.issueTitle}</td>
                <td>{c.category || "N/A"}</td>
                <td>{c.amount}</td>
                <td>{new Date(c.date).toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handleDownload(c)}
                  >
                    Download PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
