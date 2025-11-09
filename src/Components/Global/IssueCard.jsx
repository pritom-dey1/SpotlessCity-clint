import React from "react"
import { Link } from "react-router" 

export default function IssueCard({ issue }) {
  return (
    <div className="bg-base-100 shadow-md rounded-lg p-5 flex flex-col justify-between">
      <img
        src={issue.image || "https://via.placeholder.com/400x200"}
        alt={issue.title}
        className="w-full h-40 object-cover rounded-lg mb-4"
      />
      <h3 className="text-xl font-semibold mb-1 text-base-content">{issue.title}</h3>
      <p className="text-base-content/70 text-sm mb-2">
        {issue.description.length > 80
          ? issue.description.slice(0, 80) + "..."
          : issue.description}
      </p>
      <p className="text-primary font-medium mb-2">{issue.category}</p>
      <p className="text-base-content/60 text-sm mb-4">{issue.location}</p>
      <Link
        to={`/issues/${issue._id}`}
        className="mt-auto text-center btn btn-primary px-3 py-2 rounded-md transition"
      >
        See Details
      </Link>
    </div>
  )
}