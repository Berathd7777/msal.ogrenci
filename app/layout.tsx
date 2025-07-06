import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "MSAL Öğrenci - Eğitim Hayatınızı Kolaylaştırın",
  description:
    "MSAL Öğrenci uygulaması ile ödevlerinizi takip edin, ders kitaplarının cevaplarına erişin ve okul hayatınızı düzenleyin.",
  icons: {
    icon: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rounded-in-photoretrica%20%284%29-u6Yox6ZWzjPyIcrgivt5FqpFEG15n3.png",
      },
    ],
    apple: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rounded-in-photoretrica%20%284%29-u6Yox6ZWzjPyIcrgivt5FqpFEG15n3.png",
      },
    ],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rounded-in-photoretrica%20%284%29-u6Yox6ZWzjPyIcrgivt5FqpFEG15n3.png"
        />
        <link
          rel="apple-touch-icon"
          href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rounded-in-photoretrica%20%284%29-u6Yox6ZWzjPyIcrgivt5FqpFEG15n3.png"
        />
        <script src="https://elevenlabs.io/convai-widget/index.js" async type="text/javascript"></script>
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
