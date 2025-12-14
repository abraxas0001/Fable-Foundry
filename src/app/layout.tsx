import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { AudioProvider } from "@/contexts/AudioContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import GlobalAudioPlayer from "@/components/ui/GlobalAudioPlayer";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import { baseMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = baseMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-body">
        <ErrorBoundary>
          <ThemeProvider>
            <AuthProvider>
              <AudioProvider>
                <a
                  href="#main-content"
                  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 wax-seal-button text-[var(--gold-accent)] z-50"
                >
                  Skip to main content
                </a>
                <Header />
                <main id="main-content" role="main">
                  {children}
                </main>
                <Footer />
                <GlobalAudioPlayer />
              </AudioProvider>
            </AuthProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
