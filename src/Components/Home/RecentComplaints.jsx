import React, { useEffect, useState } from "react"
import axios from "axios"
import IssueCard from "../Global/IssueCard"
import { NavLink } from "react-router"
import Spinner from "../Global/Spinner"

export default function RecentComplaints() {
  const [issues, setIssues] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/issues/latest") 
      .then(res => {
        setIssues(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  if (loading) return <p className="text-center py-10"><Spinner></Spinner></p>

  return (
    <div className="max-w-7xl mx-auto px-5 py-16">
      <h2 className="text-3xl md:text-4xl uppercase font-bold text-center mb-10">
        Recent <span className="text-primary">Complaints</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {issues.map(issue => (
          <IssueCard key={issue._id} issue={issue} />
        ))}
</div>
        <div className="flex mt-14 justify-center items-center w-full">        <NavLink className='mt-auto text-center btn btn-primary'>See All</NavLink>

      </div>
    </div>
  )
}
