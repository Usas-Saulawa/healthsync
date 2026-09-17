// app/layout.tsx
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { QueryProvider } from "@/components/providers/QueryProvider";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "EHR",
  description: "Offline-first hospital management dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased`}>
      <body
        className={`${nunito.className} min-h-screen flex flex-col text-(--text)`}
      >
        <QueryProvider>{children}</QueryProvider>
        <Toaster
          position={"bottom-right"}
          toastOptions={{
            duration: 3000,
            style: {
              background: "var(--card)",
              color: "var(--text)",
              borderRadius: "8px",
              border: "1px solid var(--border)",
            },
            success: {
              iconTheme: {
                primary: "var(--text)",
                secondary: "var(--card)",
              },
            },
            error: {
              iconTheme: {
                primary: "var(--text)",
                secondary: "var(--card)",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
