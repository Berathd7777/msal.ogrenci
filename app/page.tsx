"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { BookOpen, Calendar, ChevronRight, Download, FileText, Search, Users, Tag, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { UpdateNotesPopup } from "@/components/update-notes-popup"

// Ana ekrana ekleme hatırlatıcı popup
function AddToHomePopup({
  isOpen,
  platform,
  onContinue,
  onClose,
}: {
  isOpen: boolean
  platform: "android" | "ios"
  onContinue: () => void
  onClose: () => void
}) {
  const [countdown, setCountdown] = useState(5)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      setCountdown(5)
      setReady(false)
      return
    }
    setCountdown(5)
    setReady(false)
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          setReady(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-background rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-5 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
          aria-label="Kapat"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 text-blue-600 mx-auto mb-2">
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </div>
          <h2 className="text-xl font-bold">Ana Ekrana Ekleyin</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Uygulamaya erişmek için web sayfasını <strong>ana ekrana eklemeniz gerekmektedir.</strong>
          </p>
          {platform === "ios" ? (
            <p className="text-xs text-muted-foreground bg-muted rounded-lg p-3 mt-2">
              Safari&apos;de sayfayı açın, alttaki paylaş simgesine dokunun ve <strong>&quot;Ana Ekrana Ekle&quot;</strong> seçeneğini seçin.
            </p>
          ) : (
            <p className="text-xs text-muted-foreground bg-muted rounded-lg p-3 mt-2">
              Tarayıcı menüsünden <strong>&quot;Ana Ekrana Ekle&quot;</strong> veya <strong>&quot;Uygulamayı Yükle&quot;</strong> seçeneğini seçin.
            </p>
          )}
        </div>

        <Button
          className="w-full"
          disabled={!ready}
          onClick={onContinue}
        >
          {ready ? "Devam Et" : `Devam Et (${countdown})`}
        </Button>
      </div>
    </div>
  )
}

