import React, { useEffect, useState } from "react"
import axios from "axios"
import { FaUsers, FaCheckCircle, FaExclamationCircle, FaClipboardList } from "react-icons/fa"

export default function CommunityStats() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/stats") // 
      .then(res => {
        setStats(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  if (loading) return <p className="text-center py-10">Loading stats...</p>

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-3xl md:text-4xl uppercase font-bold text-center mb-12">
        Community <span className="text-[#18ae50]">Stats</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-xl transition">
          <FaUsers className="text-4xl text-[#18ae50] mx-auto mb-4" />
          <h3 className="text-2xl font-bold">{stats.totalUsers}</h3>
          <p className="text-gray-600">Registered Users</p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-xl transition">
          <FaClipboardList className="text-4xl text-blue-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold">{stats.totalIssues}</h3>
          <p className="text-gray-600">Total Issues</p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-xl transition">
          <FaCheckCircle className="text-4xl text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold">{stats.resolved}</h3>
          <p className="text-gray-600">Resolved</p>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-8 hover:shadow-xl transition">
          <FaExclamationCircle className="text-4xl text-red-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold">{stats.pending}</h3>
          <p className="text-gray-600">Pending</p>
        </div>
      </div>
    </div>
  )
}
