import React from "react"
import { motion } from "framer-motion"
import { FaHandsHelping } from "react-icons/fa"

export default function VolunteerCTA() {
  return (
    <section className="relative bg-gradient-to-r from-[#18ae50] to-green-600 text-white py-20 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1591076482161-2387d3f94d83?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20"></div>
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="relative max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-6"
        >
          <FaHandsHelping className="text-6xl" />
        </motion.div>

        <h2 className="text-4xl md:text-5xl font-bold mb-4 uppercase">
          Join Our Clean Drive
        </h2>

        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto">
          Become a part of our mission to build a cleaner, greener, and more sustainable community.
          Lend your hands, your time, and your voice to make a difference today!
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-green-700 font-semibold text-lg px-8 py-3 rounded-full shadow-md hover:bg-yellow-300 hover:text-black transition"
          onClick={() => alert("Thank you for joining! ❤️")}
        >
          Join Now
        </motion.button>
      </div>
    </section>
  )
}
