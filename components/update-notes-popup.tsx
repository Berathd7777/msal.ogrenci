"use client"

import { useState, useEffect } from "react"
import { X, Loader2, Calendar, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface Release {
  tag_name: string
  name: string
  body: string
  published_at: string
  html_url: string
}

interface UpdateNotesPopupProps {
  isOpen: boolean
  onClose: () => void
}

export function UpdateNotesPopup({ isOpen, onClose }: UpdateNotesPopupProps) {
  const [releases, setReleases] = useState<Release[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen && releases.length === 0) {
      fetchReleases()
    }
  }, [isOpen, releases.length])

  const fetchReleases = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("https://api.github.com/repos/Berathd7777/msal.ogrenci/releases")

      if (!response.ok) {
        throw new Error("Güncelleme notları yüklenemedi")
      }

      const data = await response.json()
      setReleases(data.slice(0, 5)) // Son 5 sürümü göster
    } catch (err) {
      setError("Güncelleme notları yüklenirken bir hata oluştu")
      console.error("Error fetching releases:", err)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, "0")
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const year = date.getFullYear()
    return `${day}.${month}.${year}`
  }

  const formatReleaseBody = (body: string) => {
    // Markdown formatını basit HTML'e çevir
    return body
      .replace(/### (.*)/g, '<h3 class="text-sm font-semibold mt-3 mb-1 sm:text-base sm:mt-4 sm:mb-2">$1</h3>')
      .replace(/## (.*)/g, '<h2 class="text-base font-bold mt-3 mb-1 sm:text-lg sm:mt-4 sm:mb-2">$1</h2>')
      .replace(/# (.*)/g, '<h1 class="text-lg font-bold mt-3 mb-1 sm:text-xl sm:mt-4 sm:mb-2">$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(/- (.*)/g, '<li class="ml-3 text-sm sm:ml-4 sm:text-base">• $1</li>')
      .replace(/\n/g, "<br>")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-y-auto mx-4 sm:mx-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold flex items-center gap-2 sm:text-2xl">
            <Tag className="h-5 w-5 sm:h-6 sm:w-6" />
            Güncelleme Notları
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            MSAL Öğrenci uygulamasının son sürümlerindeki yenilikler ve düzeltmeler.
          </DialogDescription>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Kapat</span>
          </button>
        </DialogHeader>

        <div className="mt-4">
          {loading && (
            <div className="flex flex-col items-center justify-center py-6 sm:py-8">
              <Loader2 className="h-6 w-6 animate-spin text-primary sm:h-8 sm:w-8" />
              <p className="mt-2 text-xs text-muted-foreground sm:text-sm">Güncelleme notları yükleniyor...</p>
            </div>
          )}

          {error && (
            <div className="rounded-md bg-destructive/15 p-3 text-center sm:p-4">
              <p className="text-destructive text-sm">{error}</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-2 bg-transparent text-xs sm:text-sm"
                onClick={fetchReleases}
              >
                Tekrar Dene
              </Button>
            </div>
          )}

          {!loading && !error && releases.length > 0 && (
            <div className="space-y-4 sm:space-y-6">
              {releases.map((release, index) => (
                <div key={release.tag_name} className="border-b pb-4 last:border-b-0 sm:pb-6">
                  <div className="flex flex-col gap-2 mb-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-bold sm:text-xl">{release.name || release.tag_name}</h3>
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                        {release.tag_name}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground sm:text-sm">
                      <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                      {formatDate(release.published_at)}
                    </div>
                  </div>

                  {release.body && (
                    <div
                      className="prose prose-sm max-w-none text-muted-foreground text-sm sm:text-base"
                      dangerouslySetInnerHTML={{
                        __html: formatReleaseBody(release.body),
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {!loading && !error && releases.length === 0 && (
            <div className="text-center py-6 sm:py-8">
              <p className="text-muted-foreground text-sm sm:text-base">Henüz güncelleme notu bulunamadı.</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