export default function Home() {
  const [isUpdateNotesOpen, setIsUpdateNotesOpen] = useState(false)
  const [isAddToHomeOpen, setIsAddToHomeOpen] = useState(false)
  const [currentPlatform, setCurrentPlatform] = useState<"android" | "ios">("android")
  const [latestVersion, setLatestVersion] = useState("4.3")

  useEffect(() => {
    const fetchLatestRelease = async () => {
      try {
        const response = await fetch("https://api.github.com/repos/Berathd7777/msal.ogrenci/releases/latest")
        const data = await response.json()
        const version = data.tag_name
        setLatestVersion(version)
      } catch (error) {
        console.error("GitHub sürüm bilgisi çekme hatası:", error)
      }
    }
    fetchLatestRelease()
  }, [])

  const handleAndroidButtonClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setCurrentPlatform("android")
    setIsAddToHomeOpen(true)
  }

  const handleAppleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setCurrentPlatform("ios")
    setIsAddToHomeOpen(true)
  }

  const handleAddToHomeContinue = () => {
    setIsAddToHomeOpen(false)
    window.open("https://msalweb.vercel.app", "_blank")
  }

  const handleAddToHomeClose = () => {
    setIsAddToHomeOpen(false)
  }

  const handleUpdateNotesClick = () => {
    setIsUpdateNotesOpen(true)
  }

  const handleUpdateNotesClose = () => {
    setIsUpdateNotesOpen(false)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rounded-in-photoretrica%20%284%29-u6Yox6ZWzjPyIcrgivt5FqpFEG15n3.png"
              alt="MSAL Öğrenci Logo"
              width={40}
              height={40}
              className="rounded-md"
            />
            <span className="text-xl font-bold">MSAL Öğrenci</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary">
              Özellikler
            </Link>
            <Link href="/hocanet" className="text-sm font-medium hover:text-primary">
              HocaNet
            </Link>
            <Link href="#screenshots" className="text-sm font-medium hover:text-primary">
              Ekran Görüntüleri
            </Link>
            <Link href="#download" className="text-sm font-medium hover:text-primary">
              İndir
            </Link>
          </nav>
          <Link href="#download">
            <Button>İndir</Button>
          </Link>
        </div>
      </header>
      <main className="flex-1">
        <section className="container py-12 md:py-24 lg:py-32">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-center space-y-4">
              <div className="flex justify-center md:justify-start mb-6">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rounded-in-photoretrica%20%284%29-u6Yox6ZWzjPyIcrgivt5FqpFEG15n3.png"
                  alt="MSAL Öğrenci Logo"
                  width={100}
                  height={100}
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  MSAL Öğrenci ile Eğitim Hayatınızı Kolaylaştırın
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Ders programınızı takip edin, ödevlerinizi yönetin ve okul hayatınızı düzenleyin. MSAL Öğrenci
                  uygulaması ile her şey elinizin altında.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="#download">
                  <Button size="lg" className="gap-2">
                    <Download className="h-5 w-5" />
                    İndir • Sürüm {latestVersion}
                  </Button>
                </Link>
                <Link href="#features">
                  <Button size="lg" variant="outline" className="gap-2 bg-transparent">
                    Özellikleri Keşfet
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="gap-2 bg-transparent" onClick={handleUpdateNotesClick}>
                  <Tag className="h-4 w-4" />
                  Güncelleme Notları
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[600px] w-[300px] overflow-hidden rounded-[40px] border-8 border-gray-800 shadow-xl">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_2025-10-21-18-02-56-671_com.hbk.msalrenci-Cgf6rPov7Fa2E3g8AHsnHh4GghunUz.jpg"
                  alt="MSAL Öğrenci Uygulaması Ana Ekran"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="bg-muted py-12 md:py-24 lg:py-32">
          <div className="container space-y-12">
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Özellikler</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                MSAL Öğrenci uygulaması, öğrencilerin eğitim hayatını kolaylaştırmak için tasarlanmış birçok özellik
                sunar.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
                <div className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">Ödevler</h3>
                <p className="text-center text-muted-foreground">
                  Ödevlerinizi takip edin, tarihleri görüntüleyin ve zamanında tamamlayın.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
                <div className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center">
                  <Search className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">E-Cevap</h3>
                <p className="text-center text-muted-foreground">
                  Ders kitaplarının cevaplarına kolayca erişin ve çalışmalarınızı kontrol edin.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
                <div className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">Öğrenci Bilgi Sistemi</h3>
                <p className="text-center text-muted-foreground">
                  Öğrenci bilgilerinize erişin ve okul sistemindeki bilgilerinizi görüntüleyin.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
                <div className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">Yazılı Tarihleri</h3>
                <p className="text-center text-muted-foreground">
                  Yaklaşan sınav tarihlerini görüntüleyin ve sınavlarınıza hazırlanın.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
                <div className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">Yazılı Örnekleri</h3>
                <p className="text-center text-muted-foreground">
                  Geçmiş sınav örneklerini inceleyin ve sınavlara daha iyi hazırlanın.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
                <div className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">Ders Programı</h3>
                <p className="text-center text-muted-foreground">
                  Haftalık ders programınızı görüntüleyin ve günlük derslerinizi takip edin.
                </p>
              </div>
              <div
                className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => (window.location.href = "/hocanet")}
              >
                <div className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">HocaNet</h3>
                <p className="text-center text-muted-foreground">
                  Alanında uzman hocaların konu anlatım ve soru çözüm videolarına ulaşın.
                </p>
              </div>
            </div>

            {/* E-Cevap with Google Gemini */}
            <div className="mt-16 flex justify-center">
              <div className="relative w-full max-w-[900px] mx-auto">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Yaz%C4%B1l%C4%B1%20%C3%96rnekleri%20eklendi%20kopyas%C4%B1_20251024_191536_0000-JCYV6F50bsfV4XTpoEr0m1pCX6VyGX.png"
                  alt="E-Cevap with Google Gemini"
                  width={900}
                  height={600}
                  className="object-contain rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="screenshots" className="py-12 md:py-24 lg:py-32">
          <div className="container space-y-12">
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ekran Görüntüleri</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                MSAL Öğrenci uygulamasının kullanıcı dostu arayüzünü keşfedin.
              </p>
            </div>
            <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scroll-px-6 scrollbar-hide">
              <div className="min-w-[250px] snap-center flex-shrink-0">
                <div className="relative h-[500px] w-[250px] overflow-hidden rounded-[30px] border-4 border-gray-800 shadow-lg">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_2025-10-21-18-02-56-671_com.hbk.msalrenci-Cgf6rPov7Fa2E3g8AHsnHh4GghunUz.jpg"
                    alt="MSAL Öğrenci Uygulaması Ana Ekran"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-center mt-2 font-medium">Ana Ekran</p>
              </div>
              <div className="min-w-[250px] snap-center flex-shrink-0">
                <div className="relative h-[500px] w-[250px] overflow-hidden rounded-[30px] border-4 border-gray-800 shadow-lg">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_2025-10-21-18-03-05-328_com.hbk.msalrenci-2iBpVbrsjekoN3i26md51r0WV51uaZ.jpg"
                    alt="MSAL Öğrenci Ödevler Ekranı"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-center mt-2 font-medium">Ödevler</p>
              </div>
              <div className="min-w-[250px] snap-center flex-shrink-0">
                <div className="relative h-[500px] w-[250px] overflow-hidden rounded-[30px] border-4 border-gray-800 shadow-lg">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_2025-10-21-18-04-16-036_com.hbk.msalrenci-G6gjGASy0ehZQpDJY7K95vwkMF0IFl.jpg"
                    alt="MSAL Öğrenci Öğrenci Bilgi"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-center mt-2 font-medium">Öğrenci Bilgi</p>
              </div>
              <div className="min-w-[250px] snap-center flex-shrink-0">
                <div className="relative h-[500px] w-[250px] overflow-hidden rounded-[30px] border-4 border-gray-800 shadow-lg">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_2025-10-21-18-03-23-119_com.hbk.msalrenci-HZBizEeIjUWFH028NZUcNYIZZr1Ujl.jpg"
                    alt="MSAL Öğrenci Yazılı Tarihleri Ekranı"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-center mt-2 font-medium">Yazılı Tarihleri</p>
              </div>
              <div className="min-w-[250px] snap-center flex-shrink-0">
                <div className="relative h-[500px] w-[250px] overflow-hidden rounded-[30px] border-4 border-gray-800 shadow-lg">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_2025-10-21-18-03-33-169_com.hbk.msalrenci-Tsm6jYxajvJJF48mhB8oERoBOumsY0.jpg"
                    alt="MSAL Öğrenci Ders Programı Ekranı"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-center mt-2 font-medium">Ders Programı</p>
              </div>
              <div className="min-w-[250px] snap-center flex-shrink-0">
                <div className="relative h-[500px] w-[250px] overflow-hidden rounded-[30px] border-4 border-gray-800 shadow-lg">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_2025-10-21-18-03-38-757_com.hbk.msalrenci-GtFWil93KPt4FXqRGMkkQjHmsgJLgE.jpg"
                    alt="MSAL Öğrenci HocaNet Ekranı"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-center mt-2 font-medium">HocaNet</p>
              </div>
              <div className="min-w-[250px] snap-center flex-shrink-0">
                <div className="relative h-[500px] w-[250px] overflow-hidden rounded-[30px] border-4 border-gray-800 shadow-lg">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_2025-10-21-18-03-43-980_com.hbk.msalrenci-wHXgsMokzfyfxKoIdfycY8cj1n9yFk.jpg"
                    alt="MSAL Öğrenci Haberler Ekranı"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-center mt-2 font-medium">Haberler</p>
              </div>
            </div>
          </div>
        </section>

        {/* Sürüm 5.0 Tanıtım Bölümü */}
        <section className="bg-muted py-12 md:py-20">
          <div className="container">
            <div className="flex flex-col md:flex-row items-center gap-10 justify-center">
              <div className="flex-shrink-0">
                <Image
                  src="/images/version-5.png"
                  alt="MSAL Öğrenci 5.0"
                  width={220}
                  height={160}
                  className="object-contain drop-shadow-xl"
                />
              </div>
              <div className="space-y-3 text-center md:text-left max-w-lg">
                <h2 className="text-3xl font-bold tracking-tight">Sürüm 5.0 Geliyor</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  MSAL Öğrenci <strong>5.0</strong> ile tamamen yenilenen web altyapısı sayesinde{" "}
                  <strong>daha hızlı bir deneyim</strong> sizi bekliyor. Android ve iOS fark etmeksizin tüm
                  cihazlardan anında erişim imkanı sunuluyor.
                </p>
                <Link href="#download">
                  <Button className="mt-2">Hemen Dene</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section
          id="download"
          className="bg-gradient-to-r from-purple-600 to-blue-500 text-white py-12 md:py-24 lg:py-32"
        >
          <div className="container space-y-8 text-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Hemen İndirin</h2>
              <p className="mx-auto max-w-[700px] md:text-xl">
                MSAL Öğrenci uygulamasını cihazınıza indirin ve eğitim hayatınızı kolaylaştırın.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <a href="#" onClick={handleAndroidButtonClick} className="w-full max-w-[240px]">
                <Button variant="secondary" size="lg" className="w-full gap-2">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className="h-5 w-5">
                    <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4483.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4483.9993.9993 0 .5511-.4483.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.2439 13.8533 7.8508 12 7.8508s-3.5902.3931-5.1367 1.0989L4.841 5.4467a.4161.4161 0 00-.5677-.1521.4157.4157 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3435-4.1021-2.6892-7.5743-6.0775-9.4396" />
                  </svg>
                  Android için Aç
                </Button>
              </a>
              <a href="#" onClick={handleAppleButtonClick} className="w-full max-w-[240px]">
                <Button variant="secondary" size="lg" className="w-full gap-2">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className="h-5 w-5">
                    <path d="M14.94,5.19A4.38,4.38,0,0,0,16,2,4.44,4.44,0,0,0,13,3.52,4.17,4.17,0,0,0,12,6.61,3.69,3.69,0,0,0,14.94,5.19Z" />
                    <path d="M17.46,12.63A4.51,4.51,0,0,1,19.62,8.82a4.66,4.66,0,0,0-3.66-2c-1.56-.16-3,.91-3.83.91s-2-.89-3.3-.87A4.92,4.92,0,0,0,4.69,9.39C2.93,12.45,4.24,17,6,19.47,6.8,20.68,7.8,22.05,9.12,22s1.75-.82,3.28-.82,2,.82,3.3.79,2.22-1.24,3.06-2.45a11,11,0,0,0,1.38-2.85A4.41,4.41,0,0,1,17.46,12.63Z" />
                  </svg>
                  iPhone için Aç
                </Button>
              </a>
            </div>
            <div className="pt-4">
              <p className="text-sm opacity-80">* Uygulamaya erişmek için web sayfasını ana ekrana eklemeniz gerekmektedir.</p>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rounded-in-photoretrica%20%284%29-u6Yox6ZWzjPyIcrgivt5FqpFEG15n3.png"
              alt="MSAL Öğrenci Logo"
              width={30}
              height={30}
              className="rounded-md"
            />
            <span className="text-lg font-semibold">MSAL Öğrenci</span>
          </div>
          <div className="flex items-center gap-4">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/works_with_android_badge_primary-gHChK5GCDjHeSvruJvkN2z7Aa2YBWv.png"
              alt="Works with Android"
              width={80}
              height={27}
              className="h-[27px] w-auto"
            />
            <Image
              src="/images/made-for-iphone.png"
              alt="Made for iPhone"
              width={80}
              height={27}
              className="h-[27px] w-auto"
            />
          </div>
          <div className="flex gap-4">
            <Link href="tel:+905518912600" className="text-sm text-muted-foreground hover:text-primary">
              İletişim
            </Link>
          </div>
        </div>
        <div className="container mt-4 text-center">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Hasan Berat Kaylan</p>
        </div>
      </footer>

      {/* Ana Ekrana Ekleme Hatırlatıcı Popup */}
      <AddToHomePopup
        isOpen={isAddToHomeOpen}
        platform={currentPlatform}
        onContinue={handleAddToHomeContinue}
        onClose={handleAddToHomeClose}
      />

      {/* Güncelleme Notları */}
      <UpdateNotesPopup isOpen={isUpdateNotesOpen} onClose={handleUpdateNotesClose} />

      {/* Elevenlabs Convai Widget */}
      <div className="fixed bottom-4 right-4 z-50">
        <elevenlabs-convai agent-id="hMGxEkIClltuMIQx3H0c"></elevenlabs-convai>
      </div>
    </div>
  )
}
