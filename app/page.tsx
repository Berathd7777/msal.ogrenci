"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { BookOpen, Calendar, ChevronRight, Download, FileText, Search, Users, Palette } from "lucide-react"

import { Button } from "@/components/ui/button"
import { IosPopup } from "@/components/ios-popup"
import { StudentVerificationPopup } from "@/components/student-verification-popup"
import { WelcomePopup } from "@/components/welcome-popup"

export default function Home() {
  const [isIosPopupOpen, setIsIosPopupOpen] = useState(false)
  const [isStudentVerificationOpen, setIsStudentVerificationOpen] = useState(false)
  const [isWelcomePopupOpen, setIsWelcomePopupOpen] = useState(false)
  const [currentPlatform, setCurrentPlatform] = useState<"android" | "ios">("android")
  const [verifiedStudentName, setVerifiedStudentName] = useState("")
  const [verifiedStudentClass, setVerifiedStudentClass] = useState<"9D" | "9E" | "">("")

  // Android indirme butonuna tıklandığında
  const handleAndroidButtonClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setCurrentPlatform("android")
    setIsStudentVerificationOpen(true)
  }

  // iOS indirme butonuna tıklandığında
  const handleAppleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setCurrentPlatform("ios")
    setIsStudentVerificationOpen(true)
  }

  // Öğrenci doğrulama başarılı olduğunda
  const handleVerificationSuccess = (studentName: string, studentClass: "9D" | "9E") => {
    setIsStudentVerificationOpen(false)
    setVerifiedStudentName(studentName)
    setVerifiedStudentClass(studentClass)
    setIsWelcomePopupOpen(true)
  }

  // Öğrenci doğrulama popup'ını kapat
  const handleVerificationClose = () => {
    setIsStudentVerificationOpen(false)
  }

  // Karşılama popup'ını kapat ve yönlendir
  const handleWelcomeClose = () => {
    setIsWelcomePopupOpen(false)

    if (currentPlatform === "android") {
      // Android için sınıfa göre doğru APK indirme bağlantısına yönlendir
      if (verifiedStudentClass === "9D") {
        window.open("https://github.com/Berathd7777/msal.ogrenci/releases/download/4.2/msal4.2-9d.apk", "_blank")
      } else if (verifiedStudentClass === "9E") {
        window.open("https://github.com/Berathd7777/msal.ogrenci/releases/download/4.2/msal4.2-9e.apk", "_blank")
      }
    } else {
      // iOS için kurulum talimatları popup'ını göster (sadece 9D için)
      setIsIosPopupOpen(true)
    }
  }

  // iOS kurulum talimatları popup'ını kapat
  const handleIosPopupClose = () => {
    setIsIosPopupOpen(false)
  }

  // iOS kurulum talimatları onaylandığında
  const handleIosPopupConfirm = () => {
    setIsIosPopupOpen(false)
    window.open("https://msalweb.vercel.app/", "_blank")
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
                    İndir • Sürüm 4.2
                  </Button>
                </Link>
                <Link href="#features">
                  <Button size="lg" variant="outline" className="gap-2">
                    Özellikleri Keşfet
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[600px] w-[300px] overflow-hidden rounded-[40px] border-8 border-gray-800 shadow-xl">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Resim%201.jpg-qe2We8HuGAvXNB8Ll0ZWTd4FsBQpeg.jpeg"
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
            </div>

            {/* Material Design 3 Özelliği */}
            <div className="mt-16">
              <div className="space-y-4 text-center mb-8">
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Yeni Tasarım: Material Design 3</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground">
                  MSAL Öğrenci uygulaması artık Google'ın en yeni tasarım dili Material Design 3 ile yenilendi. Daha
                  modern, daha kullanıcı dostu ve daha estetik bir deneyim için tasarlandı.
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-2 items-center">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-purple-500 flex items-center justify-center">
                      <Palette className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold">Dinamik Renk Teması</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Material You teknolojisi ile uygulama teması cihazınızın duvar kağıdına göre otomatik olarak uyum
                    sağlar.
                  </p>

                  <div className="flex items-center gap-3 mt-6">
                    <div className="h-10 w-10 rounded-full bg-purple-500 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-white"
                      >
                        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                        <path d="M19 3v4"></path>
                        <path d="M21 5h-4"></path>
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold">Aydınlık/Karanlık Mod</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Göz yorgunluğunu azaltmak için karanlık mod desteği ve otomatik tema değiştirme özelliği.
                  </p>

                  <div className="flex items-center gap-3 mt-6">
                    <div className="h-10 w-10 rounded-full bg-purple-500 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-white"
                      >
                        <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                        <path d="M9 14v1"></path>
                        <path d="M9 19v2"></path>
                        <path d="M9 3v2"></path>
                        <path d="M9 9v1"></path>
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold">Yeni Arayüz Bileşenleri</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Yuvarlak köşeler, gelişmiş animasyonlar ve daha iyi erişilebilirlik için yeniden tasarlanmış arayüz.
                  </p>
                </div>

                <div className="relative w-full max-w-[500px] mx-auto overflow-hidden rounded-lg">
                  <Image
                    src="/images/material-design-3.png"
                    alt="Material Design 3 Arayüzü"
                    width={500}
                    height={400}
                    className="object-contain"
                  />
                </div>
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
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Resim%201.jpg-qe2We8HuGAvXNB8Ll0ZWTd4FsBQpeg.jpeg"
                    alt="MSAL Öğrenci Ana Ekran"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-center mt-2 font-medium">Ana Ekran</p>
              </div>
              <div className="min-w-[250px] snap-center flex-shrink-0">
                <div className="relative h-[500px] w-[250px] overflow-hidden rounded-[30px] border-4 border-gray-800 shadow-lg">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Resim%202.jpg-9nGW2aUTnm1iZyBXjLbuxmqpkc5EXt.jpeg"
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
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Resim%203.jpg-LoWszhZcM0NmEyQf1nlvyGfCJiDVJn.jpeg"
                    alt="MSAL Öğrenci E-Cevap Ekranı"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-center mt-2 font-medium">E-Cevap</p>
              </div>
              <div className="min-w-[250px] snap-center flex-shrink-0">
                <div className="relative h-[500px] w-[250px] overflow-hidden rounded-[30px] border-4 border-gray-800 shadow-lg">
                  <Image
                    src="https://i.hizliresim.com/2da01ws.jpg"
                    alt="Öğrenci Bilgi Ekranı"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-center mt-2 font-medium">Öğrenci Bilgi</p>
              </div>
              <div className="min-w-[250px] snap-center flex-shrink-0">
                <div className="relative h-[500px] w-[250px] overflow-hidden rounded-[30px] border-4 border-gray-800 shadow-lg">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Resim%204.jpg-YGC8UaM7QTdGeHsvpkzLlJFbgqZnCw.jpeg"
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
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Resim%205.jpg-c5vAyCz9pjZUHsqGPrvjLwtD9Cep0n.jpeg"
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
                    src="/images/material-design-3.png"
                    alt="Material Design 3 Arayüzü"
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="text-center mt-2 font-medium">Material Design 3</p>
              </div>
              <div className="min-w-[100px] flex-shrink-0 snap-end"></div>
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
                    <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4483-.9993.9993-.9993c.5511 0 .9993.4483.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4483.9993.9993 0 .5511-.4483.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.2439 13.8533 7.8508 12 7.8508s-3.5902.3931-5.1367 1.0989L4.841 5.4467a.4161.4161 0 00-.5677-.1521.4157.4157 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3435-4.1021-2.6892-7.5743-6.0775-9.4396" />
                  </svg>
                  İndir • Sürüm 4.2
                </Button>
              </a>
              <a href="#" onClick={handleAppleButtonClick} className="w-full max-w-[240px]">
                <Button variant="secondary" size="lg" className="w-full gap-2">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className="h-5 w-5">
                    <path d="M14.94,5.19A4.38,4.38,0,0,0,16,2,4.44,4.44,0,0,0,13,3.52,4.17,4.17,0,0,0,12,6.61,3.69,3.69,0,0,0,14.94,5.19Z" />
                    <path d="M17.46,12.63A4.51,4.51,0,0,1,19.62,8.82a4.66,4.66,0,0,0-3.66-2c-1.56-.16-3,.91-3.83.91s-2-.89-3.3-.87A4.92,4.92,0,0,0,4.69,9.39C2.93,12.45,4.24,17,6,19.47,6.8,20.68,7.8,22.05,9.12,22s1.75-.82,3.28-.82,2,.82,3.3.79,2.22-1.24,3.06-2.45a11,11,0,0,0,1.38-2.85A4.41,4.41,0,0,1,17.46,12.63Z" />
                  </svg>
                  iPhone için İndir
                </Button>
              </a>
            </div>
            <div className="pt-4">
              <p className="text-sm opacity-80">* iOS uygulaması için web sayfasını ana ekrana ekleyin.</p>
              <p className="text-sm opacity-80 mt-2">
                * MSAL Öğrenci uygulaması Android 7.0 ve üzeri sürümlerde çalışmaktadır.
              </p>
              <p className="text-sm opacity-80 mt-2">* 9/D ve 9/E sınıfları için özel olarak geliştirilmiştir.</p>
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
              src="https://camo.githubusercontent.com/06ab6195fff7415040ca8ffd40c8b737d43d66182440f3e347139fa4b4836d2b/68747470733a2f2f6364736173736574732e6170706c652e636f6d2f6c6976652f37575541533335302f696d616765732f6d6164652d666f722d6970686f6e652e706e67"
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

      {/* Öğrenci Doğrulama Popup */}
      <StudentVerificationPopup
        isOpen={isStudentVerificationOpen}
        onClose={handleVerificationClose}
        onSuccess={handleVerificationSuccess}
        platform={currentPlatform}
      />

      {/* Karşılama Popup */}
      <WelcomePopup
        isOpen={isWelcomePopupOpen}
        onClose={handleWelcomeClose}
        studentName={verifiedStudentName}
        platform={currentPlatform}
      />

      {/* iOS Kurulum Talimatları Popup */}
      <IosPopup isOpen={isIosPopupOpen} onClose={handleIosPopupClose} onConfirm={handleIosPopupConfirm} />

      {/* Elevenlabs Convai Widget */}
      <div className="fixed bottom-4 right-4 z-50">
        <elevenlabs-convai agent-id="hMGxEkIClltuMIQx3H0c"></elevenlabs-convai>
      </div>
    </div>
  )
}
