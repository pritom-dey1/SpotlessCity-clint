import React from "react"

const categories = [
  {
    name: "Garbage",
    description: "Report garbage buildup in your area.",
    emoji: "🗑️"
  },
  {
    name: "Illegal Construction",
    description: "Notify about unauthorized buildings or structures.",
    emoji: "🏗️"
  },
  {
    name: "Broken Public Property",
    description: "Report damaged benches, streetlights, or facilities.",
    emoji: "🚧"
  },
  {
    name: "Road Damage",
    description: "Report potholes, cracks, and other road issues.",
    emoji: "🛣️"
  }
]

export default function CategorySection() {
  return (
    <div className="max-w-7xl mx-auto px-5 py-16">
      <h2 className="text-3xl md:text-4xl uppercase font-bold text-center mb-10">
        Report By <span className="text-primary">Category</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="bg-base-100 shadow-md rounded-lg p-6 flex flex-col items-center text-center hover:scale-105 transition-transform"
          >
            <div className="text-5xl mb-4">{cat.emoji}</div>
            <h3 className="text-xl font-semibold mb-2 text-base-content">
              {cat.name}
            </h3>
            <p className="text-base-content/70 text-sm">{cat.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}