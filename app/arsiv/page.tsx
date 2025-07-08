"use client"

import { useState, useEffect } from "react"

export default function Page() {
  const [clickCount, setClickCount] = useState(0)
    const [showImage, setShowImage] = useState(false)

      const handleClick = () => {
          const newCount = clickCount + 1
              setClickCount(newCount)

                  if (newCount === 5) {
                        setShowImage(true)

                              // Tam ekran yap
                                    const elem = document.documentElement
                                          if (elem.requestFullscreen) {
                                                  elem.requestFullscreen()
                                                        } else if ((elem as any).webkitRequestFullscreen) {
                                                                (elem as any).webkitRequestFullscreen()
                                                                      } else if ((elem as any).mozRequestFullScreen) {
                                                                              (elem as any).mozRequestFullScreen()
                                                                                    } else if ((elem as any).msRequestFullscreen) {
                                                                                            (elem as any).msRequestFullscreen()
                                                                                                  }

                                                                                                        // Cihazı yatay moda döndür
                                                                                                              if (screen.orientation && screen.orientation.lock) {
                                                                                                                      screen.orientation.lock("landscape").catch(() => {})
                                                                                                                            }
                                                                                                                                }
                                                                                                                                  }

                                                                                                                                    useEffect(() => {
                                                                                                                                        document.body.style.margin = "0"
                                                                                                                                            document.body.style.backgroundColor = "white"
                                                                                                                                              }, [])

                                                                                                                                                return (
                                                                                                                                                    <div
                                                                                                                                                          style={{ width: "100vw", height: "100vh", cursor: "pointer" }}
                                                                                                                                                                onClick={handleClick}
                                                                                                                                                                    >
                                                                                                                                                                          {showImage && (
                                                                                                                                                                                  <img
                                                                                                                                                                                            src="https://i.hizliresim.com/5rpa78t.jpg"
                                                                                                                                                                                                      style={{
                                                                                                                                                                                                                  position: "fixed",
                                                                                                                                                                                                                              top: 0,
                                                                                                                                                                                                                                          left: 0,
                                                                                                                                                                                                                                                      width: "100vw",
                                                                                                                                                                                                                                                                  height: "100vh",
                                                                                                                                                                                                                                                                              objectFit: "cover",
                                                                                                                                                                                                                                                                                          transform: "rotate(90deg)",
                                                                                                                                                                                                                                                                                                      transformOrigin: "center"
                                                                                                                                                                                                                                                                                                                }}
                                                                                                                                                                                                                                                                                                                        />
                                                                                                                                                                                                                                                                                                                              )}
                                                                                                                                                                                                                                                                                                                                  </div>
                                                                                                                                                                                                                                                                                                                                    )
                                                                                                                                                                                                                                                                                                                                    }
