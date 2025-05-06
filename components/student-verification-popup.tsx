"use client"

import { useState } from "react"
import { X } from "lucide-react"
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

// 9/D sınıfı öğrenci veritabanı
const CLASS_9D_STUDENTS = [
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

interface StudentVerificationPopupProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: (studentName: string) => void
  platform: "android" | "ios"
}

export function StudentVerificationPopup({ isOpen, onClose, onSuccess, platform }: StudentVerificationPopupProps) {
  const [studentNumber, setStudentNumber] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleVerify = () => {
    // Öğrenci numarasını kontrol et
    const student = CLASS_9D_STUDENTS.find((s) => s.no.toString() === studentNumber)

    if (student) {
      // Başarılı
      setError(null)
      onSuccess(student.name)
    } else {
      // Başarısız
      setError("Bu uygulama sadece 9/D sınıfı öğrencileri için özel olarak geliştirilmiştir.")
    }
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
          <Button onClick={handleVerify} className="w-full">
            Doğrula
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
