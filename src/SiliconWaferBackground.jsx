import React, { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"

const SiliconWaferBackground = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const gridRef = useRef(null)
  const gridSize = { rows: 23, cols: 23 }


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
    const row = Math.floor(index / gridSize.cols)
    const col = index % gridSize.cols
    const gridRect = gridRef.current?.getBoundingClientRect()

    if (!gridRect) return { opacity: 0, shouldShow: false }

    const cellSize = gridRect.width / gridSize.cols
    const cellCenterX = col * cellSize + cellSize / 2
    const cellCenterY = row * cellSize + cellSize / 2
    
    const distance = Math.sqrt(
      Math.pow(mousePos.x - cellCenterX, 2) + Math.pow(mousePos.y - cellCenterY, 2)
      
    )
    console.log(mousePos.x, mousePos.y);
    const maxDistance = cellSize * 3
    let opacity = Math.max(0, 1 - distance / maxDistance)

    opacity = opacity * 0.3
    const shouldShow = opacity > 0.05

    return {
      opacity,
      shouldShow,
    }
  }

  const TransistorPattern = ({ opacity }) => (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        padding: "4px",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
        }}
      >
        {/* Border traces */}
        <div
          style={{
            position: "absolute",
            top: "4px",
            left: "4px",
            right: "4px",
            height: "1px",
            backgroundColor: "#4b5563",
            opacity: 0.15 + opacity * 0.1,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "4px",
            left: "4px",
            right: "4px",
            height: "1px",
            backgroundColor: "#4b5563",
            opacity: 0.15 + opacity * 0.1,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "4px",
            bottom: "4px",
            left: "4px",
            width: "1px",
            backgroundColor: "#4b5563",
            opacity: 0.15 + opacity * 0.1,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "4px",
            bottom: "4px",
            right: "4px",
            width: "1px",
            backgroundColor: "#4b5563",
            opacity: 0.15 + opacity * 0.1,
          }}
        />

        {/* Inner 3x3 pattern */}
        <div
          style={{
            position: "absolute",
            top: "8px",
            left: "8px",
            right: "8px",
            bottom: "8px",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1px",
          }}
        >
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "#374151",
                opacity: 0.1 + opacity * 0.1,
              }}
            />
          ))}
        </div>

        {/* Extra small traces */}
        <div
          style={{
            position: "absolute",
            top: "12px",
            left: "12px",
            width: "8px",
            height: "1px",
            backgroundColor: "#4b5563",
            opacity: 0.15 + opacity * 0.1,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "16px",
            left: "12px",
            width: "8px",
            height: "1px",
            backgroundColor: "#4b5563",
            opacity: 0.15 + opacity * 0.1,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            width: "8px",
            height: "1px",
            backgroundColor: "#4b5563",
            opacity: 0.15 + opacity * 0.1,
          }}
        />
      </div>
    </div>
  )
  useEffect(() => {
  const handle = (e) => {
    if (!gridRef.current) return;
    const rect = gridRef.current.getBoundingClientRect();
    const relativeX = e.clientX - rect.left;
    const relativeY = e.clientY - rect.top;
    console.log("relative", relativeX, relativeY);
    setMousePos({ x: relativeX, y: relativeY });
  };

  window.addEventListener("mousemove", handle);
  return () => window.removeEventListener("mousemove", handle);
}, []);


  return (
  <div
    style={{
      width: "100vw",    // add this
    height: "100vh",   // instead of minHeight
    backgroundColor: "#000",
    overflow: "hidden",
    position: "fixed",
     
    }}
       // <-- move here
    
             // <-- attach ref to parent
  >
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${gridSize.cols}, 1fr)`,
        minHeight: "100vh",
      }}
      ref={gridRef}      
      
    >
      {Array.from({ length: gridSize.rows * gridSize.cols }).map((_, i) => {
        const { opacity, shouldShow } = getGridItemProps(i)

        return (
          <motion.div
            key={i}
            style={{
              aspectRatio: "1",
              cursor: "crosshair",
              position: "relative",
              overflow: "hidden",
            }}
            animate={{
              scale: shouldShow ? 1 + opacity * 0.05 : 1,
            }}
            transition={{ duration: 0.2 }}
          >
            {/* Gradient Layer */}
            {shouldShow && (
              <motion.div
                key={getRandomRainbowGradient(opacity)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                style={{
                  position: "absolute",
                  inset: 0,
                  background: getRandomRainbowGradient(opacity),
                }}
              />
            )}

            {/* Pattern */}
            {shouldShow && <TransistorPattern opacity={opacity} />}
          </motion.div>
        )
      })}
    </div>
  </div>
)

}

export default SiliconWaferBackground
