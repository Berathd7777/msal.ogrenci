"use client"

import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface WelcomePopupProps {
  isOpen: boolean
  onClose: () => void
  studentName: string
  platform: "android" | "ios"
}

export function WelcomePopup({ isOpen, onClose, studentName, platform }: WelcomePopupProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true)
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 3000) // 3 saniye sonra yükleme durumunu kapat

      return () => clearTimeout(timer)
    }
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            {isLoading ? "Doğrulama" : "Hoş Geldiniz"}
          </DialogTitle>
        </DialogHeader>

        <div className="py-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center gap-4">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
              <div className="text-center space-y-2">
                <p className="text-muted-foreground">Lütfen Bekleyiniz</p>
                <p className="text-muted-foreground">Doğrulama yapılıyor</p>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-4">
              <div className="text-2xl font-bold">Merhaba, {studentName} 👋</div>
              <p className="text-muted-foreground">
                {platform === "android"
                  ? "MSAL Öğrenci uygulaması indirilecek."
                  : "MSAL Öğrenci iOS uygulamasına yönlendirileceksiniz."}
              </p>
            </div>
          )}
        </div>

        <DialogFooter>
          {!isLoading && (
            <Button onClick={onClose} className="w-full">
              {platform === "android" ? "İndirmeye Başla" : "Devam Et"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
