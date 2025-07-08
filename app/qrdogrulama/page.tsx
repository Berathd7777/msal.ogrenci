"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowLeft, Camera, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function QRDogrulamaPage() {
  const [isScanning, setIsScanning] = useState(false)
  const [isApproved, setIsApproved] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [jsQRLoaded, setJsQRLoaded] = useState(false)
  const [videoReady, setVideoReady] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const scanningRef = useRef<boolean>(false)
  const intervalRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    // jsQR kütüphanesini yükle
    const script = document.createElement("script")
    script.src = "https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.js"
    script.onload = () => setJsQRLoaded(true)
    script.onerror = () => setError("QR kod okuyucu yüklenemedi")
    document.head.appendChild(script)

    return () => {
      cleanup()
      try {
        document.head.removeChild(script)
      } catch (e) {
        // Script zaten kaldırılmış
      }
    }
  }, [])

  const cleanup = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
  }

  const startScanning = async () => {
    if (!jsQRLoaded) {
      setError("QR kod okuyucu henüz yüklenmedi")
      return
    }

    try {
      setError(null)
      setVideoReady(false)
      cleanup()

      // Kamera stream'i al
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: "environment" },
          width: { ideal: 1920, min: 640 },
          height: { ideal: 1080, min: 480 },
          frameRate: { ideal: 30, min: 15 },
        },
      })

      streamRef.current = stream

      if (videoRef.current) {
        // Video element'i ayarla
        videoRef.current.srcObject = stream
        videoRef.current.setAttribute("playsinline", "true")
        videoRef.current.setAttribute("muted", "true")
        videoRef.current.setAttribute("autoplay", "true")

        // Video hazır olduğunda
        const handleVideoReady = async () => {
          if (videoRef.current && streamRef.current) {
            try {
              await videoRef.current.play()
              setVideoReady(true)
              setIsScanning(true)
              scanningRef.current = true
              startQRScan()
            } catch (playError) {
              setError("Video başlatılamadı")
            }
          }
        }

        // Event listener'ları ekle
        videoRef.current.addEventListener("loadedmetadata", handleVideoReady)
        videoRef.current.addEventListener("canplay", handleVideoReady)

        // Fallback - 2 saniye sonra zorla başlat
        setTimeout(() => {
          if (!videoReady && videoRef.current) {
            handleVideoReady()
          }
        }, 2000)
      }
    } catch (err) {
      let errorMessage = "Kamera erişimi başarısız"

      if (err instanceof Error) {
        switch (err.name) {
          case "NotAllowedError":
            errorMessage = "Kamera izni reddedildi. Lütfen tarayıcı ayarlarından kamera iznini verin."
            break
          case "NotFoundError":
            errorMessage = "Kamera bulunamadı."
            break
          case "NotReadableError":
            errorMessage = "Kamera başka bir uygulama tarafından kullanılıyor."
            break
          case "OverconstrainedError":
            errorMessage = "Kamera ayarları desteklenmiyor."
            break
          default:
            errorMessage = `Kamera hatası: ${err.message}`
        }
      }

      setError(errorMessage)
      setIsScanning(false)
      scanningRef.current = false
    }
  }

  const stopScanning = () => {
    setIsScanning(false)
    setVideoReady(false)
    scanningRef.current = false
    cleanup()
  }

  const startQRScan = () => {
    if (!videoRef.current || !canvasRef.current || !window.jsQR) return

    // Yüksek frekanslı tarama (60 FPS)
    intervalRef.current = setInterval(() => {
      if (!scanningRef.current || !videoRef.current || !canvasRef.current) return

      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")

      if (!context || video.readyState !== video.HAVE_ENOUGH_DATA) return

      try {
        // Canvas boyutlarını video boyutlarına ayarla
        const { videoWidth, videoHeight } = video
        canvas.width = videoWidth
        canvas.height = videoHeight

        // Video frame'ini canvas'a çiz
        context.drawImage(video, 0, 0, videoWidth, videoHeight)

        // Image data'yı al
        const imageData = context.getImageData(0, 0, videoWidth, videoHeight)

        // QR kod ara - çoklu deneme ile
        const qrCode = window.jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "attemptBoth",
        })

        if (qrCode && qrCode.data) {
          checkQRContent(qrCode.data)
        }
      } catch (err) {
        // Tarama hatası - sessizce devam et
      }
    }, 16) // ~60 FPS (16ms interval)
  }

  const checkQRContent = (content: string) => {
    const validTexts = ["𝕄𝐒🝗𝒍⁰𝓧", "MSAL_AUTH", "msal-auth", "MSAL-OGRENCI", "msal-ogrenci"]
    const isValid = validTexts.some((text) => content.toLowerCase().includes(text.toLowerCase()))

    if (isValid) {
      setIsApproved(true)
      stopScanning()

      setTimeout(() => {
        window.open("https://github.com/Berathd7777/msal.ogrenci/releases/download/4.3/msal4.3-9d.apk", "_blank")
        window.location.href = "/"
      }, 2000)
    } else {
      setError("Geçersiz QR kod. Lütfen yetkili QR kodunu okutunuz.")
      stopScanning()
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b p-4">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Geri
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">QR Doğrulama</h1>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4">
        {!isScanning && !isApproved && (
          <div className="text-center space-y-6 max-w-md">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Yetkiliden QR kodu okutunuz</p>
              <div className="w-64 h-64 border-2 border-dashed border-muted-foreground/30 rounded-lg flex items-center justify-center mx-auto">
                <Camera className="h-16 w-16 text-muted-foreground/50" />
              </div>
            </div>

            <Button onClick={startScanning} className="w-full" disabled={!jsQRLoaded}>
              <Camera className="h-4 w-4 mr-2" />
              {jsQRLoaded ? "QR Kod Okutmaya Başla" : "QR Okuyucu Yükleniyor..."}
            </Button>
          </div>
        )}

        {isScanning && (
          <div className="text-center space-y-4 max-w-md">
            <p className="text-sm text-muted-foreground">
              {videoReady ? "QR kodu kamera görüş alanına getirin" : "Kamera başlatılıyor..."}
            </p>

            <div className="relative">
              <video
                ref={videoRef}
                className="w-80 h-80 object-cover rounded-lg border-2 border-primary bg-black"
                playsInline
                muted
                autoPlay
                style={{
                  transform: "scaleX(-1)", // Ayna efekti
                }}
              />
              <canvas ref={canvasRef} className="hidden" />

              {/* Tarama çerçevesi */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Köşe işaretleri */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-white shadow-lg"></div>
                <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-white shadow-lg"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-white shadow-lg"></div>
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-white shadow-lg"></div>

                {/* Tarama çizgisi */}
                <div className="absolute inset-x-8 top-1/2 h-1 bg-white shadow-lg animate-pulse"></div>

                {/* Merkez kare */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-white/50 rounded-lg"></div>
              </div>

              {/* Yükleme göstergesi */}
              {!videoReady && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                  <div className="text-white text-center">
                    <Camera className="h-8 w-8 mx-auto mb-2 animate-pulse" />
                    <p className="text-sm">Kamera başlatılıyor...</p>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">
                {videoReady ? "QR kodu merkez kareye hizalayın" : "Lütfen bekleyin..."}
              </p>
              <Button onClick={stopScanning} variant="outline">
                Taramayı Durdur
              </Button>
            </div>
          </div>
        )}

        {isApproved && (
          <div className="text-center space-y-4 max-w-md">
            <div className="flex flex-col items-center space-y-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-green-600">Onaylandı!</h2>
                <p className="text-sm text-muted-foreground">
                  QR kod başarıyla doğrulandı. APK indirme sayfasına yönlendiriliyorsunuz...
                </p>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="text-center space-y-4 max-w-md">
            <div className="rounded-md bg-destructive/15 p-4 border border-destructive/20">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-4 w-4 text-destructive" />
                <span className="font-medium text-destructive">Hata</span>
              </div>
              <p className="text-destructive text-sm">{error}</p>
            </div>
            <Button
              onClick={() => {
                setError(null)
                startScanning()
              }}
              variant="outline"
            >
              Tekrar Dene
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}
