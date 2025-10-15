"use client"

import { useState } from "react"
import { BookOpen, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function QRTestPage() {
  const [isOpening, setIsOpening] = useState(false)

  const handleOpenApp = () => {
    setIsOpening(true)

    // Try to open the app with custom URI scheme first
    const appUri = "msalogrenci://open"
    window.location.href = appUri

    // Fallback: try Android intent
    setTimeout(() => {
      const intent = `intent://open#Intent;scheme=msalogrenci;package=com.hbk.msalrenci;S.browser_fallback_url=${encodeURIComponent("https://msalogrenci.vercel.app/#download")};end`
      window.location.href = intent
    }, 500)

    // Final fallback after timeout - redirect to download page if app didn't open
    setTimeout(() => {
      window.location.href = "https://msalogrenci.vercel.app/#download"
      setIsOpening(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="p-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl">
            <BookOpen className="w-16 h-16 text-white" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-gray-900">Yardımcı Kaynaklar</h1>
          <p className="text-lg text-gray-600">
            Yazılı örnekleri, konu anlatım çıktıları ve testler için uygulamadaki{" "}
            <span className="font-semibold text-blue-600">Yardımcı Kaynaklar</span> kısmına bakın
          </p>
        </div>

        {/* Button */}
        <Button
          size="lg"
          onClick={handleOpenApp}
          disabled={isOpening}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-lg py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
        >
          {isOpening ? (
            <>
              <Smartphone className="w-5 h-5 mr-2 animate-pulse" />
              Uygulama Açılıyor...
            </>
          ) : (
            <>
              <Smartphone className="w-5 h-5 mr-2" />
              Uygulamaya Git
            </>
          )}
        </Button>

        {/* Info Text */}
        <p className="text-sm text-gray-500">Uygulama yüklü değilse indirme sayfasına yönlendirileceksiniz</p>
      </div>
    </div>
  )
}
