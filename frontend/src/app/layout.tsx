// frontend/src/app/layout.tsx

// THIS IS WHERE THE ROUTING HAPPENS
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { Home, List, BarChart2, Settings } from "lucide-react";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen flex bg-background text-foreground">
          {/* Sidebar */}
          <aside className="w-60 p-6 border-r border-muted flex flex-col">
            <h2 className="text-2xl font-bold mb-8">CryptoBot</h2>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/"
                className="flex items-center px-3 py-2 rounded hover:bg-accent"
              >
                <Home className="mr-2 h-5 w-5" /> Dashboard
              </Link>
              <Link
                href="/strategies"
                className="flex items-center px-3 py-2 rounded hover:bg-accent"
              >
                <List className="mr-2 h-5 w-5" /> Strategies
              </Link>
              <Link
                href="/backtest"
                className="flex items-center px-3 py-2 rounded hover:bg-accent"
              >
                <BarChart2 className="mr-2 h-5 w-5" /> Backtest
              </Link>
              <Link
                href="/settings"
                className="flex items-center px-3 py-2 rounded hover:bg-accent"
              >
                <Settings className="mr-2 h-5 w-5" /> Settings
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
