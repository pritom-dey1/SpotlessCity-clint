import React, { useEffect, useState } from "react"
import { FaUsers, FaCheckCircle, FaExclamationCircle, FaClipboardList } from "react-icons/fa"

export default function CommunityStats() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("https://city-server-sigma.vercel.app/api/stats")
        const data = await res.json()
        setStats(data)
      } catch (err) {
        console.error("Error fetching stats:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) return <p className="text-center py-10 text-base-content">Loading stats...</p>
  if (!stats) return <p className="text-center py-10 text-error">Failed to load stats</p>

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-3xl md:text-4xl uppercase font-bold text-center mb-12">
        Community <span className="text-primary">Stats</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {/* Registered Users */}
        <div className="bg-base-100 shadow-lg rounded-2xl p-8 hover:shadow-xl transition">
          <FaUsers className="text-4xl text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-base-content">{stats.totalUsers}</h3>
          <p className="text-base-content/70">Registered Users</p>
        </div>

        {/* Total Issues */}
        <div className="bg-base-100 shadow-lg rounded-2xl p-8 hover:shadow-xl transition">
          <FaClipboardList className="text-4xl text-info mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-base-content">{stats.totalIssues}</h3>
          <p className="text-base-content/70">Total Issues</p>
        </div>

        {/* Resolved */}
        <div className="bg-base-100 shadow-lg rounded-2xl p-8 hover:shadow-xl transition">
          <FaCheckCircle className="text-4xl text-success mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-base-content">{stats.resolved}</h3>
          <p className="text-base-content/70">Resolved</p>
        </div>

        {/* Pending */}
        <div className="bg-base-100 shadow-lg rounded-2xl p-8 hover:shadow-xl transition">
          <FaExclamationCircle className="text-4xl text-warning mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-base-content">{stats.pending}</h3>
          <p className="text-base-content/70">Pending</p>
        </div>
      </div>
    </div>
  )
}