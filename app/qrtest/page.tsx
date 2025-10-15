"use client"

import { useState } from "react"
import { BookOpen, FileText, ClipboardCheck, Smartphone, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function QRTestPage() {
  const [isOpening, setIsOpening] = useState(false)

  const handleOpenApp = () => {
    setIsOpening(true)

    // Android deep link attempt
    const appScheme = "intent://msalogrenci/#Intent;scheme=https;package=com.hbk.msalrenci;end"

    // Create a hidden iframe to attempt opening the app
    const iframe = document.createElement("iframe")
    iframe.style.display = "none"
    iframe.src = appScheme
    document.body.appendChild(iframe)

    // Fallback after timeout
    setTimeout(() => {
      document.body.removeChild(iframe)
      // Redirect to download page if app didn't open
      window.location.href = "https://msalogrenci.vercel.app/#download"
      setIsOpening(false)
    }, 2500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-6">
              <BookOpen className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Yardımcı Kaynaklar
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Yazılı örnekleri, konu anlatım çıktıları ve testler için uygulamadaki{" "}
              <span className="font-semibold text-blue-600">Yardımcı Kaynaklar</span> kısmına bakın
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="border-2 hover:border-blue-300 transition-all hover:shadow-lg">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Yazılı Örnekleri</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Geçmiş yıllara ait yazılı sınav sorularına ve çözümlerine ulaşın
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-purple-300 transition-all hover:shadow-lg">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Konu Anlatımları</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Detaylı konu anlatımları ve ders notlarıyla çalışın
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-indigo-300 transition-all hover:shadow-lg">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                  <ClipboardCheck className="w-8 h-8 text-indigo-600" />
                </div>
                <CardTitle className="text-xl">Test Çözümleri</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center">
                  Kendinizi sınayabileceğiniz testler ve çözüm anahtarları
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* CTA Card */}
          <Card className="border-2 border-gradient-to-r from-blue-500 to-purple-500 shadow-xl">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-6">
                <Smartphone className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-2xl md:text-3xl mb-2">MSAL Öğrenci Uygulamasını Açın</CardTitle>
              <CardDescription className="text-base">
                Tüm kaynaklara ve daha fazlasına uygulama üzerinden erişebilirsiniz
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center pb-8">
              <Button
                size="lg"
                onClick={handleOpenApp}
                disabled={isOpening}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                {isOpening ? (
                  <>
                    <Download className="w-5 h-5 mr-2 animate-bounce" />
                    Uygulama Açılıyor...
                  </>
                ) : (
                  <>
                    <Smartphone className="w-5 h-5 mr-2" />
                    Uygulamaya Git
                  </>
                )}
              </Button>
              <p className="text-sm text-gray-500 mt-4 text-center max-w-md">
                Uygulama yüklü değilse otomatik olarak indirme sayfasına yönlendirileceksiniz
              </p>
            </CardContent>
          </Card>

          {/* Info Banner */}
          <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Uygulamada Neler Var?</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>✓ Güncel ders programı ve sınav tarihleri</li>
                  <li>✓ Interaktif ders materyalleri</li>
                  <li>✓ Çevrimdışı erişim imkanı</li>
                  <li>✓ Anlık bildirimler ve duyurular</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
