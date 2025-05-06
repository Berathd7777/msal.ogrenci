"use client"
import Image from "next/image"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface IosPopupProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export function IosPopup({ isOpen, onClose, onConfirm }: IosPopupProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">iOS Kurulum Yönergeleri</DialogTitle>
          <DialogDescription>
            MSAL Öğrenci uygulamasını iPhone ana ekranınıza eklemek için aşağıdaki adımları izleyin.
          </DialogDescription>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Kapat</span>
          </button>
        </DialogHeader>

        <div className="relative w-full h-auto">
          <Image
            src="/images/ios-yonergeler.png"
            alt="iOS Kurulum Yönergeleri"
            width={600}
            height={600}
            className="w-full h-auto"
          />
        </div>

        <DialogFooter>
          <Button onClick={onConfirm} className="w-full">
            Okudum, anladım
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
