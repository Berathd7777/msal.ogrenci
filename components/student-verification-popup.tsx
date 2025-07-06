"use client"

import { useState, useEffect } from "react"
import { X, Loader2, QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Öğrenci tipi tanımı
interface Student {
  no: number
  name: string
}

interface StudentVerificationPopupProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: (studentName: string, studentClass: "9D" | "9E") => void
  platform: "android" | "ios"
}

export function StudentVerificationPopup({ isOpen, onClose, onSuccess, platform }: StudentVerificationPopupProps) {
  const [studentNumber, setStudentNumber] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [students9D, setStudents9D] = useState<Student[]>([])
  const [students9E, setStudents9E] = useState<Student[]>([])
  const [dataLoaded, setDataLoaded] = useState(false)

  // Öğrenci listelerini yükle
  useEffect(() => {
    if (isOpen && !dataLoaded) {
      setLoading(true)

      // Her iki sınıfın öğrenci listelerini paralel olarak yükle
      Promise.all([
        fetch("https://raw.githubusercontent.com/Berathd7777/msal-dosyalar/refs/heads/main/9d/students.js").then(
          (res) => res.text(),
        ),
        fetch("https://raw.githubusercontent.com/Berathd7777/msal-dosyalar/refs/heads/main/9e/students.js").then(
          (res) => res.text(),
        ),
      ])
        .then(([data9D, data9E]) => {
          // 9D sınıfı öğrencilerini işle
          try {
            // JavaScript dosyasını güvenli bir şekilde değerlendirmek için
            // Sadece array kısmını çıkarmaya çalışalım
            const match9D = data9D.match(/\[\s*\{[\s\S]*?\}\s*\]/)
            if (match9D) {
              // Çift tırnak içine alınmamış property'leri düzelt
              const fixedJson = match9D[0]
                .replace(/([{,]\s*)(\w+)(\s*:)/g, '$1"$2"$3') // property adlarını çift tırnak içine al
                .replace(/:\s*'([^']*)'/g, ': "$1"') // tek tırnaklı string'leri çift tırnaklı yap

              const parsedData = JSON.parse(fixedJson)
              setStudents9D(parsedData)
            } else {
              console.error("9D öğrenci listesi array formatı bulunamadı")
              // Varsayılan liste kullan
              setStudents9D(defaultStudents9D)
            }
          } catch (error) {
            console.error("9D öğrenci listesi ayrıştırma hatası:", error)
            // Hata durumunda varsayılan liste kullan
            setStudents9D(defaultStudents9D)
          }

          // 9E sınıfı öğrencilerini işle
          try {
            const match9E = data9E.match(/\[\s*\{[\s\S]*?\}\s*\]/)
            if (match9E) {
              // Çift tırnak içine alınmamış property'leri düzelt
              const fixedJson = match9E[0]
                .replace(/([{,]\s*)(\w+)(\s*:)/g, '$1"$2"$3') // property adlarını çift tırnak içine al
                .replace(/:\s*'([^']*)'/g, ': "$1"') // tek tırnaklı string'leri çift tırnaklı yap

              const parsedData = JSON.parse(fixedJson)
              setStudents9E(parsedData)
            } else {
              console.error("9E öğrenci listesi array formatı bulunamadı")
              // Varsayılan liste kullan
              setStudents9E(defaultStudents9E)
            }
          } catch (error) {
            console.error("9E öğrenci listesi ayrıştırma hatası:", error)
            // Hata durumunda varsayılan liste kullan
            setStudents9E(defaultStudents9E)
          }
        })
        .catch((error) => {
          console.error("Öğrenci listeleri yükleme hatası:", error)
          // Hata durumunda varsayılan listeleri kullan
          setStudents9D(defaultStudents9D)
          setStudents9E(defaultStudents9E)
        })
        .finally(() => {
          setLoading(false)
          setDataLoaded(true)
        })
    }
  }, [isOpen, dataLoaded])

  const handleVerify = () => {
    // Öğrenci numarasını kontrol et
    const student9D = students9D.find((s) => s.no.toString() === studentNumber)
    const student9E = students9E.find((s) => s.no.toString() === studentNumber)

    if (student9D) {
      // 9D sınıfı öğrencisi
      setError(null)
      onSuccess(student9D.name, "9D")
    } else if (student9E) {
      // 9E sınıfı öğrencisi
      if (platform === "ios") {
        // iOS için 9E henüz desteklenmiyor
        setError("iOS uygulaması şu an sadece 9/D sınıfı için kullanılabilir. 9/E sınıfı için çok yakında!")
      } else {
        // Android için 9E destekleniyor
        setError(null)
        onSuccess(student9E.name, "9E")
      }
    } else {
      // Öğrenci bulunamadı
      setError("Bu uygulama sadece 9/D ve 9/E sınıfları öğrencileri için özel olarak geliştirilmiştir.")
    }
  }

  const handleQRClick = () => {
    window.location.href = "/qrdogrulama"
  }

  const handleClose = () => {
    setStudentNumber("")
    setError(null)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Öğrenci Doğrulama</DialogTitle>
          <DialogDescription>
            {platform === "android"
              ? "MSAL Öğrenci uygulamasını indirmek için okul numaranızı girin."
              : "MSAL Öğrenci iOS uygulamasına erişmek için okul numaranızı girin."}
          </DialogDescription>
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Kapat</span>
          </button>
        </DialogHeader>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-6">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="mt-2 text-sm text-muted-foreground">Öğrenci verileri yükleniyor...</p>
          </div>
        ) : (
          <>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="studentNumber" className="text-right text-sm font-medium">
                  Okul Numarası
                </label>
                <Input
                  id="studentNumber"
                  value={studentNumber}
                  onChange={(e) => setStudentNumber(e.target.value)}
                  className="col-span-3"
                  placeholder="Okul numaranızı girin"
                />
              </div>

              {error && <div className="rounded-md bg-destructive/15 p-3 text-center text-destructive">{error}</div>}
            </div>

            <DialogFooter>
              <div className="relative w-full">
                <Button onClick={handleVerify} className="w-full pr-12">
                  Doğrula
                </Button>
                <Button
                  onClick={handleQRClick}
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-white/20 bg-white text-black"
                >
                  <QrCode className="h-4 w-4" />
                </Button>
              </div>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

// Varsayılan 9D öğrenci listesi (yükleme başarısız olursa kullanılacak)
const defaultStudents9D: Student[] = [
  { no: 6002, name: "Büşra" },
  { no: 6018, name: "Ramazan Miran" },
  { no: 6203, name: "Ümit Arda" },
  { no: 6204, name: "Emine Tuğba" },
  { no: 6205, name: "Kadir Cahit" },
  { no: 6206, name: "Elif Fatma" },
  { no: 6207, name: "Seher" },
  { no: 6208, name: "Cemre Zehra" },
  { no: 6209, name: "Köksal" },
  { no: 6210, name: "Şevval" },
  { no: 6211, name: "Yasin" },
  { no: 6212, name: "Celal" },
  { no: 6213, name: "Elif" },
  { no: 6214, name: "Mehmet Emin" },
  { no: 6215, name: "Çağrı Kağan" },
  { no: 6218, name: "Mehmet Akif" },
  { no: 6219, name: "Berat" },
  { no: 6220, name: "Ahmet" },
  { no: 6221, name: "Elmira" },
  { no: 6222, name: "Bengü Sude" },
  { no: 6223, name: "Kıyasettin Alper" },
  { no: 6224, name: "Ahmed Feridun" },
  { no: 6225, name: "Ela Tuana" },
  { no: 6226, name: "Çağan" },
  { no: 6227, name: "Hayrunisa" },
  { no: 6229, name: "Emir Turan" },
  { no: 6230, name: "Birsen" },
  { no: 6231, name: "Erdem" },
  { no: 6232, name: "Emirhan" },
  { no: 6233, name: "İrem Su" },
  { no: 6234, name: "Semanur" },
  { no: 6235, name: "Hasan Berat" },
  { no: 6321, name: "Nilay" },
  { no: 6324, name: "Medine" },
  { no: 6326, name: "İrem" },
  { no: 6330, name: "Eda" },
  { no: 6334, name: "Damla" },
  { no: 6335, name: "Meys" },
  { no: 6336, name: "Yagut" },
  { no: 6338, name: "Melek" },
  { no: 6347, name: "Ela" },
]

// Varsayılan 9E öğrenci listesi (yükleme başarısız olursa kullanılacak)
const defaultStudents9E: Student[] = [
  { no: 7001, name: "Ahmet" },
  { no: 7002, name: "Mehmet" },
  { no: 7003, name: "Ayşe" },
  { no: 7004, name: "Fatma" },
  { no: 7005, name: "Ali" },
  { no: 7006, name: "Veli" },
  { no: 7007, name: "Zeynep" },
  { no: 7008, name: "Mustafa" },
  { no: 7009, name: "Emine" },
  { no: 7010, name: "Hüseyin" },
]
