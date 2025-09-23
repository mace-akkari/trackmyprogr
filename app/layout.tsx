import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
