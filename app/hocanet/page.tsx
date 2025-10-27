"use client"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, PlayCircle, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HocaNetPage() {
  const featuredTeachers = [
    {
      name: "FizikFinito",
      logo: "/images/hocanet/fizikfinito.png",
    },
    {
      name: "Coğrafyanın Kodları",
      logo: "/images/hocanet/cografyanin-kodlari.png",
    },
    {
      name: "Partikül Matematik",
      logo: "/images/hocanet/partikul-matematik.jpg",
    },
  ]

  const additionalChannels = [
    "/images/hocanet/channel1.png",
    "/images/hocanet/channel2.jpg",
    "/images/hocanet/channel3.jpg",
    "/images/hocanet/channel4.jpg",
    "/images/hocanet/channel5.jpg",
    "/images/hocanet/channel6.jpg",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-5 w-5" />
            <span className="font-semibold">Ana Sayfa</span>
          </Link>
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">HocaNet</span>
          </div>
        </div>
      </header>

      <main className="container py-12 md:py-24">
        {/* Hero Section */}
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mb-4">
            <PlayCircle className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            HocaNet
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Uzman hocaların ve Milli Eğitim Bakanlığı'nın konu anlatım videolarını{" "}
            <span className="font-bold text-green-600">ücretsiz</span> şekilde sunuyoruz.
          </p>
        </div>

        {/* Featured Teachers */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Hocalarımız</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {featuredTeachers.map((teacher, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-blue-100 group-hover:border-blue-300 transition-colors">
                    <Image src={teacher.logo || "/placeholder.svg"} alt={teacher.name} fill className="object-cover" />
                  </div>
                  <h3 className="text-xl font-bold text-center">{teacher.name}</h3>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
          <p className="text-center text-2xl font-semibold text-muted-foreground mt-12 mb-8">ve daha fazlası...</p>

          {/* Scrolling Channel Logos */}
          <div className="relative overflow-hidden py-8">
            <div className="relative">
              {/* Gradient Overlays */}
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white to-transparent z-10 pointer-events-none" />

              {/* Scrolling Container */}
              <div className="flex gap-8">
                <div className="flex gap-8 animate-scroll">
                  {additionalChannels
                    .concat(additionalChannels)
                    .concat(additionalChannels)
                    .map((logo, index) => (
                      <div
                        key={`scroll-${index}`}
                        className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-lg hover:scale-110 transition-transform"
                      >
                        <Image
                          src={logo || "/placeholder.svg"}
                          alt={`Kanal ${index + 1}`}
                          width={128}
                          height={128}
                          className="object-cover"
                        />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20 bg-white rounded-2xl p-12 shadow-xl">
          <h2 className="text-3xl font-bold mb-4">Uygulamada Keşfet</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Tüm video içeriklerine MSAL Öğrenci uygulaması üzerinden kolayca erişebilir, favori hocalarını takip
            edebilir ve öğrenme yolculuğuna devam edebilirsin.
          </p>
          <Link href="/#download">
            <Button size="lg" className="gap-2">
              <GraduationCap className="h-5 w-5" />
              Uygulamayı İndir
            </Button>
          </Link>
        </div>
      </main>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 3));
          }
        }

        .animate-scroll {
          animation: scroll 10s linear infinite;
          display: flex;
          gap: 2rem;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  )
}
