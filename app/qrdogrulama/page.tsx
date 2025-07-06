"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowLeft, Camera, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import jsQR from "jsqr"

export default function QRDogrulamaPage() {
  const [isScanning, setIsScanning] = useState(false)
  const [isApproved, setIsApproved] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  useEffect(() => {
    return () => {
      // Cleanup: kamera stream'ini kapat
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  const startScanning = async () => {
    try {
      setError(null)
      setIsScanning(true)

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }, // Arka kamera
      })

      streamRef.current = stream

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()

        // QR kod tarama işlemini başlat
        scanQRCode()
      }
    } catch (err) {
      setError("Kamera erişimi reddedildi veya mevcut değil")
      setIsScanning(false)
      console.error("Camera error:", err)
    }
  }

  const stopScanning = () => {
    setIsScanning(false)
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
  }

  const scanQRCode = () => {
    if (!videoRef.current || !canvasRef.current) return

    const video = videoRef.current
    const canvas = canvasRef.current
    const context = canvas.getContext("2d")

    if (!context) return

    const scan = () => {
      if (!isScanning) return

      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        context.drawImage(video, 0, 0, canvas.width, canvas.height)

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height)

        try {
          const code = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: "dontInvert",
          })

          if (code) {
            console.log("QR kod bulundu:", code.data)
            checkQRContent(code.data)
            return
          }
        } catch (err) {
          console.error("QR scanning error:", err)
        }
      }

      requestAnimationFrame(scan)
    }

    scan()
  }

  const checkQRContent = (content: string) => {
    console.log("QR içeriği kontrol ediliyor:", content)

    if (content.includes("𝕄𝐒🝗𝒍⁰𝓧")) {
      console.log("QR kod onaylandı!")
      setIsApproved(true)
      stopScanning()

      // 2 saniye sonra APK indirme sayfasına yönlendir
      setTimeout(() => {
        window.open("https://github.com/Berathd7777/msal.ogrenci/releases/download/4.3/msal4.3-9d.apk", "_blank")
        window.location.href = "/"
      }, 2000)
    } else {
      setError("Geçersiz QR kod. Lütfen yetkili QR kodunu okutunuz.")
      setTimeout(() => {
        setError(null)
        // Taramaya devam et
      }, 2000)
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

            <Button onClick={startScanning} className="w-full">
              <Camera className="h-4 w-4 mr-2" />
              QR Kod Okutmaya Başla
            </Button>
          </div>
        )}

        {isScanning && (
          <div className="text-center space-y-4 max-w-md">
            <p className="text-sm text-muted-foreground">QR kodu kamera görüş alanına getirin</p>
            <div className="relative">
              <video ref={videoRef} className="w-64 h-64 object-cover rounded-lg border" playsInline muted />
              <canvas ref={canvasRef} className="hidden" />
              <div className="absolute inset-0 border-2 border-primary rounded-lg pointer-events-none">
                <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-primary"></div>
                <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-primary"></div>
                <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-primary"></div>
                <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-primary"></div>
              </div>
            </div>
            <Button onClick={stopScanning} variant="outline">
              Taramayı Durdur
            </Button>
          </div>
        )}

        {isApproved && (
          <div className="text-center space-y-4 max-w-md">
            <div className="flex flex-col items-center space-y-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-green-600">Onaylandı</h2>
                <p className="text-sm text-muted-foreground">
                  QR kod başarıyla doğrulandı. APK indirme sayfasına yönlendiriliyorsunuz...
                </p>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="text-center space-y-4 max-w-md">
            <div className="rounded-md bg-destructive/15 p-4">
              <p className="text-destructive text-sm">{error}</p>
            </div>
            <Button onClick={() => setError(null)} variant="outline">
              Tekrar Dene
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}
