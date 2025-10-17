import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./providers/theme-provider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700', '800', '900'] 
});

const poppins = Poppins({ 
  subsets: ["latin"],
  variable: '--font-poppins',
  weight: ['300', '400', '500', '600', '700', '800', '900'] 
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: "NEXFLARE TECH - AI-Powered Software & Automation Solutions",
  description: "We build intelligent, scalable solutions for your business. Full Stack Web & Mobile App Development, AI-Powered Automation Tools, Business Chatbots & Analytics Systems, Cloud-Based SaaS Platforms.",
  keywords: "AI automation, full stack development, chatbots, SaaS platforms, mobile app development, web development, cloud solutions, business automation",
  authors: [{ name: "Arsath Prabu", url: "https://nexflaretech.com" }],
  creator: "NEXFLARE TECH",
  publisher: "NEXFLARE TECH",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nexflaretech.com",
    title: "NEXFLARE TECH - AI-Powered Software & Automation Solutions",
    description: "We build intelligent, scalable solutions for your business. Innovate. Automate. Accelerate.",
    siteName: "NEXFLARE TECH",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "NEXFLARE TECH - AI-Powered Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NEXFLARE TECH - AI-Powered Software & Automation Solutions",
    description: "We build intelligent, scalable solutions for your business.",
    images: ["/og-image.jpg"],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#00FFFF',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="msapplication-TileColor" content="#0D1117" />
        <meta name="theme-color" content="#00FFFF" />
      </head>
      <body className={`${inter.variable} ${poppins.variable} font-inter bg-dark text-white antialiased`}>
        <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false}>
          <div className="min-h-screen bg-hero-with-grid bg-hero-grid">
            {children}
          </div>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#0D1117',
                color: '#fff',
                border: '1px solid #00FFFF',
                borderRadius: '8px',
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
