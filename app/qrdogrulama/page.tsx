"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowLeft, Camera, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function QRDogrulamaPage() {
  const [isScanning, setIsScanning] = useState(false)
  const [isApproved, setIsApproved] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [debugInfo, setDebugInfo] = useState<string>("")
  const [jsQRLoaded, setJsQRLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const scanningRef = useRef<boolean>(false)
  const animationRef = useRef<number>()

  useEffect(() => {
    // jsQR kütüphanesini yükle
    const loadJsQR = async () => {
      try {
        // Script'i dinamik olarak yükle
        if (!window.jsQR) {
          const script = document.createElement("script")
          script.src = "https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.js"

          const loadPromise = new Promise((resolve, reject) => {
            script.onload = resolve
            script.onerror = reject
          })

          document.head.appendChild(script)
          await loadPromise
        }

        setJsQRLoaded(true)
        setDebugInfo("jsQR kütüphanesi yüklendi")
      } catch (err) {
        setError("QR kod okuyucu yüklenemedi")
        setDebugInfo("jsQR yükleme hatası: " + err)
      }
    }

    loadJsQR()

    return () => {
      // Cleanup
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  const startScanning = async () => {
    if (!jsQRLoaded) {
      setError("QR kod okuyucu henüz yüklenmedi")
      return
    }

    try {
      setError(null)
      setDebugInfo("Kamera erişimi isteniyor...")

      // Önce mevcut stream'i durdur
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }

      const constraints = {
        video: {
          facingMode: { ideal: "environment" },
          width: { ideal: 1280, min: 640 },
          height: { ideal: 720, min: 480 },
        },
      }

      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      streamRef.current = stream
      setDebugInfo("Kamera stream'i alındı")

      if (videoRef.current) {
        videoRef.current.srcObject = stream

        // Video yüklenene kadar bekle
        await new Promise((resolve) => {
          if (videoRef.current) {
            videoRef.current.onloadedmetadata = resolve
            videoRef.current.play()
          }
        })

        setIsScanning(true)
        scanningRef.current = true
        setDebugInfo("Video başlatıldı, tarama başlıyor...")

        // Taramayı başlat
        startQRScan()
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Bilinmeyen hata"
      setError(`Kamera hatası: ${errorMsg}`)
      setDebugInfo(`Kamera hatası: ${errorMsg}`)
      setIsScanning(false)
      scanningRef.current = false
    }
  }

  const stopScanning = () => {
    setIsScanning(false)
    scanningRef.current = false

    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }

    setDebugInfo("Tarama durduruldu")
  }

  const startQRScan = () => {
    const scan = () => {
      if (!scanningRef.current || !videoRef.current || !canvasRef.current) {
        return
      }

      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext("2d")

      if (!context || !window.jsQR) {
        animationRef.current = requestAnimationFrame(scan)
        return
      }

      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        // Canvas boyutlarını video boyutlarına ayarla
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight

        // Video frame'ini canvas'a çiz
        context.drawImage(video, 0, 0, canvas.width, canvas.height)

        // Image data'yı al
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height)

        try {
          // QR kod ara
          const code = window.jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: "dontInvert",
          })

          if (code && code.data) {
            setDebugInfo(`QR kod bulundu: ${code.data.substring(0, 50)}...`)
            checkQRContent(code.data)
            return
          } else {
            // Debug için tarama durumunu göster
            setDebugInfo(`Taranıyor... (${canvas.width}x${canvas.height})`)
          }
        } catch (err) {
          setDebugInfo(`QR tarama hatası: ${err}`)
        }
      }

      // Sonraki frame'i tara
      animationRef.current = requestAnimationFrame(scan)
    }

    // İlk taramayı başlat
    animationRef.current = requestAnimationFrame(scan)
  }

  const checkQRContent = (content: string) => {
    setDebugInfo(`QR içeriği kontrol ediliyor: ${content}`)

    // Doğrulama metni kontrolü - daha esnek hale getir
    const validTexts = ["𝕄𝐒🝗𝒍⁰𝓧", "MSAL_AUTH", "msal-auth", "MSAL-OGRENCI", "msal-ogrenci"]

    const isValid = validTexts.some((text) => content.includes(text))

    if (isValid) {
      setIsApproved(true)
      stopScanning()
      setDebugInfo("QR kod onaylandı!")

      // 2 saniye sonra yönlendir
      setTimeout(() => {
        window.open("https://github.com/Berathd7777/msal.ogrenci/releases/download/4.3/msal4.3-9d.apk", "_blank")
        window.location.href = "/"
      }, 2000)
    } else {
      setError(`Geçersiz QR kod. Okunan içerik: "${content.substring(0, 100)}"`)
      setDebugInfo(`Geçersiz QR: ${content}`)
      stopScanning()
    }
  }

  // Test butonu - geliştirme için
  const testQR = () => {
    checkQRContent("𝕄𝐒🝗𝒍⁰𝓧")
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
        {/* Debug bilgileri */}
        {debugInfo && (
          <div className="mb-4 p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-800 max-w-md">
            <strong>Debug:</strong> {debugInfo}
          </div>
        )}

        {!isScanning && !isApproved && (
          <div className="text-center space-y-6 max-w-md">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Yetkiliden QR kodu okutunuz</p>
              <div className="w-64 h-64 border-2 border-dashed border-muted-foreground/30 rounded-lg flex items-center justify-center mx-auto">
                <Camera className="h-16 w-16 text-muted-foreground/50" />
              </div>
            </div>

            <div className="space-y-2">
              <Button onClick={startScanning} className="w-full" disabled={!jsQRLoaded}>
                <Camera className="h-4 w-4 mr-2" />
                {jsQRLoaded ? "QR Kod Okutmaya Başla" : "QR Okuyucu Yükleniyor..."}
              </Button>

              {/* Test butonu - geliştirme için */}
              <Button onClick={testQR} variant="outline" className="w-full text-xs bg-transparent">
                Test QR (Geliştirme)
              </Button>
            </div>
          </div>
        )}

        {isScanning && (
          <div className="text-center space-y-4 max-w-md">
            <p className="text-sm text-muted-foreground">QR kodu kamera görüş alanına getirin</p>
            <div className="relative">
              <video
                ref={videoRef}
                className="w-80 h-80 object-cover rounded-lg border bg-black"
                playsInline
                muted
                autoPlay
              />
              <canvas ref={canvasRef} className="hidden" />

              {/* Tarama çerçevesi */}
              <div className="absolute inset-0 border-2 border-primary rounded-lg pointer-events-none">
                <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-primary"></div>
                <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-primary"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-primary"></div>
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-primary"></div>

                {/* Tarama çizgisi */}
                <div className="absolute inset-x-8 top-1/2 h-0.5 bg-primary animate-pulse shadow-lg"></div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">QR kodu net bir şekilde görüntüleyin</p>
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
                setDebugInfo("")
                if (!isScanning) {
                  startScanning()
                }
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
