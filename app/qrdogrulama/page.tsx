"use client"

import { useState, useEffect, useRef } from "react"
import { ArrowLeft, Camera, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function QRDogrulamaPage() {
  const [isScanning, setIsScanning] = useState(false)
  const [isApproved, setIsApproved] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const scannerRef = useRef<any>(null)

  useEffect(() => {
    return () => {
      // Cleanup
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
      if (scannerRef.current) {
        scannerRef.current.destroy()
      }
    }
  }, [])

  const startScanning = async () => {
    try {
      setError(null)
      setIsScanning(true)

      // Dinamik import - bu build sorununu çözer
      const QrScanner = (await import("qr-scanner")).default

      if (!videoRef.current) {
        throw new Error("Video element bulunamadı")
      }

      // QR Scanner başlat
      scannerRef.current = new QrScanner(
        videoRef.current,
        (result) => {
          console.log("QR kod bulundu:", result.data)
          checkQRContent(result.data)
        },
        {
          onDecodeError: (error) => {
            // Sürekli decode hatalarını görmezden gel
            console.debug("QR decode error:", error)
          },
          preferredCamera: "environment", // Arka kamera
          highlightScanRegion: true,
          highlightCodeOutline: true,
          maxScansPerSecond: 5,
        },
      )

      // Kamera başlat
      await scannerRef.current.start()
    } catch (err: any) {
      console.error("Camera error:", err)
      setError("Kamera erişimi reddedildi: " + (err.message || "Bilinmeyen hata"))
      setIsScanning(false)
    }
  }

  const stopScanning = () => {
    setIsScanning(false)

    if (scannerRef.current) {
      scannerRef.current.stop()
      scannerRef.current.destroy()
      scannerRef.current = null
    }
  }

  const checkQRContent = (content: string) => {
    // Burada QR kod içeriğini kontrol et
    // Örnek: İçerik belirli bir formata uygun mu?
    if (content.startsWith("https://example.com/")) {
      setIsApproved(true)
      stopScanning()
    } else {
      setError("Geçersiz QR kod içeriği")
      setIsApproved(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex items-center justify-start w-full max-w-md mb-8">
        <Link href="/" className="text-blue-500 hover:underline">
          <ArrowLeft className="mr-2 inline-block" size={20} />
          Geri
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-4">QR Kod Doğrulama</h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {isApproved ? (
        <div className="text-green-500 flex items-center">
          <CheckCircle className="mr-2" />
          Doğrulama Başarılı!
        </div>
      ) : (
        <>
          <div className="relative w-64 h-64 overflow-hidden rounded-lg mb-4">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              style={{ display: isScanning ? "block" : "none" }}
            ></video>
            {!isScanning && (
              <div className="absolute inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                <Camera className="text-white" size={48} />
              </div>
            )}
          </div>

          {isScanning ? (
            <Button onClick={stopScanning} variant="destructive">
              Durdur
            </Button>
          ) : (
            <Button onClick={startScanning}>
              <Camera className="mr-2" size={16} />
              Tara
            </Button>
          )}
        </>
      )}
    </div>
  )
}
