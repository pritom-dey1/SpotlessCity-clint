import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"
import { useAuth } from "../context/AuthContext"
import jsPDF from "jspdf"

export default function MyContributionPage() {
  const { user } = useAuth()
  const [contributions, setContributions] = useState([])
  console.log(contributions);
  const [loading, setLoading] = useState(true)
        useEffect(() => {
      document.title = "My Contributions | SpotlessCity"; 
    }, []);
  useEffect(() => {
    if (!user) return
const fetchContributions = async () => {
  try {
    const res = await axios.get(`http://localhost:5000/api/contributions/user/${user.email}`)
    const contribs = Array.isArray(res.data) ? res.data : [res.data]

    const issuesRes = await axios.get(`http://localhost:5000/api/issues`)
    const issues = issuesRes.data

    const contributionsWithCategory = contribs.map(c => {
      const issue = issues.find(i => i._id === c.issueId)
      return { ...c, category: issue?.category || "N/A" }
    })

    setContributions(contributionsWithCategory)
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

  if (loading) return <div className="mt-24 text-center text-gray-600">Loading...</div>
  if (!contributions.length) return <div className="mt-24 text-center text-gray-600">No contributions yet</div>

  return (
    <div className="max-w-6xl mx-auto p-6 mt-24">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 uppercase text-center">My Contributions</h2>

      {/* Desktop Table */}
      <div className="overflow-x-auto hidden md:block">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Issue Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Paid Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Download</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {contributions.map(c => (
              <tr key={c._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <td className="px-6 py-4 whitespace-nowrap">{c.issueTitle}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">{c.category || "N/A"}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">${c.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(c.date).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
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

      <div className="mt-4 space-y-4 md:hidden">
        {contributions.map(c => (
          <div key={c._id} className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 flex flex-col gap-2">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">{c.issueTitle}</h3>
            <p className="text-gray-500 text-sm">
              <span className="font-semibold">Category:</span> {c.category || "N/A"}
            </p>
            <p className="text-gray-500 text-sm">
              <span className="font-semibold">Amount Paid:</span> ${c.amount}
            </p>
            <p className="text-gray-500 text-sm">
              <span className="font-semibold">Date:</span> {new Date(c.date).toLocaleDateString()}
            </p>
            <button
              className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition mt-2"
              onClick={() => handleDownload(c)}
            >
              Download PDF
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
