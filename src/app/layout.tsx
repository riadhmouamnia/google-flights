"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/toggle-theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SearchForm } from "@/components/search-form";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark:bg-gray-950 bg-gray-200`}
      >
        <QueryClientProvider client={queryClient}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="min-h-screen w-full py-12 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                  <h1 className="text-4xl font-bold mb-4">Find Your Flight</h1>
                  <p className="text-lg text-primary/40">
                    Search hundreds of travel sites at once
                  </p>
                </div>
                <SearchForm />
                {children}
              </div>
            </div>
            <div className="fixed bottom-4 right-4 z-50">
              <ModeToggle />
            </div>
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
