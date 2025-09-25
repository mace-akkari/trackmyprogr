import type { Metadata } from "next";
import "./globals.css";
import { Navbar, Footer } from "@/components/layout";

export const metadata: Metadata = {
  title: "Track My Progress",
  description:
    "A workout and fitness tracker that lets you log exercises and monitor progress.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
