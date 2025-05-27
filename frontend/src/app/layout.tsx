// frontend/src/app/layout.tsx

// THIS IS WHERE THE ROUTING HAPPENS 
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CryptoBot",
  description: "Your trading bot dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // ← add `className="dark"` here to turn on dark mode by default
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="min-h-screen flex bg-background text-foreground">
          {/* Sidebar */}
          <aside className="w-60 p-6 border-r border-muted flex flex-col">
            <h2 className="text-2xl font-bold mb-8">CryptoBot</h2>
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="px-3 py-2 rounded hover:bg-accent">
                Dashboard
              </Link>
              <Link href="/strategies" className="px-3 py-2 rounded hover:bg-accent">
                Strategies
              </Link>
              <Link href="/backtest" className="px-3 py-2 rounded hover:bg-accent">
                Backtest
              </Link>
              <Link href="/settings" className="px-3 py-2 rounded hover:bg-accent">
                Settings
              </Link>
            </nav>
          </aside>

          {/* Main content */}
          <main className="flex-1 p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
