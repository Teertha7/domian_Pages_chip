"use client"

import React, { useState, useRef } from "react"
import { motion } from "framer-motion"

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const gridRef = useRef(null)

  const TransistorPattern = ({ opacity }) => (
    <div className="absolute inset-0 p-1">
      <div className="w-full h-full relative">
        {/* Circuit traces */}
        <div className="absolute top-1 left-1 right-1 h-px bg-gray-600" style={{ opacity: 0.15 + opacity * 0.1 }} />
        <div className="absolute bottom-1 left-1 right-1 h-px bg-gray-600" style={{ opacity: 0.15 + opacity * 0.1 }} />
        <div className="absolute top-1 bottom-1 left-1 w-px bg-gray-600" style={{ opacity: 0.15 + opacity * 0.1 }} />
        <div className="absolute top-1 bottom-1 right-1 w-px bg-gray-600" style={{ opacity: 0.15 + opacity * 0.1 }} />

        {/* Internal circuit patterns - 3x3 grid of squares */}
        <div className="absolute top-2 left-2 right-2 bottom-2 grid grid-cols-3 gap-px">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="bg-gray-700" style={{ opacity: 0.1 + opacity * 0.1 }} />
          ))}
        </div>

        {/* Additional rectangular transistor elements */}
        <div className="absolute top-3 left-3 w-2 h-px bg-gray-600" style={{ opacity: 0.15 + opacity * 0.1 }} />
        <div className="absolute top-4 left-3 w-2 h-px bg-gray-600" style={{ opacity: 0.15 + opacity * 0.1 }} />
        <div className="absolute top-3 right-3 w-2 h-px bg-gray-600" style={{ opacity: 0.15 + opacity * 0.1 }} />
      </div>
    </div>
  )

  const getRandomRainbowGradient = (opacity) => {
    const gradients = [
      `linear-gradient(45deg, rgba(147, 51, 234, ${opacity * 0.6}), rgba(59, 130, 246, ${opacity * 0.6}), rgba(16, 185, 129, ${opacity * 0.6}))`,
      `linear-gradient(135deg, rgba(236, 72, 153, ${opacity * 0.6}), rgba(147, 51, 234, ${opacity * 0.6}), rgba(59, 130, 246, ${opacity * 0.6}))`,
      `linear-gradient(90deg, rgba(59, 130, 246, ${opacity * 0.6}), rgba(147, 51, 234, ${opacity * 0.6}), rgba(236, 72, 153, ${opacity * 0.6}))`,
      `linear-gradient(180deg, rgba(16, 185, 129, ${opacity * 0.6}), rgba(59, 130, 246, ${opacity * 0.6}), rgba(147, 51, 234, ${opacity * 0.6}))`,
    ]
    return gradients[Math.floor(Math.random() * gradients.length)]
  }

  const getGridItemProps = (index) => {
    const row = Math.floor(index / 20)
    const col = index % 20
    const gridRect = gridRef.current?.getBoundingClientRect()

    if (!gridRect) return { opacity: 0, shouldShow: false }

    const cellSize = gridRect.width / 20
    const cellCenterX = col * cellSize + cellSize / 2
    const cellCenterY = row * cellSize + cellSize / 2

    const distance = Math.sqrt(Math.pow(mousePos.x - cellCenterX, 2) + Math.pow(mousePos.y - cellCenterY, 2))

    const maxDistance = cellSize * 3
    const opacity = Math.max(0, 1 - distance / maxDistance)

    return {
      opacity: opacity * 0.3,
      shouldShow: opacity > 0.05,
    }
  }

  const handleMouseMove = (e) => {
    const rect = gridRef.current?.getBoundingClientRect()
    if (rect) {
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <div ref={gridRef} className="grid grid-cols-20 gap-px min-h-screen" onMouseMove={handleMouseMove}>
        {Array.from({ length: 400 }).map((_, i) => {
          const { opacity, shouldShow } = getGridItemProps(i)

          return (
            <motion.div
              key={i}
              className="bg-black aspect-square cursor-crosshair relative"
              animate={{
                background: shouldShow ? getRandomRainbowGradient(opacity) : "#000000",
                scale: shouldShow ? 1 + opacity * 0.05 : 1,
                transition: { duration: 0.2 },
              }}
            >
              {shouldShow && <TransistorPattern opacity={opacity} />}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
